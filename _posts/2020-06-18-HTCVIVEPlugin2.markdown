---
layout: post
title:  "HTC VIVE Plugin 적용(Vive Controller Binding)"
date:   2020-06-17 00:46:07
categories: Unity3D Vive
description: "HTC Vive 컨트롤러 바인딩"
image: 'https://www.pikpng.com/pngl/b/135-1352255_htc-vive-pro-htc-vive-pro-full-kit.png'
published: true
canonical_url: https://www.csrhymes.com/development/2018/05/28/why-use-a-static-site-generator.html
---

## [CameraRig] 프리펩 알아보기
[CameraRig] 프리펩의 좌측 드롭다운 버튼을 눌러 해당 프리펩을 살펴봅니다. Controller (Left), Controller (Right), Camera 세가지 오브젝트로 이루어져 있는데 각각 좌측 컨트롤러 우측컨트롤러 그리고 HMD를 나타냅니다. 유저가 HMD로 보는 방향이 Camera오브젝트가 바라보는 방향입니다.  

![img](/img/06_HTCVIVE/02/01.JPG)  

## 컨트롤러 설정하기
바이브 컨트롤러에는 Grip, Menu, Trigger, Trackpad, System 버튼이 있습니다. 각 버튼의 유형에 따라 알맞는 콘텐츠를 실행시킬 수 있습니다.

Window 탭에서 SteamVR Input을 클릭합니다.  

![img](/img/06_HTCVIVE/02/02.JPG)  

생성된 창의 중앙에 있는 Actions항목은 버튼을 실행시켰을 때 행할 행동들을 정의했다고 보면 됩니다. 그렇다고 해서 미리 생성된 액션들이 이미 구현이 되어있는 것은 아니고 추후에 유저들이 해당 액션을 구현해야 합니다.  

![img](/img/06_HTCVIVE/02/03.JPG)  

우측 하단에 Open binding UI를 클릭하여 컨트롤러 Binding 창을 띄웁니다.  

![img](/img/06_HTCVIVE/02/04.JPG)  

상단의 Current Binding 의 Edit 버튼을 선택하여 들어갑니다.  

![img](/img/06_HTCVIVE/02/05.JPG)  

본 창에서 컨트롤러의 각 버튼에 유저가 설정한 액션을 연결시킬 수 있습니다. 그러면 그 버튼을 누르면 설정한 액션이 행해지게 되는것이죠. 기본 값으로 트리거 버튼에 Grab Pinch 액션이 설정되어 있는 것을 확인할 수 있습니다. 이를 이용하여 버튼이 눌리는 것을 확인해 보겠습니다.  

## 컨트롤러 입력 확인하기
ButtonTrigger 스크립트를 하나 생성합니다. 다음과 같은 코드를 작성합니다.

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Valve.VR;

public class ButtonTrigger : MonoBehaviour
{
    public SteamVR_Input_Sources handType;
    public SteamVR_Action_Boolean grabPinch;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (grabPinch.GetState(handType))
        {
            Debug.Log("Trigger");
        }
    }
}
```
4)Valve.VR 네임스페이스를 등록하여야 Steam VR API를 활용할 수 있습니다.  
8)SteamVR_Input_Sources 는 입력이 되는 디바이스인데 이 경우엔 컨트롤러(좌, 우) 입니다.  
9)SteamVR_Action_Boolean 은 Boolean 값을 가지는 액션을 선택합니다. 이경우엔 GrabPinch가 됩니다.  
19)grabPinch.GetState(handType) : 참 거짓 값을 리턴하는 메소드인 GetState를 활용합니다. 인자값으로 입력 소스를 넣으면 됩니다. 이경우엔 위에서선택한 컨트롤러입니다. 이 경우 grabPinch에 해당하는 액션에 지정된 입력이 실행될 경우 참을 호출합니다.  

해당 스크립트를 [CameraRig] 프리펩 하위에 있는 Controller (left) 또는 Controller  (right)에 인스턴스화 시킵니다.  

![img](/img/06_HTCVIVE/02/06.JPG)  
![img](/img/06_HTCVIVE/02/07.JPG)  

인스턴스화 시킨 스크립트에서 Hand Type 은 Any 또는 left, right hand 를 선택합니다.  

![img](/img/06_HTCVIVE/02/08.JPG)  

Grab Pinch 항목은 GrabPinch 액션을 선택합니다. 잘 보면 액션들은 SteamVR Input 창에 미리 생성되어있었던 액션들 중 하나입니다. 

![img](/img/06_HTCVIVE/02/09.JPG)  

![img](/img/06_HTCVIVE/02/10.JPG)  

세팅을 마치고 상단 플레이버튼을 누르고 컨트롤러의 트리거를 당겨보면 콘솔창에 Trigger 가 호출되는 것을 알 수 있습니다. 우리가 Binding 창에서 Trigger 항목에 Grab Pinch를 연결시켜줬기 때문에 트리거를 당겼을 때 Grab Pinch 액션을 호출하게 되고 Grab Pinch 액션은 우리가 작성한 스크립트중 GetState 메소드와 연결이 되어있기 때문에 해당 코드의 참을 호출합니다. 따라서 Debug.Log(“Trigger”)가 실행되는 것입니다.
