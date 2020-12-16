---
layout: post
title:  "유니티에서의 물리엔진 이벤트 함수 - OnTrigger"
date:   2020-12-15 14:00:07
categories: Unity3D Basics
description: "유니티 물리 이벤트 함수 Trigger"
image: '/img/UnityBasic/PhysicsEvent/05.gif'
published: true
canonical_url: http://whtls.com/unity3d/basics/2020/12/15/PhysicsEvent2/
---

## 유니티에서의 물리엔진의 이벤트 함수 알아보기
유니티에서 `물리엔진`을 구동하는 이벤트 함수인 `OnTrigger`를 알아봅니다.  
  
## 유니티3D 에디터에서  
#### Trigger Event Function
프로젝트창에서 `Physics`스크립트를 생성합니다.
<p align="center"><img src="/img/UnityBasic/PhysicsEvent/01.PNG"><br/>
<01. Physics 스크립트 생성></p>  
  
Physics 스크립트를 열어서 다음과 같이 작성합니다. 
스크립트에 생성되어 있는 Start 및 Update 함수는 제거합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Physics : MonoBehaviour
{
    private void OnTriggerEnter(Collider other)
    {
        Debug.Log("Trigger Enter");
    }

    private void OnTriggerStay(Collider other)
    {
        Debug.Log("In Trigger");
    }

    private void OnTriggerExit(Collider other)
    {
        Debug.Log("Trigger Exit");
    }
}
```
  
* 각 `OnTriggerEnter`, `OnTriggerStay`, `OnTriggerExit`함수들은 해당 스크립트가 인스턴스화 된 오브젝트의 `트리거 충돌` 연산을 위한 이벤트 함수입니다.   
* `OnTriggerEnter` 함수는 오브젝트가 충돌을 시작했을 때 한번 호출됩니다.  
* `OnTriggerStay` 함수는 오브젝트가 충돌이 되고 있을 때 호출됩니다.  
* `OnTriggerExit` 함수는 오브젝트가 충돌이 끝났을 때 한번 호출됩니다.  
* 각 함수가 호출될 때 로그를 찍어서 확인해 봅니다.  

#### 오브젝트 설정  
  
에디터로 돌아와서 `Physics`스크립트를 `Sphere`오브젝트에 인스턴스화를 시킵니다.  
<p align="center"><img src="/img/UnityBasic/PhysicsEvent/02.PNG"><br/>
<02. Physics 스크립트 인스턴스화></p>  
  
`Sphere`오브젝트르 선택하고 우측 인스펙터 창에 `Sphere Collider`컴포넌트의 `Is Trigger`항목에 체크합니다.  
`OnTrigger`함수들은 오브젝트에 `Is Trigger`가 체크 되어있어야 충돌을 연산합니다.  
체크가 되어있지 않으면 연산이 되지 않습니다.  
<p align="center"><img src="/img/UnityBasic/PhysicsEvent/04.PNG"><br/>
<03. Is Trigger 활성화></p>  
  
## 테스트
에디터 상단 플레이버튼을 눌러서 확인을 해봅니다.  
`Console`창과 `Scene`창을 동시에 확인해 보고, 오브젝트가 충돌할때 로그를 확인해 봅니다.  
<p align="center"><img src="/img/UnityBasic/PhysicsEvent/05.gif"><br/>
<04. Console 창 결과 값 확인></p>  
  
위에서 확인하셨듯이 `OnTrigger`이벤트 함수들은 `OnCollision`이벤트 함수와 마찬가지로 물체가 서로 충돌하는 순간이나 
충돌하는 중 또는 충돌 후 라는 이벤트를 감지하고 호출하는 기능을 가지고 있습니다.  
하지만 `OnTrigger`이벤트 함수는 `OnCollision`이벤트 함수와 달리 물리적인 충돌이 되지 않습니다.  
`Is Trigger`가 체크가 되어있어야 연산이 진행된다는 점도 차이점입니다.  
`OnTrigger`이벤트 함수들은 오브젝트들이 시각적으로 충돌되는 연출을 하지 않고 충돌판정만 가져오고 싶을 때 활용합니다.  
