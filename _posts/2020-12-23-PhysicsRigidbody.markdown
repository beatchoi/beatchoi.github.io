---
layout: post
title:  "유니티에서의 물리엔진 이동 메소드 - Rigidbody"
date:   2020-12-23 14:00:07
categories: Unity3D Basics
description: "Rigidbody를 활용한 이동"
image: '/img/UnityBasic/PhysicsEvent/05.gif'
published: true
canonical_url: http://whtls.com/unity3d/basics/2020/12/23/PhysicsRigidbody/
---

## 유니티에서의 물리엔진을 활용한 이동 해보기
유니티에서 `Rigidbody`컴포넌트를 활용한 이동 메소드 및 변수들를 알아봅니다.   
  
## 유니티3D 에디터에서  
#### Velocity
프로젝트창에서 `Velocity`스크립트를 생성합니다.
<p align="center"><img src="/img/UnityBasic/PhysicsEvent/01.PNG"><br/>
<01. Physics 스크립트 생성></p>  
  
Physics 스크립트를 열어서 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Velocity : MonoBehaviour
{
    Rigidbody rb; // Rigidbody형으로 rb 변수를 선언해줍니다.
    public float speed; //속도 변수를 선언합니다.  
    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody>(); //스크립트가 인스턴스화된 오브젝트의 Rigidbody 컴포넌트를 불러옵니다.
    }

    // Update is called once per frame
    void Update()
    {
        rb.velocity = new Vector3(rb.velocity.x, rb.velocity.y, speed); //본 오브젝트의 Rigidbody에 접근하여 Velocity 변수를 사용합니다.
    }
}
```
  
* `Velocity` 변수는 Rigidbody 컴포넌트가 있어야 호출을 할 수 있습니다.  
* `Velocity` 변수는 Rigidbody를 가진 물체에 주어진 속도를 부여합니다.  

#### 오브젝트 설정  
  
에디터로 돌아와서 `Physics`스크립트를 `Sphere`오브젝트에 인스턴스화를 시킵니다.  
<p align="center"><img src="/img/UnityBasic/PhysicsEvent/02.PNG"><br/>
<02. Physics 스크립트 인스턴스화></p>  
  
`Sphere` 오브젝트의 인스펙터 창에서 `Rigidbody`컴포넌트를 생성합니다.
<p align="center"><img src="/img/UnityBasic/PhysicsBasic/02.PNG"><br/>
<03. Rigidbody 컴포넌트 추가></p>
  
`Sphere` 오브젝트에 인스턴스화 되어있는 `Physics`스크립트의 `Speed`값을 `10`으로 변경해줍니다.  
<p align="center"><img src="/img/UnityBasic/PhysicsRigidbody/05.PNG"><br/>
<04. Speed 값 변경></p>
  
## 테스트
에디터 상단 플레이버튼을 눌러서 확인을 해봅니다.  

<p align="center"><img src="/img/UnityBasic/PhysicsRigidbody/03.gif"><br/>
<05. Sphere 오브젝트의 이동 확인></p>  
  
위 결과에서 보았듯이 `Velocity`는 물체에 특정 속도값을 부여하여 일정한 속도로 움직일 수 있도록 합니다.    
  
#### Addforce
이번엔 `Physics`스크립트에 다음과 같이 작성해 봅니다.  
  
  ```ruby
  using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Velocity : MonoBehaviour
{
    Rigidbody rb;
    public float speed;
    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }

    // Update is called once per frame
    void Update()
    {
        //rb.velocity = new Vector3(rb.velocity.x, rb.velocity.y, speed);
        rb.AddForce(new Vector3(0, 0, speed*0.1f));
    }
}
```

* Addforce 메소드는 `Rigidbody`를 가지고 있는 오브젝트에 일정한 힘을 지속적으로 부여합니다.  
* 메소드 안에 들어가는 인자는 Vector3 형식이기 때문에 방향과 힘 모두 부여할 수 있습니다.  
  
  
## 테스트  
  
`Sphere`오브젝트에 스크립트가 인스턴스화가 되어있는지 확인한 후 상단 Play 버튼을 눌러 확인해봅니다.  

<p align="center"><img src="/img/UnityBasic/PhysicsRigidbody/04.gif"><br/>
<06. Sphere 오브젝트의 이동 확인></p>  
  
## 비교
#### Velocity
`Velocity`는 일정한 속도를 오브젝트에 부여하기 때문에 일정한 속도로 이동하게 됩니다.  
하지만 `Addforce`메소드의 경우 일정한 `힘`을 오브젝트에 지속적으로 부여하기 때문에  
속도는 일정하게 증가하는 것을 확인할 수 있습니다.  
