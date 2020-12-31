---
layout: post
title:  "유니티에서의 이동 - Translate, Movetowards"
date:   2020-12-15 14:00:07
categories: Unity3D Basics
description: "유니티 기본 이동 함수"
image: '/img/UnityBasic/PhysicsEvent/05.gif'
published: true
canonical_url: http://whtls.com/unity3d/basics/2020/12/31/BasicMovement/
---

## 유니티에서의 객체 이동 :: Translate
유니티에서 기본적인 객체의 이동을 구현하기 위한 Translate 함수를 알아봅니다.    
  
## 유니티3D 에디터에서  
#### Translate 함수
프로젝트창에서 `Move`스크립트를 생성합니다.
<p align="center"><img src="/img/UnityBasic/Move/01.PNG"><br/>
<01. Move 스크립트 생성></p>  
  
`Move` 스크립트를 열어서 다음과 같이 작성합니다. 
스크립트에 생성되어 있는 `Start`함수는 제거합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Move : MonoBehaviour
{
    public float speed;

    // Update is called once per frame
    void Update()
    {
        transform.Translate(Vector3.forward*speed);
    }
}
```
  
* `Translate` 함수는 `transform`클래스에서 불러옵니다. 즉 물체의 위치값을 기반으로 작동한다는 의미입니다.  
* `Translate` 함수의 인자에 값을 넣는 방법은 여러가지가 있지만 기본적으로 `Vector3`값이 들어가야 합니다.  
* `Vector3.forward`값을 넣어서 물체의 z의 양의 방향으로 이동하도록 합니다.  

#### 오브젝트 설정  
  
에디터로 돌아와서 `Move`스크립트를 `Sphere`오브젝트에 인스턴스화를 시킵니다.  
스크립트에서 선언한 `Speed`항목을 `0.1`로 설정합니다.  
<p align="center"><img src="/img/UnityBasic/Move/03.PNG"><br/>
<02. Move 스크립트 인스턴스화></p>  
  
## 테스트
에디터 상단 플레이버튼을 눌러서 확인을 해봅니다.  
Sphere 오브젝트가 이동하는 것을 확인합니다.  
<p align="center"><img src="/img/UnityBasic/Move/04.gif"><br/>
<03. Sphere 이동 확인></p>  
  
위에서 확인하셨듯이 `Translate`함수를 활용하면 오브젝트를 원하는 `방향`으로 이동시킬 수 있습니다.  
  
## 유니티에서의 객체 이동 :: Movetowards
유니티에서 기본적인 객체의 이동을 구현하기 위한 Movetowards 함수를 알아봅니다.    
  
  
## 유니티3D 에디터에서  
#### Movetowards 함수
  
`Move` 스크립트를 열어서 다음과 같이 수정합니다. 
기존의 `Translate` 함수는 주석처리 하겠습니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Move : MonoBehaviour
{
    public float speed;

    // Update is called once per frame
    void Update()
    {
        //transform.Translate(Vector3.forward*speed);
        transform.position = Vector3.MoveTowards(transform.position, new Vector3(0, 10.85f, 0), Time.deltaTime * speed);
    }
}

```
  
* `MoveTowards`함수는 Vector3에 속해있는 정적함수입니다.  
* `MoveTowards`함수의 인자들은 각각 현재위치, 목표위치, 거리차(maxDistanceDelta) 입니다.  
* 다시 말하면 `현재위치`에서 `목표위치`가지 `maxDistanceDelta`의 거리 만큼 이동한 위치값을 나타냅니다.  

#### 오브젝트 설정  
  
에디터로 돌아와서 `Move`스크립트를 `Sphere`오브젝트에 인스턴스화를 시킵니다.  
스크립트에서 선언한 `Speed`항목을 `10`로 설정합니다.  
<p align="center"><img src="/img/UnityBasic/Move/02.PNG"><br/>
<02. Move 스크립트 인스턴스화></p>  
  
## 테스트
에디터 상단 플레이버튼을 눌러서 확인을 해봅니다.  
Sphere 오브젝트가 이동하는 것을 확인합니다.  
<p align="center"><img src="/img/UnityBasic/Move/05.gif"><br/>
<03. Sphere 이동 확인></p>  
  
위에서 확인하셨듯이 `MoveTowards`메소드를 활용하면 오브젝트를 원하는 `위치`로 이동시킬 수 있습니다.  

## 비교
  
기본적으로 객체의 위치값을 이용하여 이동시키는 함수들 두가지를 알아보았습니다.  
`Translate`은 `방향`이라는 인자값을 받아서 그 방향대로 계속 이동시키는 역할을 합니다. 1인칭 캐릭터의 이동이나 총알 발사 같은 예를 생각하면 되겠네요.  
`MoveTowards`는 자신의 `현재위치`에서 `목표점`을 향하여 이동하는 역할을 합니다. 3인칭 탑 뷰 캐릭터의 마우스 클릭 이동이나 유도탄 등을 생각하면 편하겠습니다.  
물론 위 두가지 이동만을 활용하여 모든 콘텐츠의 이동을 구현하기는 어렵습니다. 물리적 충돌은 고려되지 않고 단순한 위치값을 이용한 이동이기 때문입니다.  
하지만 활용하기 쉬운만큼 간단한 객체의 이동을 구현하는데 활용하기에는 안성맞춤입니다.  
