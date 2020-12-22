---
layout: post
title:  "유니티에서 네트워크 설정하기 - MirrorNetwork"
date:   2020-12-21 14:00:07
categories: Unity3D Basics
description: "유니티에서 멀티플레이어 콘텐츠 만드는 방법"
image: '/img/UnityBasic/PhysicsEvent/05.gif'
published: true
canonical_url: http://whtls.com/unity3d/basics/2020/12/21/MirrorNetwork/
---

## 유니티에서 멀티플레이어 콘텐츠 구현해보기
유니티에서 `MirrorNetwork`를 활용하여 `네트워크`를 구성하는 방법을 알아봅니다.  
  
## 유니티3D 에디터에서  
#### 에셋 다운로드  
에셋스토어에서 `Mirror`를 검색하여 미러네트워크 에셋을 추가합니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/01.PNG"><br/>
<01. 에셋스토어에서 Mirror 에셋 다운로드></p>  
  
패키지 매니저에서 `Mirror`에셋을 다운로드 받고 임포트까지 완료합니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/02.PNG"><br/>
<02. Mirror 에셋 임포트></p>  

#### 네트워크 기본 구현 :: 서버 매니저  

계층구조창에서 `NetworkManager`라는 이름의 빈 게임 오브젝트를 생성합니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/03.PNG"><br/>
<03. NetworkManager 오브젝트 생성></p>  
  
`NetworkManager`오브젝트를 선택하고 인스펙터 창에서 `NetworkManager`, `NetworkManagerHUD` 컴포넌트를 추가합니다.  
`NetworkManager`컴포넌트를 추가하면 자동으로 `KcpTransport`컴포넌트도 추가가 됩니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/04.PNG"><br/>
<04. NetworkManager 컴포넌트 추가></p>  
  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/05.PNG"><br/>
<05. NetworkManagerHUD 컴포넌트 추가></p>  
  
`NetworkManager` 컴포넌트는 서버와 클라이언트 사이에 기본적인 연결을 구현해주는 컴포넌트 입니다. 네트워크 주소, 플레이어 생성 등 기본적이지만 중요한 기능을 합니다.  
`NetworkManagerHUD`는 사용자가 서버와 클라이언트에 접속하기 쉽도록 UI를 생성해주는 역할을 합니다. 추후 네트워크 테스트를 할 때 화면 좌측 상단에 생기는 UI를 생성합니다.  
  
#### 네트워크 기본 구현 :: 클라이언트 플레이어  
  
계층구조창에서 `Cube` 기본 오브젝트를 생성합니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/06.PNG"><br/>
<06. Cube 오브젝트 생성></p>  
  
`Cube`오브젝트를 선택하고 인스펙터 창에서 `NetworkIdentity`, `NetworkTransform` 컴포넌트를 추가합니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/07.PNG"><br/>
<07. NetworkIdentity 컴포넌트 추가></p>  
  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/10.PNG"><br/>
<08. NetworkTransform 컴포넌트 추가></p>  
  
추가한 `NetworkTransform`컴포넌트에서 `Client Authority`항목을 찾아 체크해줍니다. 해당 항목을 체크해야 서버와 클라이언트 모두에서 오브젝트의 움직임을 연동할 수 있습니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/11.PNG"><br/>
<09. Client Authority 체크></p>  
  
`Cube`오브젝트를 계층구조창에서 프로젝트 창으로 드래그 앤 드롭하여 프리펩으로 만듭니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/08.PNG"><br/>
<10. Cube의 프리펩화></p>  
  
프로젝트창에서 `Cube`프리펩을 드래그하여 `NetworkManager`오브젝트의 `NetworkManager`컴포넌트안에 `Player Prefab` 항목에 끌어다 놓습니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/09.PNG"><br/>
<11. player prefab 추가></p>  
  
## 테스트
빌드세팅에서 빌드 버튼을 눌러 PC버전으로 빌드합니다.  
EXE 파일을 실행시켜줍니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/12.PNG"><br/>
<12. PC 플랫폼 빌드></p>  
  
실행시킨 프로그램에서 좌측 상단 UI를 확인하고 `Host(Client + Server)`버튼을 누릅니다.  
해당 버튼을 누른 프로그램이 서버 호스트가 됩니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/14.PNG"> <img src="/img/UnityFundamental/MirrorNetwork/15.PNG"><br/>
<13. Host></p>  
  
유니티 에디터로 돌아와서 상단 플레이 버튼을 눌러 콘텐츠를 실행시킵니다.  
마찬가지로 게임창 좌측 상단에 UI를 확인하고 이번엔 `Client`버튼을 누릅니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/16.PNG"><br/> <img src="/img/UnityFundamental/MirrorNetwork/17.PNG"><br/>
<14. Client></p> 
  
계층구조창의 `Cube`오브젝트 중 두번째 `Cube`를 선택하고 이동시켜 봅니다.  
그러면 빌드된 호스트 화면에서 `Cube`오브젝트의 위치값이 연동되어 보여지는 것을 확인할 수 있습니다.  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/20.PNG"><br/>
<15. Client에서 위치 이동></p>  
  
<p align="center"><img src="/img/UnityFundamental/MirrorNetwork/21.PNG"><br/>
<16.Host에서 위치 연동></p>  
