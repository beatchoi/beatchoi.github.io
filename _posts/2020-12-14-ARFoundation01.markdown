---
layout: post
title:  "ARFoundation - Settings"
date:   2020-12-14 14:00:07
categories: Unity3D Basics
description: "ARFoundation - 프로젝트 설정하기"
image: 'img/UnityVR/OculusQuest/01XRToolkit/OculusQuest.png'
published: true
canonical_url: https://www.csrhymes.com/development/2018/05/28/why-use-a-static-site-generator.html
---

## ARFoundation을 활용한 증강현실 프로젝트 설정하기  
ARFoundation을 활용하여 증강현실 콘텐츠를 만들 수 있는 준비를 해봅니다.
  
## 유니티3D 에디터에서  
  
#### 플랫폼 세팅
프로젝트를 생성하고 `Build Settings`창에서 플랫폼을 `Android`로 변경합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/01.PNG"> <img src="/img/UnityVR/OculusQuest/01XRToolkit/02.PNG"><br/>
<01. 개발 플렛폼 변경></p>
  
`Player Settings` -> `Other Settings`항목에서 `Identification`항목의 `Target API Level`을 `Android 7.0 (API Level 7.0)`으로 변경합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01/02.PNG"><br/>
<02. Android API Level 변경></p>
  
`Other Settings`항목에서 `Graphic API`순서를 아래와 같이 변경합니다. `OpenGLES3`이 `Vulcan`의 상단으로 갈 수 있도록 합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01/01.PNG"><br/>
<03. Android API Level 변경></p>
  
#### 패키지 설치 :: Package Manager
상단 메뉴에서 `Window`탭의 `Package Manager`를 선택합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/08.PNG"><br/>
<04. 패키지 매니저 - 01></p>
  
패키지 매니저 창에서 `Packages`항목을 아래와 같이 `Unity Registry`로 변경합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/09.PNG"><br/>
<05. 패키지 매니저 - 02></p>
  
패키지 매니저 창에서 우측 세팅 버튼을 선택하고 `Advanced Project Settings`버튼을 클릭합니다. 
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/10.PNG"><br/>
<06. 패키지 매니저 - 03></p>
  
`Advanced Project Settings`항목에서 `Enable Preiview Packages`항목을 체크하고 진행합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/11.PNG"><br/>
<07. 프리뷰 패키지 설정></p>

`Package Manager`창으로 돌아와서 `ARFoundation`패키지를 설치합니다. 우측 하단 Install 버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01/03.PNG"><br/>
<08. ARFoundation 패키지 설치></p>
  
`Package Manager`창으로 돌아와서 `ARCore XR Plugin`패키지를 설치합니다. 우측 하단 Install 버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01/04.PNG"><br/>
<09. ARCore XR Plugin 패키지 설치></p>
  
`Package Manager`창으로 돌아와서 `ARKit XR Plugin`패키지를 설치합니다. 우측 하단 Install 버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01/05.PNG"><br/>
<10. ARKit XR Plugin 패키지 설치></p>
  
#### 계층구조창에서
계층구조창에서 마우스 오른쪽 클릭 `XR`항목에서 `AR Session Origin`버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01/06.PNG"><br/>
<11. AR Session Origin 오브젝트 생성></p>
  
계층구조창에서 마우스 오른쪽 클릭 `XR`항목에서 `AR Session`버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01/07.PNG"><br/>
<12. AR Session 오브젝트 생성></p>
  
계층구조창에서 `Main Camera`오브젝트를 제거합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01/08.PNG"><br/>
<13. Main Camera 오브젝트 제거></p>

## 테스트 해보기
빌드세팅 창에서 APK파일로 빌드하고 디바이스에 설치합니다.  
큐브가 본래 자리에 생성되어 고정되어 있는지 확인합니다.  
