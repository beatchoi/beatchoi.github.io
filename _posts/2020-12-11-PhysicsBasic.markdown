---
layout: post
title:  "유니티에서의 물리엔진 - Physics in Unity"
date:   2020-12-11 14:00:07
categories: Unity3D Basics
description: "유니티 물리 기초"
image: '/img/UnityBasic/PhysicsBasic/07.PNG'
published: true
canonical_url: https://www.csrhymes.com/development/2018/05/28/why-use-a-static-site-generator.html
---

## 유니티에서의 물리엔진 알아보기
유니티에서 `물리엔진`를 알아봅니다.  
기본적인 물리현상을 일으키게 할 수 있는 조건및 컴포넌트들을 알아봅니다.  
  
## 유니티3D 에디터에서  

계층구조창에서 `Sphere`오브젝트를 생성합니다.
<p align="center"><img src="/img/UnityBasic/PhysicsBasic/01.PNG"><br/>
<01. Sphere 오브젝트 생성></p>  
  
Sphere 오브젝트의 인스펙처 창에서 `Rigidbody`컴포넌트를 생성합니다.
<p align="center"><img src="/img/UnityBasic/PhysicsBasic/02.PNG"><br/>
<02. Rigidbody 컴포넌트 추가></p>  
  
계층구조창에서 `Plane`오브젝트를 생성합니다.
<p align="center"><img src="/img/UnityBasic/PhysicsBasic/03.PNG"><br/>
<03. Plane 오브젝트 생성></p>  
  
Plane 오브젝트의 위치와 크기를 다음과 같이 변경합니다.  
값이 정확할 필요는 없고 Plane 오브젝트 상단에 Sphere 오브젝트가 위치할 수 있으면 됩니다.
<p align="center"><img src="/img/UnityBasic/PhysicsBasic/06.PNG"><br/>
<04. Plane 오브젝트 위치 및 크기 변경></p>  
  
유니티 에디터 상단에 `Play`버튼을 눌러 `Sphere`의 움직임을 살펴봅니다.
<p align="center"><img src="/img/UnityBasic/PhysicsBasic/07.PNG"><br/>
<05. 플레이 버튼 클릭></p>  
  
  
## 물리 엔진 활용을 위한 컴포넌트  
  
#### Rigidbody :: 강체  
위 테스트 샘플에서 우리는 Sphere가 아래로 떨어지고 Plane을 따라 굴러 떨어지는 것을 확인할 수 있었습니다.  
여기에서 우리가 조금 더 깊이 확인해야 하는 사실들은  
  * Sphere 오브젝트는 떨어지고 Plane 오브젝트는 떨어지지 않았다.  
  * Sphere 오브젝트는 Plane 오브젝트에 부딪쳤다.  
정도가 되겠습니다. 그럼 첫번째 사실을 확인해 봐야겠습니다.  
  
Sphere 오브젝트를 선택하고 우측 인스펙터 창을 확인해봅니다.  
위 샘플 초입에 Sphere 오브젝트에 `Rigidbody` 컴포넌트를 추가한 것을 기억하실 것입니다.  
`Rigidbody`컴포넌트는 우리말로 `강체`라고 부르며 해당 컴포넌트가 오브젝트에 연결되어 있으면  
   * 오브젝트의 동작이 물리 엔진으로 제어가 가능해집니다. 
조금 더 쉽게 풀면 해당 오브젝트에 힘을 가할수가 있게 됩니다.  
그렇기 때문에 `중력`이라는 힘에 의해 Sphere오브젝트가 아래로 떨어지게 된것이죠.  
  
`Rigidbody`컴포넌트를 확인해 봅니다.  
<p align="center"><img src="/img/UnityBasic/PhysicsBasic/08.PNG"><br/>
<0. Rigidbody 컴포넌트></p>
  
`Use Gravity` 항목을 체크 해제하고 다시한번 재생해 봅니다.  
아마 구체가 낙하하지 않을 것입니다.  
`Use Gravity` 항목은 해당 오브젝트가 중력의 힘을 받는가 여부를 정할 수 있습니다.  
이렇게 해당 컴포넌트안의 값을 조절함으로서 해당 오브젝트에 어떠한 형태의 힘이 가해질 수 있는지 제어할 수 있습니다.  
  
이번엔 `Drag`항목의 값을 3으로 바꿔봅니다.  
구체가 낙하하는 속도 및 굴러가는 속도가 느려질 것입니다.  
`Drag`항목은 마찰력, 공기저항 등 해당 오브젝트에 가해지는 저항값을 지정할 수 있습니다.  
  
이 외 기타 항목들에 대한 자세한 내용들은 하단 링크를 통해 알 수 있습니다.  
https://docs.unity3d.com/kr/2018.4/Manual/class-Rigidbody.html  
  
`Rigidbody`의 여부에 따라 오브젝트에 힘이 가해지거나 그렇지 않거나 인 것을 알 수 있습니다.  
  
#### Collider :: 충돌체
하지만 Sphere와 Plane이 부딪치는 것은 다른 이야기입니다.  
두 오브젝트 간에 부딪치는 행위는 전문 용어로 `충돌`, `Collision`이라고 부릅니다.  
이 충돌 이벤트를 일으키기 위해서는 `Collider`컴포넌트, 즉 `충돌체` 컴포넌트가 필요합니다.  
  
Sphere 오브젝트와 Plane 오브젝트를 확인해 보도록 하겠습니다.  
  
각 Sphere 오브젝트와 Plane 오브젝트 우측 인스펙터창을 확인해보면 
  * `Sphere Collider` 컴포넌트와 `Mesh Collider`컴포넌트가 추가되어 있는 것을 확인할 수 있습니다.  
물론 해당 컴포넌트들은 기본 오브젝트가 생성될때 부착이 되어 생성됩니다만,  
유저가 따로 추가할 수도 있습니다.  
  
충돌체는 오브젝트의 실제 물리 충돌 연산을 위해 존재합니다.  
충돌체 컴포넌트가 있어야 위 샘플처럼 오브젝트들 끼리 부딪치고 튕겨져 나가는 등의 물리 연산을 할 수 있습니다.  
  
## 정리
유니티 내에서 물리 연산의 기본인 충돌을 구현하기 위해서는 기본적으로  
  * `Rigidbody` :: `강체`
  * `Collider` :: `충돌체`
  가 있어야 하며 각각
  * 오브젝트에 물리적 힘의 영향을 받을 수 있도록
  * 오브젝트에 충돌 연산을 할 수 있도록
  도와줍니다.
  
