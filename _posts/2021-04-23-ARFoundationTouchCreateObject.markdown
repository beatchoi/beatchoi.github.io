---
layout: post
title:  "ARFoundation Object Creation :: 지면을 인식하여 터치로 물체 생성하기"
date:   2021-04-23 14:00:07
categories: ARPage
description: "ARFoundation을 활용하여 지면인식 후 오브젝트 생성하기"
image: '/img/UnityVR/OculusQuest/01XRToolkit/ARFoundation.jpg'
published: true
canonical_url: https://beatchoi.github.io/arpage/2021/04/23/ARFoundationTouchCreateObject/
---

#### 스크립트 생성
`ARPlaneTouchPlace`이라는 이름의 스크립트를 생성해서 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

public class ARPlaneTouchPlace : MonoBehaviour
{
    public GameObject obj;
    
    ARRaycastManager arRaycastManager;
    static List<ARRaycastHit> hits = new List<ARRaycastHit>();

    private Vector2 touchPos;
    bool isSpawned;
    private GameObject spawnedObj;

    // Start is called before the first frame update
    void Start()
    {
        arRaycastManager = GetComponent<ARRaycastManager>();
    }

    // Update is called once per frame
    void Update()
    {
        if(Input.touchCount > 0)
        {
            touchPos = Input.GetTouch(0).position;
            if(arRaycastManager.Raycast(touchPos, hits, TrackableType.PlaneWithinPolygon))
            {
                var hitPos = hits[0].pose;

                if (!isSpawned)
                {
                    spawnedObj = Instantiate(obj, hitPos.position, hitPos.rotation);
                    isSpawned = true;
                }
                else
                {
                    spawnedObj.transform.position = hitPos.position;
                }
                
            }
        }
    }
}

```
