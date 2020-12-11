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
