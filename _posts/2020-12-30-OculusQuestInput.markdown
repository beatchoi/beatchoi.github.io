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
오큘러스 퀘스트2 기기의 컨트롤러 입력값을 넣느 방법으 알아봅니다.  
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
  
* 네임스페이스 부분에 `UnityEngine.XR`, `UnityEngine.XR.Interaction.Toolkit`




프로젝트를 생성하고 `Build Settings`창에서 플랫폼을 `Android`로 변경합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/01.PNG"> <img src="/img/UnityVR/OculusQuest/01XRToolkit/02.PNG"><br/>
<01. 개발 플렛폼 변경></p>
  
`Player Settings` -> `Other Settings`항목에서 `Identification`항목의 `Target API Level`을 `Android 6.0 (API Level 6.0)`으로 변경합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/04.PNG"><br/>
<02. Android API Level 변경></p>

#### 프로젝트 세팅
`Project Settings`창에서 `XR Plugin Management` 항목을 선택하고 우측 `Install XR Plugin Management`버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/05.PNG"><br/>
<03. XR Plugin Management 설치></p>
  
`XR Plugin Management`항목에서 좌측 PC Settings 항목 및 우측 Android 항목 모두에 있는 `Oculus`항목에 모두 체크합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/03.PNG"><br/>
<04. XR Plugin Management 설치></p>
  <p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/06.PNG"><br/>
<05. XR Plugin Management 설치></p>

#### 패키지 설치 :: Package Manager
상단 메뉴에서 `Window`탭의 `Package Manager`를 선택합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/08.PNG"><br/>
<06. 패키지 매니저 - 01></p>
  
패키지 매니저 창에서 `Packages`항목을 아래와 같이 `Unity Registry`로 변경합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/09.PNG"><br/>
<07. 패키지 매니저 - 02></p>
  
패키지 매니저 창에서 우측 세팅 버튼을 선택하고 `Advanced Project Settings`버튼을 클릭합니다. 
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/10.PNG"><br/>
<08. 패키지 매니저 - 03></p>
  
`Advanced Project Settings`항목에서 `Enable Preiview Packages`항목을 체크하고 진행합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/11.PNG"><br/>
<09. 프리뷰 패키지 설정></p>

`Package Manager`창으로 돌아와서 `XR Interaction Toolkit`패키지를 설치합니다. 우측 하단 Install 버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/13.PNG"><br/>
<09. XR Interaction Toolkit></p>
  
다음과 같은 `Warning`창에서 Yes 버튼을 눌러 진행합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/14.PNG"><br/>
<10. Warning></p>

#### 계층구조창에서
계층구조창에서 마우스 오른쪽 클릭 `XR`항목에서 `Device-Based` -> `Room-Scale XR Rig`버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/15.PNG"><br/>
<11. 프리뷰 패키지 설정></p>
  
## 테스트 해보기
Oculus Quest 기기와 PC를 연결합니다. 
PC의 오큘러스 어플리케이션을 실행하여 `설정` -> `일반`탭에서 `알 수 없는 출처`항목을 활성화 시킵니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/01XRToolkit/16.PNG"><br/>
<12. 알 수 없는 항목 활성화></p>
  
유니티 에디터 상단의 플레이 버튼을 누르면 오큘러스 기기에 빌드하지 않고 테스트를 할 수 있습니다.
