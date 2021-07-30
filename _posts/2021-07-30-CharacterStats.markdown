---
layout: post
title:  "캐릭터 구성하기 - 캐릭터 스탯 관리하기"
date:   2021-07-30 12:00:07
categories: Unity3D Fundamentals
description: "캐릭터 스탯 클래스를 작성하여 캐릭터의 공격을 구현해봅니다."
image: 'img src="/img/UnityFundamental/CharacterClass/3.gif'
published: true
canonical_url: https://beatchoi.github.io/unity3d/fundamentals/2021/07/30/CharacterStats/
---
  
  
  {% include adsense.html %}
  
  
## 선수포스팅 :: Pre-requisite  
[네비게이션 메시](https://beatchoi.github.io/unity3d/basics/2021/07/28/navigationmesh/)(/br)  
   
  
## 캐릭터 스텟 관리 :: Character Stats  
게임에는 수많은 캐릭터들이 존재하고 각 캐릭터들은 고유의 스텟을 가지고 있습니다. 흔하게는 공격력, 방어력, 체력 등이 있을 수 있을 것이고 
더 나아가서는 리스폰 시간이나 이동 속도 등 여러가지 항목들을 가지고 있을 수 있습니다.  
  
이번시간에는 `Stat` 클래스를 직접 작성하여 캐릭터의 공격 및 죽음을 구현해 보도록 하겠습니다.  
  
  
## 유니티3D 에디터에서  
#### 스크립트 생성  
  
이번 포스팅에서는 총 4개의 스크립트를 작성해야 합니다.  
  
  
먼저 `Stat.cs` 스크립트를 생성하고 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class Stat
{
    [SerializeField]
    private int baseStat;

    public int GetStat()
    {
        return baseStat;
    }
}
```
  
* Stat 클래스는 Monobehaviour를 상속받지 않습니다.    
* 클래스 자체를 System.Serializable 해줌으로서 인스펙터 창에서 해당 값이 나타날 수 있도록 합니다.  
* 다른 스크립트에서 `Stat` 클래스로 변수를 선언할 수 있게 됩니다.  
* GetStat()함수를 통해 타 해당 값에 접근할 수 있습니다.  
  
  
  
그 다음 `CharacterClass.cs` 스크립트를 생성하고 다음과 같이 작성합니다.  
  
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
    }
}

```
  
* `CharacterStats`클래스는 게임의 캐릭터들이 공통으로 가질 수 있는 스탯을 정리합니다.  
* 각 캐릭터들의 최대체력, 현재체력, 공격력을  선언합니다.  
* `currentHealth` 변수는 Get, Private Set 으로 선언되었으며 이는 다른 클래스에서 이 변수에 접근할 수 있지만 값 변경은 현재 클래스에서만 가능하다는 뜻입니다.  
* `TakeDamage` 함수는 자신의 현재체력에서 인자 데미지를 빼주는 역할을 합니다. 중요한것은 `자신의 현재체력에서 상대방의 공격력`만큼을 뺀다는 것입니다.  
*  이는 다음 스크립트에서 설명드리겠습니다.  
  
  
  
그 다음 `CharacterCombat.cs` 스크립트를 생성하고 다음과 같이 작성합니다.  
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(CharStats))]
public class CharCombat : MonoBehaviour
{
    public float atkSpd = 1f;
    private float atkCdw = 0f;

    CharStats myStats;

    private void Start()
    {
        myStats = GetComponent<CharStats>();
    }

    private void Update()
    {
        atkCdw -= Time.deltaTime;
    }

    public void Attack(CharStats targetStats)
    {
        if (atkCdw <= 0)
        {
            targetStats.TakeDamage(myStats.damage.GetStat());
            atkCdw = 1f / atkSpd;
        }
    }
}
```
  
* `CharCombat.cs` 스크립트는 캐릭터의 전투에 관련된 행동들이 정리되어 있습니다.  
* 공격 속도 및 공격딜레이 변수를 선언하고  
* Attack 함수에서 인자로 받은 타겟의 `CharStat` 클래스의 `TakeDamage`함수를 호출시켜 상대방의 체력에 자신의 공격력을 깎습니다.  
* `targetStats` = 상대방의 스탯 클래스  
* `myStats` = 나의 스탯 클래스  
  
    {% include adsense.html %}  
  
마지막으로 `Monster.cs`스크립트를 생성하여 해당 캐릭터(몬스터)의 행동 구조를 작성합니다.  
이전 포스팅중 하나인 `Navigation Mesh` 포스팅을 이하하고 오셔야 합니다.  
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class Monster : MonoBehaviour
{
    CharCombat combat;
    public Transform target;
    NavMeshAgent nav;

    // Start is called before the first frame update
    void Start()
    {
        nav = GetComponent<NavMeshAgent>();
        combat = GetComponent<CharCombat>();
    }

    // Update is called once per frame
    void Update()
    {
        MonsterAI();
    }


    void MonsterAI()
    {
        float distance = Vector3.Distance(target.transform.position, transform.position);
        if (distance > 1.3f)
        {
            nav.SetDestination(target.transform.position);
        }
        else if (distance <= 1.3f)
        {
            CharStats targetStats = target.GetComponent<CharStats>();
            if (targetStats != null)
            {
                combat.Attack(targetStats);//Do melee attack when near target
            }
        }
        else
        {
            nav.SetDestination(transform.position);
        }
    }
}
```
  
