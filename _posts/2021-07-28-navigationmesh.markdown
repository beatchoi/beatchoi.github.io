---
layout: post
title:  "자동으로 길찾기 - 네비게이션 메시(Navigation Mesh)"
date:   2021-07-28 12:00:07
categories: Unity3D Basics
description: "네비게이션 메시(Navigation Mesh)를 알아봅니다."
image: ''
published: true
canonical_url: https://beatchoi.github.io/2021/07/28/navigationmesh/
---
  
  
  {% include adsense.html %}
  
  
## 네비게이션 메시 :: Navigation Mesh  
스타크래프트에서 유닛을 지정된 장소로 보내게 되면 뚫려있는 길을 따라 알아서 찾아갑니다. 막혀있는 길을 돌아서 가고 갈수 없는 지형은 최대한 가까이 접근하죠.  
최근 자동사냥이나 방치형 RPG 모바일 게임에서도 마찬가지입니다. 캐릭터가 알아서 NPC를 찾아가고 몬스터를 찾아 사냥을 합니다.  
찾아갈때 장애물이 있으면 피해서 가고 지정된 길을 통해 최적의 길을 찾아갑니다.  
유니티에서도 해당 기능을 `Navigation Mesh`를 통해 구현할 수 있습니다. 간단한 몬스터의 이동이나 캐릭터의 이동반경등을 지정해 봅시다.  
  
## 유니티3D 에디터에서  
#### 프로젝트 생성 및 세팅
유니티 프로젝트를 생성하고 유니티 기본도형을 활용하여 기본 스테이지를 생성해 봅시다.  
캐릭터가 걸어다닐 수 있는 길은 `Plane`오브젝트로, 장애물은 `Cube`, 경사로는 `Plane` 또는 `Cube`로 구현해 봅니다.  
캐릭터 오브젝트 역시 `Capsule`로 간단하게 생성합니다.  
<p align="center"><img src="/img/UnityBasic/NavigationMesh/1.PNG"><br/>
<01. 스테이지 생성></p> 
  
<p align="center"><img src="/img/UnityBasic/NavigationMesh/2.PNG"><br/>
<02. 스테이지 생성></p>   

계층구조창은 `Stage`라는 빈 게임 오브젝트를 생성해서 정리해줍니다.  
각 오브젝트가 잘 보일 수 있도록 `Material`을 입혀주었습니다.  
오브젝트의 사이즈는 `Stage`오브젝트의 Scale값을 조정해서 일괄적으로 증가시켰습니다.  
<p align="center"><img src="/img/UnityBasic/NavigationMesh/3.PNG"><br/>
<03. 계층구조창 정리></p> 
  
#### 걸어다닐 수 있는 Navigation Mesh Bake
`Window`탭을 클릭하고 `AI`항목에서 `Naviation`항목을 선택합니다.  
<p align="center"><img src="/img/UnityBasic/NavigationMesh/5.PNG"><br/>
<04. Navigation 탭></p> 
    
네비게이션 창을 확인해보면 `Agents`, `Areas`, `Bake`, `Object`항목이 있습니다.  
이중 네번째 `Object`항목을 클릭합니다.  
`Object`항목은 오브젝트가 걸어다니거나 피해야할 환경 오브젝트인지 아닌지 선택하는 창입니다.  
계층구조창에서 캐릭터 오브젝트를 제외한 `Stage`를 형성하는 모든 오브젝트들을 선택합니다.  
그리고 `Object`항목에서 `Navigation Static`항목을 체크합니다. 아래에 `Navigation Area`항목이 `Walkable`로 되어있는지 확인합니다.  
만약 장애물이나 지형을 선택하지 않으면 캐릭터는 해당 장애물을 뚫고 지나갈 것입니다.  
<p align="center"><img src="/img/UnityBasic/NavigationMesh/7.PNG"><br/>
<05. 계층구조창 정리></p> 
  
그리고 이번엔 세번째 `Bake` 항목을 선택합니다.  
`Bake`항목은 `Object`항목에서 지정한 `Navigation Static`오브젝트들을 바탕으로 움직일 수 있는 공간을 구워주는 역할을 합니다.  
우측 하단 `Bake`버튼을 눌러 `Navigation Mesh`를 생성해봅니다.  
<p align="center"><img src="/img/UnityBasic/NavigationMesh/6.PNG"><br/>
<06. Navigation Mesh Bake></p> 
  
