---
layout: post
title:  "ARFoundation Face Tracking"
date:   2021-08-17 12:21:17
categories: ARPage
description: "ARFoundation을 활용한 얼굴 추적 기술 활용하기"
image: '/img/UnityVR/OculusQuest/01XRToolkit/ARFoundation.jpg'
published: true
canonical_url: https://beatchoi.github.io/arpage/2021/07/07/ARFoundationQRCodeReader2/
---

  {% include adsense.html %}
  
## FaceTracking :: 얼굴추적
ARFoundation의 `Face Tracking`기능을 활용하는 방법을 알아봅니다.  
  
  
## 유니티3D 에디터에서  
#### 플랫폼 세팅  
  
이전 ARFoundation의 설정과 마찬가지로 `Package Manager`에서 `ARFoundation`, `ARCore, ARKit XR Plugin`을 설치합니다.  
만약 모바일 플랫폼이 IOS라면 `ARKit Face Tracking`플러그인도 함께 설치해줍니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/FaceTracking/1.PNG"><br/>
<01. 플러그인 설치></p> 
  
  
플러그인이 모두 설치되면 계층구조창에 `AR Session Origin`, `AR Session`오브젝트를 생성합니다.  
`AR Session Origin`오브젝트를 선택하고 해당 오브젝트에 `AR Face Manager`컴포넌트를 추가합니다.  
인스펙터 창 하단 `Add Component`버튼을 눌러 추가해줍니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/FaceTracking/2.PNG"><br/>
<02. AR Face Manager 컴포넌트 추가></p> 
  
  
계층구조창에서 마우스 오른쪽 클릭을 하고 `XR` -> `AR Default Face`오브젝트를 생성해 줍니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/FaceTracking/3.PNG"><br/>
<03. AR Default Face 오브젝트 생성></p> 
  
  
생성된 오브젝트를 아래 프로젝트 창으로 끌어서 프리펩으로 만들어 줍니다.  
계층구조창에 생성한 오브젝트는 제거해 줍니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/FaceTracking/4.PNG"><br/>
<04. AR Face Manager 프리펩화></p> 
  
  
만든 프리펩을 아까 생성한 `AR Session Origin`오브젝트의 `AR Face Manager`컴포넌트의 `Face Prefab`항목으로 끌어서 놓습니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/FaceTracking/5.PNG"><br/>
<05. AR Face Manager 프리펩 연결></p>   
  
  
`AR Session Origin`오브젝트의 하위에 있는 `AR Camera`오브젝트를 선택합니다.  
우측 인스펙터창의 `AR Camera Manager`컴포넌트의 `Facing Direction`항목을 `User`로 바꿔줍니다.  
이 방법으로 모바일 디바이스의 전면 카메라를 활용할 수 있습니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/FaceTracking/6.PNG"><br/>
<06. 전면카메라 사용 옵션></p> 
  
  
#### 빌드 및 테스트 하기
  
이전 포스팅에서 진행했던 것과 마찬가지로 빌드 세팅을 진행한 후 모바일 디바이스에서 확인해 봅니다.  

<p align="center"><img src="/img/UnityAR/ARFoundation/FaceTracking/7.jpg" height="444px" width="216px"> <img src="/img/UnityAR/ARFoundation/FaceTracking/8.jpg" height="444px" width="216px"><br/>
<07. 테스트></p> 
  

  
  {% include adsense.html %}
  
  
