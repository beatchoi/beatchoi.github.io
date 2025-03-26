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
Entity Component System은 Data-Oriented(데이터 지향적) 방식으로 코딩을 하기 위한 프레임워크로서 기존 유니티의 GameObject 중심의 코딩이 아닌 Data와 Logic을 중심으로 코딩을 하게 됩니다. Entity는 각 Component들의 ID역할을 하는, 아주 가벼운 GameObject와 같은 역할을 하며, Component에는 Data가 담기고 System은 Component에 담긴 Data를 기반으로 Logic 수행하는 역할을 합니다. 
예를들어 이동하는 몬스터를 구현한다면, Monster 라는 entity에 Transform Component를 구성하고 MonsterMove 라는 Transform Component를 수정하는 System을 만들어서 몬스터를 이동시킬 수 있습니다.  
  
#### C# Job System
MonoBehaviour의 경우 Update가 메인스레드에서 실행되기 때문에 단일 코어 CPU 에서만 작동하게되며 이를 해결하기 위해서는 손수 나머지 스레드를 관리해 주어야 하지만 이는 위험 부담이 큰 작업입니다. C# Job System을 활용하면 보다 쉽고 효율적으로 멀티스레딩 코드를 작성할 수 있습니다. 
C# Job System은 CPU의 각 코어에 작업 스레드를 할당해 놓습니다. 만약 8코어 환경에서 작업이 된다면 1개의 주 스레드와 7개의 작업 스레드로 이루어지게 됩니다. 
작업 스레드들이 실행하는 일의 단위를 job이라고 하는데 작업 스레드들이 대기 상태라면 다음 queue의 job을 가져와 실행시킵니다. 
만약 작업 스레드에의해 job이 시작했다면 중간에 바뀌지 않고 완료될 때 까지 실행됩니다.  

#### Burst Compiler





<p align="center"><img src="/img/UnityAR/MapsSDK/01/01.png"><br/>
<01. LightshipMap Prefab 생성 ></p>  




  
  
  
  {% include adsense.html %}
  
  
  
