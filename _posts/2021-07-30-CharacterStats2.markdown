---
layout: post
title:  "캐릭터 구성하기 - 가상 함수 활용하기"
date:   2021-07-30 14:00:07
categories: Unity3D Fundamentals
description: "캐릭터 클래스에 가상함수를 활용하여 죽음 구현하기."
image: '/img/UnityFundamental/CharacterClass/6.gif'
published: true
canonical_url: https://beatchoi.github.io/unity3d/fundamentals/2021/07/30/CharacterStats2/
---
  
  
  {% include adsense.html %}
  
  
## 선수포스팅 :: Pre-requisite  
[캐릭터 구성하기 - 캐릭터 스탯 관리하기](https://beatchoi.github.io/unity3d/fundamentals/2021/07/30/CharacterStats/)  
   
  
## 가상함수의 활용 :: Virtual Function  
각 캐릭터의 스탯 클래스에 가상함수를 선언하여 해당 클래스를 상속받는 클래스에서 편리하게 호출할 수 있는 함수를 구현해 봅니다.  
이번 포스팅에서는 캐릭터의 죽음을 구현해봅니다.  
  
  
## 유니티3D 에디터에서  
#### 스크립트 생성  
  
먼저 `CharStats.cs` 스크립트를 다음과 같이 수정합니다.  
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharStats : MonoBehaviour
{
    public int maxHealth = 100;
    public int curHealth { get; private set; }

    public Stat damage;


    private void Awake()
    {
        curHealth = maxHealth;
    }

    public void TakeDamage(int damage)
    {
        curHealth -= damage;
        if (curHealth <= 0)
        {
            Die();
        }
    }
    
    public virtual void Die()
    {

    }
}
```
  
* 해당 스크립트 하단에 가상함수로 `Die()` 함수를 선언합니다.  
* `TakeDamage` 함수 내부에 if 문을 통한 체력이 0이 될 때 `Die` 함수를 호출하도록 합니다.  
  
  
그 다음 `MonsterStats.cs` 스크립트를 새로 생성하고 다음과 같이 작성합니다.  
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MonsterStats : CharStats
{
    public override void Die()
    {
        base.Die();
        Destroy(gameObject);
    }
}
```
  
* `MonsterStats.cs`스크립트는 `CharStats` 클래스를 상속받는 자식 클래스 입니다.  
* 따라서 `Monobehaviour`가 아닌 `CharStats`를 상속 받습니다.  
* `Die` 가상 함수를 오버라이딩 합니다.  
* Destroy(gameObject)로 해당 함수가 호출될 때 캐릭터를 제거하도록 합니다.  
  
  
#### 프로젝트 생성 및 세팅
캐릭터 오브젝트인 `Capsule`들의 컴포넌트를 조금 수정해야 합니다.  
이전에는 `CharStats`스크립트를 인스턴스하여 최대체력과 공격력을 설정하였지만  
지금은 `MonsterStats` 스크립트가 `CharStats`를 상송받기 때문에 `CharStats` 컴포넌트는 필요없습니다.  
`MonsterStats.cs`를 `Capsule`오브젝트에 인스턴스화 시켜주고 `CharStats` 컴포넌트는 제거합니다.  
최대체력과 공격력은 다시 수정합니다.  
<p align="center"><img src="/img/UnityFundamental/CharacterClass/5.PNG"><br/>
<01. 캐릭터 수정></p> 
  
   
## 테스트 :: Test  
상단 플레이 버튼을 눌러 두 `Capsule` 오브젝트들의 행동을 살펴봅니다.  
다음과 같이 서로 접근을 하게되고 일정 거리 내로 서로가 들어가면 공격을 시작합니다.  
하나의 캐릭터의 체력이 0이 되었을 때 제거가 되는지 확인합니다.  
<p align="center"><img src="/img/UnityFundamental/CharacterClass/6.gif"><br/>
<03. 캐릭터의 전투></p>    
  
 
#### 정리
이번 포스팅에서는 이전 포스팅에서 구성해놓은 캐릭터 클래스에 가상함수를 선언하고 오버라이딩하여 죽음을 구현하였습니다.  
캐릭터의 종류마다 죽을때의 행위나 설정들이 다를 수 있기 때문에 `CharStats`클래스에서 가상함수로 선언을 해두고  
다른 클래스에서 적합하게 설정하여 호출할 수 있도록 합니다.  
  
  
  {% include adsense.html %}
  
  


