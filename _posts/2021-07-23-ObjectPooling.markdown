---
layout: post
title:  "콘텐츠 개발 기법 - 오브젝트 풀링(Object Pooling)"
date:   2021-07-16 19:00:07
categories: Unity3D Basics
description: "오브젝트 풀링(Object Pooling)기법을 구현해봅니다."
image: '/img/UnityFundamental/ObjectPooling/6.gif'
published: true
canonical_url: http://beatchoi.github.io/unity3d/basics/2021/07/16/CharacterController2/
---
  
  
  {% include adsense.html %}
  
  
## 오브젝트 풀링 :: Object Pooling  
우리가 콘텐츠를 개발할때 매우 많은 수의 오브젝트를 다루는 상황에 직면하곤 합니다. FPS게임의 총알이나 매 라운드 생성되는 몬스터 같이 말이죠.  
하지만 오브젝트가 필요한 매 순간마다 해당 오브젝트를 생성하고 제거하게 된다면 어플리케이션 내 과부하가 일어나게 됩니다.  
오브젝트의 생성과 제거는 의외로 리소스를 많이 잡아먹는 행위이기 때문입니다.  
이를 구조적으로 해결하기 위해 보통 오브젝트 풀링이라는 기법을 활용합니다.  
오브젝트 풀링이란 간단하게 말해 오브젝트를 콘텐츠 시작단에 미리 필요한만큼 생성시켜놓고 보이지 않는 어딘가 숨겨놓습니다.  
그리고 필요할 때마다 생성시켜놓은 오브젝트를 불러와서 활용하고 활용하고 난 뒤에는 제거하지 않고 다시 원위치 시켜놓는 것입니다.  
이렇게 오브젝트를 관리하게되면 시작단에 생성시킬 때를 제외하고는 오브젝트의 생성과 제거를 진행하지 않기 때문에 효율적인 리소스 관리를 할 수 있습니다.  
  
## 유니티3D 에디터에서  
#### 스크립트 생성  
프로젝트 창에서 `ObjectPool.cs` 스크립트를 생성합니다.  
오브젝트 풀링을 구현하는 `ObjectPool.cs`스크립트를 열어 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class ObjectPool : MonoBehaviour

{
    public static ObjectPool Instance;
    
    [Serializable]
    public class QueueData
    {
        public int num;
        public string QueueName;
        public GameObject prefab;
    }
    [SerializeField] public QueueData[] Objects;
    
    public Dictionary<string, Queue<GameObject>> QueueDic = new Dictionary<string, Queue<GameObject>>();
    private int DictionaryIndex;

    private void Awake()
    {
        if(Instance == null) Instance = this;
        InitQueue();
    }

    private void InitQueue()
    {
        for(int i = 0; i<Objects.Length; i++)
        {
            QueueDic.Add(Objects[i].QueueName, new Queue<GameObject>());

            for(int j = 0; j < Objects[i].num; j++)
            {
                QueueDic[Objects[i].QueueName].Enqueue(CreateNewObject(Objects[i].prefab));
            }
        }
    }
   
    private GameObject CreateNewObject(GameObject obj)
    {
        var newObj = Instantiate(obj);
        newObj.gameObject.SetActive(false);
        newObj.transform.SetParent(transform);
        return newObj;
    }

    void CheckDictionaryIndex(string key)
    {
        for (int i = 0; i < QueueDic.Count; i++)
        {
            if (QueueDic.ContainsKey(key))
            {
                DictionaryIndex = i;
                break;
            }
        }
    }

    public static GameObject GetObject(Queue<GameObject> objQueue, string key)
    {
        if (objQueue.Count > 0)
        {
            var oldObj = objQueue.Dequeue();
            oldObj.transform.SetParent(null);
            oldObj.gameObject.SetActive(true);
            return oldObj;
        }
        else
        {
            Instance.CheckDictionaryIndex(key);
            var newObj = Instance.CreateNewObject(Instance.Objects[Instance.DictionaryIndex].prefab);
            newObj.gameObject.SetActive(true);
            newObj.transform.SetParent(null);
            return newObj;
        }
    }

    public static void ReturnObject(Queue<GameObject> objQueue, GameObject obj)
    {
        obj.GetComponentInChildren<Rigidbody>().velocity = Vector3.zero;
        obj.gameObject.SetActive(false);
        obj.gameObject.transform.localPosition = new Vector3(0, 0, 0);
        obj.transform.SetParent(Instance.transform);
        objQueue.Enqueue(obj);
    }
}


