---
layout: post
title:  "유니티 터치 회전 - UI Touch Rotate"
date:   2022-11-24 14:00:07
categories: Unity3D Basics
description: "유니티 UI 터치 회전"
image: '/img/Unity.png'
published: true
canonical_url: http://whtls.com/unity3d/basics/2022/11/24/TouchRotate/
---
  
  {% include adsense.html %}    
  
  
## 모바일 터치 회전
객체를 터치하여 터치하는 방향으로 회전시켜봅니다.  
이전 포스팅의 터치하여 이동과의 UX 혼동을 피하기 위해 길게 누르면 회전 모드로 변경하여 회전하도록 합니다.  
객체를 0.2 - 0.5초 동안 누르면 객체가 살짝 커지며 회전모드로 진입하고 터치를 떼면 다시 원래 사이즈로 돌아옵니다.  

## 유니티3D 에디터에서  
#### 스크립트 작성
프로젝트창에서 `TouchRotate.cs`스크립트를 생성합니다.
  
`TouchRotate.cs` 스크립트를 열어서 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TouchRotate : MonoBehaviour
{

    private GameObject Obj;

    [Range(1.0f, 1.5f)]
    public float DragScale = 1.1f;

    [Range(0f, 1.5f)]
    public float touchTimeLimit = 0.28f;

    private bool isRotated;
    private float touchTime;

    // Update is called once per frame
    void Update()
    {
        if (Input.touchCount == 1)
        {
            Touch touch = Input.GetTouch(0);

            Ray ray = Camera.main.ScreenPointToRay(touch.position);
            RaycastHit hit;

            if (Physics.Raycast(ray, out hit) && Obj == null)
            {
                Obj = hit.transform.gameObject;
            }

            if (touch.phase == TouchPhase.Stationary && Obj == null)
            {
                if (touchTime >= touchTimeLimit)
                {
                    if (!isRotated)
                    {
                        Vibration.Vibrate(10);
                        Obj.transform.localScale *= DragScale;
                    }
                    touchTime = touchTimeLimit;
                    isRotated = true;
                }
                else
                {
                    touchTime += Time.deltaTime;
                }
            }

            if (touch.phase == TouchPhase.Moved && Obj != null)
            {
                if (touchTime >= touchTimeLimit)
                {
                    Obj.transform.Rotate(new Vector3(touch.deltaPosition.y * Mathf.Deg2Rad * 20, -touch.deltaPosition.x * Mathf.Deg2Rad * 20, 0), Space.World);
                }

            }
            if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled)
            {
                if (Obj != null)
                {
                    touchTime = 0;
                    if (isRotated)
                    {
                        isRotated = false;
                        Obj.transform.localScale /= DragScale;
                    }
                    Obj = null;
                }
            }
        }
    }
}

```
  
#### 씬 수정
  
계층 구조창에서 `Cube`오브젝트를 생성하여 화면 중앙에 보일 수 있도록 위치를 조정합니다.  
<p align="center"><img src="/img/UnityBasic/TouchRotate/1.PNG"><br/>
<01. 오브젝트 생성 1></p><br/>   
  
 
  
계층구조창에 빈 게임 오브젝트를 생성하고 이름을 TouchManager로 변경합니다.  
TouchManager 오브젝트에 TouchRotate.cs 스크립트를 연결시킵니다.  
<p align="center"><img src="/img/UnityBasic/TouchRotate/2.PNG"><br/>
<02. 오브젝트 생성 2></p><br/>    
    
  
## 테스트
모바일 디바이스에 빌드를 하여 테스트를 해 봅니다.  
  
결과물  
<p align="center"><img src="/img/UnityBasic/Input/01.PNG"><br/>
<02. ></p>  

  
  
  
  
  
  {% include adsense.html %}    
  
    
