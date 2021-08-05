---
layout: post
title:  "Assets - Bezier Path Creator"
date:   2021-08-05 12:00:07
categories: page-UsefulAssets
description: "Bezier Path Creator를 활용하여 경로를 생성하고 따라서 이동시켜봅니다"
image: '/img/UnityAssets/210805BezierCurve/1.PNG'
published: true
canonical_url: https://beatchoi.github.io/unity3d/page-UsefulAssets/2021/08/05/AssetsBezierCurve/
---
  
  
  {% include adsense.html %}

## Bezier Path Creator
정해진 루트를 따라 일정하게 이동하는 오브젝트를 구현할때 쉽게 활용 가능한 무료 에셋입니다.  
길을 따라 이동시키는 것 이외에 동적으로 도로나 길을 생성하게 할 수도 있습니다.  
  
## 에셋 구현
#### 에셋 임포트
`Bezier Path Creator`라는 에셋을 프로젝트에 임포트해봅니다.  
`AssetStore`페이지에서 `Bezier Path Creator`에셋을 프로젝트에 추가합니다.    
<p align="center"><img src="/img/UnityAssets/210805BezierCurve/1.PNG"><br/>
<01. Bezier Path Creator 추가></p>
  
프로젝트를 하나 새로 생성하고 `Windows -> Package Manager`에 들어가서 방금 추가한 `Bezier Path Creator`에셋을 임포트합니다.  
<p align="center"><img src="/img/UnityAssets/210805BezierCurve/2.PNG"><br/>
<02. 에셋 임포트></p>
  
#### 길 만들기 :: Path Creation  
   
먼저 `Path`(길)을 만들어 봅시다.  
`Project`창에서 `PathCreator -> Examples -> Prefabs -> Path.prefab`프리펩을 끌어서 계층구조창으로 놓습니다.  
그럼 다음과 같이 녹색의 원 모양의 길이 생성될 것입니다.  
<p align="center"><img src="/img/UnityAssets/210805BezierCurve/3.PNG"><br/>
<03. Path Prefab 불러오기></p>
  
기본 `Path.prefab`프리펩은 3차원의 길로 점 4개로 이루어져 있습니다.    
<p align="center"><img src="/img/UnityAssets/210805BezierCurve/4.PNG"><br/>
<04. Path Prefab></p>
  
씬 창에서 `Path.prefab`의 붉은 점은 `Anchor`(기준점)입니다. 기준점을 클릭하고 이동을 시키면 해당 점과 연결된 길을 수정할 수 있습니다.  
또한 푸른색 점은 `Control`(조정점)입니다. 조정점은 기준점과 연결된 선의 곡율을 변경시킬 수 있습니다.    
<p align="center"><img src="/img/UnityAssets/210805BezierCurve/5.gif"><br/>
<05. Anchor Point></p>
  
<p align="center"><img src="/img/UnityAssets/210805BezierCurve/6.gif"><br/>
<06. Control Point></p>  
  
기존의 `Path`에 `Anchor`를 삽입하려면 `Anchor`를 추가하고자 하는 위치에 마우스를 올려두고 키보드 `Shift`버튼을 누른 상태에서 클릭하면 그 자리에 생성이 됩니다.  
`Anchor`를 제거하려면 `Anchor`위에 마우스를 올려두고 키보드 `Ctrl`버튼을 누른 상태에서 클릭하면 제거가 됩니다.  
<p align="center"><img src="/img/UnityAssets/210805BezierCurve/7.gif"><br/>
<07. Anchor point 추가></p>
  
<p align="center"><img src="/img/UnityAssets/210805BezierCurve/8.gif"><br/>
<08. Anchor point 제거></p>  
  
위 방법으로 하나의 `Path`를 만들어 봅시다.  
  
#### 길을 따라 움직이는 오브젝트 만들기
프로젝트 창에서 `TestPath.cs`스크립트를 생성하고 다음과 같이 작성해봅니다.  
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using PathCreation;

public class TestPath : MonoBehaviour
{
    public PathCreator PathCreator;
    float distanceTravelled;
    public float speed = 5;

    // Update is called once per frame
    void Update()
    {
        distanceTravelled += speed * Time.deltaTime;
        transform.position = PathCreator.path.GetPointAtDistance(distanceTravelled);
        transform.rotation = PathCreator.path.GetRotationAtDistance(distanceTravelled);
    }
}  
```
  
* 네임스페이스 부분에 `using PathCreation`을 추가합니다.  
* PathCreator 형식의 변수를 생성합니다.  
    * 이 변수에는 아까 만들어둔 `Path`(길) 오브젝트를 연결시킬 것입니다.  
* 시간에 따라 이동한 거리 변수인 `distanceTravelled`를 선언합니다.  
* 속도 변수인 `speed` 변수도 생성합니다.  
* Update 함수에
    * 선언한 속도대로 증감하는 변수 `distanceTravelled`의 값을 지정하고.
    * `PathCreator`클래스의 메소드를 활용하여 오브젝트의 이동과 회전을 관장합니다.  
  
  
계층구조창에 `Cube` 오브젝트를 하나 생성하고 위 스크립트를 인스턴스화 시켜줍니다.  
`Path Creator`변수공란에 아까 생성해둔 `Path`오브젝트를 연결시켜줍니다.  
<p align="center"><img src="/img/UnityAssets/210805BezierCurve/9.PNG"><br/>
<09. PathTest 인스턴스화></p>
  
#### 테스트
상단 플레이버튼을 누르면 다음과 같이 `Cube`오브젝트가 길을따라 움직이게 됩니다.  
<p align="center"><img src="/img/UnityAssets/210805BezierCurve/10.gif"><br/>
<10. PathTest 테스트></p>
  
`Cube` 오브젝트는 씬의 중앙에 위치하다가 플레이를 누르면 `Path`의 시작부근으로 이동하고 움직이기를 시작합니다.  
그리고 이동을 하면서 이동하는 방향으로 바라보는 형식으로 회전을 합니다.  
`speed`변수를 조정하면 이동하는 속도를 조정할 수 있습니다.  
  
#### Next
다음에는 해당 에셋의 세부적인 속성들을 알아보고 다양한 형태의 길을 만들어 보도록 하겠습니다.  
  
  
  
  {% include adsense.html %}
  
  


