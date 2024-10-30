---
layout: post
title:  "LightshipAR SDK 활용하기 - Maps SDK의 활용"
date:   2024-10-29 14:00:07
categories: ARPage
description: "ARDK Maps SDK의 활용"
image: '/img/UnityAR/LightshipAR/01/00.PNG'
published: true
canonical_url: https://beatchoi.github.io/unity3d/arpage/2024/10/29/ARDKMapsSDK01/
---
  
  
  {% include adsense.html %}
  
  
## ARDK Maps SDK  
Lightship의 geofencing 기능을 구현할 수 있는 Maps SDK 활용법을 알아봅니다.   
  
## 콘텐츠 개발
#### 프로젝트 세팅
  
본 포스팅은 ARDK 3.9 버전, Maps SDK 0.4 버전을 기준으로 작성합니다. 이전 포스팅을 참조하여 SDK를 임포트 합니다.  
    
  
#### Top Down Map  
1. 네이버 지도같은 일반적인 탑-다운 맵을 구현해 봅니다.

프로젝트 창에서 마우스 우클릭, Create -> Maps SDK -> Lightship Map Prefabs 에서 LightshipMap Prefab을 선택하여 생성합니다.  

<p align="center"><img src="/img/UnityAR/MapsSDK/01/01.png"><br/>
<01. LightshipMap Prefab 생성 ></p>  

해당 맵 프리펩을 선택해서 Lightship Map View 컴포넌트를 확인해보면 다음과 같은 항목들이 있습니다.

<p align="center"><img src="/img/UnityAR/MapsSDK/01/02.png"><br/>
<01. LightshipMapView 컴포넌트 ></p>  

- Center Map At Origin : 지도 객체를 항상 월드 중앙에 위치시킬 지 여부 선택.  
- Maximum Map Offset : 지도 객체가 원래 위치에서 부터 얼마나 움직일 수 있는지 지정. 해당 값 보다 멀리 떨어지면 자동으로 원점으로 되돌아옴.
- Tile Batch Count : 한번에 몇개의 지도 타일이 로드될 수 있는지 지정. 기본 값으로 지정하는 것이 퍼포먼스에 유리.
- Map Theme : 맵 테마 선택.
- Viewable Radius : 카메라가 한번에 볼 수 있는 거리.
- Start At Default Location : 지정한 위도 경도 위치에서 시작할 수 있음.
- Default Location : 시작할 위도 경도 입력.
- Map Layers : 추후 지도에 객체를 추가할 때 쌓을 수 있는 레이어.

위 항목 중 `Map Theme` 항목에 테마를 추가해 볼 것입니다. 지금은 Niantic이 제공하는 샘플 테마를 활용해 봅니다. 추후 자체적으로 테마를 편집해 보도록 합니다.  

Project창 하단 `Packages`항목 하위에 있는 Lightship Maps SDK -> Themes -> Lighttime 폴더에 있는 Lighttime_Unlit_Theme_URP 프리펩을 선택, 드래그하여 위 `Map Theme` 항목에 추가합니다.  

<p align="center"><img src="/img/UnityAR/MapsSDK/01/03.png" width = "50%"><br/>
<03. Map Theme 추가 ></p>  

<p align="center"><img src="/img/UnityAR/MapsSDK/01/04.png"><br/>
<03. Map Theme 추가 ></p>  

맵 프리펩을 씬으로 드래그하여 생성합니다.  

맵 프리펩의 Start At Location 항목에 체크를 하고 바로 아래 Default Location 수치를 입력합니다. 위도 경도를 알 수 없다면 openstreetmap.org 에서 찾아서 넣어봅니다.  

<p align="center"><img src="/img/UnityAR/MapsSDK/01/09.png"><br/>
<04. GPS 추가 ></p>  

탑 - 다운으로 보여지는 카메라를 생성해 봅니다.  
씬의 `Main Camera`를 선택하고 position을 0 , 10000, 0 Rotation을 90,0,0 으로 변경하고,  
Projection 항목을 Orthographic으로 변경합니다. Size는 2로 변경, Far값은 10001로 변경합니다.  

<p align="center"><img src="/img/UnityAR/MapsSDK/01/05.png"><br/>
<05. MainCamera 수정 ></p>  

씬에 빈 게임 오브젝트를 생성하고 OrthographicCamera 로 이름을 변경합니다. 위치는 원점으로 수정합니다.  
OrthographicCamera 오브젝트를 선택하고 인스펙터 창에서 `Add Component`버튼을 눌러 `Orthographic Camera Controller` 컴포넌트를 추가합니다.  

<p align="center"><img src="/img/UnityAR/MapsSDK/01/06.png"><br/>
<06. Orthographic Camera Controller 컴포넌트 추가 ></p>  

해당 컴포넌트의 `Map View` 항목은 우리가 이전에 씬에 생성한 맵 프리펩을 연결시킵니다.  

<p align="center"><img src="/img/UnityAR/MapsSDK/01/07.png"><br/>
<07. 맵 프리펩 연결 ></p>  

OrthographicCamera 객체의 자식 오브젝트로 MainCamera를 이동시킵니다.  

<p align="center"><img src="/img/UnityAR/MapsSDK/01/08.png"><br/>
<08. MainCamera 객체의 이동 ></p>  

OrthographicCameraController.cs 스크립트를 아래와 같이 수정합니다.  

 Start() 함수 제일 첫번째 줄에 아래 코드를 추가합니다.  
_camera = transform.GetChild(0).GetComponent<Camera>();

계층구조창에서 마우스 오른쪽 클릭, UI -> EventSystem 을 선택해서 객체를 생성합니다.  

<p align="center"><img src="/img/UnityAR/MapsSDK/01/04.png"><br/>
<10. Map Theme 추가 ></p>  


## 마무리
상단 플레이 버튼을 눌러 지도가 잘 생성되는지 확인힙니다.  
Game 창에서 휠을 마우스 휠을 작동하면 줌인 줌 아웃이 되는 것을 확인할 수 있습니다.  
  
<p align="center"><img src="/img/UnityAR/MapsSDK/01/11.png"><br/>
<11. 마지막 테스트 ></p>  
  
  
  
  {% include adsense.html %}
  
  
  
