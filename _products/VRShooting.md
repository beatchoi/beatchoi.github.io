---
title: 국가정원 대소동 튤립을 지켜라
subtitle: 2021 순천시 4차산업 박람회 ‘2021 NEXPO in 순천
description: Unity3D,C#,VR,XR,AzureKinect,HTCVive
layout: product
image: /img/portfolio/VRShooting/vrshooting.PNG
price: 99
features:
    - label: 개발 기간 - 2020.04 – 2020.09 (4 년차)  
    - label: 수행 PJT - 콘텐츠 개발 프로젝트  
    - label: 담당 업무 - XR 콘텐츠 개발  
    - label: 개발 비중 - 100%
---

본 프로젝트는 순천만 국가정원을 배경으로 기획된 지역 특화 콘텐츠로 VR 슈팅게임 하는 플레이어와 VR 슈팅게임을 하기위해 기다리는 대기자들간의 경쟁을 주제로 개발되었습니다. 대기자들(2-4명)은 바디 트래킹이 되는 기기 앞에서 팔을 이용하여 특정 색상의 캡슐을 파괴하여 게이지를 채우고, 게이지가 모두 차게되면 해당 색상의 몬스터를 VR 플레이어에게 소환하여 VR 플레이어가 정원을 방어하는 것을 방해하면 됩니다.   
    
#### 주요업무  
- Unity3D 와 HTC VIVE VR 기기를 활용한 VR 콘텐츠 개발  
- Microsoft Azure Kinect 를 활용한 바디트래킹 콘텐츠 개발  
  
#### 획득역량  
- SteamVR SDK를 활용하여 HTC VIVE VR 기기 기반의 6Dof VR 콘텐츠 개발 방법  
- Object Pooling을 활용한 효율적인 객체 관리  
- Bezier Path Creator 에셋을 활용한 경로 생성  
- 몬스터와 플레이어간의 공격 구현을 위한 이벤트의 활용  
- Navigation Mesh를 활용한 몬스터의 객체 추적   
- Microsoft Azure Kinect 깊이 카메라를 이용한 Body Tracking 기능의 활용
  
본 콘텐츠에 나오는 다양한 몬스터와 총알들 모두 Object Pooling을 활용하여 미리 생성해 둔 후 필요할 때 불러와서 활용하였습니다. 한번 불러온 객체를 다시 활용하기 전에 해당 객체의 정보를 모두 초기화 해 주어야 재활용할 때 원하는 대로 제어할 수 있습니다. 지상 몬스터들은 꽃밭의 가장 바깥쪽 줄 부터 무작위로 선택해서 공격하고 이미 공격을 받고 있는 꽃은 다른 몬스터에 의해 선택받지 않도록 했습니다. 현재 남아있는 꽃의 수는 delegate로 하나도 남지 않을 때의 이벤트를 받아 게임 오버를 구현합니다. 하늘을 나는 몬스터는 Bezier Path Creator 에셋을 활용하여 경로를 미리 만들고 해당 경로를 날아다니는 몬스터가 생성되면 경로를 반복해서 날아다니도록 했습니다. 상위 클래스에 공격이라는 함수를 생성해 두고 해당 클래스를 몬스터 또는 미사일이 상속받아 객체간의 공격이 성립할 수 있도록 했습니다. 미사일은 플레이어 또는 몬스터가 발사할 경우 각각 몬스터나 꽃에 공격할 수 있고 근접 공격을 하는 몬스터에도 해당 클래스를 상속받아 꽃을 공격할 수 있도록 했습니다.   
대기자 게임의 경우 Azure Kinect를 Unity3D에서 활용할 수 있는 오픈소스 sdk를 활용하여 바디트래킹을 활용하였고 사람의 손 부분에 충돌체를 달아 날아오는 공과 충돌할 수 있도록 구성했습니다.  

#### 주요 코드

