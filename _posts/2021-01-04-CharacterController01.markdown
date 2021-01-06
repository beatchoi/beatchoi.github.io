---
layout: post
title:  "캐릭터의 이동 - Character Controller"
date:   2021-01-04 14:00:07
categories: Unity3D Basics
description: "Character Controller 컴포넌트의 활용"
image: '/img/UnityBasic/CharacterController/06.gif'
published: true
canonical_url: http://whtls.com/unity3d/basics/2021/01/04/CharacterController/
---

## 캐릭터 컨트롤러의 활용 :: Character Controller
Character Controller라는 컴포넌트를 활용하여 오브젝트를 이동시키는 방법을 알아봅니다.  
대체로 게임에서 캐릭터가 이동할때 필요한 기능을 구현해봅니다.  
  
## 유니티3D 에디터에서  
#### 스크립트 생성  
프로젝트창에서 `characterCtrl`스크립트를 생성합니다.
<p align="center"><img src="/img/UnityBasic/CharacterController/01.PNG"><br/>
<01. characterCtrl 스크립트 생성></p>  
  
`characterCtrl` 스크립트를 열어서 다음과 같이 작성합니다. 

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class characterCtrl : MonoBehaviour
{

    CharacterController CCtrl;
    // Start is called before the first frame update
    void Start()
    {
        CCtrl = GetComponent<CharacterController>();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey(KeyCode.LeftArrow))
            CCtrl.Move(Vector3.left * Time.deltaTime);

        if (Input.GetKey(KeyCode.RightArrow))
            CCtrl.Move(Vector3.right * Time.deltaTime);

        if (Input.GetKey(KeyCode.DownArrow))
            CCtrl.Move(Vector3.back * Time.deltaTime);

        if (Input.GetKey(KeyCode.UpArrow))
            CCtrl.Move(Vector3.forward * Time.deltaTime);
    }
}

```
  
* `CharacterController`형태로 `CCtrl` 변수를 선언합니다.  
* `Start`함수에 `CharacterController`라는 컴포넌트를 `CCtrl`변수에 담습니다. `CCtrl`변수를 이용하여 관련된 함수를 활용합니다.  
* `Update`함수에 키 입력에 따른 이동 로직을 구현합니다.  
* 이전 강의를 활용하여 화살표 입력을 받으면 해당하는 방향대로 이동할 수 있도록 합니다.  
* 이동tl `CCtrl.Move(방향 * 이동속도)`형식이라고 생각하면 편합니다.  
* `CharacterController`에서 제공하는 함수인 `Move`함수 를 활용합니다.  

#### 오브젝트 설정  
  
에디터로 돌아와서 이동시키고자 하는 오브젝트에 `characterCtrl`스크립트를 인스턴스화를 시킵니다.  
<p align="center"><img src="/img/UnityBasic/CharacterController/02.PNG"><br/>
<02. `characterCtrl` 스크립트 인스턴스화></p>  

해당 오브젝트에 `CharacterController` 컴포넌트를 추가합니다.  
<p align="center"><img src="/img/UnityBasic/CharacterController/03.PNG"><br/>
<03. `CharacterController` 컴포넌트 추가></p>  
  
그리고 캐릭터가 이동하는 바닥 오브젝트에 충돌체를 달아줍니다.  
이번 예제같은 경우에는 `Mesh Collider`를 추가해 주도록 하겠습니다.  
<p align="center"><img src="/img/UnityBasic/CharacterController/04.PNG"><br/>
<p align="center"><img src="/img/UnityBasic/CharacterController/05.PNG"><br/>
<04. 바닥에 충돌체 추가></p>  
  
캐릭터 컨트롤러의 경우에는 강체(Rigidbody)를 활용하지 않고 충돌에 의한 이동을 구현하기 때문에  
캐릭터 오브젝트와 충돌해야 하는 오브젝트에는 충돌체를 추가하도록 합니다.  
  
## 테스트
에디터 상단 플레이버튼을 눌러서 확인을 해봅니다.  
`Game`창에서 키보드의 앞 뒤 좌 우 화살표 키를 눌러 캐릭터가 이동을 하는지 확인합니다.  
<p align="center"><img src="/img/UnityBasic/CharacterController/06.gif"><br/>
<05. 캐릭터 오브젝트의 이동 확인></p>  

위와 같이 `CharacterController`를 활용하여 쉽게 캐릭터의 이동을 구현해 보았습니다.  
`CharacterController`를 활용하면 복잡한 메소드나 함수를 사용하지 않고도 게임에서 이용할 수 있는 캐릭터의 움직임을 구현할 수 있습니다.  
다음에는 점프, 계단 오르기 등을 구현해 보도록 합니다.  

