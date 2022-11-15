---
layout: post
title:  "Oculus Quest2 - XR Interaction Toolkit Locomotion"
date:   2022-11-15 14:00:07
categories: Unity3D Basics
description: "오큘러스 퀘스트2 - XR Interaction Toolkit Locomotion을 활용한 이동"
image: 'img/UnityVR/OculusQuest/01XRToolkit/OculusQuest.png'
published: true
canonical_url: http://whtls.com/unity3d/basics/2022/11/15/OculusQuestXRInteractionLocomotion/
---

## XR Interaction Toolkit Locomotion
XR Interaction Toolkit의 Locomotion 기능을 활용하여 이동 및 회전을 구현해 봅니다.
  
## 유니티3D 에디터에서  
  
#### XR Interaction Toolkit 세팅
이전 포스팅을 참조하여 XR Interaction Toolkit 패키지를 임포트 및 빌트세팅을 한 후 진행합니다.


#### Locomotion System 컴포넌트 추가
XROrigin 오브젝트를 선택하고 `Locomotion System`컴포넌트를 추가합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/XRToolkitLocomotion/01.PNG"><br/>
<01. Locomotion System></p>
  
  
`XROrigin`오브젝트의 `XR Origin`항목에 `XROrigin`오브젝트를 연결합니다. 
<p align="center"><img src="/img/UnityVR/OculusQuest/XRToolkitLocomotion/02.PNG"><br/>
<02. Locomotion System></p>
  
  
#### 자연스러운 이동 구현
`XROrigin` 오브젝트에 `Continuous Move Provider(Device-based)`컴포넌트를 추가합니다.  
`System`항목에 `XROrigin`오브젝트를 연결합니다.  
`Forward Source`항목에 `Main Camera`를 연결합니다.  
`Controllers`항목에 리스트를 추가하고 'RightHand Controller`, `LeftHand Controller`항목을 연결합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/XRToolkitLocomotion/03.PNG"><br/>
<03. Continuous Move Provider></p>
  
  
#### 이동 확인
  
  
#### 자연스러운 회전 구현
`XROrigin` 오브젝트에 `Continuous Turn Provider(Device-based)` 컴포넌트를 추가합니다.  
`System`항목에 `XROrigin`오브젝트를 연결합니다.  
`Controllers`항목에 리스트를 추가하고 'RightHand Controller`, `LeftHand Controller`항목을 연결합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/XRToolkitLocomotion/04.PNG"><br/>
<04. Continuous Turn Provider></p>
  
  
#### 회전 확인
## 테스트
월드에서 컨트롤러를 활용하여 이동 및 회전이 구현되는지 확인합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/XRToolkitLocomotion/05.PNG"><br/>
<05. 테스트></p>
  
