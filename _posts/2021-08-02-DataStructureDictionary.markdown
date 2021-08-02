---
layout: post
title:  "유니티 자료 구조 - 딕셔너리<Dictionary>"
date:   2021-08-02 14:00:07
categories: Unity3D Basics
description: "자료 구조 - 딕셔너리를 유니티에서 활용해 봅니다."
image: 'https://media.vlpt.us/images/choijw1116/post/2fc2085a-5df7-453b-aace-4386f1131fb0/data-structure.jpeg'
published: true
canonical_url: https://beatchoi.github.io/unity3d/basics/2021/08/02/DataStructureDictionary/
---
  
  
  {% include adsense.html %}
  
  
## 딕셔너리 :: Dictionary  
배열이나 리스트 같은 경우에는 원하는 값에 접근할 때 `index`번호로 접근하게 되며 이 `index`는 정수로 구성되어 있습니다.  
`Dictionary`의 경우 배열이나 리스트의 `index`를 사용자가 지정할 수 있습니다. 이를 `dictionary`에서는 `key`라고 합니다.  
쉽게말해 내가 지정한 값에 이름표를 붙인다고 생각하면 편합니다.  
다음 예제는 `SwordDamage`라는 `dictionary`를 생성하고 `SwordDamage`안에 각각의 검의 종류를 키로 지정하고 해당 검의 종류에 따라 다른 데미지를 줘보도록 하겠습니다.  
  
## 유니티3D 에디터에서  
#### 스크립트 생성  
프로젝트 창에서 `DataStructure_Dictionary.cs` 스크립트를 생성합니다.  
`DataStructure_Dictionary.cs`스크립트를 열어 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DataStructure_Dictionary : MonoBehaviour
{
    //Dictionary 선언
    //검의 종류(키)와 대미지(값) 
    Dictionary<string, int> SwordDamage = new Dictionary<string, int>();

    // Start is called before the first frame update
    void Start()
    {
        AddData();
        CallData();
        FindData();
    }

    void AddData()
    {
        //검의 종류는 String, 대미지는 int 값으로 추가
        SwordDamage.Add("ShortSword", 5);
        SwordDamage.Add("BroadSword", 10);
        SwordDamage.Add("LongSword", 15);
    }

    void CallData()
    {
        //데이터를 불러오고 데이터를 출력
        int damage = SwordDamage["ShortSword"];
        Debug.Log("ShortSword's damage is "+damage);
        damage = SwordDamage["BroadSword"];
        Debug.Log("BroadSword's damage is " + damage);
        damage = SwordDamage["LongSword"];
        Debug.Log("LongSword's damage is " + damage);
    }

    void FindData()
    {
        //원하는 데이터를 키로 검색
        if (!SwordDamage.ContainsKey("LongSword")) SwordDamage.Add("LongSword", 15);
        if (!SwordDamage.ContainsKey("GrandSword")) SwordDamage.Add("GrandSword", 20);
        ReadAllData();
    }

    void ReadAllData()
    {
        //딕셔너리의 반복문 활용
        foreach(KeyValuePair<string, int> data in SwordDamage)
        {
            Debug.Log(data.Key + "'s damage is " + data.Value);
        }
    }
}
```
  
* `Dictionary`의 선언은 `Dictionary<키 자료형, 값 자료형> 변수이름 = new Dictionary<키 자료형, 값 자료형>()` 의 형태입니다.  
* 데이터의 추가는 `Add(키, 값) 의 형태입니다.  
* `Dictionary`는  `int damage = SwordDamage["ShortSword"];`처럼 키로 값을 저장할 수 있습니다.  
* `Dictionary`는 `ContainsKey()`메소드로 해당 키가 존재하는지 검색할 수 있습니다.  
* `Dictionary`는 일반적인 `index`로 접근하지 않기때문에 `for`문을 활용할 수 없습니다.  
  * `foreach`문을 활용하여 모든 값에 접근할 수 있습니다.   
  
#### 씬 설정
계층구조창에 빈 게임오브젝트를 생성하고 이름을 `Dictionary`로 변경합니다.  
`Dictionary` 오브젝트에 `DataStructure_Dictionary.cs` 스크립트를 인스턴스화 시킵니다.  
  
상단 플레이 버튼을 누르고 `Console` 창에 프린트되는 메시지를 확인합니다.  
  
<p align="center"><img src="/img/UnityBasic/DataStructure/6.PNG"><br/>
<01. 콘솔 확인></p>
  
`CallData`에서 호출된 `Debug.Log` 세줄과  
`FindData`에서 호출된 `Debug.Log` 네줄이 나타나면 성공입니다.  
`FindData`에서 
  
#### 설명
  
  
  
  {% include adsense.html %}
  
  


