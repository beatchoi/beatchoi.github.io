---
layout: post
title:  "유니티에서 네트워크 설정하기 - MirrorNetwork를 활용하여 캐릭터 이동 구현하기"
date:   2021-07-15 14:00:07
categories: Unity3D Basics
description: "MirrorNetwork를 활용하여 캐릭터 이동 구현하기"
image: '/img/UnityFundamental/MirrorNetwork/01.PNG'
published: true
canonical_url: http://whtls.com/unity3d/basics/2020/12/21/MirrorNetwork/
---

## MirrorNetwork를 활용한 캐릭터 구현
유니티에서 `MirrorNetwork`를 활용하여 플레이어의 `캐릭터`를 구현하고 주의해야할 점을 알아봅니다.   
  
## 유니티3D 에디터에서  
#### 에셋 다운로드  
패키지 매니저에서 `Mirror`에셋을 다운로드 받고 임포트까지 완료합니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork2/1.PNG"><br/>
<01. Mirror 에셋 임포트></p>  

#### 네트워크 기본 구현 :: 서버 매니저 및 클라이언트 플레이어  
  
이전 포스트에서 알려드린 기본 세팅을 진행합니다.  
계층구조창에 `NetworkManager`라는 빈 게임 오브젝트를 생성하고 인스펙터 창에서 `NetworkManager`, `NetworkManagerHUD` 컴포넌트를 추가합니다.  
  
계층구조창에서 `Capsule` 기본 오브젝트를 생성합니다.  
생성한 `Capsule`오브젝트에 `NetworkIdentity` 및 `NetworkTransform`컴포넌트를 추가합니다.  
`Rigidbody`와 `Character Controller` 컴포넌트까지 추가합니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork2/2.PNG"><br/>  
<02. Capsule 캐릭터 오브젝트 생성></p>  
  
추가한 `NetworkTransform`컴포넌트에서 `Client Authority`항목과 `Compress Rotation`항목을 찾아 체크해줍니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork2/6.PNG"><br/>  
<03. Client Authority 및 Comppress Rotation 체크></p>  
  
추가한 `Rigidbody`컴포넌트에서 `Constraints`항목의 `Freeze Rotation`항목 모두 체크합니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork2/4.PNG"><br/>  
<04. Freeze Rotation 체크></p>  
  
`Capsule`오브젝트를 계층구조창에서 프로젝트 창으로 드래그 앤 드롭하여 프리펩으로 만듭니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork2/5.PNG"><br/>
<05. 캐릭터 오브젝트의 프리펩화></p>  
  
프로젝트창에서 `Capsule`프리펩을 드래그하여 `NetworkManager`오브젝트의 `NetworkManager`컴포넌트안에 `Player Prefab` 항목에 끌어다 놓습니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork2/7.PNG"><br/>
<06. player prefab 추가></p>  
  
#### 캐릭터 스크립트 작성 :: PlayerController  
  
`PlayerController.cs`라는 스크립트를 생성하고 다음과 같이 작성합니다.  
 (일전의 캐릭터 이동 스크립트와 비슷합니다.)

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Mirror;

    public class PlayerController : NetworkBehaviour
    {
        CharacterController CharacterController;

        public float moveSpeed = 8f;
        public float maxTurnSpeed = 150f;

        public float horizontal;
        public float vertical;

    void Start()
    {
        CharacterController = GetComponent<CharacterController>();
    }
        // Update is called once per frame
    void Update()
    {
        if (!isLocalPlayer) return;//to controll local character

        horizontal = Input.GetAxis("Horizontal");
        vertical = Input.GetAxis("Vertical");
    }

    private void FixedUpdate()
    {
        if (!isLocalPlayer) return;//to controll local character

        Vector3 direction = new Vector3(horizontal, 0, vertical);
        direction *= moveSpeed;
        CharacterController.SimpleMove(direction);
    }
}
```
  
이전 `Character Controller`스크립트와 달라진점이 있다면  
* 4번째줄 : `Using Mirror` 네임스페이스를 추가  
* 6번째줄 : Monobehavior클래스가 아닌 `NetworkBehavior`클래스를 상속받습니다.  
* 23 및 31번째 줄 : `if (!isLocalPlayer) return;` 코드를 활용하여 네트워크 상에서 상대방과 나의 싱크를 맞춥니다.  
  가장 중요한 부분중 하나인데 자기 자신의 로컬 캐릭터를 조종할 수 있습니다. 해당 스크립트가 없으면 앞뒤좌우 키를 눌렀을때  
  나의 캐릭터 뿐만 아니라 상대방의 캐릭터까지 조종하게 됩니다. 이동로직 스크립트는 다른 플레이어의 캐릭터에도 구현되어있기 때문입니다.  
  
해당 스크립트를 `Capsule`오브젝트에 인스턴스화 시킵니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork2/8.PNG"><br/>
<07. 스크립트 인스턴스화></p> 
  
  
## 테스트
빌드세팅에서 빌드 버튼을 눌러 PC버전으로 빌드합니다.  
EXE 파일을 실행시켜줍니다.  
  
먼저 유니티 에디터로 돌아와서 상단 플레이 버튼을 눌러 콘텐츠를 실행시킵니다.  
게임창 좌측 상단에 UI를 확인하고 `Host(Client + Server)`버튼을 누릅니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/16.PNG"><br/> <img src="/img/UnityFundamental/MirrorNetwork/17.PNG"><br/>
<14. Host></p>  
  
이번엔 실행시킨 프로그램에서 좌측 상단 UI를 확인하고 `Client`버튼을 누릅니다.  
서버에 클라이언트로 접속합니다.    
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/14.PNG"> <img src="/img/UnityFundamental/MirrorNetwork/15.PNG"><br/>
<13. Client></p>  
  
클라이언트 창에서 키보드 W,A,S,D를 눌러 캐릭터가 이동하는지 확인해봅니다.  
내가 이동할때 상대방의 캐릭터는 가만히 있는지 확인합니다.  
동시에 이동하면 안됩니다.  
호스트 창에서 클라이언트 캐릭터가 이동을 했는지 확인합니다.  
호스트 창에서 클라이언트가 이동한 싱크가 맞느면 성공입니다.  
