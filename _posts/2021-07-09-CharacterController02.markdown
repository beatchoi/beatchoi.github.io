---
layout: post
title:  "1인칭 캐릭터의 이동 및 회전 - Character Controller"
date:   2021-07-09 14:00:07
categories: Unity3D Basics
description: "1인칭 캐릭터 생성을 위한 Character Controller 컴포넌트의 활용"
image: '/img/UnityBasic/CharacterController/06.gif'
published: true
canonical_url: http://beatchoi.github.io/unity3d/basics/2021/07/09/CharacterController2/
---
## 1인칭 캐릭터의 이동 및 회전 :: Character Controller  
이전 포스트의 Character Controller 컴포넌트를 활용하여 1인칭 캐릭터를 생성해봅니다.  
캐릭터의 이동 및 회전 코드를 조금 더 효율적으로 작성해봅니다.  
  
## 유니티3D 에디터에서  
#### 스크립트 생성  
프로젝트 창에서 `PlayerController.cs` 스크립트를 생성합니다.  
`PlayerController.cs`스크립트를 열어 다음과 같이 작성합니다.  

```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    CharacterController CharacterController;

    public float moveSpeed = 8f;
    public float maxTurnSpeed = 150f;
    public float jumpSpeed;

    public float horizontal;
    public float vertical;
    public float turn;

    public bool isGrounded = true;
    public bool isFalling;
    public Vector3 velocity;

    // Start is called before the first frame update
    void Start()
    {
        CharacterController = GetComponent<CharacterController>();

        Camera.main.orthographic = false;
        Camera.main.transform.SetParent(transform);
        Camera.main.transform.localPosition = new Vector3(0f, 3f, -8f);
        Camera.main.transform.localEulerAngles = new Vector3(10f, 0f, 0f);
    }

    

    // Update is called once per frame
    void Update()
    {
        horizontal = Input.GetAxis("Horizontal");
        vertical = Input.GetAxis("Vertical");
        turn = Input.GetAxisRaw("Mouse X");

        if (isGrounded)
            isFalling = false;

        if ((isGrounded || !isFalling) && jumpSpeed < 1f && Input.GetKey(KeyCode.Space))
        {
            jumpSpeed = Mathf.Lerp(jumpSpeed, 1f, 0.5f);
        }
        else if (!isGrounded)
        {
            isFalling = true;
            jumpSpeed = 0;
        }
    }

    private void FixedUpdate()
    {
        transform.Rotate(0f, turn * Time.fixedDeltaTime* maxTurnSpeed, 0f);
        Vector3 direction = new Vector3(horizontal, jumpSpeed, vertical);
        direction = Vector3.ClampMagnitude(direction, 1f);
        direction = transform.TransformDirection(direction);
        direction *= moveSpeed;
        if (jumpSpeed > 0)
            CharacterController.Move(direction * Time.fixedDeltaTime);
        else
            CharacterController.SimpleMove(direction);

        isGrounded = CharacterController.isGrounded;
        velocity = CharacterController.velocity;
    }
}
```
  
이전 포스트와 다른점은  
* 기존 월드에 존재하는 메인카메라를 캐릭터의 1인칭 카메라로 설정.
* `FixedUpdate`를 활용하여 차후 네트워킹에 대비.
* 키보드 Input 값을 따로 설정하지 않고 종,횡 방향변수와 `Move`메소드를 이용해 이동지시.  
* `Space`를 누르면 점프 작동.  
* * 마우스의 좌우 위치값을 이용한 플레이어 회전 구현.  
이 있습니다.  
  
#### 오브젝트 설정  
  
이전 포스트와 동일하게  
오브젝트에 `PlayerController.cs` 스크립트를 인스턴스화 시킵니다.  
  
해당 오브젝트에 `CharacterController` 컴포넌트를 추가합니다.  
  
해당 오브젝트에 `Rigidbody` 컴포넌트를 추가하고  
`Use Gravity` 항목은 체크 해제  
`Is Kinematic` 항목은 체크 해줍니다.  
  

  
## 테스트
에디터 상단 플레이버튼을 눌러서 확인을 해봅니다.  
`Game`창에서 키보드의 앞 뒤 좌 우 화살표 키 또는 W A S D 를 눌러 캐릭터가 이동을 하는지 확인합니다.  
<p align="center"><img src="/img/UnityBasic/CharacterController/06.gif"><br/>
<05. 캐릭터 오브젝트의 이동 확인></p>  
  
키보드의 Space를 눌러 캐릭터가 점프를 하는지 확인합니다.  
  


