---
layout: post
title:  "라인 렌더러<Line Renderer>"
date:   2020-04-21 10:50:07
categories: Unity3D Basics
description: "유니티 라인 렌더러 기초"
image: '/img/UnityBasic/LineRenderer/08.PNG'
published: true
canonical_url: https://www.csrhymes.com/development/2018/05/28/why-use-a-static-site-generator.html
---
  
## 라인 렌더러<Line Renderer>  

유니티에서 `라인 렌더러`를 알아봅니다.  
라인렌더러는 3D 공간에서 설정된 `꼭지점`들을 연결하는 직선을 그립니다.
  
## 유니티3D 에디터에서  
  
프로젝트에서 빈 게임 오브젝트를 생성합니다.  
빈 게임 오브젝트의 이름을 `Line` 으로 변경합니다.  
![01](/img/UnityBasic/LineRenderer/01.PNG)  
<01. 빈게임 오브젝트 생성 및 이름 변경>  
  
빈 게임 오브젝트에 `<LineRenderer>` 컴포넌트를 추가합니다.  
![02](/img/UnityBasic/LineRenderer/02.PNG)  
<02. 라인 렌더러 컴포넌트 추가>  
  
씬 창을 보게되면 분홍색 사각형 오브젝트가 생성이 되어있을 것입니다.  
하지만 이동 툴로 이동을 하여도 해당 오브젝트는 이동을 하지 않습니다.   
![03](/img/UnityBasic/LineRenderer/03.PNG)  
<03. 씬 확인>  
  
## Line Renderer Component  
  
<LineRenderer> `컴포넌트`를 살펴보겠습니다.  
![04](/img/UnityBasic/LineRenderer/04.PNG)  
<04. 라인렌더러 컴포넌트>  
  
컴포넌트 요소 중 `Materials` 항목 하위에 `Element 0` 항목 우측 원 아이콘을 선택하고 `Default-Line` 메테리얼을 선택합니다.  
씬 창을 확인해 보면 오브젝트의 색상이 흰색으로 변경된 것을 확인할 수 있습니다.  
`Materials` 프로퍼티는 라인을 렌더링 하는데에 활용되는 메테리얼을 설정할 수 있습니다.  
![05](/img/UnityBasic/LineRenderer/05.PNG)  
<05. 라인렌더러 컴포넌트 - Materials>  
  
컴포넌트 요소 중 `Corner Vertices` 항목과 `End Cap Vertices` 항목의 값을 각각 5로 변경합니다.  
`Corner Vertices` 프로퍼티는 라인의 코너를 그릴 때 얼마나 많은 꼭지점을 사용하는지  
`End Cap Vertices` 프로퍼티는 라인의 끝을 그릴 때 얼마나 많은 꼭지점을 사용하는지 설정합니다.  
각 값이 클수록 부드럽게 표현됩니다.  
![06](/img/UnityBasic/LineRenderer/06.PNG)   
<06. 라인 렌더러 컴포넌트 - Vertices>  

컴포넌트 요소 중 `Width` 값을 절반으로 줄여봅니다.  
해당 프로퍼티는 라인의 '두께'를 설정합니다.  
![07](/img/UnityBasic/LineRenderer/07.PNG)   
<07. 라인 렌더러 컴포넌트 - Widths>  

컴포넌트 요소 중 `Positions` 항목의 좌측 드롭다운 버튼을 눌러 펼쳐봅니다.  
해당 값들을 다음과 같이 변경합니다.  
`Positions` 프로퍼티는 라인을 연결할 각 점들을 Vector3 `배열`로 표현합니다.  
![09](/img/UnityBasic/LineRenderer/09.PNG)   
<08. 라인 렌더러 컴포넌트 - Positions>  

각 설정들을 완료하고 나면 다음과 같은 모양의 Line Renderer가 생성됩니다.  
![08](/img/UnityBasic/LineRenderer/08.PNG)   
<09. 꼭지점을 연결한 Line>  
  
  
라인 렌더러의 위치는 `Positions` 항목의 값에 따라서 정해지기 때문에 우리가 <LineRenderer> 컴포넌트가 추가된 오브젝트 자체를 이동시키거나 회전시켜도 위치나 회전값이 변경되지 않습니다.  
따라서 라인 렌더러를 활용하기 위해서는 동적으로 Positions 배열을 생성하고 Positions 값을 지정해 주어야 되는 것을 알 수 있습니다.  
  
라인 렌더러 컴포넌트의 프로퍼티들에 대해 더 알고싶으시면 아래 링크에서 확인하실 수 있습니다.  
https://docs.unity3d.com/kr/2018.4/Manual/class-LineRenderer.html
