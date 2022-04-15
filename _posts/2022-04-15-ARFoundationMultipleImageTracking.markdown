---
layout: post
title:  "ARFoundation - Multiple Image Tracking"
date:   2022-04-15 12:10:07
categories: ARPage
description: "ARFoundation - Multiple Image Tracking"
image: '/img/UnityVR/OculusQuest/01XRToolkit/ARFoundation.jpg'
published: true
canonical_url: https://beatchoi.github.io/arpage/2022/04/15/ARFoundationMultipleImageTracking/
---
  
  {% include adsense.html %}    
  
  
## ARFoundation을 활용한 다중 이미지 트래킹 콘텐츠 개발하기 
이전 실습에 이어서 여러장의미지에 각기 다르 오브젝트를 증강할 수 있는 콘텐츠르 개발해 봅니다.   
  
## 유니티3D 에디터에서  

아래 실습을 진행합니다.  
[1. 단일 이미지 트래킹 구현하기 2022 - 04 - 15](https://beatchoi.github.io/arpage/2022/04/15/ARFoundationImageTracking/)  
  
  
동일 프로젝트에서 스크립트를 생성합니다. 아래와 같이 작성합니다.  
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

public class MultipleImageTracking : MonoBehaviour
{
    public GameObject[] Objs;
    private Dictionary<string, GameObject> spawnedObjs = new Dictionary<string, GameObject>();
    private ARTrackedImageManager ARTrackedImageManager;

    private void Awake()
    {
        ARTrackedImageManager = GetComponent<ARTrackedImageManager>();
        foreach(GameObject prefab in Objs)
        {
            GameObject clone = Instantiate(prefab);
            spawnedObjs.Add(prefab.name, clone);
            clone.SetActive(false);
        }
    }

    void OnEnable()
    {
        ARTrackedImageManager.trackedImagesChanged += OnTrackedImagesChanged;
    }

    void OnDisable()
    {
        ARTrackedImageManager.trackedImagesChanged -= OnTrackedImagesChanged;
    }

    void OnTrackedImagesChanged(ARTrackedImagesChangedEventArgs eventArgs)
    {
        foreach (var trackedImage in eventArgs.added)
        {
            UpdateImage(trackedImage);
        }

        foreach (var trackedImage in eventArgs.updated)
        {
            UpdateImage(trackedImage);
        }

        foreach (var trackedImage in eventArgs.removed)
        {
            spawnedObjs[trackedImage.name].SetActive(false);
        }
    }

    private void UpdateImage(ARTrackedImage trackedImage)
    {
        GameObject trackedObject = spawnedObjs[trackedImage.referenceImage.name];

        if(trackedImage.trackingState == TrackingState.Tracking)
        {
            trackedObject.transform.position = trackedImage.transform.position;
            trackedObject.transform.rotation = trackedImage.transform.rotation;
            trackedObject.SetActive(true);
        }
        else
        {
            trackedObject.SetActive(false);
        }
    }
}
```
5, 6: ARFoundation 네임스페이스 추가  
9   : 인식시 생성되는 오브젝트를 저장할 배열 선언  
10  : String으로 인덱싱을 하는 GameObject형의 딕셔너리 선언  
11  : ARTrackedManager 관련 함수등을 활용하기 위한 선언  
[딕셔너리:: Dictionary - 21-08-02](https://beatchoi.github.io/unity3d/basics/2021/08/02/DataStructureDictionary/)참조  
16  : Objs 배열에 저장한 프리펩을 딕셔너리 형태의 데이터로 변환, foreach 반복문으로 활용  
26, 31 : OnEnable 및 OnDisable 이 호출될 때 이벤트의 추가 및 제거  
  
34 - 50 : 이미지가 `Added(첫인식)`, `Updated(변경)`, `removed(제거)` 되었을 때 실행되는 이벤트 함수 `OnTrackedImagesChanged`  
          `Added`는 이미지가 처음 인식되었을 때 한번 호출됨  
          `Updated`는 인식된 이미직 변경될 때 할당된 오브젝트를 생성하거나 제거함, TrackingState를 체크하는 단계    
          `removed`시에는 생성되어있는 오브젝트 제거  
          
52 - 66 : 각 `Added(첫인식)`, `Updated(변경)` 상태에 실행되는 함수 `UpdateImage`선언 및 구현  
          인식된 이미지의 이름과 동일한 인덱스를 가진 `spawnObjs`딕셔너리 자료구조 요소에 접근하여 `TrackingState`가 `Tracking`일 때 위치와 회전값을 조정  
          그 외 경우 `(Limited, None)` 오브젝트를 SetActive(false)  

        
위 스크립트를 `AR Session Origin` 항목에 인스턴스화 시킵니다.  
  
  
2장 이상의 여러 이미지를 인식시켜야 하기 때문에 인식할 타겟 이미지를 선택합니다.    
`Project`창으로 옮겨서 이미지 파일을 프로젝트에 추가합니다.    
  
  
`Project`창의 `ReferenceImageLibrary`파일을 선택하고 우측 인스펙터 창에서 `Add Image`버튼을 눌러 이미지 항목을 추가합니다.  
첫 이미지와 마찬가지로 사진 파일을 `Texture 2D`항목에 끌어다 놓고 `Specify Size`항목의 `Physical Size`를 1로 변경합니다.  
총 이미지가 두개가 됩니다.    
  
  
두번째 이미지가 인식되 때 생성될 3D 오브젝트 프리펩(Sphere)을 생성합니다.  
  
  
다중 이미지 인식구현에서 중요한 부분은 인식될 이미지의 이름과 생성될 오브젝트 프리펩의 이름이 동일해야 한다는 것입니다.  
아래와 같이 이미지 이름과 프리펩 이름으 바꿔줍니다. image01 이미지가 인식되면 image01 프리펩 오브젝트가 생성됩니다.  
  
  
`AR Session Origin`오브젝트를 선택하여 위에서 인스턴스화 시킨 스크립트 컴포넌트를 확인합니다.  
해당 스크립트의 `Objs`항목을 열어 리스트를 2개 추가합니다. 각 항목에 아래와 같이 image01, image02 프리펩으 연결합니다.  
  
  
  
        
        
