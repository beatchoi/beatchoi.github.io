---
layout: post
title:  "유니티에서의 물리엔진 Raycast"
date:   2022-04-20 14:00:07
categories: Unity3D Basics
description: "유니티 물리 레이캐스트 - Raycast"
image: '/img/UnityBasic/PhysicsRaycast/3.PNG'
published: true
canonical_url: http://whtls.com/unity3d/basics/2020/12/15/PhysicsEvent/
---

## 유니티에서의 레이캐스트 구현하기
유니티 튜토리얼에 따르면 레이캐스트는 지정한 방향으로 발사되는 가상의 광선으로서 광선의 경로에 있는 객체와의 충돌을 감지하기 위한 툴입니다.  
기본적인 레이캐스트의 구현을 본 포스팅을 통해 알아봅니다.  
  
## 스크립트 작성
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RaycastSimple : MonoBehaviour
{
    // Update is called once per frame
    void Update()
    {
        RaycastHit hit;
        if(Physics.Raycast(transform.position, transform.forward*3000, out hit))
        {
            Debug.Log("Ray Hit");
        }
        Debug.DrawRay(transform.position, transform.forward*3000, Color.red);
    }
}
```
10 : RaycastHit은 레이캐스트에 충돌한 객체의 정보를 담을 수 있는 구조체입니다.  
11 : Physics.Raycast(레이캐스트의 원점, 레이캐스트의 방향, out hit) 함수를 활용하여 레이캐스트의 충돌 여부를 판단합니다.  
13 : 레이캐스트 충돌시 로그를 찍습니다.  
15 : 레이캐스트는 가상의 광선이기 때문에 실제로 보이지 않습니다. 때문에 `Scene`창에서의 디버깅을 위해 레이캐스트를 보여지게 할 수 있습니다.  
  
  
## 유니티3D 에디터에서  
  
해당 스크립트를 `Main Camera`오브젝트에 인스턴스화 시킵니다.  
<p align="center"><img src="/img/UnityBasic/PhysicsRaycast/1.PNG"><br/>
<01. RaycastSimple 스크립트 생성></p>  
  
카메라 정면에 `Cube` 오브젝트를 생성합니다.  
<p align="center"><img src="/img/UnityBasic/PhysicsRaycast/2.PNG"><br/>
<02. Cube 오브젝트 생성></p>  
  
  
## 테스트
상단 플레이 버튼을 눌러서 `Scene`창을 확인합니다.
아래와 같이 붉은색 광선이 레이캐스트 입니다.  
해당 광선은 `Game`창에서는 보이지 않습니다.  
레이캐스트가 `Cube`오브젝트에 충돌하면 `Console`창에 로그가 찍힙니다.  
<p align="center"><img src="/img/UnityBasic/PhysicsRaycast/3.PNG"><br/>
<03. Raycast 테스트></p> 
  
  

  
  
