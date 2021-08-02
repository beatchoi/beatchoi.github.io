---
layout: post
title:  "유니티 자료 구조 - 큐"
date:   2021-08-01 12:00:07
categories: Unity3D Basics
description: "자료 구조 - 큐를 유니티에서 활용해 봅니다."
image: 'https://media.vlpt.us/images/choijw1116/post/2fc2085a-5df7-453b-aace-4386f1131fb0/data-structure.jpeg'
published: true
canonical_url: https://beatchoi.github.io/unity3d/basics/2021/08/01/DataStructureQueue/
---
  
  
  {% include adsense.html %}
  
  
## 큐 :: Queue  
기본적인 자료구조 중 하나인 큐(queue)는 리스트나 배열과 달리 데이터를 집어넣거나(Enequeue), 빼내는(Dequeue) 두개의 작업으로 데이터를 관리합니다.  
이말은 리스트와는 다르게 데이터의 순서를 재배치하거나 중앙의 데이터를 삭제, 삽입하는 등의 편집을 할수 없다는 뜻입니다.  
편집이나 순서가 크게 상관이 없는 데이터라면 보다 간단한 구조로 되어있는 큐를 통해 관리를 하는것이 더 좋을 때가 있습니다.  
  
큐는 선입 선출의 개념입니다. 데이터가 삽입될 때 하나의 터널에 들어간다고 생각하면 쉽습니다.  
데이터가 Enqueue 되면 터널에 차가 들어가듯이 데이터가 삽입됩니다.  
데이터가 Dequeue 되면 터널에 맨 처음으로 들어간 차가 제일 처음 나오듯이 가장 먼저 Enqueue된 데이터가 호출됩니다.  
데이터가 Dequeue로 호출되면 해당 큐에 있던 데이터는 호출되며 동시에 큐에서 제거됩니다.  
아래 게임오브젝트 큐를 만들어 보면서 알아봅시다.  
  
## 유니티3D 에디터에서  
#### 스크립트 생성  
프로젝트 창에서 `DataStructure_Queue.cs` 스크립트를 생성합니다.  
`DataStructure_Queue.cs`스크립트를 열어 다음과 같이 작성합니다.  
  
리스트 관련 메소드들은 아래 스크립트의 주석으로 설명되어 있습니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DataStructure_Queue : MonoBehaviour
{
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DataStructure_Queue : MonoBehaviour
{
    [SerializeField]
    GameObject Monster_Cube;
    [SerializeField]
    GameObject Monster_Sphere;
    [SerializeField]
    GameObject Monster_Capsule;

    
    Queue<GameObject> MonsterQueue = new Queue<GameObject>();//큐의 생성

    // Start is called before the first frame update
    void Start()
    {
        AddData();
    }

    void AddData()
    {
        MonsterQueue.Enqueue(Monster_Cube);     //큐에 데이터 추가
        MonsterQueue.Enqueue(Monster_Sphere);   //큐에 데이터 추가
        MonsterQueue.Enqueue(Monster_Capsule);  //큐에 데이터 추가
        for (int i = 0; i < 3; i++) Debug.Log(MonsterQueue.Dequeue());//큐에 데이터 호출
        if (MonsterQueue.Count == 0) Debug.Log("Queue is Empty");//큐가 비어있다면 로그 호출
    }

    void RemoveData()
    {
        MonsterQueue.Dequeue();//큐에 데이터 뽑아내기
    }
}

```
  
* 딱 두가지의 메소드만 활용할 수 있으면 됩니다.  
* Enqueue는 리스트의 Add와 비슷합니다. 큐에 해당 데이터를 삽입합니다.  
* Dequeue는 데이터를 호출할 때 활용합니다.  
  * 데이터 호출 시 큐에서 제거됩니다.  
  * 데이터 호출 시 해당 타입으로 자동으로 반환됩니다.  
* 큐는 MonsterQueue[0] 등으로 배열이나 리스트 처럼 값에 접근할 수 없습니다. 유의하시기 바랍니다.  
  
#### 씬 설정
계층구조창에 빈 게임오브젝트를 생성하고 이름을 `MonsterQueue`로 변경합니다.  
`MonsterQueue` 오브젝트에 `DataStructure_Queue.cs` 스크립트를 인스턴스화 시킵니다.  
  
몬스터 역할을 할 오브젝트 세개를 생성합니다. 이번 포스팅에선 각각 `Cube`, `Sphere`, `Capsule`을 사용하겠습니다.  
생성한 오브젝트들을 모두 프리펩화 시켜줍니다.  
  
`MonsterQueue` 오브젝트를 생성하고 `DataStructure_Queue` 컴포넌트의 `Monster_Cube`, `Monster_Sphere`, `Monster_Capsule` 항목에 각각  
`Cube`, `Sphere`, `Capsule`을 넣어줍니다.  
  
<p align="center"><img src="/img/UnityBasic/DataStructure/4.PNG"><br/>
<01. 인스펙터 확인></p>
  
상단 플레이 버튼을 누르고 `Console` 창에 프린트되는 메시지를 확인합니다.  
  
<p align="center"><img src="/img/UnityBasic/DataStructure/5.PNG"><br/>
<02. 콘솔 확인></p>
  
확인을 해보면 데이터의 추가 순서는 `Cube`, `Sphere`, `Capsule`입니다.  
Dequeue를 하면서 찍은 로그를 확인해보면 Dequeue가 된 순서 역시 `Cube`, `Sphere`, `Capsule`입니다.  
먼저 삽입된 값이 먼저 호출되는 것을 확인할 수 있습니다.  
  
#### 설명
큐는 데이터를 터널에 삽입하는 것과 같은 `선입선출`방식의 자료구조입니다.  
큐의 데이터 편집은 Enqueue와 Dequeue 두가지며 이러한 간단한 특징때문에 자료의 입출이 빈번한 구조에서 활용됩니다.  
예를들면 RTS 장르의 게임에서 유닛에게 여러가지 명령을 순차적으로 제공할 때 해당 명령을 큐로 관리하면 명령이 제공된 순서대로 유닛이 활동하게 되겠습니다.  
  
  
  
  {% include adsense.html %}
  
  