* `CharCombat`형의 `combat` 변수를 선언하고 해당 변수에 자신의 컴포넌트를 추가합니다.  
* `MonsterAI` 함수를 작성합니다. 해당 함수는 
  * 상다방과의 거리가 1.3 이하가 될때까지 네비게이션 메시의 `SetDestination` 함수를 통해 서로를 찾아 이동합니다.  
  * 거리가 1.3 이하가 되면 자신의 `Attack` 함수를 호출합니다. 해당 함수의 인자로는 상대방의 `CharStat` 클래스에 접근한 `targetStats` 변수를 넣습니다.  
* 상대방 캐릭터가 없다면 제자리에 머무릅니다.  
  
  
#### 프로젝트 생성 및 세팅
유니티 프로젝트를 생성하고 유니티 기본도형을 활용하여 기본 스테이지를 생성해 봅시다.  
캐릭터가 걸어다닐 수 있는 길은 `Plane`오브젝트로, 캐릭터 오브젝트는 `Capsule`로 간단하게 생성합니다.  
잘 보일 수 있도록 색상도 넣어주고 다음과 같이 씬을 세팅합니다.  
<p align="center"><img src="/img/UnityFundamental/CharacterClass/1.PNG"><br/>
<01. 스테이지 구성></p> 
  
두 캐릭터 오브젝트인 `Capsule` 모두에 우리가 작성한 `CharStats`, `CharCombat`, `Monster` 스크립트를 인스턴스화 시켜줍니다.  
그리고 `Nav Mesh Agent` 컴포넌트 역시 추가해줍니다.  
각 `Capsule`의 스크립트 컴포넌트의 변수들에 다음과 같이 값을 넣어줍니다.  
`CharStats`의 `Damage` 항목은 10, (상대방의 데미지는 20으로 설정하여 차이를 주었습니다.)    
`CharCombat`의 `AtkSpd` 항목은 1,
`Monster`의 `Target` 항목은 상대방 `Capsule` 오브젝트를 넣어주시면 되겠습니다.  
아래 이미지는 `Capsule` 오브젝트의 인스펙터 창입니다.  
<p align="center"><img src="/img/UnityFundamental/CharacterClass/2.PNG"><br/>
<02. 캐릭터 생성></p>   
   
## 테스트 :: Test  
상단 플레이 버튼을 눌러 두 `Capsule` 오브젝트들의 행동을 살펴봅니다.  
다음과 같이 서로 접근을 하게되고 일정 거리 내로 서로가 들어가면 공격을 시작합니다.  
씬 창이나 게임 창에서는 결과를 확인할 수 없기 때문에 인스펙터 창을 `Debug`모드로 변경하여 확인합니다.  
(인스펙터 창 우측 상단 땡땡땡 버튼 클릭, Debug 선택)  
<p align="center"><img src="/img/UnityFundamental/CharacterClass/3.gif"><br/>
<03. 캐릭터의 전투></p>    
  
다음은 인스펙터 창 상에서의 값 변화 입니다.  
curHealth의 값이 상대방의 공격력 만큼 줄어드는 것을 확인할 수 있습니다.  
공격속도 및 딜레이 값도 변경을 하여 값의 변경을 확인해봅시다.  
<p align="center"><img src="/img/UnityFundamental/CharacterClass/4.gif"><br/>
<04. 캐릭터의 스탯 변화></p>  
  
 
#### 정리
이번 포스팅에서 진행한 부분을 정리해 보겠습니다.  
먼저 `Stat` 이라는 클래스는 우리가 활용할 자료형을 직접 만들었다고 생각하시면 됩니다.  
Stat 이라는 자료형을 활용하여 공격력이나 방어력 체력 등 숫자 수치 상 표현할 수 있는 값을 표현합니다.  
  
`CharStat` 클래스를 통해 캐릭터, 유닛 등이 공통으로 가지고 있는 값, 행위 등을 설정합니다.  
예를 들면 스타크래프트의 모든 유닛들은 공통적으로 공격력, 방어력, 체력 등의 값을 가지고 있고 이동, 정지 등의 움직임을 가지고 있습니다.  
이번 포스팅에서는 체력과 공격력을 설정해 주었고 상대방의 공격력에 자신의 체력을 깎는 함수를 선언하였습니다.  
  
`CharCombat` 클래스는 캐릭터의 전투에 관련된 함수를 작성한 클래스입니다.  
`Attack`이라는 함수를 통해 어느정도의 빈도로 공격을 하고 데미지를 줄지 결정합니다.  
활용방법으로는 추후 `CharMove`라는 클래스를 만들어 이동에 관련된 클래스를 작성할 수도 있겠습니다.  
  
마지막으로는 `Monster` 스크립트 입니다.  
`Monster` 스크립트는 각 캐릭터의 특성에 맞는 행위를 작성하기 위한 스크립트입니다.  
현 포스팅에서는 동일한 `Monster` 스크립트를 두 캐릭터에 활용하였지만 나중에는 캐릭터 마다 하나씩 만들어 설정해야 할 수도 있습니다.  
예를들면 스타크래프트의 질럿과 드라군은 공격의 형식이 다르기 때문에 다른 스크립트로 표현하는 것이 편할 수 있습니다.  
  
본 포스팅에서 캐릭터의 기본적인 구조를 짜고 서로 공격을 하도록 해보았습니다.  
다음 포스팅에서는 서로 공격을 하고 체력을 0으로 만들었을 때 사라지게 하는 죽음을 한번 구현해 보도록 하겠습니다.  
  
  
  {% include adsense.html %}
  
  


