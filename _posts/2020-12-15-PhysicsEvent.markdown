---
layout: post
title:  "유니티에서의 물리엔진 이벤트 함수 - Event Functions"
date:   2020-12-15 14:00:07
categories: Unity3D Basics
description: "유니티 물리 이벤트 함수"
image: '/img/UnityBasic/PhysicsBasic/12.gif'
published: true
canonical_url: https://www.csrhymes.com/development/2018/05/28/why-use-a-static-site-generator.html
---

## 유니티에서의 물리엔진의 이벤트 함수 알아보기
유니티에서 `물리엔진`을 구동하는 이벤트 함수를 알아봅니다.  
  
## 유니티3D 에디터에서  
#### Collision Event Function
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

    private void OnCollisionEnter(Collision collision)
    {
        Debug.Log("Collision Started");
    }

    private void OnCollisionStay(Collision collision)
    {
        Debug.Log("In Collision");
    }

    private void OnCollisionExit(Collision collision)
    {
        Debug.Log("Collision Over");   
    }
}
```
  
* 각 `OncollisionEnter`, `OnCollisionStay`, `OnCollisionExit`함수들은 해당 스크립트가 인스턴스화 된 오브젝트의 충돌연산을 위한 이벤트 함수입니다.   
* `OnCollisionEnter` 함수는 오브젝트가 충돌을 시작했을 때 한번 호출됩니다.  
* `OnCollisionStay` 함수는 오브젝트가 충돌이 되고 있을 때 호출됩니다.  
* `OnCollisionExit` 함수는 오브젝트가 충돌이 끝났을 때 한번 호출됩니다.  
* 각 함수가 호출될 때 로그를 찍어서 확인해 봅니다.  

에디터로 돌아와서 `Physics`스크립트를 `Sphere`오브젝트에 인스턴스화를 시킵니다.  
<p align="center"><img src="/img/UnityBasic/PhysicsEvent/02.PNG"><br/>
<02. Physics 스크립트 인스턴스화></p>  
  
## 테스트
에디터 상단 플레이버튼을 눌러서 확인을 해봅니다.  
`Console`창과 `Scene`창을 동시에 확인해 보고, 오브젝트가 충돌할때 로그를 확인해 봅니다.  
<p align="center"><img src="/img/UnityBasic/PhysicsEvent/03.gif"><br/>
<03. Console 창 결과 값 확인></p>  
  
위에서 확인하셨듯이 `OnCollision`이벤트 함수들은 물체가 서로 충돌하는 순간이나 충돌하는 중 또는 충돌 후 라는 이벤트를 감지하고 호출하는 기능을 가지고 있습니다.
