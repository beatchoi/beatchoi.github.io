---
layout: post
title:  "Oculus Quest2 - XR Toolkit"
date:   2020-12-11 14:00:07
categories: Unity3D Basics
description: "오큘러스 퀘스트2 - XR Toolkit 적용하기"
image: 'img src="/img/UnityVR/OculusQuest/01XRToolkit/OculusQuest.png'
published: true
canonical_url: https://www.csrhymes.com/development/2018/05/28/why-use-a-static-site-generator.html
---

## 오큘러스 퀘스트2 개발을 위한 XR Toolkit 시작하기
오큘러스 퀘스트2 기기를 활용하여 VR 콘텐츠를 개발합니다.  
XR Toolkit을 활용하여 가상현실 콘텐츠 개발환경 세팅을 해봅니다.
  
## 유니티3D 에디터에서  
  
#### 플랫폼 세팅
프로젝트를 생성하고 `Build Settings`창에서 플랫폼을 `Android`로 변경합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/01.PNG"> <img src="/img/UnityVR/OculusQuest/01XRToolkit/02.PNG"><br/>
<01. 개발 플렛폼 변경></p>
  
`Player Settings` -> `Other Settings`항목에서 `Identification`항목의 `Target API Level`을 `Android 6.0 (API Level 6.0)`으로 변경합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/04.PNG"><br/>
<02. Android API Level 변경></p>

#### 프로젝트 세팅
`Project Settings`창에서 `XR Plugin Management` 항목을 선택하고 우측 `Install XR Plugin Management`버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/05.PNG"><br/>
<03. XR Plugin Management 설치></p>
  
`XR Plugin Management`항목에서 좌측 PC Settings 항목 및 우측 Android 항목 모두에 있는 `Oculus`항목에 모두 체크합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/03.PNG"><br/>
<04. XR Plugin Management 설치></p>
  <p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/06.PNG"><br/>
<05. XR Plugin Management 설치></p>

#### 패키지 설치 :: Package Manager
상단 메뉴에서 `Window`탭의 `Package Manager`를 선택합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/08.PNG"><br/>
<06. 패키지 매니저 - 01></p>
  
패키지 매니저 창에서 `Packages`항목을 아래와 같이 `Unity Registry`로 변경합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/09.PNG"><br/>
<07. 패키지 매니저 - 02></p>
  
패키지 매니저 창에서 우측 세팅 버튼을 선택하고 `Advanced Project Settings`버튼을 클릭합니다. 
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/10.PNG"><br/>
<08. 패키지 매니저 - 03></p>
  
`Advanced Project Settings`항목에서 `Enable Preiview Packages`항목을 체크하고 진행합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/11.PNG"><br/>
<09. 프리뷰 패키지 설정></p>

`Package Manager`창으로 돌아와서 `XR Interaction Toolkit`패키지를 설치합니다. 우측 하단 Install 버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/13.PNG"><br/>
<09. XR Interaction Toolkit></p>
  
다음과 같은 `Warning`창에서 Yes 버튼을 눌러 진행합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/14.PNG"><br/>
<10. Warning></p>

#### 계층구조창에서
계층구조창에서 마우스 오른쪽 클릭 `XR`항목에서 `Device-Based` -> `Room-Scale XR Rig`버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/15.PNG"><br/>
<11. 프리뷰 패키지 설정></p>
  
## 테스트 해보기
Oculus Quest 기기와 PC를 연결합니다. 
PC의 오큘러스 어플리케이션을 실행하여 `설정` -> `일반`탭에서 `알 수 없는 출처`항목을 활성화 시킵니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/16.PNG"><br/>
<12. 알 수 없는 항목 활성화></p>
  
유니티 에디터 상단의 플레이 버튼을 누르면 오큘러스 기기에 빌드하지 않고 테스트를 할 수 있습니다.