`Scene`창을 확인해보면 다음과 같이 면들이 푸른색으로 칠해질 것입니다.  
푸른빛의 영역은 캐릭터가 이동 가능한 영역이고 그렇지 않은 부분은 이동이 불가능한 영역입니다.  
그래서 보면 정육면체 오브젝트 주위에는 검은색 선으로 경계가 그어져 있어 이 부근은 피해가야하는 영역으로 표시되는 것입니다.  
현재 경사로 부분역시 푸르게 칠해지지않아 이동이 불가능한 상태입니다.  
<p align="center"><img src="/img/UnityBasic/NavigationMesh/8.PNG"><br/>
<07. Bake된 Navigation Mesh></p> 
  
#### Navigation Mesh 위에서 움직이는 오브젝트 구현
아까 캐릭터 오브젝트로 생성한 `Capsule`오브젝트를 선택합니다.  
그리고 인스펙터 창에서 `Nav Mesh Agent`라는 컴포넌트를 추가합니다.  
`Nav Mesh Agent`컴포넌트를 가지고 있는 오브젝트는 `Navigation Mesh`클래스의 함수 명령을 들을 수 있습니다.  
<p align="center"><img src="/img/UnityBasic/NavigationMesh/13.PNG"><br/>
<08. Nav Mesh Agent 컴포넌트 추가></p> 
   
#### 스크립트 생성  
프로젝트 창에서 `NavMeshMove.cs` 스크립트를 생성합니다.  
`NavMeshMove.cs`스크립트를 열어 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class NavMeshMove : MonoBehaviour
{
    NavMeshAgent nav;
    public Transform targetPos;
    // Start is called before the first frame update
    void Start()
    {
        nav = GetComponent<NavMeshAgent>();
    }

    // Update is called once per frame
    void Update()
    {
        nav.SetDestination(targetPos.position);
    }
}
```
  
* 먼저 4번째 줄에 UnityEngine.AI 네임스페이스를 추가합니다.  
* NavMeshAgent 클래스의 Nav 변수를 선언하고 오브젝트가 이동할 목적지 트랜스폼 변수도 선언합니다.    
* Start함수에서 NavMeshAgent 컴포넌트를 nav에 추가하고
* Update함수에서 SetDestination이라는 목적지로 이동하는 메소드를 호출합니다.  
  
    
해당 스크립트를 `Capsule`오브젝트에 인스턴스화 시켜줍니다.  
스크립트 컴포넌트의 `targetPos`변수에 연결해 줄 빈 게임 오브젝트를 하나 생성합니다.  
해당 빈 게임 오브젝트의 이름을 `Target`으로 지정하고 `Stage`위에 원하는 곳에 위치시킨 뒤 컴포넌트에 연결합니다.  
<p align="center"><img src="/img/UnityBasic/NavigationMesh/9.PNG"><br/>
<09. Target 오브젝트 생성></p>
   
<p align="center"><img src="/img/UnityBasic/NavigationMesh/10.PNG"><br/>
<10. Capsule 오브젝트 세팅></p>
  
#### 테스트
  
플레이를 눌러서 확인해보면 다음과 같이 `Capsule`오브젝트가 이동하는 것을 확인할 수 있습니다.  
<p align="center"><img src="/img/UnityBasic/NavigationMesh/11.gif"><br/>
<11. Capsule 오브젝트 이동></p>
     
#### 경사로 이동
  
하지만 `Target`오브젝트를 경사로 위로 변경하면 캐릭터 오브젝트가 위로 올라가지 못하는 것을 확인할 수 있습니다.  
이는 `Navigation Mesh`를 bake 설정의 경사로 한계 각도와 현재 경사로의 실제 각도의 범위가 맞지 않아서 그런것입니다.  
현재 경사로는 대략 45도정도로 세팅이 되어있으나 해당 오브젝트의 위치나 회전값에 따라 오차가 있을 수 있기 때문에 `Navigation Mesh`의 설정을 변경하겠습니다.  
   
`Navigation`창으로 돌아가서 `Bake`탭을 선택합니다.  
`Max Slope`항목에서 각도를 조금 높여봅니다.(현재 경사로의 각도보다 높여줍니다.)  
<p align="center"><img src="/img/UnityBasic/NavigationMesh/12.PNG"><br/>
<12. 경사로 한계치 설정></p>
  
그리고 다시 `Bake` 버튼을 눌러 메시를 구워주면 다음과 같이 경사로가 잘 연결된것을 확인할 수 있습니다.  
<p align="center"><img src="/img/UnityBasic/NavigationMesh/13.gif"><br/>
<13. 경사로 bake></p>
   
#### 정리
Navigation Mesh는 어렵게 길찾기 알고리즘을 구현하지 않아도 편하게 사용할 수 있는 기능중 하나입니다.  
간단하게 구현방법과 이동하는 방법을 알아보았습니다.  
다음에는 Navigation Mesh를 다양하게 활용하는 방법을 알아보겠습니다.  
  
  
  {% include adsense.html %}
  
  


