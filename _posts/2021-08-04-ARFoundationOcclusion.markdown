---
layout: post
title:  "ARFoundation Occlusion - ARFoundation 가림현상 구현하기"
date:   2021-08-04 10:00:07
categories: ARPage
description: "ARFoundation을 활용하여 IOS에서 가림현상 구현하기"
image: ''
published: true
canonical_url: https://beatchoi.github.io/unity3d/arpage/2021/08/04/ARFoundationOcclusion/
---
  
  
  {% include adsense.html %}
  
  
## 선수포스팅 :: Pre-requisite  
[1. ARFoundation 환경설정](https://beatchoi.github.io/unity3d/basics/2020/12/14/ARFoundation01/)  
[2. ARFoundation iOS Build](https://beatchoi.github.io/unity3d/basics/2021/01/19/ARFoundationIosBuild/) 

## 가림현상 :: Occlusion  
통상적으로 증강현실 콘텐츠에서 카메라가 켜져있고 그 위에 3D 모델링 오브젝트가 생성되었을 때 해당 오브젝트는 현실에 존재하는 물체보다 항상 앞쪽에 존재하게됩니다.  
그도 그럴것이 아무리 카메라로 가상과 현실이 연결되어있다고 하더라도 콘텐츠에서 실행되는 3D 오브젝트는 여전히 콘텐츠 내에서만 존재하는 물체이고 이는 카메라의 맨 앞쪽에 존재할 수 밖에 없기 때문입니다.  
포켓몬고를 할때도 카메라가 켜진 상태로 포켓몬을 바라보았을 때, 내가 아무리 포켓몬보다 앞에 서있으려 해도 포켓몬은 항상 나의 앞에서 나를 가리고 있을 것입니다.  
이를 해결하기 위한 기술이 카메라가 현실의 `depth`를 계산하여 현실의 물체와 카메라의 거리정보를 콘텐츠 내에서 활용하는 `Occlusion`입니다.  
이번 포스팅에서는 `Apple IOS` 기기의 프로 라인업에 있는 `Lidar`센서를 활용하여 `Occlusion`을 구현해 보도록 하겠습니다.  
  
## 유니티3D 에디터에서  
IOS 플랫폼의 ARFoudation 환경설정과 동일하게 다음과 같이 플랫폼을 변경하고 패키지를 다운로드 받습니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/04Occlusion/1.png"><br/>
<01. 기본 ARFoundation 환경설정></p>
  
그리고 `AR Session Origin` 및 `AR Session` 오브젝트를 계층구조창에 생성합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/04Occlusion/2.png"><br/>
<02. 기본 ARFoundation 환경설정></p>
  
`AR Session Origin`오브젝트를 선택하고 `AR Plane Manager` 및 `AR Raycast Manager` 컴포넌트를 추가합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/04Occlusion/3.png"><br/>
<03. 컴포넌트 추가></p>
  
`AR Session Origin`의 자식오브젝트로 있는 `AR Camera`오브젝트를 선택하고 `AR Occlusion Manager`컴포넌트를 추가합니다.  
해당 컴포넌트의 항목들 중 `Human Segmentation`항목을 모두 `Best`로 변경합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/04Occlusion/4.png"><br/>
<04. AR Occlusion Manager 컴포넌트 추가></p>
  
이제 기본적인 가림현상 설정은 되었습니다.  
계층구조창에 테스트를 진행할 `Cube`오브젝트를 하나 생성합니다.  
카메라의 앞쪽으로 조금 이동시킵니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/04Occlusion/5.png"><br/>
<05. 테스팅 오브젝트></p>
  
  
#### 빌드
`Project Settings`창에서 `Player`탭의 `Configuration`항목의 `Camera Usage Description` 항목을 채워줍니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/04Occlusion/6.png"><br/>
<06. Camera Usage Description></p>
  
`Project Settings`창에서 `XR Plug-Manager`탭에서 `ARKit`항목에 체크합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/04Occlusion/7.png"><br/>
<07. XR Plug-in Manager></p>
  
IOS 빌드를 진행합니다.  
아이폰이나 패드에서 콘텐츠를 실행시키고 정면에 `Cube`오브젝트가 생성되는지 확인합니다.  
`Cube`앞에 손을 놓아보고 손이 `Cube`를 가릴 수 있는지 확인합니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/04Occlusion/8.PNG"><br/>
<08. 테스팅 오브젝트></p>
  
  {% include adsense.html %}
  
  


