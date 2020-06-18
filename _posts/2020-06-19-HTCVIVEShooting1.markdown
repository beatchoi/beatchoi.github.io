---
layout: post
title:  "바이브 컨트롤러로 총알 발사하기"
date:   2020-06-18 16:07:07
categories: Unity3D Vive
description: "바이브 컨트롤러로 기본적인 발사 "
image: '/img/06_HTCVIVE/shooting/06.PNG)'
published: true
canonical_url: https://www.csrhymes.com/development/2018/05/28/why-use-a-static-site-generator.html
---

바이브 컨트롤러의 트리거를 당기면 총알이 발사되게 해보겠습니다. 컨트롤러의 트리거를 당기고 있으면 연속으로 발사되며 총알의 발사 간격도 조절해 보겠습니다.

## 입력 액션 생성
<이전 포스트를 참조해주세요!!>
Window 탭에서 SteamVR Input 을 선택하여 창을 띄웁니다.  

![img](/img/06_HTCVIVE/shooting/01.PNG)  

SteamVR Input 창의 Action 항목 하단에 + 버튼을 눌러 액션을 추가합니다. 해당 액션의 이름을 Shooting 으로 지정하고 나머지는 사진과 동일하게 맞춰줍니다. 마지막으로 Save and Generate 버튼을 누른 뒤 우측 Open binding UI 버튼을 눌러 바인딩 창을 띄웁니다.  

바인딩 창에서 Trigger 항목을 모두 제거하고 우측 + 버튼을 눌러 나오는 창에서 Button을 클릭합니다.  

![img](/img/06_HTCVIVE/shooting/02.PNG)

아무것도 할당되지 않은 Button항목이 생성됩니다. 

![img](/img/06_HTCVIVE/shooting/03.PNG)  

해당 항목에 None 이라고 되어있는 버튼을 눌러서 액션을 할당해 줍니다. 액션은 사진대로 shooting 을 선택합니다. 

![img](/img/06_HTCVIVE/shooting/04.PNG)  

선택이 완료되면 창 우측 하단에 Replace Default Binding 버튼을 눌러 저장을 해줍니다.

## 슈팅 스크립트 작성
유니티 에디터로 돌아와서 shooting 이라는 이름의 스크립트를 생성하고 다음과 같이 작성합니다.

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Valve.VR;

public class shooting : MonoBehaviour
{
    public SteamVR_Input_Sources handType;
    public SteamVR_Action_Boolean shoot;

    public GameObject Bullet;

    public float NextFireTime;
    private float NextFireTimer;

    public bool CanShoot = true;
    public int bulletspeed;

    // Update is called once per frame
    void Update()
    {
        if (shoot.GetState(handType))
        {
            fire();
        }
        
        if (!CanShoot)
        {
            NextFireTimer += Time.fixedDeltaTime;
            if (NextFireTimer > NextFireTime)
            {
                NextFireTimer = 0;
                CanShoot = true;
            }
        }
    }

    void fire()
    {
        if (CanShoot)
        {
            GameObject bullet = Instantiate(Bullet);
            bullet.transform.position = transform.position;
            bullet.transform.rotation = transform.rotation;
            bullet.GetComponentInChildren<Rigidbody>().AddForce(transform.forward * bulletspeed);
        }
        CanShoot = false;
    }
}
```

4)8)9)22)라인은 이전 포스트를 참조해 주세요  
27-35)총알이 발사되는 딜레이를 만들어 주는 로직입니다.일정 시간이 지나면 CanShoot을 참으로 만들어 총알이 발사될 수 있도록 합니다.  
38-48)총알이 발사되는 함수인 fire 함수를 작성합니다. CanShoot이 참이면 총알을 생성하고 총알에 힘을 가해서 앞으로 발사시킵니다. 총알이 발사되면 CanShoot을 거짓으로 만들어 딜레이를 만들 수 있도록 합니다.  

## 총알 프리펩 만들기
계층 구조창에서 Sphere 오브젝트를 하나 생성하고 해당 오브젝트에 Rigidbody 컴포넌트를 달아줍니다. 그리고 프로젝트 창으로 끌어 내려서 프리펩화를 시킨 뒤 씬에서 제거합니다.  

![img](/img/06_HTCVIVE/shooting/05.PNG)  

## 스크립트 인스턴스화 및 테스트
작성한 shooting 스크립트를 좌, 우 컨트롤러 모두에게 연결시켜 인스턴스화를 시킵니다. 그리고 인스턴스에 보이는 빈칸들을 다음 사진과 동일하게 수정해 줍니다. 
Hand Type : 각 컨트롤러의 좌, 우 에 따라 Left Hand 또는 Right Hand 를 정합니다
Shoot : 처음 생성했던 shooting 액션을 선택합니다.
Bullet : 프리펩으로 만든 sphere를 연결시킵니다.
Next Fire Time : 총알이 날아가는 딜레이를 설정합니다. 
Can Shoot : 총알 발사 가능 여부입니다.
Bulletspeed : 총알 발사 속도입니다.  

![img](/img/06_HTCVIVE/shooting/07.PNG)  

중앙 상단 플레이 버튼을 눌러 테스트를 진행합니다. 컨트롤러의 트리거를 당겨서 총알이 발사되는지 확인합니다.  

![img](/img/06_HTCVIVE/shooting/06.PNG)  

총알 발사 로직 및 해당 로직을 바이브 컨트롤러에 연결시켜보는 작업이라 효율적이지 못한 부분이 있습니다. 총알의 생성과 제거 로직이 효율적이지 못하며 총알의 발사 방향도 정확하지 않습니다. 다음 포스팅에서 이를 개선해 보겠습니다.  
