---
layout: post
title:  "Oculus Quest2 - Controller Input"
date:   2020-12-11 14:00:07
categories: Unity3D Basics
description: "오큘러스 퀘스트2 - 컨트롤러 입력 값 설정하기"
image: 'img/UnityVR/OculusQuest/01XRToolkit/OculusQuest.png'
published: true
canonical_url: http://whtls.com/unity3d/basics/2020/12/30/OculusQuestInput/
---

## 오큘러스 퀘스트2 개발을 위한 컨트롤러 입력 값 설정하기
오큘러스 퀘스트2 기기의 컨트롤러 입력값을 넣는 방법을 알아봅니다.
오큘러스의 입력을 받는 방법은 여러가지가 있지만 가장 기본적이고 쉬운 방법으로 진행합니다.  
이전과 동일하게 XR Toolkit을 활용합니다.  
  
## 유니티3D 에디터에서  
  
#### 스크립트 생성  
  
`Oculus Input`이라는 이름의 C# 스크립트를 생성합니다.  
스크립트에 다음과 같이 작성합니다.  
  
```ruby
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.XR;
using UnityEngine.XR.Interaction.Toolkit;

public class OculusInput : MonoBehaviour
{

    public XRController controller = null;
    private GameObject _camera;
    private void Awake()
    {
        _camera = GetComponent<XRRig>().cameraGameObject;
    }

    private void Update()
    {
        CommonInput();
    }

    private void CommonInput()
    {
        // A Button
        if (controller.inputDevice.TryGetFeatureValue(CommonUsages.primaryButton, out bool primary)) { }
        //output += "A Pressed: " + primary + "\n";

        // B Button
        if (controller.inputDevice.TryGetFeatureValue(CommonUsages.secondaryButton, out bool secondary)) { }
        // output += "B Pressed: " + secondary + "\n";

        // Touchpad/Joystick touch
        if (controller.inputDevice.TryGetFeatureValue(CommonUsages.primary2DAxisTouch, out bool touch)) { }
        // output += "Touchpad/Joystick Touch: " + touch + "\n";

        // Touchpad/Joystick press
        if (controller.inputDevice.TryGetFeatureValue(CommonUsages.primary2DAxisClick, out bool press))
        { }
        // output += "Touchpad/Joystick Pressed: " + press + "\n";

        // Touchpad/Joystick position
        if (controller.inputDevice.TryGetFeatureValue(CommonUsages.primary2DAxis, out Vector2 position)) 
        { }
        // output += "Touchpad/Joystick Position: " + position + "\n";

        // Grip press
        if (controller.inputDevice.TryGetFeatureValue(CommonUsages.gripButton, out bool grip)) { }
        //  output += "Grip Pressed: " + grip + "\n";

        // Grip amount
        if (controller.inputDevice.TryGetFeatureValue(CommonUsages.grip, out float gripAmount)) { }
        //  output += "Grip Amount: " + gripAmount + "\n";

        // Trigger press
        if (controller.inputDevice.TryGetFeatureValue(CommonUsages.triggerButton, out bool trigger)) { }
        // output += "Trigger Pressed: " + trigger + "\n";

        // Index/Trigger amount
        if (controller.inputDevice.TryGetFeatureValue(CommonUsages.trigger, out float triggerAmount)) { }
          //  output += "Trigger: " + triggerAmount;
    }
}
```
  
* 네임스페이스 부분에 `UnityEngine.XR`, `UnityEngine.XR.Interaction.Toolkit`을 꼭 추가합니다.  
* `XRController` 변수를 하나 생성하고, 카메라 오브젝트르 담아줄 `_camera` 변수도 생성합니다.  
* `_camera`변수에 `XRRig`컴포넌트의 카메라를 담아줍니다. 이를통해 본 스크립트는 `XRRig`스크립트가 인스턴스호 되어있는 오브젝트에 인스턴스화 시켜줘야 하는 것을 알 수 있습니다.  
* `CommonInput()` 함수 안에 `if`문들이 각각 컨트롤러의 입력 값을 호출하는 역할을 합니다. `if`문의 중괄호 안에 각각의 버튼이 눌리면 어떠한 행동을 하는지 작성하면 됩니다.
  
#### 활용하기 위해서
`Oculus Input`스크립트를 `XRRig`오브젝트에 인스턴스화 시킵니다.  
`Oculus Input`스크립트가 인스턴스화가 되면 `Controller`변수 공란에 XRRig -> Camera Offset -> LeftHandController 를 연결시킵니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/Input/01.PNG"><br/>
<01. 스크립트 연결></p>
  
왼쪽 컨트롤러 오브젝트를 `Controller`공란에 넣었기 때문에 왼쪽 컨트롤러의 키 입력을 받을 것입니다.  
  
  
