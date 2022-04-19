---
layout: post
title:  "유니티 터치 드래그"
date:   2022-04-19 13:50:07
categories: Unity3D Basics
description: "유니티에서 터치 입력을 받아 오브젝트를 이동시켜 봅니다"
image: 'https://www.csrhymes.com//img/static-site-generator.jpg'
published: true
canonical_url: http://beatchoi.github.io/unity3d/basics/2022/04/19/TouchDrag/
---
  
  {% include adsense.html %}    
  
  
## 모바일 터치 입력
이전 포스팅을 기반으로 오브젝트를 터치하여 드래그로 이동시켜 보도록 합니다.   
  
## 스크립트 작성
  
`Touch02`스크립트를 생성하여 아래와 같이 작성합니다.  
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Touch02 : MonoBehaviour
{
    private GameObject obj;
    private Vector3 MovePos, Offset;
    bool isDrag;
    // Update is called once per frame
    void Update()
    {
        if(Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);

            if (touch.phase  == TouchPhase.Began)
            {
                Ray ray = Camera.main.ScreenPointToRay(touch.position);
                RaycastHit hit;

                if(Physics.Raycast(ray, out hit))
                {
                    obj = hit.transform.gameObject;
                    MovePos = new Vector3(touch.position.x, touch.position.y, obj.transform.position.z - Camera.main.transform.position.z);
                    Offset = obj.transform.position - Camera.main.ScreenToWorldPoint(MovePos);
                    isDrag = true;
                }
            }
            if(touch.phase == TouchPhase.Moved && isDrag)
            {
                MovePos = new Vector3(touch.position.x, touch.position.y, obj.transform.position.z - Camera.main.transform.position.z);
                MovePos = Camera.main.ScreenToWorldPoint(MovePos);
                obj.transform.position = MovePos + Offset;
            }
            if(touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled)
            {
                obj = null;
                isDrag = false;
            }
            
        }
    }
}
```
  
7 : 이동시킬 오브젝트의 정보를 담을 변수 선언.  
8 : 오브젝트 이동에 필요한 `Vector3` 변수 선언.  
9 : 드래그 유무 판별 변수 선언.  
19 : 터치한 스크린의 위치에서 스크린 내부로 뚫고 들어가는 가상의 광선(레이캐스트)을 생성하여 `ray`변수에 담는 과정.  
20 : 레이캐스트에 충돌한 오브젝트의 정보를 담는 `hit`변수 선언.  
22 : 레이캐스트에 오브젝트가 충돌한다면!  
24 : `obj`변수에 터치한 오브젝트를 담음.  
25 : `MovePos`변수에 현재 터치한 위치를 `touch.position`을 활용하여 스크린 픽셀 좌표로 담음.(본 스크립트에서는 x, y축으로만 오브젝트 이동, z축은 카메라와 오브젝트의 거리 차이를 계산하여 유지)  
26 : `Camera.main.ScreenToWorldPoint(Vector3)`를 활용하여 스크린 픽셀 좌표를 월드 좌표로 변환한 값을 오브젝트의 현제 값에서 뺀 편차값을 저장.  
27 : 위 과정이 끝나면 드래그를 할 수 있는 플래그를 설정. 
30 : `TouchPhase.Move`상태면서 `isDrag`가 참일 경우 진행.  
32, 33 : 위와 같음.  
34 : 오브젝트의 현재 위치를 터치한 좌표와 편차값을 더해서 구함.  
  
## 유니티3D 에디터에서
이전 포스팅에서 이어서 진행합니다.  

계층 구조창에서 `Cube`오브젝트를 생성하여 화면 중앙에 보일 수 있도록 위치를 조정합니다.  
<p align="center"><img src="/img/UnityBasic/TouchDrag/1.PNG"><br/>
<01. 오브젝트 생성 1></p><br/>   
  
<p align="center"><img src="/img/UnityBasic/TouchDrag/2.PNG"><br/>
<02. 오브젝트 생성 2></p><br/>   
  
`Touch`오브젝트에 위에서 작성한 `Touch02` 오브젝트를 인스턴스화 시켜줍니다.  
<p align="center"><img src="/img/UnityBasic/TouchDrag/3.PNG"><br/>
<03. 스크립트 인스턴스화></p><br/>   
    
  
## 테스트
모바일 디바이스에 빌드를 하여 테스트를 해 봅니다.  
  
<p align="center"><img src="/img/UnityBasic/TouchDrag/4.gif"><br/>
<04. 테스트></p><br/>    
   
  {% include adsense.html %}    
        
