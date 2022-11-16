---
layout: post
title:  "유니티 UI 길게 누르기 구현 - UI Longpress"
date:   2022-11-16 14:00:07
categories: Unity3D Basics
description: "유니티 UI Longpress 구현"
image: '/img/Unity.png'
published: true
canonical_url: http://whtls.com/unity3d/basics/2022/11/16/UILongPress/
---

## 유니티에서의 UI Longpress
유니티에서 UI 길게 누르기를 구현해 봅니다.  
  
## 유니티3D 에디터에서  
#### 스크립트 작성
프로젝트창에서 `ButtonLongPressListener.cs`스크립트를 생성합니다.
  
`ButtonLongPressListener` 스크립트를 열어서 다음과 같이 작성합니다.  

```ruby
using UnityEngine ;
using UnityEngine.Events ;
using UnityEngine.EventSystems ;
using UnityEngine.UI ;

[RequireComponent (typeof(Button))]
public class ButtonLongPressListener : MonoBehaviour,IPointerDownHandler,IPointerUpHandler {

    [Tooltip ("Hold duration in seconds")]
    [Range (0.3f, 5f)] public float holdDuration = 0.5f ;
    public UnityEvent onLongPress ;
    public UnityEvent onShortPress;

    private bool isPointerDown = false ;
    private bool isLongPressed = false ;
    private float elapsedTime = 0f ;

    private Button button ;

    private void Awake () 
    {
        button = GetComponent<Button> () ;
    }

    public  void OnPointerDown (PointerEventData eventData) 
    {
        isPointerDown = true ;
    }
    public void OnPointerUp(PointerEventData eventData)
    {
        if (isLongPressed)
        {
            Debug.Log("isLongPressed");
        }
        else
        {
            onShortPress.Invoke();
            Debug.Log("isShortPressed");
        }
        isPointerDown = false;
        isLongPressed = false;
        elapsedTime = 0f;
    }

    private void Update () {
    if (isPointerDown && !isLongPressed) 
        {
            elapsedTime += Time.deltaTime ;
            if (elapsedTime >= holdDuration) 
            {
                isLongPressed = true ;
                elapsedTime = 0f ;
                onLongPress.Invoke () ;
            }
            else
            {
                isLongPressed = false;
            }
        }
   }
}
```
  
* 
(Keycode의 키값은 https://docs.unity3d.com/kr/530/ScriptReference/KeyCode.html 에서 볼 수 있습니다)  


## 테스트  
  

<p align="center"><img src="/img/UnityBasic/Input/02.PNG"><br/>
<01. ></p>  
  
결과물  
<p align="center"><img src="/img/UnityBasic/Input/01.PNG"><br/>
<02. ></p>  
