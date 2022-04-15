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
  
  
동일 프로젝트에서 스크립트를 생성합니다. 아래오 같이 작성합니다.  
  
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


        
        
        
        
