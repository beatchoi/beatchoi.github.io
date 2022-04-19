---
layout: post
title:  "유니티 터치 이동"
date:   2022-04-19 15:50:07
categories: Unity3D Basics
description: "유니티에서 터치한 위치로 물체를 이동시켜봅니다"
image: 'https://www.csrhymes.com//img/static-site-generator.jpg'
published: true
canonical_url: http://beatchoi.github.io/unity3d/basics/2022/04/19/TouchMove/
---
  
  {% include adsense.html %}    
    
## 모바일 터치 이동
터치로 객체를 선택하고 이후 바닥을 터치하면 해당 위치로 객체를 이동시켜봅니다.  

## 스크립트 작성
`Touch03`스크립트를 생성하고 아래와 같이 작성합니다.  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Touch03 : MonoBehaviour
{
    private GameObject obj;
    Coroutine coroutine;
    bool isCo;

    // Update is called once per frame
    void Update()
    {
        if(Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);

            if (touch.phase == TouchPhase.Began)
            {
                Ray ray = Camera.main.ScreenPointToRay(touch.position);
                RaycastHit hit;

                if (Physics.Raycast(ray, out hit))
                {
                    if(hit.transform.tag == "Player") obj = hit.transform.gameObject;
                    else if(hit.transform.tag == "Floor")
                    {
                        if (isCo)
                        {
                            isCo = false;
                            StopCoroutine(coroutine);
                        }
                        coroutine = StartCoroutine(CoMove(hit.point));
                    }
                }
            }
        }
    }
    IEnumerator CoMove(Vector3 pos)
    {
        isCo = true;
        while (obj.transform.position != pos)
        {
            obj.transform.LookAt(new Vector3(pos.x, obj.transform.position.y, pos.z));
            obj.transform.position = Vector3.MoveTowards(obj.transform.position, new Vector3(pos.x, obj.transform.position.y, pos.z), Time.deltaTime);
            yield return null;
        }
    }
}
```
7 : 터치로 선택할 오브젝트 변수 선언.  
8 : 코루틴을 담기위한 변수 선언.  
9 : 코루틴 작동 유무를 판단할 변수 선언.  
25, 26 : 터치한 오브젝트의 태그로 어떤 오브젝트를 선택했는지 판단. 이동시킬 오브젝트는 `Player`태그, 바닥 오브젝트는 `Floor` 태그.  
28 : 현재 기존 코루틴이 진행중인지 판단, 진행중이면 `StopCoroutine`을 활용하여 정지시킴. `isCo`변수를 false로 변경.  
33 : `coroutine`변수에 코루틴을 담으며 `StartCoroutine`을 활용해 코루틴 시작.  
39 : `Vector3`인자를 가진 코루틴 선언.  
41 : 코루틴 시작시 `isCo`를 true로 변경하여 코루틴 진행중 알림.  
42 : 객체가 터치한 위치까지 이동하는동안 루프 유지.  
44 : `LookAt`메소드를 활용하여 터치한 위치를 바라보게 함. Y축만 회전을 시켜야 하기 때문에 터치한 위치중 x, z 위치를 반환.  
45 : `MoveTowards`메소드를 활용하여 객체의 현재 위치에서 터치한 위치까지 이동시킴.  
  
## 유니티3D 에디터에서
  
`Hierarchy`창에서 `Plane`오브젝트와 `Capsule`오브젝트를 생성하여 아래와 같이 위치시킵니다.  
`Plane`오브젝트는 바닥, `Capsule`오브젝트는 이동할 캐릭터가 됩니다.  
<p align="center"><img src="/img/UnityBasic/TouchMove/1.PNG"><br/>
<01. Scene 꾸미기></p><br/>  
  
`Capsule`오브젝트의 회전을 쉽게 판단하기 위해서 `Capsule`오브젝트의 z축 양의 방향으로 `Cube`오브젝트를 자식오브젝트로 생성해 넣습니다.  
해당 `Cube`가 바라보는 방향으로 이동할 것입니다.  
<p align="center"><img src="/img/UnityBasic/TouchMove/2.PNG"><br/>
<02. Capsule 꾸미기></p><br/>  
  
`Touch03`스크립트를 `Touch`오브젝트에 인스턴스화 시켜 줍니다.  
<p align="center"><img src="/img/UnityBasic/TouchMove/3.PNG"><br/>
<03. 스크립트 인스턴스화></p><br/>  
  
마지막으로 `Capsule`오브젝트에는 `Player`태그를, `Plane`오브젝트에는 `Floor`태그를 설정합니다.  
대소문자를 잘 확인합니다.  
<p align="center"><img src="/img/UnityBasic/TouchMove/4.PNG"><br/>
<04. Capsule 태그></p><br/>  
  
<p align="center"><img src="/img/UnityBasic/TouchMove/5.PNG"><br/>
<05. Plane 태그></p><br/>  
  
  
## 테스트
먼저 `Capsule`오브젝트를 터치하고, 그 다음 `Plane`오브젝트를 터치하여 캐릭터가 이동하는지 확인합니다.  

  
  {% include adsense.html %}    
  
  

  
    

