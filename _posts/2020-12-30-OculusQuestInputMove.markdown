---
layout: post
title:  "Oculus Quest2 - Controller Move"
date:   2020-12-30 14:00:07
categories: Unity3D Basics
description: "오큘러스 퀘스트2 - 컨트롤러로 이동하기"
image: 'img/UnityVR/OculusQuest/01XRToolkit/OculusQuest.png'
published: true
canonical_url: http://whtls.com/unity3d/basics/2020/12/30/OculusQuestInputMove/
---

## 오큘러스 퀘스트2 컨트롤러로 이동하기
오큘러스 퀘스트2 컨트롤러를 이용하여 이동하는 방법을 알아봅니다.
이전시간에 배운 키 입력과 이번시간에 캐릭터 컨트롤러를 이용한 이동을 구현해봅니다.  
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
    private CharacterController character;
    private GameObject _camera;
    private void Awake()
    {
        character = GetComponent<CharacterController>();
        _camera = GetComponent<XRRig>().cameraGameObject;
    }

    private void Update()
    {
        CommonInput();
    }

    private void CommonInput()
    {
        // Touchpad/Joystick position
        if (controller.inputDevice.TryGetFeatureValue(CommonUsages.primary2DAxis, out Vector2 position)) {
            var inputVector = new Vector3(position.x, Physics.gravity.y, z: position.y);
            var inputDirection = transform.TransformDirection(inputVector);
            var lookDirection = new Vector3(x: 0, _camera.transform.eulerAngles.y, z: 0);
            var newDirection = Quaternion.Euler(lookDirection) * inputDirection;
            character.Move(motion: newDirection * Time.deltaTime * 1f);
        }
    }
}
```
  
* 선언부에 `CharacterController character`를 추가합니다.  
* `Awake`문에 `character = GetComponent<CharacterController>()`로 `character`변수를 채워줍니다. 
* 이전 강좌의 `Oculus Quest2 - Controller Input`에서 배운 코드 중 `Joystick position`항목에 작성합니다.  
* `if`문 안의 `TryGetFeatureValue`메소드의 두번째 인자인 `Vector2 position`을 확인합니다.  
* `position`값이 조이스틱의 방향이 되겠습니다.  
* `inputVector`값이 `position`의 x 및 y값, 즉 조이스틱의 방향값에 해당합니다.  
* `inputDirection`에 `inputVector`벡터의 방향을 지정합니다.  
* `lookDirection`에는 카메라의 방향, 즉 VR로 바라보는 방향값을 지정합니다. 내가 현재 바라보는 방향입니다.  
* `newDirection`은 현재 바라보는 방향과 컨트롤러로 지정한 이동방향을 이용하여 결과적으로 내가 이동해야하는 방향을 계산합니다.  
* `character.Move()`메소드를 활용하여 `newDirection`방향으로 이동하는 로직을 생성합니다.  

스크립트를 저장하고 유니티 에디터로 돌아옵니다.  
  
#### 유니티 에디터에서
  
`XRRig`오브젝트에 `Character Controller`컴포넌트를 추가합니다.    
`Oculus Input`스크립트를 `XRRig`오브젝트에 인스턴스화 시킵니다.  
`Oculus Input`스크립트가 인스턴스화가 되면 `Controller`변수 공란에 XRRig -> Camera Offset -> LeftHandController 를 연결시킵니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/Input/01.png"><br/>
<01. Character Controller 컴포넌트 및 Oculus Input 스크립트 추가></p>

## 결과물
위 상단 플레이 버튼을 눌러서 테스트를 진행합니다.  
왼쪽 컨트롤러의 조이스틱을 움직이는 방향대로 내 자신이 이동하는 것을 확인할 수 있습니다.  
<p align="center"><img src="/img/UnityVR/OculusQuest/Input/02.gif"><br/>
<02. 캐릭터의 이동></p>
  
