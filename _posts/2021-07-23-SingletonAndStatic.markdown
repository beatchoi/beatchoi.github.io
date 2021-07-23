---
layout: post
title:  "유니티 코딩 기법 - 싱글톤과 정적변수 및 함수"
date:   2021-07-16 21:00:07
categories: Unity3D Basics
description: "오브젝트 풀링(Object Pooling)기법을 구현해봅니다."
image: '/img/UnityFundamental/ObjectPooling/6.gif'
published: true
canonical_url: https://beatchoi.github.io/unity3d/basics/2021/07/16/ObjectPooling/
---
  
  
  {% include adsense.html %}
  
  
## 싱글톤 :: Singleton  
유니티를 이용해 콘텐츠를 개발하다보면 다른 스크립트에 있는 변수나 함수를 참조하거나 호출해야 하는 경우가 생깁니다.  
처음에는 `Public GameObject`변수를 선언하여 호출하고자 하는 함수나 변수를 가지고있는 오브젝트를 연결시키고,  
해당 오브젝트의 컴포넌트에 `GetCompoent`로 스크립트 컴포넌트에 접근하여 변수나 함수에 접근하실 것입니다.  
대부분 이러한 불편함을 해소하기 위해서 싱글톤이라는 개념을 처음 접하게 되실겁니다.  
물런 싱글톤의 주 목적이 외부에서의 참조만을 위한 것이라고 보기는 힘들지만 첫 접근을 위한 방편으로 생각하는 것도 나쁘지 않을 것 같습니다.  
  
## 유니티3D 에디터에서  
#### 스크립트 생성  
프로젝트 창에서 `Singleton.cs` 스크립트를 생성합니다.  
`Singleton.cs`스크립트를 열어 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Singleton : MonoBehaviour
{
    public static Singleton Instance;

    int num01;

    private void Awake()
    {
        if (Instance == null) Instance = this;
    }

    private void Start()
    {
        num01 = 1;
    }

    public void PrintNum()
    {
        Debug.Log(num01);
    }
}
```
  
* 먼저 클래스 안에 `Public Static 클래스이름 Instance`코드를 작성합니다.  
* 그리고 Awake() 이벤트 함수를 생성하여 내부에 `if (Instance == null) Instance = this;`를 작성합니다.  
* 일반변수인 num01를 생성합니다.  
* 일반함수인 PrintNum()을 생성합니다.  

이제 `Test.cs`스크립트를 생성하고 다음과 같이 작성해봅니다.  
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Test : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        Singleton.Instance.PrintNum();
    }
}
```
  
* Start() 이벤트 함수 안에 PrintNum()함수를 호출합니다.  

#### 설명
  
정확히 싱글톤은 인스턴스를 단 하나만 생성하는 디자인 패턴을 이야기합니다.  
조금 더 쉽게 표현하면 여러분이 개발한 유니티 프로젝트 내부를 통틀어 유일하게 구현된 존재라고 생각하면 편합니다.  
(본 예제는 싱글톤에 조금 쉽게 접근하기 위해 작성된 예제로 위 정의에 100% 부합하는 스크립트는 아닐 수 있습니다.)  
프로그램을 통틀어 유일하게 존재하기 때문에 다른 객체에서도 접근 할 수 있도록 합니다.  
이는 `Test.cs`스크립트에서 확인할 수 있습니다. `싱글톤클래스.Instance.함수`의 형태로 호출할 수 있습니다. PrintNum()을 이 방식으로 호출했습니다.  
이번 예제에서는 함수로만 실험을 했지만 변수도 마찬가지로 접근할 수 있습니다. `public`형태의 변수를 선언하고 `싱글톤클래스.Instance.변수` 형태로 접근합니다.  

  
  
  {% include adsense.html %}
  
  