CharacterStats 스크립트는 본 게임에 출현하는 모든 캐릭터 객체의 행동을 관장하는 스크립트 입니다. 각 캐릭터의 최대, 현재 체력, 공격력등을 선언하고 데미지를 받는 로직 및 여러가지 행동들을 선언 및 가상 선언 해 놓았습니다.
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharacterStats : MonoBehaviour
{
    public int maxHealth = 100;
    public int currentHealth { get; private set; }

    public Stat damage;
    public Stat armor;

    public bool isInvincible;
    public int numEnemyOn;
    private void Awake()
    {
        currentHealth = maxHealth;
    }
    
    public void TakeDamage(int damage)
    {
        damage -= armor.GetValue();
        damage = Mathf.Clamp(damage, 0, int.MaxValue);

        if (isInvincible) damage = 0;
        currentHealth -= damage;
        Debug.Log(transform.name + "takes" + damage + "damage.");
        damageTaken();
        if(currentHealth <= 0)
        {
            Die();
        }
    }

    public void GetFullHP(int hp)
    {
        if(currentHealth <= 0)
        {
            Revive();
        }
        currentHealth = hp;
    }

    public void regenHealth(int hp)
    {
        if(currentHealth < maxHealth) currentHealth += hp;
    }

    public void beInvincible()
    {
        isInvincible = true;
    }

    public virtual void damageTaken() { }
    public virtual void Die() { }
    public virtual void Revive() { }
}
```

FlowerStats 스크립트는 CharacterStats를 상속받는 캐릭터 스크립트 중 하나입니다. `get,set 프로퍼티`와 `이벤트 핸들러`를 활용하여 꽃을 공격하는 몬스터의 숫자를 조절하고 CharacterStats 스크립트에서 die 함수를 override하여 꽃이 생명력을 다 했을 때 어떤 행동을 하는지 설정했습니다. 꽃이 죽을 때 애니메이션이 아니라 SkinnedMeshRenderer의 프로퍼티를 활용하여 꽃이 죽는 장면을 연출합니다. 
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
delegate void EventHandler();

public class FlowerStats : CharacterStats
{
    
    public int flowerIndex;
    EventHandler eventHandler;
    EventHandler eventHandler2;

    bool isDeath;

    //witherFlower
    int blendNum;
    SkinnedMeshRenderer smrenderer;

    private void Start()
    {
        smrenderer = GetComponentInChildren<SkinnedMeshRenderer>();
        flowerIndex = transform.GetSiblingIndex();
        FlowerManager.Instance.remainObj.Add(flowerIndex);
        eventHandler = new EventHandler(removeList);
        eventHandler2 = new EventHandler(addList);
    }

    public int enemiesOn
    {
        get { return numEnemyOn; }
        set{
            numEnemyOn = value;
            if (numEnemyOn >= 3) eventHandler();
            else if (numEnemyOn <= 0) eventHandler2();
        }
    }

    private void OnEnable()
    {
        FlowerManager.Instance.numFlowers++; 
    }

    public void removeList()
    {
        FlowerManager.Instance.removeObj(flowerIndex);
    }

    public void addList()
    {
        numEnemyOn = 0;
        FlowerManager.Instance.addObj(flowerIndex);

    }

    public override void damageTaken()
    {
        base.damageTaken();
        //blendNum =  120/currentHealth * 100 - 100;
        //smrenderer.SetBlendShapeWeight(0, blendNum);
        StartCoroutine(witherFlower());
    }

    public override void Die()
    {
        base.Die();
        if (!FlowerManager.Instance.allObjects.Contains(flowerIndex))
        {
            FlowerManager.Instance.allObjects.Add(flowerIndex);
        }
        if (FlowerManager.Instance.remainObj.Contains(flowerIndex))
        {
            FlowerManager.Instance.remainObj.Remove(flowerIndex);
        }
        isDeath = true;
        if (FlowerManager.Instance.checkList(flowerIndex))
        {
            FlowerManager.Instance.removeObj(flowerIndex);
        }
       
        gameObject.SetActive(false);
    }
    
    public IEnumerator witherFlower()
    {
        if (currentHealth <= 60)
        {
            while (blendNum != 100)
            {
                smrenderer.SetBlendShapeWeight(0, blendNum);
                blendNum += 1;
                yield return null;
            }
        }
    }
    
    private void OnDisable()
    {
        FlowerManager.Instance.numFlowers--;
       
    }
}

```

#### 콘텐츠 시연
<p align="center">
    <img src="/img/vrplay.gif" width="49%">
    <img src="/img/portfolio/VRShooting/VRShooting03.gif" width="49%">
    <figcaption align="center">VR 플레이어 및 대기자 플레이어의 모습</figcaption>
</p>
<br/>

<p align="center">
    <img src="/img/portfolio/VRShooting/VRShooting01.gif" width="49%">
    <img src="/img/portfolio/VRShooting/VRShooting02.gif" width="49%">
    <figcaption align="center">대기자 플레이어로부터 소환된 몬스터</figcaption>
</p>
<br/>



