---
layout: post
title:  "ARFoundation - Image Tracking"
date:   2022-04-15 12:00:07
categories: ARPage
description: "ARFoundation - Image Tracking"
image: '/img/UnityVR/OculusQuest/01XRToolkit/ARFoundation.jpg'
published: true
canonical_url: https://beatchoi.github.io/arpage/2022/04/15/ARFoundationImageTracking/
---
  
  {% include adsense.html %}    
  
## ARFoundation을 활용한 이미지 트래킹 콘텐츠 개발하기 
ARFoundation을 활용하여 이미지를 인식하고 인식한 이미지에 가상의 오보젝트를 증강시켜 봅니다.  
  
## 유니티3D 에디터에서  
  
ARFoundation의 환경설정을 진행합니다.  
`AR Session Origin` 및 `AR Session` 오브젝트를 추가합니다.  
  
  
`Project` 청에서 마우스 우 클릭, `Create` -> `XR` -> `Reference Image Library`를 선택하여 추가합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/ImageTracking/1.PNG"><br/>
<01. Reference Image Library 추가></p>
  
인식할 이미지 파일을 `Project`창으로 옮겨 프로젝트에 추가합니다.  
인식할 이미지의 형태에 따라 인식률에 차이가 있으며 인식이 불가능한 이미지의 경우 빌드가 되지 않습니다.  
아래 이미지를 활용해 봅니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/ImageTracking/2.PNG"><br/>
<02. Image Target></p>
  
생성된 `Reference Image Library`를 선택하고 우측 인스펙터 창을 확인합니다.  
`Add Image` 버튼을 클릭하여 인식될 이미지를 추가할 항목을 생성합니다.  
이어서 프로젝트 창에 있는 인식할 이미지를 드래그하여 `Texture 2D`항목에 끌어 놓습니다.  
`Specify Size`항목을 체크하고 생기는 하단 항목의 `Physical Size`항목의 X 값을 1로 설정합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/ImageTracking/3.gif"><br/>
<03. Reference Image 추가></p>
  
이어서 `AR Session Origin` 오브젝트를 선택하고 `Inspector`창에서 `AR Tracked Image Manager` 컴포넌트르 추가합니다.  
`AR Tracked Image Manager`컴포넌트의 `Serialized Library` 항목에 `Reference Image Library`파일을 끌어다 놓습니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/ImageTracking/4.gif"><br/>
<04. AR Tracked Image Library Manager 추가></p>
  
이제 이미지를 인식하면 생성이 될 3D 오브젝트를 생성합니다. `Cube`오브젝트를 생성하고 본 오브젝트를 `Prefab`으로 만들어 줍니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/ImageTracking/5.PNG"><br/>
<05. Cube 오브젝트 생성></p>  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/ImageTracking/6.PNG"><br/>
<06. Cube 오브젝트 Prefab 생성></p>
  
마지막으로 `AR Session Origin`오브젝트의 `AR Tracked Image Manager`컴포넌트의 `Tracked Image Prefab` 항목에 `Cube` 프리펩을 연결합니다.  
`Hierarchy`창의 Cube 오브젝트는 제거합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/ImageTracking/7.PNG"><br/>
<07. Cube Prefab 연결></p>  
  
## 테스트 해보기

  
  
    {% include adsense.html %}  
