---
layout: post
title:  "Unity3D DOTS 개요 - DOTS 알아보기 2. World에 Entity 만들기"
date:   2025-04-02 14:00:07
categories: Unity3D Fundamentals
description: "Unity3D DOTS를 알아봅니다"
image: '/img/UnityFundamental/DOTS/1.jpg'
published: true
canonical_url: https://beatchoi.github.io/unity3d/fundamentals/2025/04/02/DOTSFundamental02/
---
  
  
  {% include adsense.html %}
  


## 들어가기 앞서
이번 포스팅에서는 DOTS의 ECS를 활용하여 객체를 만들어 보고 기존의 GameObject 기반의 개발과 Data 기반의 개발의 차이점을 확인해 보겠습니다. 단순한 Sphere 객체를 Entity를 활용해 띄워 보도록 합니다.  

#### 프로젝트 설정
DOTS를 활용하기 위한 `Entity` 패키지를 프로젝트에 임포트 합니다.  
Package Manager 창의 Unity Registry 항목에 Entities 를 검색합니다. 다음 패키지 중 `Entities` 와 `Entities Graphics`를 임포트 합니다.  
<p align="center"><img src="/img/UnityFundamental/DOTS/6.png"><br/>
<01. Package Manager - Import Packages ></p>
  

그리고 Projet Settings 창에서 좌측 Editor 항목을 선택하고 Enter Play Mode Setting을 Do not reload Domain or Scene으로 변경합니다.  
<p align="center"><img src="/img/UnityFundamental/DOTS/7.png"><br/>
<02. Project Settings - Enter Play Mode Settings ></p>
  
#### Component 생성
Project 창에서 마우스 우클릭, Create -> Entities -> IComponentData Script 선택  
이름을 SphereData로 수정하고 해당 스크립트를 다음과 같이 작성합니다.  

<p align="center"><img src="/img/UnityFundamental/DOTS/5.png"><br/>
<03. Component Script ></p>

```ruby
using Unity.Entities;
using Unity.Mathematics;
public struct SphereData : IComponentData
{
    public float3 position;
}
```
본 스크립트는 이전 포스팅에서 언급한 ECS 중 Component에 해당하는 부분입니다. 이전에 언급한 것 처럼, IComponentData를 상속받는 구조체로서 Entity의 Data를 가지고 있는 것을 확인할 수 있습니다. 이번 케이스는 Sphere 객체의 속도에 해당하는 Data가 될 것입니다.  

다시 한번 IComponentData Script를 생성하고 이름을 SpawnerData로 수정합니다.
아래와 같이 작성합니다.  

```ruby
using Unity.Entities;
using Unity.Mathematics;
public struct SpawnerData : IComponentData
{
    public Entity Prefab;
    public int NumToSpawn;
}
```
본 스크립트는 위 Sphere Entity를 생성하는 역할을 하는 Data 입니다. 목적에 맞게 Entity와 몇 개의 Sphere를 생성할지 정하는 변수가 선언되어 있습니다.  
  
#### Baker 생성  
이번엔 Entity를 생성할 수 있는 Baking System을 생성해 보겠습니다.  
Project 창에서 마우스 우클릭, Create -> Entities -> Baker Script 선택  
이름을 SpawnerAuthoring으로 수정하고 해당 스크립트를 다음과 같이 작성합니다.  

<p align="center"><img src="/img/UnityFundamental/DOTS/8.png"><br/>
<04. Baker Script ></p>

```ruby
using Unity.Entities;
using UnityEngine;

class SpawnerAuthoring : MonoBehaviour
{
    public GameObject prefab;
    public int numToSpawn;
}

class SpawnerAuthoringBaker : Baker<SpawnerAuthoring>
{
    public override void Bake(SpawnerAuthoring authoring)
    {
        var entity = GetEntity(TransformUsageFlags.Dynamic);
        AddComponent(entity, new SpawnerData
        {
            Prefab = GetEntity(authoring.prefab, TransformUsageFlags.Dynamic),
            NumToSpawn = authoring.numToSpawn
        });
    }
}
```
MonoBehaviour를 상속받는 SpawnerAuthoring 클래스는 아래 Baker 클래스에서 생성할 Entity에 활용하기 위해 객체와 데이터를 참조하는 역할을 합니다.  
하단 Baker 클래스에서 Entity를 생성하고 해당 Entity에 컴포넌트를 추가합니다. 이 과정에서 이전에 생성한 SpawnerData 컴포넌트의 데이터를 참조하게 됩니다. 
  
#### SubScene 구성하기
이번엔 Baker를 작동시킬 SubScene을 구성해 보겠습니다. 

## Overall
지금까지 DOTS의 ECS에 활용하여 객체를 생성해 보았습니다.  

    
  {% include adsense.html %}










  
  
  

  
  
  
