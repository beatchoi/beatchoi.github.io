---
layout: post
title:  "ARFoundation IOS Build"
date:   2021-01-19 14:00:07
categories: Unity3D Basics
description: "ARFoundation을 모바일 IOS 플랫폼으로 빌드하기"
image: '/img/UnityVR/OculusQuest/01XRToolkit/ARFoundation.jpg'
published: true
canonical_url: http://whtls.com/unity3d/basics/2021/02/02/ARFoundationIosBuild/
---

## ARFoundation을 IOS 모바일 플랫폼으로 빌드합니다.  
앞선 강좌를 통해 프로젝트를 생성하고 ARFoundation 패키지를 불러옵니다.  
ARFoundation 콘텐츠를 IOS 환경으로 빌드하는 방법을 알아봅니다.  
  
## 유니티3D 에디터에서  
  
#### 플랫폼 세팅
프로젝트를 생성하고 `Build Settings`창에서 플랫폼을 `IOS`로 변경합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/build/01.png"> <br/>
<01. 개발 플렛폼 변경></p>
  
#### 플레이어 세팅 :: Player Settings
`Build Settings`창에서 좌측 하단 `Player Settings`버튼을 눌러 플레이어 세팅 창을 띄웁니다.  

`Other Settings`항목에 `Bundle Identifier`항목을 찾습니다.  
해당 항목에 `com.소속.콘텐츠이름` 형식으로 작성합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/build/02.png"> <br/>
<02. 플레이어세팅 창 - Bundle Identifier></p>

`Other Settings`항목에 `Target minimum iOS Version`항목을 11로 변경합니다.  
아래에 있는 `Requires ARKit Support`항목을 찾습니다.  
해당 항목에 체크해줍니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/build/03.png"> <br/>
<03. 플레이어세팅 창 - Requires ARKit Support></p>

`Architecture`항목을 ARM64로 변경합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/build/04.png"> <br/>
<05. 플레이어세팅 창 - Architecture></p>
  
## 빌드 해보기
`Build Settings`창 우착 하단 `Build`버튼을 눌러 빌드를 진행합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/build/06.png"> <br/>
<06. 빌드세팅 창 - 프로젝트 빌드></p>
  
생성된 빌드폴더를 열어보면 `Unity-iPhone.xcodeproj`파일이 있습니다.  
해당 파일을 더블클릭하여 열어줍니다. 해당 파일을 열기 위해서는 먼저 `XCode` 앱이 설치되어있어야 합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/build/07.png"> <br/>
<07. Unity-iPhone.xcodeproj></p>

XCode 프로젝트가 실행되면 좌측 탭에서 `Unity-iPhone` 항목을 선택합니다.  
중앙 화면에 여러 메뉴 항목들 중 `Signing & Capabilities` 항목을 클릭하고 Provisional Profile을 선택합니다.  
(미리 Provisional Profile을 생성해 놓아야 합니다)   
<p align="center"><img src="/img/UnityAR/ARFoundation/build/08.png"> <br/>
<08. XCode Project Build></p>
  
맥PC에 iOS 디바이스를 연결하고 상단 플레이버튼을 눌러 빌드를 진행합니다.  
붉은색 느낌표가 뜨지않고 완료된다면 빌드가 성공적으로 진행된 것이니 모바일 디바이스를 확인합니다.   
<p align="center"><img src="/img/UnityAR/ARFoundation/build/09.png"> <br/>
<09. 빌드></p>
  
## 마무리
ARFoundation 세팅을 한 프로젝트를 iOS 플랫폼으로 빌드를 하기 위한 과정을 알아보았습니다.  
이미 유니티에서 iOS 빌드를 진행한 경험이 있다면 크게 어려운 부분은 없습니다만  
ARFoundation 및 ARKit를 적용시키기 위해서 `Player Settings`창에서 몇가지 항목들을 체크해야합니다.  
해당 부분들을 놓치게 된다면 빌드를 진행했을 때 카메라가 공간을 인지하지 못하게 됩니다.  
