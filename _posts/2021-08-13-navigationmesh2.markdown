---
layout: post
title:  "목적지 랜덤 생성 - 네비게이션 메시(Navigation Mesh)"
date:   2021-08-13 12:00:07
categories: Unity3D Basics
description: "네비게이션 메시(Navigation Mesh)를 활용하여 무작위 목적지를 생성해 봅니다."
image: '/img/UnityBasic/NavigationMesh/14.gif'
published: true
canonical_url: https://beatchoi.github.io/unity3d/basics/2021/08/13/navigationmesh2/
---
  
  
  {% include adsense.html %}
  
  
## 네비게이션 메시<NavMesh.SamplePosition> :: Navigation Mesh<NavMesh.SamplePosition>  
이번 포스팅에서는 `SamplePosition`이라는 함수를 통해 특정 지역을 기준으로 특정 반경 내 무작위로 위치를 선정하고 이동해보는 과정을 알아보도록 하겠습니다.  
`SamplePosition`은 특정 위치에 네이비게이션 메쉬가 존재하는지 확인하고 존재한다면 참, 없다면 거짓을 반환하는 함수입니다.  
선수 포스팅으로 [네비게이션 메시 :: AI 길찾기 - Navigation Mesh 알기     - 21.07.28](https://beatchoi.github.io/unity3d/basics/2021/07/28/navigationmesh/) 를 보시고 오시면 따라하기 편합니다.  
  
## 유니티3D 에디터에서  
#### 프로젝트 생성 및 세팅
스테이지는 이전 포스팅에서 생성한 대로 진행합니다.  
걸어다닐 수 있는 네비게이션 메시까지 구워줍니다. 
   
   
#### 스크립트 수정   
`NavMeshMove.cs`스크립트를 열어 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class NavMeshMove : MonoBehaviour
{
    NavMeshAgent nav;
    public Transform targetPos;

    float range = 10;
    Vector3 point;
    // Start is called before the first frame update
    void Start()
    {
        nav = GetComponent<NavMeshAgent>();
    }

    // Update is called once per frame
    void Update()
    {

        if (Input.GetKeyDown(KeyCode.Space))
        {
            if (RandomPoint(targetPos.position, range, out point))
            {
                targetPos.position = point;
            }
        }
        nav.SetDestination(targetPos.position);
    }

    bool RandomPoint(Vector3 center, float range, out Vector3 result)
    {
        for (int i = 0; i < 30; i++)
        {
            Vector3 randomPoint = center + Random.insideUnitSphere * range;
            NavMeshHit hit;
            if (NavMesh.SamplePosition(randomPoint, out hit, 1.0f, NavMesh.AllAreas))
            {
                result = hit.position;
                return true;
            }
        }
        result = Vector3.zero;
        return false;
    }
}

```
  
* RandomPoint라는 함수를 생성합니다. 해당 함수 코드는 유니티 공식 스크립트 도큐먼트에 나온 코드입니다.  
  * RnadomPoint 함수는 true, false 값을 반환하며 `result`라는 마지막 목적지를 가져옵니다.  
  * For 문으로 총 30번을 반복하며 반복하는 이유는 네비게이션 메시가 생성이 안된지역의 위치값을 가져왔을 때를 대비함입니다.  
  * randomPoint 변수를 선언하고 `center`위치를 기준으로 `range`만큼의 구형 범위 내의 무작위 위치값을 저장합니다.  
  * `SamplePosition`함수는 `randomPoint`위치에 네비게이션 메시가 존재하는지 체크하고 존재한다면 `NavMeshHit hit`에 값을 넣고 반환할 수 있도록 합니다.  
  * 존재한다면 if문 안에서 `result`에 hit된 위치값을 넣고 `true`를 반환합니다.  
  * 30번동안 찾지 못하면 `false`를 반환합니다.  
* `Update`문에는 키보드 스페이스바를 누를 때 마다 `targetPos`를 기준으로 범위 10 내의 무작위 위치를 선정하고 이동하도록 합니다.  
  
  
#### 테스트
  
플레이를 눌러서 확인해보면 다음과 같이 `Capsule`오브젝트가 이동하는 것을 확인할 수 있습니다.  
이동중 스페이스바를 눌러 `target`의 위치가 변경되는지 확인합니다.  
<p align="center"><img src="/img/UnityBasic/NavigationMesh/14.gif"><br/>
<1. Capsule 오브젝트 이동></p>
     
   
#### 정리
물론 무작위로 위치값을 생성하고 해당 위치값을 `SetDestination`으로 이동시켜도 활용 가능하지만, 네비게이션 메시를 이용할 때 `SamplePosition`을 활용하면 보다 안전하게 메시 위에 위치한 위치값을 반환할 수 있습니다.  
  
   
   
  {% include adsense.html %}
  
  



