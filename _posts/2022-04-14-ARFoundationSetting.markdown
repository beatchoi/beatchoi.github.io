---
layout: post
title:  "ARFoundation - Settings<2022-04-14>"
date:   2022-04-14 12:00:07
categories: Unity3D Basics
description: "ARFoundation - 프로젝트 설정하기"
image: '/img/UnityVR/OculusQuest/01XRToolkit/ARFoundation.jpg'
published: true
canonical_url: http://whtls.com/unity3d/basics/2022/04/14/ARFoundationSetting/
---
## Unity3D 2021.3 및 안드로이드 버전 12 가능 <2022-04-14>

## ARFoundation을 활용한 증강현실 프로젝트 설정하기  
ARFoundation을 활용하여 증강현실 콘텐츠를 만들 수 있는 준비를 해봅니다.
  
## 유니티3D 에디터에서  
  
#### 패키지 설치 :: Package Manager
상단 메뉴에서 `Window`탭의 `Package Manager`를 선택합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01New/1.PNG"><br/>
<01. 패키지 매니저 - 01></p>
  
패키지 매니저 창에서 `Packages`항목을 아래와 같이 `Unity Registry`로 변경합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01New/11.PNG"><br/>
<02. 패키지 매니저 - 02></p>
  
`Package Manager`창에서 `ARFoundation`패키지를 설치합니다. 우측 하단 Install 버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01New/12.PNG"><br/>
<03. ARFoundation 패키지 설치></p>
  
`Package Manager`창에서 `ARCore XR Plugin`패키지를 설치합니다. 우측 하단 Install 버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01New/13.PNG"><br/>
<04. ARCore XR Plugin 패키지 설치></p>
  
#### 플랫폼 세팅
프로젝트를 생성하고 `Build Settings`창에서 플랫폼을 `Android`로 변경합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01New/03.PNG"><br/>
<05. 개발 플렛폼 변경></p>
  
`Player Settings` -> `Other Settings`항목에서 `Rendering`항목을 찾습니다. 
`Auto Graphics API`항목을 체크 해제합니다.  
`OpenGLES3`이 `Vulcan`의 상단으로 갈 수 있도록 마우스로 클릭, 드래그하여 끌어줍니다.    
<p align="center"><img src="/img/UnityAR/ARFoundation/01New/10.PNG"><br/>
<06. Graphic API Level 변경></p>  
  
`Player Settings` -> `Other Settings`항목에서 `Identification`항목의 `Minimum API Level`을 `Android 10.0 (API Level 29)`으로 변경합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01New/4.PNG"><br/>
<07. Android API Level 변경></p>
  
본인의 안드로이드 디바이스의 버전이 10 이상일 경우 구글 어플리케이션 정책에 의해 64비트의 어플리케이션만 실행이 가능하기 때문에 아래 항목을 진행합니다.    
`Other Settings`항목의 `Configuration`항목을 찾습니다.  
`Scripting Backend`항목을 `Mono`에서 `IL2CPP`로 바꿔줍니다.  
또한 `Target Architectures`항목의 ARM64 항목을 체크해줍니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01New/5.PNG"><br/>
<08. 64비트 안드로이드 어플리케이션 설정></p>
  
`Project Settings`창에서 좌측 하단 `XR Plug-in Managerment`항목을 찾아 클릭합니다.  
`XR Plug-in Managerment`창에서 안드로이드 탭으로 설정이 되어있는지 확인하고 `ARCore`항목을 체크하여 설정합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01New/6.PNG"><br/>
<09. XR Plug-in Managerment 설정></p>
  
#### 계층구조창에서
계층구조창에서 마우스 오른쪽 클릭 `XR`항목에서 `AR Session Origin`버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01New/7.PNG"><br/>
<10. AR Session Origin 오브젝트 생성></p>
  
계층구조창에서 마우스 오른쪽 클릭 `XR`항목에서 `AR Session`버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01New/8.PNG"><br/>
<12. AR Session 오브젝트 생성></p>
  
계층구조창에서 `Main Camera`오브젝트를 제거합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01New/9.PNG"><br/>
<13. Main Camera 오브젝트 제거></p>

## 테스트 해보기
빌드세팅 창에서 APK파일로 빌드하고 디바이스에 설치합니다.  
모바일 디바이스의 후면 카메라가 활성화되어 화면에 나타나는지 확인합니다.  
