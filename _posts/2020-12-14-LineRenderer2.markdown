---
layout: post
title:  "라인 렌더러 글씨 그리기 - Line Renderer Draw Line"
date:   2020-12-14 14:00:07
categories: Unity3D Basics
description: "유니티 라인 렌더러로 글씨 그려보기"
image: '/img/UnityBasic/LineRenderer/08.PNG'
published: true
canonical_url: http://whtls.com/unity3d/basics/2020/12/14/LineRenderer2/
---

## 라인 렌더러로 글씨 그리기
이전 강의에서 배웠던 `라인 렌더러`를 활용하여 터치 그리기를 구현해봅니다.   
  
## 유니티3D 에디터에서  
  
#### 스크립트 :: Drawing  
  
프로젝트 창에 `Drawing`스크립트를 하나 생성합니다.  
<p align="center"><img src="/img/UnityBasic/LineRenderer2/01.PNG"><br/>
<01. 스크립트 생성></p>  
  
다음과 같이 스크립트를 작성합니다.
```ruby
    public Camera cam;  //Gets Main Camera
    public Material defaultMaterial; //Material for Line Renderer

    private LineRenderer curLine;  //Line which draws now
    private int positionCount = 2;  //Initial start and end position
    private Vector3 PrevPos = Vector3.zero; // 0,0,0 position variable

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
        }else if (Input.GetMouseButton(0))
        {
            connectLine(mousePos);
        }
        
    }
```

* `DrawMouse()`함수는 매 프레임마다 호출되는 업데이트 함수에 호출하여 실시간으로 이용자가 마우스 클릭를 하는지 여부를 체크합니다.  
* `mousePos` 변수에 현재 클릭하는 위치값을 저장하게 됩니다.  
* 첫 클릭에 `CreateLine()`함수를 호출합니다. `GetMouseButtonDown`의 특성상 하나의 선을 그릴 때 한번 호출됩니다.  
* 첫 클릭 후 드래그를 할 때 `ConnectLine()`함수를 호출하게 됩니다.
* 기본적인 프로그램의 구조를 생성했습니다.  

`createLine`함수를 생성합니다. 아래에 스크립트를 추가합니다.  

```ruby
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
```
  
* `CreateLine`함수를 생성합니다. 인자는 `Vector3형의 mousePos` 변수입니다.  
* `positionCount`변수는 처음 생성하는 라인 렌더러의 코너 점의 갯수를 지정해 줍니다.  
* 새로운 게임오브젝트를 생성하여 `line`변수에 값을 지정합니다.  
* `line`게임오브젝트에 라인 렌더러 컴포넌트를 부착합니다. 부착된 컴포넌트를 `lineRend`변수 에 저장합니다.  
* 생성한 `line`오브젝트를 카메라 오브젝트의 자식오브젝트로 계층을 이동시키고, 클릭지점으로 위치를 이동시킵니다.
* 생성한 `line`오브젝트의 라인렌더러 컴포넌트의 값들을 지정합니다. (해당 항목들은 라인렌더러 기본 강좌 참조)  
  
이어서 `connectLine`스크립트를 생성합니다.  
  
```ruby
void connectLine(Vector3 mousePos)
    {
        if(PrevPos != null && Mathf.Abs(Vector3.Distance(PrevPos, mousePos)) >= 0.001f)
        {
            PrevPos = mousePos;
            positionCount++;
            curLine.positionCount = positionCount;
            curLine.SetPosition(positionCount - 1, mousePos);
        }
        
    }
```
  
* 현재 터치 위치와 직전의 터치 위치의 거리에 따라 라인렌더러의 길이를 증가시킵니다.
* 터치가 진행될수록 `positionCount`의 숫자를 증가시킵니다. 라인렌더러의 길이가 길어져야 하기 때문입니다.  
* 최근 터치한 위치로 `line`오브젝트를 이동시킵니다.   

#### 에디터 메뉴  

프로젝트 창에서 `Material`파일을 생성합니다. 이름은 `LineMat`으로 변경합니다.  
<p align="center"><img src="/img/UnityBasic/LineRenderer2/03.PNG"><br/>
<02. 매테리얼 생성></p>  

`LineMat`매테리얼을 셰이더를 `Unlit/Color`로 변경합니다.  
`LineMat`의 색상은 하단 `Main Color`항목 우측 색상표를 통해 변경할 수 있습니다.  
<p align="center"><img src="/img/UnityBasic/LineRenderer2/04.PNG"><br/>
<03. 매테리얼 색상 변경></p>  
  
계층구조창에서 빈 게임 오브젝트를 생성하고 이름을 `Draw`로 변경합니다.  
`Draw`오브젝트에 방금 작성한 `Drawing`스크립트를 인스턴스화 시킵니다.  
`Draw`오브젝트를 선택하고 우측 인스펙터 창에 퍼블릭 변수들에 값을 각각 할당합니다.  
`Cam`은 계층구조창의 `Main Camera`, `Default Material`항목은 `프로젝트창의 `LineMat`입니다.
<p align="center"><img src="/img/UnityBasic/LineRenderer2/02.PNG"><br/>
<04. Drawing 스크립트 인스턴스화></p>  
  
## 테스팅  
위 상단 플레이 버튼을 누르고 게임창에서 마우스로 클릭, 드래그 해서 선을 그려봅니다.  
<p align="center"><img src="/img/UnityBasic/LineRenderer2/05.gif"><br/>
<05. Game 창에서의 테스트></p>  