```
  
* `ObjectPool.cs`스크립트는 여러 객체에서 접근할 수 있도록 하기 위해 `Static Instance`를 통한 싱글톤화 시켜줍니다.  
* 내부클래스(Nested Class) 를 선언합니다.  내부클래스에는 1. 풀링시킬 오브젝트 프리펩, 2. 풀링 이름, 3. 풀링 횟수 입니다. 
* 위 내부 클래스 형태의 변수를 선언합니다.  
* 그리고 마지막으로 `Dictionary`를 선언합니다. `Dictionary`에는 문자열 형태의 키와 큐 형태의 값으로 설정합니다.  
  
* InitQueue() 함수는 설정된 오브젝트를 설정된 횟수만큼 풀링시키는 역할을 합니다.  
* GameObject 형태의 CreateNewObject()함수는 첫 풀링 시 오브젝트를 생성시키는 역할을 합니다. 생성후 오브젝트를 비활성화 한 뒤 계층을 변경합니다.  
* GameObject 형태의 GetObject()함수는 풀링된 오브젝트를 큐 내에서 불러오는 역할을 합니다. 
 * 큐 내에 풀링된 오브젝트가 존재하면 `Dequeue`로 불러오고,  
 * 큐 내에 모든 오브젝트를 사용하고 있으면 새로운 오브젝트를 생성하여 풀링합니다.  
* ReturnObject()함수는 활성화 되어있는 오브젝트를 다시 풀로 넣어주는 역할을 합니다. `Enqueue`로 넣어줍니다.  
* CheckDictionaryIndex()함수는 `Dictionary`의 키 값으로 해당 키의 순서를 찾는 역할을 합니다.  \
  
  
    {% include adsense.html %}
  
  
그리고 풀링시킬 오브젝트에 인스턴스화 시킬 `ObjectChar.cs`스크립트를 생성합니다.  
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectChar : MonoBehaviour

{
    //public string bulletType;
    private void OnEnable()
    {
        Invoke("returnObject", 1.5f);
    }

    private void OnDisable()
    {
        //Invoke("returnBullet", 0f);
    }

    public void returnObject()
    {
        ObjectPool.ReturnObject(ObjectPool.Instance.QueueDic[this.gameObject.name.Remove(gameObject.name.Length - 7)], this.gameObject);
    }
}
```
  
* 기본적으로 오브젝트 풀링에 활용되는 오브젝트는 원래 풀에 돌아가는 로직이 구현되어 있습니다.  
* returnObject()함수는 `ObjectPool`에서 구현된 ReturnObject() 함수를 호출하는 역할을 합니다.  
 * `ObjectPool.cs`에서 선언된 `Dictionary`에서 이 오브젝트의 이름을 가지고 옵니다.  
  
그리고 마지막으로 테스트를 진행하기 위한 `Test.cs` 스크립트를 작성합니다.  
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Test : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        GameObject obj = ObjectPool.GetObject(ObjectPool.Instance.QueueDic["Cube"], "Cube");
        
    }
}
```

  * GetObject()함수를 호출하여 풀링 큐에서 오브젝트를 불러옵니다.  
  
  
#### 오브젝트 설정  
  
먼저 풀링시킬 오브젝트를 생성시켜봅니다.  
  
계층구조창에서 `Cube`오브젝트를 생성합니다.  
생성한 오브젝트에 `ObjectChar.cs` 스크립트를 인스턴스화 시킵니다.  
그리고 `Project`창으로 드래그 앤 드롭을 하여 `프리펩화` 시켜줍니다.  
<p align="center"><img src="/img/UnityFundamental/ObjectPooling/1.PNG"><br/>
<01. 오브젝트 생성></p>  
  
계층구조 창에서 `빈 게임 오브젝트`를 생성합니다.  
해당 오브젝트의 이름을 `[ObjectPool]`로 변경합니다.  
`[ObjectPool]`오브젝트에 `ObjectPool.cs`스크립트를 인스턴스화 시킵니다.  
<p align="center"><img src="/img/UnityFundamental/ObjectPooling/2.PNG"><br/>
<02. 오브젝트 풀 생성></p>    
  
`[ObjectPool]`오브젝트를 선택하고 우측 인스펙터 창에서 `Object Pool` 컴포넌트의 `Objects` 항목을 확인합니다.  
해당 항목 좌측 드롭다운 버튼을 눌러 리스트를 확인합니다.  
우측 하단 + 버튼을 눌러 리스트를 추가합니다.  
  * Num :  풀에 생성할 오브젝트의 개수, 300 으로 설정합니다.  
  * Queue Name : 오브젝트 풀의 이름입니다. 풀링할 오브젝트의 이름을 동일하게 넣어줍니다.  
  * Prefab :  풀링할 프리펩 파일을 연결시킵니다.  
<p align="center"><img src="/img/UnityFundamental/ObjectPooling/3.PNG"><br/>
<03. 오브젝트 연결></p>   
  
계층구조창에서 빈 게임 오브젝트를 생성하여 `[Tester]`로 이름을 변경합니다.  
`[Tester]`오브젝트에 `Test.cs`스크립트를 인스턴스화 시킵니다.  
`Test.cs` 컴포넌트를 비활성화 시켜줍니다.  
<p align="center"><img src="/img/UnityFundamental/ObjectPooling/4.PNG"><br/>
<04. 테스트 오브젝트 생성></p> 
  
## 테스트
에디터 상단 플레이버튼을 눌러서 확인을 해봅니다.  
  
플레이 버튼을 누른 후 `[ObjectPool]`오브젝트를 선택하여 하위 오브젝트들을 확인해보면 Cube 오브젝트들이 생성되어 풀링된 것을 확인할 수 있습니다.   
`[Tester]`오브젝트의 `Test`컴포넌트를 활성화시키면 테스트가 진행됩니다.  
오브젝트 풀에서 Cube 오브젝트를 불러와 활성화 시키는 장면을 확인 할 수 있습니다.  
`[Tester]`오브젝트의 `Test`컴포넌트를 비 활성화시키면 테스트가 종료됩니다.  
그리고 다시 오브젝트 풀을 확인해보면 아까 활용된 오브젝트들이 제거되지 않고 다시 정리된 것을 확인할 수 있습니다.  
  
<p align="center"><img src="/img/UnityFundamental/ObjectPooling/5.gif"><br/>
<05. 오브젝트 풀 테스트></p>  
  
  
  {% include adsense.html %}
  
  


