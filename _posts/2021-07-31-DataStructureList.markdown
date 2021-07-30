---
layout: post
title:  "유니티 자료 구조 - 리스트"
date:   2021-07-31 12:00:07
categories: Unity3D Basics
description: "자료 구조 - 리스트를 유니티에서 활용해 봅니다."
image: 'https://media.vlpt.us/images/choijw1116/post/2fc2085a-5df7-453b-aace-4386f1131fb0/data-structure.jpeg'
published: true
canonical_url: https://beatchoi.github.io/2021/07/23/SingletonAndStatic/
---
  
  
  {% include adsense.html %}
  
  
## 리스트 :: List  
자료구조 라는 말에 너무 어렵게 접근하지 말고 유니티에서 개발을 할때 필요한 자료들을 편리하게 정리할 수 있는 기법으로 접근합니다.  
가장 기본적인 자료구조인 배열 다음으로 편하게 활용할 수 있는 기법입니다.  
  
## 유니티3D 에디터에서  
#### 스크립트 생성  
프로젝트 창에서 `DataStructure_List.cs` 스크립트를 생성합니다.  
`DataStructure_List.cs`스크립트를 열어 다음과 같이 작성합니다.  
  
리스트 관련 메소드들은 아래 스크립트의 주석으로 설명되어 있습니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DataStructure_List : MonoBehaviour
{
    [SerializeField]
    GameObject Monster_Cube;
    [SerializeField]
    GameObject Monster_Sphere;
    [SerializeField]
    GameObject Monster_Capsule;

    [SerializeField]
    List<GameObject> MonsterList = new List<GameObject>();//리스트의 생성

    // Start is called before the first frame update
    void Start()//기본적으로 세개의 리스트를 생성합니다
    {
        MonsterList.Add(Monster_Cube);
        MonsterList.Add(Monster_Sphere);
        MonsterList.Add(Monster_Capsule);
    }

    void AddData()//추가하는 명령어의 모음
    {
        MonsterList.Add(Monster_Cube);//맨 마지막에 자료 추가
        MonsterList.Insert(2, Monster_Cube);//원하는 인덱스에 자료 추가

        GameObject[] obj = new GameObject[3];
        obj[0] = Monster_Cube;
        obj[1] = Monster_Sphere;
        obj[2] = Monster_Capsule;
        MonsterList.InsertRange(2, obj);//원하는 인덱스에 여러개의 값(배열)추가
        MonsterList.AddRange(obj);//맨 마지막에 여러개의 값(배열)추가
    }

    void checkData()//데이터 체크 명령어 모음
    {
        MonsterList.Sort();//리스트 안의 값들을 
    
        if (MonsterList.Contains(Monster_Cube))//값이 있는지 없는지 체크
        {
            Debug.Log("List Contains Cube");
        }

        int index = MonsterList.BinarySearch(Monster_Cube);//Monster_Cube라는 데이터가 어디에 있는지 인덱스 번호로 호출
        Debug.Log(index);
    }

    void DeleteData()
    {
        MonsterList.Remove(Monster_Capsule);//Monster_Capsule 제거
        MonsterList.RemoveAt(2);//리스트의 2번 인덱스 값 제거(3번째 값)
        MonsterList.Clear();//모두 제거
        MonsterList.RemoveRange(0, 2);//0,1,2 인덱스 값 제거

    }
    
    // Update is called once per frame
    void Update()
    {
    }
}
```
  
* 눈에 띄는 배열과의 가장 큰 차이점은 선언입니다.  
  * `List<자료형> 변수이름 = new List<자료형>()` 형태로 선언합니다.   
  
* 활용은 배열과 동일합니다.  
  * `MonsterList[0]`과 같이 리스트이름[인덱스번호] 로 데이터에 접근합니다.  
  
* 배열과의 또 다른 차이점은 데이터의 관리입니다.  
  * 배열은 선언때 설정한 데이터의 크기를 계속 가져가지만 리스트는 크기를 정해놓지 않습니다.  
  * 대신 필요할 때 추가하거나(Add 등) 제거(Remove 등) 하며 데이터를 관리합니다.  
  * 추가할때 기본적으로는 리스트의 맨 마지막 인덱스에 추가되지만 활용에 따라 원하는 부분에 추가할 수도 있습니다.  
  * 제거도 마찬가지
* 조금 더 쉽게 이해하자면 크기를 미리 정해놓지 않는 배열이라고 생각하면 편합니다.  
  
#### 씬 설정
계층구조창에 빈 게임오브젝트를 생성하고 이름을 `MonsterList`로 변경합니다.  
`MonsterList` 오브젝트에 `DataStructure_List.cs` 스크립트를 인스턴스화 시킵니다.  
  
몬스터 역할을 할 오브젝트 세개를 생성합니다. 이번 포스팅에선 각각 `Cube`, `Sphere`, `Capsule`을 사용하겠습니다.  
생성한 오브젝트들을 모두 프리펩화 시켜줍니다.  
  
`MonsterList` 오브젝트를 생성하고 `DataStructure_List` 컴포넌트의 `Monster_Cube`, `Monster_Sphere`, `Monster_Capsule` 항목에 각각  
`Cube`, `Sphere`, `Capsule`을 넣어줍니다.  
  
<p align="center"><img src="/img/UnityBasic/DataStructure/1.PNG"><br/>
<01. 인스펙터 확인></p>
  
  
상단 플레이 버튼을 눌러 `Monster List` 항목에 각각 값들이 지정되는지 확인합니다.  
   
위 스크립트의 `AddData`, `CheckData`, `DeleteData` 함수들은 호출이 되어있지 않은 상태입니다.  
해당 함수들 안에 List에 관련된 메소드들은 여러분들이 각자 한번씩 호출해 보면서 활용 방법을 익혀봅니다.  
  
<p align="center"><img src="/img/UnityBasic/DataStructure/2.PNG"><br/>
<02. 기본 Start()함수 호출할 때></p>
  
<p align="center"><img src="/img/UnityBasic/DataStructure/3.PNG"><br/>
<03. Start()함수에 AddData() 함수를 추가로 호출했을 때></p>
  
#### 설명
리스트는 가장 기본적이면서 데이터 관리가 편리한 자료구조입니다. 데이터를 쉽게 추가, 제거할 수 있고 접근할 수 있습니다.  
가장 보편적으로 많이 쓰이기 때문에 다른 스크립트를 보았을 때 이해할 수 있도록 본 포스팅을 통해 유니티 C#에서의 리스트 활용을 익혀두는 것을 추천드립니다.  
  
위 메소드들을 모두 호출해보신 분들은 눈치 채셨겠지만 `Sort`메소드와 `BinarySearch`메소드는 제대로 작동하지 않는 것을 확인할 수 있습니다.  
`BinarySearch`같은 경우는 리스트가 미리 정렬되어 있어야 작동하고, `Sort`같은 경우에는 현재 리스트의 형태가 `GameObject`이기 때문에 다른 조취를 취해줘야 합니다.  
  
다음 포스팅에서는 리스트에서 게임오브젝트를 정렬하고 이진찾기를 해보도록 하겠습니다.  
  
  
  
  {% include adsense.html %}
  
  


