---
layout: post
title:  "Unity3D DOTS 개요 - DOTS 알아보기"
date:   2025-03-29 14:00:07
categories: Unity3D Fundamentals
description: "Unity3D DOTS를 알아봅니다"
image: '/img/UnityAR/LightshipAR/01/00.PNG'
published: true
canonical_url: https://beatchoi.github.io/unity3d/arpage/2025/03/29/DOTSFundamental01/
---
  
  
  {% include adsense.html %}
  
  
## DOTS 알아보기 
#### 개요
DOTS는 `Data Oriented Tech Stack`의 약자로서 기본 상태에서 최적의 성능을 확보할 수 있는 전혀 다른 방식의 코드 작성 방법입니다. DOTS 방식으로 코드를 짠다면 멀티스레드 성능을 통해 더 많은 개체, 더 많은 이펙트, 더 나은 비주얼을 가진 복잡한 콘텐츠를 만들 수 있습니다.  
DOTS는 `Entity Component System`, `C# Job System`, `Burst Compiler` 세 가지 요소로 이루어져 있습니다.  

#### Entity Component System
###### ECS란?
Entity Component System은 Data-Oriented(데이터 지향적) 방식으로 코딩을 하기 위한 프레임워크로서 기존 유니티의 GameObject 중심의 코딩이 아닌 Data와 Logic을 중심으로 코딩을 하게 됩니다. Entity는 각 Component들의 ID역할을 하는, 아주 가벼운 GameObject와 같은 역할을 하며, Component에는 Data가 담기고 System은 Component에 담긴 Data를 기반으로 Logic 수행하는 역할을 합니다. 
예를들어 이동하는 몬스터를 구현한다면, Monster 라는 entity에 Transform Component를 구성하고 MonsterMove 라는 Transform Component를 수정하는 System을 만들어서 몬스터를 이동시킬 수 있습니다.  

###### World
World는 Entity들이 모여있는 세계라고 생각하면 편한데 World에 존재하는 각각의 Entity들은 고유한 ID를 가지고 있습니다. 다른 World에 동일한 ID를 가진 Entity가 있더라도 현재 World의 Entity와는 관계없습니다.   
- World -> Entity의 모음  
- Entity Manager  
    - CreateEntity() 새로운 Entity 생성
    - Instantiate() 존재하는 Entity의 모든 Component를 복제한 새로운 Entity 생성
    - DestroyEntity() 존재하는 Entity 제거  
    - AddComponent() 존재하는 Entity에 컴포넌트 추가  
    - RemoveComponent() 존재하는 Entity에 컴포넌트 제거  
    - HasComponent() Entity가 현재 해당 컴포넌트를 가지고 있으면 참 반환

###### Archetype과 Chunk
Unity의 ECS에서 동일한 Component로 구성된 모든 Entity들은 같은 Archetype으로 저장됩니다. 예를들어 A,B,C 컴포넌트를 가진 모든 Entity가 하나의 Archetype으로 저장되고, A와 B 컴포넌트를 가진 모든 Entity가 또 하나의 Archetype으로 저장됩니다. 만약 Entity의 컴포넌트 구성에 변화가 생긴다면 현재 Archetype에서 다른 Archetype으로 변경됩니다.  
  
<p align="center"><img src="/img/UnityAR/MapsSDK/01/01.png"><br/>
<01. Archetype ></p>
   
이 때 Entity와 Component는 Chunk라고 하는 메모리 블럭 형태로 Archetype에 저장됩니다. Chunk는 최대 128개의 Entity들을 저장할 수 있고 Entity ID와 각 타입의 Component들을 저장하는 배열로 이루어져있습니다. 예를 들어 A, B, C Component를 가진 Entity의 Archetype에는 4개의 배열을 저장하는데,  
- Entity ID를 저장하는 첫 번째 배열  
- A Component를 저장하는 두 번째 배열
- B Component를 저장하는 두 번째 배열
- C Component를 저장하는 두 번째 배열
  로 이루어지게 됩니다.
  
<p align="center"><img src="/img/UnityAR/MapsSDK/01/01.png"><br/>
<02. Chunk ></p>
  
Chunk는 항상 빈틈없이 채워지게 되는데,
- 새로운 Entity가 추가되면, 배열의 비어있는 첫 번째 인덱스에 채워지고
- 기존 Entity가 제거되면 Chunk의 마지막 Entity가 빈 인덱스를 채웁니다.
  
###### Query
Archetype 구조의 데이터 레이아웃의 이점은 특정 Component 타입으로 구성된 Entity를 찾아 순회하는 반복작업이 가능하다는 부분입니다. 조건을 만족하는 모든 Archetype을 찾아 해당 Archetype의 Chunk에서 Entity를 순회합니다. 검색 작업에 활용되어 Query와 일치한 Archetype은 World에 새로운 Archetype이 추가되기 전까지 캐싱되어 순회 작업을 빠르게 진행할 수 있도록 합니다.  
  
###### Components
- Tag Components
- DynamicBuffer Components

###### System
System은 Entity의 World에 속해있는 코드 단위로서 Unity의 메인 스레드에서 돌아가며 보통의 경우 각 World에 속해있는 Entity에만 접근할 수 있습니다. System은 ISystem 인터페이스를 상속받는 구조체로서 아래 세가지 메소드로 구성되어 있습니다.  
- OnUpdate() : 프레임당 한 번씩 호출
- OnCreate() : OnUpdate 이전에 한 번 또는 System이 재개될 때 한 번 호출
- OnDestroy() : System이 제거될 때 한번 호출

위 메소드들은 SystemState라고 하는 매개 변수를 전달합니다. 
  
#### C# Job System
MonoBehaviour의 경우 Update가 메인스레드에서 실행되기 때문에 단일 코어 CPU 에서만 작동하게되며 이를 해결하기 위해서는 손수 나머지 스레드를 관리해 주어야 하지만 이는 위험 부담이 큰 작업입니다. C# Job System을 활용하면 보다 쉽고 효율적으로 멀티스레딩 코드를 작성할 수 있습니다. 
C# Job System은 CPU의 각 코어에 작업 스레드를 할당해 놓습니다. 만약 8코어 환경에서 작업이 된다면 1개의 주 스레드와 7개의 작업 스레드로 이루어지게 됩니다. 
작업 스레드들이 실행하는 일의 단위를 job이라고 하는데 작업 스레드들이 대기 상태라면 다음 queue의 job을 가져와 실행시킵니다. 
만약 작업 스레드에의해 job이 시작했다면 중간에 바뀌지 않고 완료될 때 까지 실행됩니다.  

#### Burst Compiler
Unity의 C# 코드는 기본적으로 Mono를 통해 컴파일됩니다. 다만 위에서 언급한대로 단일 CPU 에서만 작동하기 때문에 효율적인 멀티스레딩 코딩을 위해 Job System을 활용해야 합니다. 이 때 Burst Compiler를 통해 Job System을 활용하면 개발하는 애플리케이션의 퍼포먼스 향상에 큰 도움이 됩니다.  
Burst Compiler는 현재 상태에 따라 다른 방식으로 컴파일을 진행하는데, 
- Unity 플레이 모드일때는 Mono와 같은 Just-in-time 방식으로 진행하고  
- 애플리케이션을 빌드하여 실행하면 ahead-of-time 방식으로 컴파일합니다.







  
  
  
  {% include adsense.html %}
  
  
  
