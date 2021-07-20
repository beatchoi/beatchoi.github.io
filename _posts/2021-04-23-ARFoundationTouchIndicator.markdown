---
layout: post
title:  "ARFoundation Ground Indicator :: 지면 인식 표시 객체 생성하기"
date:   2021-04-23 14:00:17
categories: ARPage
description: "ARFoundation을 활용하여 지면인식 표시 생성하기"
image: '/img/UnityVR/OculusQuest/01XRToolkit/ARFoundation.jpg'
published: true
canonical_url: https://beatchoi.github.io/arpage/2021/04/23/ARFoundationTouchIndicator/
---
  
  {% include adsense.html %}
  
  
#### 스크립트 생성
`ARPlaneIndication`이라는 이름의 스크립트를 생성해서 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

public class ARPlaneIndication : MonoBehaviour
{
    ARRaycastManager arRaycastManager;
    static List<ARRaycastHit> hits = new List<ARRaycastHit>();

    public Camera ARCam;
    public GameObject ARIndicator;

    // Start is called before the first frame update
    void Start()
    {
        arRaycastManager = GetComponent<ARRaycastManager>();
    }

    // Update is called once per frame
    void Update()
    {
        PlaneIndication();
    }

    private void PlaneIndication()
    {
        var screenCenter = ARCam.ViewportToScreenPoint(new Vector3(0.5f, 0.5f));

        if(arRaycastManager.Raycast(screenCenter, hits, TrackableType.All))
        {
            Pose hitPos = hits[0].pose;

            var cameraForward = ARCam.transform.forward;
            var cameraBearing = new Vector3(cameraForward.x, 0, cameraForward.z).normalized;

            hitPos.rotation = Quaternion.LookRotation(cameraBearing);
            ARIndicator.SetActive(true);
            ARIndicator.transform.SetPositionAndRotation(hitPos.position, hitPos.rotation);

        }
        else
        {
            ARIndicator.SetActive(false);
        }
    }

}


```
  
  
{% include adsense.html %}
  
  
