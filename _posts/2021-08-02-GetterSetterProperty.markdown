---
layout: post
title:  "이벤트 호출을 위한 게터, 세터, 프로퍼티- 기본구조 알기"
date:   2021-08-02 12:00:07
categories: Unity3D Basics
description: "Getter, Setter, Property를 이용해 이벤트 호출"
image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpoweredtemplate.com%2Fko%2Fphotos%2Foop-object-oriented-programming-acronym-technology-concept-ba-75383%2F&psig=AOvVaw0sXmNbr_PPprl3Gr_8P61M&ust=1627972587348000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIi54tjckfICFQAAAAAdAAAAABAD'
published: true
canonical_url: https://beatchoi.github.io/unity3d/basics/2021/08/02/GetterSetterProperty/
---
  
  
  {% include adsense.html %}
  
  
## 이벤트 :: Event  
콘텐츠를 개발하다 보면 언제 일어날지 모르는 불규칙한 이벤트를 구현해야 할 경우가 생깁니다.  
예를 들면 캐릭터의 체력이 50% 미만이 되면 체력 회복을 한다던지, 또는 충돌 횟수가 3회 이상이 되면 파괴가 된다던지 말이죠.  
언제 일어날지 모르는 이 이벤트들을 위해 Update문이나 Coroutine들을 기약없이 돌릴수는 없는 노릇입니다.  
이번시간에는 해당 수치들에 관련된 이벤트들을 호출할수 있는 문법을 배워보도록 하겠습니다.  
  
## 유니티3D 에디터에서  
#### 스크립트 생성  
프로젝트 창에서 `PropertyExample.cs` 스크립트를 생성합니다.  
`PropertyExample.cs`스크립트를 열어 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PropertyExample : MonoBehaviour
{

    private int hp;
    public int _hpProperty 
    {
        get { return hp; }//게터 
        set { hp = value; }//세터
    }


    // Start is called before the first frame update
    void Start()
    {
        _hpProperty = 20; //프로퍼티에 값을 지정, hp 변수 할당
        Debug.Log("hp : "+hp);// hp 변수에 값이 할당되었는지 확인
    }
}
```

* 위가 기본적인 `Getter`, `Setter` `Property`의 구조입니다.  
* `public int _hpProperty`를 {}로 묶고 안에 `get{}`, `set{}` 프로퍼티를 지정합니다.  
  * get은 값을 읽을 때 
  * set은 값을 불러올 때 호출됩니다.  
*  따라서 `get` 에는 우리가 수정하고자 하는 변수를 리턴해주고  
*  `set`에는 넣어주는 값이 `value`가 되고 `value`를 선언한 변수에 넣는 형태가 됩니다.  
*  프로퍼티변수인 `_hpProperty`에 값을 할당하거나 호출하여도 결과적으로는 `hp`변수의 값을 불러오게 됩니다.  
  
이렇게 `Property`구조를 짜게되면 `hp`라는 변수는 `Private`으로 은닉시킬 수 있는 동시에 `_hpProperty`로 값을 할당하거나 호출할 수 있게 됩니다.  
  
  
그럼 `PropertyExample.cs`스크립트를 다음과 같이 수정해 봅시다.  
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PropertyExample : MonoBehaviour
{
    private int hp;
    public int _hpProperty 
    {
        get { return hp; }//게터 
        set {
                if (value > 50)
                {
                    hp = value;
                    Debug.Log("HP : " + hp);
                }
                else
                {
                    hp = 100;
                    Debug.Log("HP가 회복되었습니다! HP : " + hp);
                }
        }
    }

    // Start is called before the first frame update
    void Start()
    {
        _hpProperty = 60; //프로퍼티에 값을 지정, hp 변수 할당
        _hpProperty -= 5;//프로퍼티에 값을 지정, hp 변수 할당
        _hpProperty -= 5;//프로퍼티에 값을 지정, hp 변수 할당, set의 else 호출, 체력 회복
    }
}
```
  
* 기본 구조는 동일하지만 `set`항목에 조건을 달았습니다.  
* hp 변수에 값을 할당할 때 값이 50보다 작거나 같게되면 체력을 다시 100으로 회복시키는 조건을 추가하였습니다.  
   
#### 씬 설정
계층 구조창에서 빈 게임오브젝트를 하나 생성하고 위 스크립트를 인스턴스화 시켜줍니다.  
상단 플레이버튼을 누르고 `Console`창을 확인하여 값이 제대로 나타나는지 확인합니다.  
  
<p align="center"><img src="/img/UnityBasic/GetSetProperty/1.PNG"><br/>
<01. 콘솔창 확인></p>
  
#### 설명
기본적으로 `get`, `set` 속성의 활용은 객체지향언어의 캡슐화를 위함입니다. 다만 유니티를 활용한 개발에 있어 캡슐화 이외에도 고민해야할 부분이 많으며  
유니티 콘텐츠 개발의 특성상 데이터의 은닉의 경우 그 활용도가 점점 줄어들고 있는 추세입니다.  
다만 `get`,`set`속성을 활용하여 값에 따른 이벤트의 호출에 활용한다면 그 쓰임새를 찾을 수 있을 것입니다.  
  
  
  {% include adsense.html %}
  
  


