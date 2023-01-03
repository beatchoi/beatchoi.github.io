---
layout: post
title:  "유니티 스크립터블 오브젝트 - Scriptable Object"
date:   2022-11-24 14:00:07
categories: Unity3D Fundamentals
description: "유니티 스크립터블 오브젝트(Scriptable Objects)"
image: '/img/Unity.png'
published: true
canonical_url: http://whtls.com/unity3d/basics/2023/01/03/ScriptableObject/
---
  
  {% include adsense.html %}    
  
  
## 스크립터블 오브젝트
스크립터블 오브젝트(Scriptable Objects)는 대량의 데이터를 저장하는 데 사용할 수 있는 데이터 컨테이너입니다.  
(https://docs.unity3d.com/kr/2019.4/Manual/class-ScriptableObject.html)  

스크립터블 오브젝트를 활용하여 객체의 정보를 테이터화 시켜놓고 이를 활용하여 동적으로 객체를 생성할 수 있습니다.  
이번 예제에서는 스크립터블 오브젝트를 통해서 아이템을 데이터화하고 해당 데이터를 가진 아이템을 동적으로 생성해 봅니다.  
  
## 유니티3D 에디터에서  
#### 스크립트 작성
프로젝트창에서 `DatabaseGuns.cs`스크립트를 생성합니다.
  
`DatabaseGuns.cs` 스크립트를 열어서 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

[CreateAssetMenu(fileName = "DatabaseGuns", menuName = "Assets/Databases/DatabaseGuns")]
public class DatabaseGuns : ScriptableObject
{
	private static DatabaseGuns m_Instance;
	public static DatabaseGuns Instance {
		get {
			if (m_Instance == null)
				m_Instance = Resources.Load("Databases/DatabaseGuns") as DatabaseGuns;

			return m_Instance;
		}
	}

	public InfoGuns[] GunList;
}

[Serializable]
public class InfoGuns
{
	public string ID;
	public string Name;
	public GameObject Model;
	public float Damage;
	public float FireSpeed;
}
```
  
  
프로젝트창에서 `MakeItem.cs`스크립트를 생성합니다.
  
`MakeItem.cs` 스크립트를 열어서 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MakeItem : MonoBehaviour
{

    // Start is called before the first frame update
    void Start()
    {
        CreateItem();
    }


    void CreateItem() 
    {
        InfoGuns[] guns = DatabaseGuns.Instance.GunList;
        InfoGuns gun = guns[0];
        GameObject obj = Instantiate(gun.Model);
        obj.transform.GetComponent<GunStats>().ID = gun.ID;
        obj.transform.GetComponent<GunStats>().Name = gun.Name;
        obj.transform.GetComponent<GunStats>().Damage = gun.Damage;
        obj.transform.GetComponent<GunStats>().FireSpeed = gun.FireSpeed;
        obj.GetComponent<Rigidbody>().AddForce(Vector3.up * 200); 
    }
}
```    
  
프로젝트창에서 `GunStats.cs`스크립트를 생성합니다.
  
`GunStats.cs` 스크립트를 열어서 다음과 같이 작성합니다.    
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class GunStats : MonoBehaviour
{
	public string ID;
	public string Name;
	public float Damage;
	public float FireSpeed;
	public int Sockets;
}  
```
  
  
#### 씬 수정
  
계층구조창에 빈 게임 오브젝트를 생성하고 이름을 MakeItem으로 변경합니다.  
MakeItem 오브젝트에 MakeItem.cs 스크립트를 연결시킵니다.  
  
<p align="center"><img src="/img/UnityFundamental/ScriptableObjects/3.PNG"><br/>
<03. 객체 생성 로직 추가></p><br/>   
  
  
계층구조창에 총 아이템이 될 오브젝트를 생성하고(본 예제에서는 Sphere)  
`GunStats.cs`, `Rigidbody` 컴포넌트를 추가합니다.  
해당 객체를 프로젝트창으로 끌어서 프리펩으로 만들고, 계층구조창의 오브젝트는 제거합니다.  
  
<p align="center"><img src="/img/UnityFundamental/ScriptableObjects/4.PNG"><br/>
<04. 총 프리펩 생성></p><br/> 
  
  
프로젝트창에서 마우스 우클릭 후 Create -> Assets -> Databases -> DatabaseGuns 를 클릭.  
<p align="center"><img src="/img/UnityFundamental/ScriptableObjects/1.PNG"><br/>
<01. 데이터베이스 생성></p><br/>   
  
프로젝트창에서 생성된 데이터 베이스를 선택하고 우측 인스펙터 창을 확인하여 다음과 같이 수정.
<p align="center"><img src="/img/UnityFundamental/ScriptableObjects/2.PNG"><br/>
<02. 데이터베이스 수정></p><br/>  
  
프로젝트창에 `Resources`라는 이름의 폴더를 생성하고 하위에 `Databases`폴더를 생성한 뒤 해당 폴더에 데이터 베이스 파일을 위치시킵니다.      
  
  
## 테스트
  
상단 플레이 버튼을 눌러 Sphere 클론이 생성되고 해당 객체의 GunStat의 옵션이 변경되었는지 확인합니다.   
<p align="center"><img src="/img/UnityFundamental/ScriptableObjects/5.PNG"><br/>
<05. 결과></p><br/>  
  
  
  {% include adsense.html %}    
  
    
