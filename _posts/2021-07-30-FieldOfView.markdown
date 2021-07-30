---
layout: post
title:  "시야 내 타겟 자동 설정 - Field of VIew"
date:   2021-07-30 16:00:07
categories: Unity3D Fundamentals
description: "몬스터의 시야를 설정하고 타겟을 자동 설정해보기."
image: '/img/UnityFundamental/FieldOfView/7.gif'
published: true
canonical_url: https://beatchoi.github.io/unity3d/fundamentals/2021/07/30/FieldOfView/
---
  
  
  {% include adsense.html %}
  
  
## 몬스터의 시야를 설정하고 타겟을 자동 설정해보기.
  
  
## 시야 :: Field of View  
AI 캐릭터가 필요한 콘텐츠에서는 AI 캐릭터의 시야와 해당 캐릭터가 플레이어를 선택하는 조건등을 고민하게 됩니다.  
Field of View를 AI 캐릭터에 설정하여 해당 캐릭터의 시야에 플레이어가 들어오게 되면 자동으로 타겟팅 할수 있도록 해봅니다.  
  
  
## 유니티3D 에디터에서  
#### 스크립트 생성  
  
먼저 `fieldofview.cs` 스크립트를 생성하고 다음과 같이 작성합니다.  
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

public class fieldofview : MonoBehaviour
{

    public float viewArea;
    [Range(0,360)]
    public float viewAngle;

    public LayerMask targetMask;

    [HideInInspector]
    public List<Transform> Targets = new List<Transform>();

    // Update is called once per frame
    void Update()
    {
        GetTarget();
    }

    public void GetTarget()
    {
        Targets.Clear();
        Collider[] TargetCollider = Physics.OverlapSphere(transform.position, viewArea, targetMask);

        for(int i = 0; i < TargetCollider.Length; i++)
        {
            Transform target = TargetCollider[i].transform;
            Vector3 direction = target.position - transform.position;
            if(Vector3.Dot(direction.normalized, transform.forward) > GetAngle(viewAngle / 2).z)
            {
                Targets.Add(target);
            }
        }
    }

    public Vector3 GetAngle(float AngleInDegree)
    {
        return new Vector3(Mathf.Sin(AngleInDegree * Mathf.Deg2Rad), 0, Mathf.Cos(AngleInDegree * Mathf.Deg2Rad));
    }


    private void OnDrawGizmos()
    {
        Handles.DrawWireArc(transform.position, Vector3.up, transform.forward, 360, viewArea);
        Handles.DrawLine(transform.position, transform.position + GetAngle(-viewAngle / 2) * viewArea);
        Handles.DrawLine(transform.position, transform.position + GetAngle(viewAngle / 2) * viewArea);

        foreach(Transform Target in Targets)
        {
            Handles.DrawLine(transform.position, Target.position);
        }
    }
}
```
  
* 상단부네임스페이스란에 UnityEditor 네임스페이스를 추가합니다. 씬 창에서 가상의 범위를 나타내주는 메소드를 호출할 수 있습니다.  
* `ViewArea`는 캐릭터를 중심으로 반지름 거리의 값을 나타냅니다.  
* `ViewAngle`은 캐릭터 정면의 시야 각도입니다.  
  * 캐릭터의 반지름 거리에 있는 플레이어 중 캐릭터의 시야 각 내에 있는 플레이어를 타겟팅 할수 있도록 합니다.  

* `GetTarget`은 타겟을 선정하는 함수입니다.  
  * `Collider`형의 배열 변수를 하나 선언한 뒤 `OverlapSphere`메소드로 캐릭터를 중심으로 한 가상의 원 반경 내의 충돌체들을 추출해 냅니다.  
  * 반경 내 충돌체들 중 시야 각도 내에 있는 오브젝트들의 `Transform`값을 `Targets`리스트에 추가합니다.  
  
* `GetAngle`은 설정하는 시야각을 Vector3로 반환하는 역할을 합니다.  
  * 해당 함수를 호출할 때 인자들을 2로 나누는 이유는 캐릭터를 중심으로 좌측으로 x도, 우측으로 x도, 두개의 각도의 합이 `ViewAngle`이기 때문입니다.  
  
* `OnDrawGizmos`함수는 기능적으로는 상관이 없는 함수입니다. 다만 씬 창에서 우리의 코드가 제대로 작동하는지 표현하기 위한 함수입니다.  
* UnityEditor를 통해 호출받은 Handles 클래스를 통해 캐릭터 주변 범위 및 시야각도를 선으로 표현합니다.  
* 씬 창에서만 보입니다.  
  
  
#### 프로젝트 생성 및 세팅
간단하게 `Plane`으로 바닥을 깔아주고 `Capsule`로 캐릭터, `Cube`로 타게팅 될 오브젝트를 생성합니다.  
<p align="center"><img src="/img/UnityFundamental/FieldOfView/1.PNG"><br/>
<01. 씬 배치></p> 
  
먼저 타게팅 될 `Cube` 오브젝트를 선택합니다.  
타게팅이 되기 위해서는 `Mask Layer`를 설정해줘야합니다.  
`Cube`를 선택하고 인스펙터창 우측 상단 `Layer` 드롭다운버튼을 눌러서 `Add Layer` 버튼을 누릅니다.  
<p align="center"><img src="/img/UnityFundamental/FieldOfView/2.PNG"><br/>
<02. Mask Layer 설정></p> 
  
인스펙터 창에서 비어있는 레이어 항목에 `Target` 레이어를 생성합니다.  
<p align="center"><img src="/img/UnityFundamental/FieldOfView/3.PNG"><br/>
<03. Mask Layer 생성></p> 
  
돌아와서 다시 `Cube`오브젝트를 선택한 후 레이어를 `Target`으로 변경합니다.  
<p align="center"><img src="/img/UnityFundamental/FieldOfView/4.PNG"><br/>
<04. Mask Layer 변경></p>   
  
`Capsule`오브젝트에 `fieldofview.cs`스크립트를 인스턴스화 시킵니다.  
`fieldofview`컴포넌트에 `ViewArea`값과 `ViewAngle`값을 조정합니다.  
`TargetMask` 항목은 아까 생성한 `Target`으로 설정합니다.  
<p align="center"><img src="/img/UnityFundamental/FieldOfView/5.PNG"><br/>
<05. Capsule 오브젝트 설정></p>  
  
그럼 씬창은 이렇게 변합니다.  
<p align="center"><img src="/img/UnityFundamental/FieldOfView/6.PNG"><br/>
<06. 씬 창></p>  
  
  
## 테스트 :: Test  
상단 플레이 버튼을 눌러 `Capsule` 오브젝트를 이동시켜봅니다.  
`Cube`의 범위 안, 밖으로 이동시켜 시야 내에 있을 때 서로를 잇는 흰 선이 생성되는지 확인합니다.  
<p align="center"><img src="/img/UnityFundamental/FieldOfView/7.gif"><br/>
<07. 테스트></p>   
  
 
#### 정리
이번 포스팅에서는 하나의 객체의 시야 내에 있는 오브젝트를 타겟팅 하는 방법에 대하여 진행했습니다.  
이는 몬스터 AI를 설정할 때 자주 활용되는 기법이며 플레이어의 타겟팅을 예로 들었지만 시야 범위 내에 어떠한 행위를 하기위한  
범위 설정을 할수있는 광범위한 기법입니다.  
  
  
  {% include adsense.html %}
  
  


