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
Scene 창 에서 마우스 우 클릭 -> New Sub Scene -> Empty Scene 을 선택합니다.  

<p align="center"><img src="/img/UnityFundamental/DOTS/9.png"><br/>
<05. Baker Sub Scene ></p>

해당 Sub Scene에서 빈 게임 오브젝트를 하나 생성하고 해당 객체에 위에서 작성한 SpawnerAuthoring baker 스크립트를 연결합니다.  
그리고 Sphere 프리펩을 하나 생성하고 해당 프리펩을 SpawnerAuthoring 컴포넌트의 인자에 연결합니다. NumToSpawn 항목은 일단 1로 지정합니다.  

#### System 구성하기
지금 까지의 과정으로 Entity를 World에 생성할 수 있게 되었습니다. 하지만 아직 Entity는 데이터 조각일 뿐 눈에 보이거나 인터랙티브한 기능을 가지고 있지 않습니다. 때문에 어떠한 작업을 진행 할 System 이 필요합니다.  

Project 창에서 마우스 우클릭 -> Create -> Entities -> ISystem Scripts 을 선택하고 이름을 SpawnerSystem으로 변경한 뒤 아래와 같이 작성합니다.  

```ruby
using Unity.Burst;
using Unity.Entities;
using Unity.Transforms;
using Unity.Mathematics;

partial struct SpanwerSystem : ISystem
{
    Random rng;
    [BurstCompile]
    public void OnCreate(ref SystemState state)
    {
        rng = new Random(100);
    }

    [BurstCompile]
    public void OnUpdate(ref SystemState state)
    {
        EntityCommandBuffer ecb = new EntityCommandBuffer(Unity.Collections.Allocator.Temp);
        
        foreach(var (spawner, entity) in SystemAPI.Query<RefRO<SpawnerData>>().WithEntityAccess())
        {
            SpawnSphere(ref state, spawner, ecb);
            ecb.DestroyEntity(entity);
        }

        ecb.Playback(state.EntityManager);
        ecb.Dispose();
    }

    [BurstCompile]
    public void OnDestroy(ref SystemState state)
    {
        
    }

    private void SpawnSphere(ref SystemState state, RefRO<SpawnerData> spawner, EntityCommandBuffer ecb)
    {
        for (int i = 0; i < spawner.ValueRO.NumToSpawn; i++)
        {
            Entity newEntity = state.EntityManager.Instantiate(spawner.ValueRO.Prefab);

            ecb.SetComponent(newEntity, new LocalTransform
            {
                Position = new float3(rng.NextFloat(-50,50), rng.NextFloat(-50, 50), rng.NextFloat(-50, 50)),
                Scale = 1f
            });
        }
    }
}
```
DOTS에서는 시스템 실행 중 다음 작업들은 위험합니다.
- Entity의 생성 및 삭제
- Archetype의 구조 변경 (컴포넌트 추가 및 제거)
때문에 EntityCommandBuffer를 통해 여러 작업을 안전하게 진행할 수 있습니다. 예를 들어 시스템 업데이트 중에도 Entity를 안전하게 생성 및 삭제할 수 있고 Component의 수정 작업을 예약할 수 있습니다. 또한 병렬로 JOB과 함께 활용할 수 있고 예약된 작업을 Playback()을 통해 실행시킬 수 있습니다.


## Overall
지금까지 DOTS의 ECS에 활용하여 객체를 생성해 보았습니다.  

    
  {% include adsense.html %}










  
  
  

  
  
  
