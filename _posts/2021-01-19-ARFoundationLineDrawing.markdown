---
layout: post
title:  "ARFoundation Line Drawing - 01"
date:   2021-01-19 14:00:07
categories: Unity3D Basics
description: "ARFoundation 으로 선 그리기 콘텐츠 만들어보기"
image: '/img/UnityVR/OculusQuest/01XRToolkit/ARFoundation.jpg'
published: true
canonical_url: http://whtls.com/unity3d/basics/2021/12/19/ARFoundationLine01/
---

## ARFoundation을 활용하여 증강현실 선 그리기 콘텐츠를 개발합니다.  
ARFoundation을 활용하여 실제 공간에 직접 3차원 콘텐츠를 그려서 배치할 수 있는 콘텐츠를 만들어봅니다.  
ARFoundation 환경설정 및 라인 렌더러 포스팅을 참고하면 좋습니다.  
개발 환경은 IOS 입니다.    
  
## 유니티3D 에디터에서  
  
#### 플랫폼 세팅
프로젝트를 생성하고 `Build Settings`창에서 플랫폼을 `IOS`로 변경합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/02/01.png"> <br/>
<01. 개발 플렛폼 변경></p>
  
#### 패키지 설치 :: Package Manager
상단 메뉴에서 `Window`탭의 `Package Manager`를 선택합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/08.PNG"><br/>
<02. 패키지 매니저 - 01></p>
  
패키지 매니저 창에서 `Packages`항목을 아래와 같이 `Unity Registry`로 변경합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/09.PNG"><br/>
<02. 패키지 매니저 - 02></p>
  
패키지 매니저 창에서 우측 세팅 버튼을 선택하고 `Advanced Project Settings`버튼을 클릭합니다. 
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/10.PNG"><br/>
<03. 패키지 매니저 - 03></p>
  
`Advanced Project Settings`항목에서 `Enable Preiview Packages`항목을 체크하고 진행합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/11.PNG"><br/>
<04. 프리뷰 패키지 설정></p>

`Package Manager`창으로 돌아와서 `ARFoundation`패키지를 설치합니다. 우측 하단 Install 버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01/03.PNG"><br/>
<05. ARFoundation 패키지 설치></p>
 
`Package Manager`창으로 돌아와서 `ARKit XR Plugin`패키지를 설치합니다. 우측 하단 Install 버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01/05.PNG"><br/>
<06. ARKit XR Plugin 패키지 설치></p>  
  
#### 계층구조창에서
계층구조창에서 마우스 오른쪽 클릭 `XR`항목에서 `AR Session Origin`버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01/06.PNG"><br/>
<07. AR Session Origin 오브젝트 생성></p>
  
계층구조창에서 마우스 오른쪽 클릭 `XR`항목에서 `AR Session`버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01/07.PNG"><br/>
<08. AR Session 오브젝트 생성></p>
  
계층구조창에서 `Main Camera`오브젝트를 제거합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/01/08.PNG"><br/>
<09. Main Camera 오브젝트 제거></p>

계층구조창에서 빈 게임 오브젝트를 생성하고 이름을 `Drawing`으로 변경합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/02/02.png"> <br/>
<10. `Drawing` 오브젝트 생성></p>

#### 스크립트 생성
`Drawing`이라는 이름의 스크립트를 생성해서 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Drawing : MonoBehaviour
{
    public Camera cam; 
    public Material defaultMaterial; 

    private LineRenderer curLine;  
    private int positionCount = 2; 
    private Vector3 PrevPos = Vector3.zero; 

    // Update is called once per frame
    void Update()
    {
        DrawMouse();
    }

    void DrawMouse()
    {
        Vector3 mousePos = cam.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, 0.3f));

        if (Input.GetMouseButtonDown(0))
        {
            createLine(mousePos);
        }
        else if (Input.GetMouseButton(0))
        {
            connectLine(mousePos);
        }
    }

    void createLine(Vector3 mousePos)
    {
        positionCount = 2;
        GameObject line = new GameObject("Line");
        LineRenderer lineRend = line.AddComponent<LineRenderer>();

        line.transform.parent = cam.transform;
        line.transform.position = mousePos;

        lineRend.startWidth = 0.01f;
        lineRend.endWidth = 0.01f;
        lineRend.numCornerVertices = 5;
        lineRend.numCapVertices = 5;
        lineRend.material = defaultMaterial;
        lineRend.SetPosition(0, mousePos);
        lineRend.SetPosition(1, mousePos);

        curLine = lineRend;
    }

    void connectLine(Vector3 mousePos)
    {
        if (PrevPos != null && Mathf.Abs(Vector3.Distance(PrevPos, mousePos)) >= 0.001f)
        {
            PrevPos = mousePos;
            positionCount++;
            curLine.positionCount = positionCount;
            curLine.SetPosition(positionCount - 1, mousePos);
        }
    }
}
```
  
`Drawing`스크립트를 `Drawing` 오브젝트에 인스턴스화 시킵니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/02/03.png"> <br/>
<11. `Drawing` 스크립트 인스턴스화></p>

프로젝트 창에서 `Material`파일을 생성하여 이름을 `LineMat`으로 지정합니다.  
해당 메터리얼 파일의 셰이더를 `Unlit/Color`로 변경하고 `Main Color`항목을 흰색으로 설정합니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/02/04.png"><br/>
<12. `LineMat` 메터리얼 생성></p>

계층구조창의 `Drawing` 오브젝트를 선택하고 `Drawing`컴포넌트의 `Cam` , `Default Material`항목을 각각 `AR Camera` , `LineMat`으로 지정합니다.  
`AR Camera` 오브젝트는 `AR Session Origin`오브젝트 하위에 존재하고 있습니다.  
<p align="center"><img src="/img/UnityAR/ARFoundation/02/05.png"><br/>
<13. 객체 연결></p>

## 빌드 해보기

