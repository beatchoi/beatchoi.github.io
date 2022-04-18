---
layout: post
title:  "유니티 터치 기초"
date:   2022-04-18 13:50:07
categories: Unity3D Basics
description: "유니티에서 터치 입력을 받아봅니다"
image: 'https://www.csrhymes.com//img/static-site-generator.jpg'
published: true
canonical_url: http://beatchoi.github.io/unity3d/basics/2022/04/18/TouchBasic/
---

## 모바일 터치 입력
스마트폰이나 터치 디바이스 등 스크린 터치가 가능한 디바이스에서 실행 가능한 터치를 구현합니다.  
`Input.Touch`를 활용하면 유니티 게임 창에서 마우스를 활용한 클릭은 구현되지 않습니다.  
하지만 `GetMouseButton`를 활용하여 터치를 구현했을 때와는 다르게 다양한 기능들을 활용할 수 있습니다.  
따라서 `드래그`, `멀티터치` 등의 복잡한 터치를 구현하기 위해서는 `Input.Touch`를 활용하는 것이 좋습니다.  
  
## 스크립트 작성
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Touch01 : MonoBehaviour
{
    public Text txt;

    // Update is called once per frame
    void Update()
    {
        if(Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);
            if(touch.phase == TouchPhase.Began)
            {
                Debug.Log("Touch Began");
                txt.text = "Touch Began";
            }
            if (touch.phase == TouchPhase.Moved)
            {
                Debug.Log("Touch Moved");
                txt.text = "Touch Moved";
            }
            if (touch.phase == TouchPhase.Stationary)
            {
                Debug.Log("Touch Stationary");
                txt.text = "Touch Stationary";
            }
            if (touch.phase == TouchPhase.Ended)
            {
                Debug.Log("Touch Ended");
                txt.text = "Touch Ended";
            }
            if (touch.phase == TouchPhase.Canceled)
            {
                Debug.Log("Touch Canceled");
                txt.text = "Touch Canceled";
            }
        }
    }
}
```
4 : Text 를 선언하기 위해 UI 네임스페이스를 정의합니다.  
8 : 터치 현황을 알기위한 Text 변수를 선언합니다.  
13 : `Input.touchCount`는 현재 터치되고있는 매개체의 숫자입니다. 0보다 크다면 터치가 진행되었다고 판단합니다.  
15 : `Input.GetTouch(int)`는 터치된 매개체의 터치 상태를 나타냅니다. 매개체가 터치된 순서에 따라 0, 1, 2.. 로 불러옵니다.  
`Touch.Phase`는 터치된 매개체의 현재 상태를 나타냅니다.  
|1|2|  
|------|---|  
|Began|화면에 터치가 시작된 상태를 나타냅니다.|  
|Moved|손가락 터치가 화면에서 움직인 경우를 나타냅니다.|  
|Stationary|터치를 했지만 움직이지 않은 상태를 나타냅니다.|  
|Ended|사용자가 화면에서 손가락을 뗀 경우를 나타냅니다. 터치의 마지막 단계를 나타냅니다.|  
|Canceled|사용자가 자신의 얼굴에 장치를 가져간 경우 또는 5개의 터치가 동시에 이루어진 경우에, 시스템이 터치의 추적을 취소합니다. 터치의 마지막 단계를 나타냅니다.|  
  
## 유니티3D 에디터에서
`Game`창에서 `Free Aspect`항목을 눌러 해상도를 설정합니다.  
`1920x1080 Portrait`로 바꿔줍니다.  
  
  
`Hierarchy`창에서 마우스 우클릭, `UI` -> `Text`를 눌러 `Text`오브젝트를 생성합니다.  
`Text`오브젝트의 `Scale`값을 5,5,5로 바꿔줍니다.  
  
  
`Text`오브젝트가 화면 가운데로 오도록 위치를 조정합니다.  
  
  
`빈 게임오브젝트`를 하나 생성하고 이름을 Touch 로 변경합니다.  
해당 오브젝트에 Touch01 스크립트를 인스턴스화 시켜주고 `Txt`공란에 `Text`오브젝트를 연결시킵니다.  

## 테스트
asdfsdf



