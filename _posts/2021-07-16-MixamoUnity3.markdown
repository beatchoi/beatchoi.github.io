---
layout: post
title:  "믹사모 캐릭터 애니메이션 활용 3 - Mixamo Character & Animation 3 "
date:   2021-07-16 18:00:07
categories: Unity3D Fundamentals
description: "애니메이션 컨트롤러를 활용한 애니메이션 제어"
image: '/img/UnityFundamental/MixamoUnity3/20.gif'
published: true
canonical_url: https://beatchoi.github.io/unity3d/fundamentals/2021/07/16/MixamoUnity2/
---  
  
{% include adsense.html %}  
  
## 믹사모 캐릭터 및 애니메이션의 활용 3 :: Mixamo Character & Animation 3  
  
저번 포스팅에 이어 애니메이션을 추가해보고 추가한 애니메이션들을 제어해봅니다.  
  
## Mixamo 페이지에서  
#### 애니메이션 다운로드  
  
`Mixamo.com`페이지에서 애니메이션들을 추가해서 받아봅니다.  
먼저 캐릭터가 가만히 있을때 재생되는 `Idle` 애니메이션을 다운로드 받습니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/1.PNG"><br/>
<01. Idle 애니메이션 다운로드></p>  
  
그리고 뒤로 걸어가는 애니메이션을 다운로드 받습니다.  
검색은 `back walk`로 합니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/2.PNG"><br/>
<02. Walk back 애니메이션 다운로드></p>  
  
## 유니티 에디터에서
#### 폴더정리  
  
유니티 프로젝트의 `Project`창에서 폴더를 하나 새로 만듭니다.  
애니메이션 모델링 파일을 정리할 `Modelings`파일을 만듭니다.     
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/3.PNG"><br/>
<03. Modelings 폴더 생성></p>  
  
해당 폴더 안에 다운로드 받은 애니메이션 모델링 파일들과 이전에 받은 걷기 애니메이션 모델링 파일을 넣습니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/4.PNG"><br/>
<04. 파일 정리></p>  
  
{% include adsense.html %}  
  
#### Animator Controller 수정  
  
저번 포스팅에서 다루었던 `Animator Controller`파일인 `Character Controller`파일을 더블클릭하여 열어줍니다.  
해당 컨트롤러에 방금 임포트한 뒤로걷기 및 Idle 애니메이션을 드래그하여 애니메이션 클립을 드래그 앤 드롭하여 불러와줍니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/5.gif"><br/>
<05. 애니메이션 클립 불러오기></p>  
  
이제 기본 상태를 변경해주어야 합니다. 현재 보이시는 오렌지색 클립이 기본 상태 클립입니다.  
기본 상태 클립은 애니메이션 컨트롤러가 시작하였을때 또는 아무런 입력이 없을 때 기본으로 실행되는 상태입니다.  
우리는 `Idle`애니메이션을 기본상태로 지정할 것입니다.  
`Idle` 애니메이션 클립에서 마우스 오른쪽 클릭을 하고 `Set as Layer Default State`항목을 선택합니다.  
그러면 다음과 같이 회색의 상태가 오렌지색으로 바뀌며 `Entry`에서의 화살표가 변경되는 것을 확인할 수 있습니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/6.gif"><br/>
<06. 애니메이션 상태 변경></p>  
  
이제는 애니메이션 상태 클립끼리의 방향을 지정해 주어야 합니다.  
방향이란 어떠한 애니매이션 상태에서 다른 애니메이션 상태로 변경이 될 수 있도록 길을 만들어 주는 과정이라고 생각하시면 됩니다.  
먼저 오렌지색 기본 `Idle`상태에서 마우스 오른쪽 크릭을 하여 `Make Transition` 항목을 클릭합니다.  
그러면 마우스에 화살표가 이어지는데 이 상태에서 다른 애니메이션 상태 클립을 클릭하면 화살표가 이어지게 됩니다.  
이 화살표는 `Idle`상태에서 이어진 상태로 변경이 가능하다 라는 의미를 가집니다. 반대도 지정해 주도록 합니다.  
이렇게 각각 `Walk`와 `Back Walk` 애니메이션과 `Idle`애니메이션을 연결해 주면 됩니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/7.gif"><br/>
<07. 애니메이션 상태끼리 연결></p>  
  
현재 상태는 아무런 조건이 없기 때문에 `Idle`, `Walk`, `Back Walk` 상태 끼리 제약없이 애니메이션 변경이 가능합니다.  
우리는 앞으로 가는 키를 눌렀을 때 `Walk`,  
뒤로가는 키를 눌렀을 때 `Back walk`,
가만히 있을 때 `Idle`
애니메이션을 실행시킬 것이기 때문에 다음과 같이 조건을 지정해 줄 것입니다.  

먼저 애니메이터 창 좌측 상단 `Parameters` 항목을 클릭합니다.  
그리고 조금 우측 + 버튼을 눌러 `Bool` 항목을 클릭합니다.  
이렇게 생성된 `Parameter`의 이름을 `isWalk`로 설정합니다.  
`Parameter`를 하나 더 생성하여 이름을 `isWalkBack`으로 설정합니다.  
대소문자는 구분하기 때문에 정확하게 입력하셔야 합니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/8.gif"><br/>  
<08. 조건 파라미터 생성></p>   
  
이렇게 생성한 `Parameter`를 사용하기위해서 먼저  
`Idle` -> `Walk` 방향의 화살표를 클릭합니다.  
그러면 해당 화살표가 다음과 같이 푸른색으로 활성화가 됩니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/9.PNG"><br/>  
<09. 화살표 선택></p>   
  
화살표를 클릭하면 우측 인스펙터창이 다음과 같이 활성화가 될것입니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/10.PNG"><br/>  
<10. Animation Transition 창></p>   
  
해당 인스펙터 창은 우리가 선택한 화살표가 어떤 애니메이션 클립에서 어떤 애니메이션 클립으로 변경되는지 알려주는 창입니다.  
해당 창 하단에 `Conditions`항목을 확인합니다.  
우측 하단 + 버튼을 눌러 조건을 추가합니다.  
해당 조건은 `Idle`에서 `Walk`로 이동하는 것이기 때문에  
`isWalk`, `True`로 값을 지정해줍니다.  
이렇게 설정하면 추후 `isWalk`값이 참이 되면 애니메이션을 변경할 수 있게 됩니다.  
우리가 나중에 앞으로 가는 키를 눌렀을 때 해당 파라미터를 참으로 변경하면 되죠.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/11.gif"><br/>  
<11. Condition 설정></p>   
  
이런식으로 모든 화살표에 `Conditions`를 설정합니다.  
물론 애니메이션의 진행 방향에 따라 조건의 파라미터와 그 값을 다르게 해야합니다.  
예를들어 `idle` -> `Walk` 는 isWalk 가 true 일 때,  
`Walk` -> `idle`은 isWalk가 false 일 때,  
`idle` -> `Walk Back`은 isWalkBack 이 true,  
`Walk Back` -> `Idle`은 isWalkBack 이 False 가 되어야 합니다.  
화살표를 클릭하면 우측 인스펙터창이 다음과 같이 활성화가 될것입니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/12.gif"><br/>  
<12. Condition 설정 2></p>   
  
그리고 이번엔 각 화살표를 클릭하고  우측 인스펙터 창에서  
`Has Exit Time` 항목을 찾아 체크 해제를 해줍니다.  
`Has Exit Time` 항목은 애니메이션이 변경될 때 이전에 진행하던 애니메이션을 마저 끝내고 넘어가게 하는 옵션입니다.  
우리는 이동하는 키를 눌렀을 때 이전의 애니메이션을 바로 멈추고 이동하는 애니메이션이 재생되어야 하기 때문에  
해당 항목을 모두 체크해제 하도록 합니다.  
화살표를 클릭하면 우측 인스펙터창이 다음과 같이 활성화가 될것입니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/15.gif"><br/>  
<13. Has Exit Time 해제></p>   
  
#### Character Controller 설정  
  
이전 Character Controller 포스팅에서 진행한 캐릭터 이동 스크립트인 `PlayerController.cs` 스크립트를 그대로 이용합니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/16.PNG"><br/>  
<14. PlayerController.cs></p>  
  
계층구조창의 캐릭터 오브젝트에 `PlayerController.cs`, `Character Controller`, `Rigidbody`, `Capsule Collider` 컴포넌트를 추가합니다.  
`Rigidbody` 컴포넌트의 `Use Gravity` 항목은 체크 해제, `Is Kinematics` 항목은 체크하는것 잊지 마시고,   
`Capsule Collider` 컴포넌트의 `Center` 항목을 수정하여 캐릭터와 충돌체의 싱크를 맞춰주세요.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/17.PNG"><br/>  
<15. 컴포넌트 추가></p>  
  
캐릭터 아래에 `Plane`오브젝트를 하나 깔아주고 테스트를 해봅니다.  
아직은 애니메이션이 스크립트상으로 수정되지 않아 구현되지 않는것을 확인할 수 있습니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/19.gif"><br/>  
<16. 캐릭터 이동 테스트></p>  
  
  {% include adsense.html %}  
  
#### 스크립트 수정  
  
`PlayerController.cs` 스크립트를 열어 아래와 같이 수정합니다.  
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    CharacterController CharacterController;
    Animator AnimController;

    public float moveSpeed = 8f;
    public float maxTurnSpeed = 150f;

    public float horizontal;
    public float vertical;

    void Start()
    {
        CharacterController = GetComponent<CharacterController>();
        AnimController = GetComponent<Animator>();
    }
    // Update is called once per frame
    void Update()
    {
        horizontal = Input.GetAxis("Horizontal");
        vertical = Input.GetAxis("Vertical");

        if (Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow))
        {
            AnimController.SetBool("isWalk", true);
        }
        else if (Input.GetKeyUp(KeyCode.W) || Input.GetKeyUp(KeyCode.UpArrow))
        {
            AnimController.SetBool("isWalk", false);
        }

        if (Input.GetKeyDown(KeyCode.S) || Input.GetKeyDown(KeyCode.DownArrow))
        {
            AnimController.SetBool("isWalkBack", true);
        }
        else if (Input.GetKeyUp(KeyCode.S) || Input.GetKeyUp(KeyCode.DownArrow))
        {
            AnimController.SetBool("isWalkBack", false);
        }
    }

    private void FixedUpdate()
    {
        Vector3 direction = new Vector3(horizontal, 0, vertical);
        direction *= moveSpeed;
        CharacterController.SimpleMove(direction);
    }
}
```
  
추가된 부분은  
* 8번째 줄 Animator AnimController; AnimController 변수를 선언합니다.  
* 19번째 줄 AnimController = GetComponent<Animator>(); 해당 변수에 컴포넌트를 연결합니다.  
* 그리고 26번째 부터 42번째 까지의 if 문입니다. AnimController.SetBool 메소드를 통해 해당 애니메이터의 파라미터에 접근하고 값을 변경할 수 있습니다.  
  첫번째 인자에는 문자열 값으로 우리가 애니메이터 컨트롤러에서 생성한 `Parameter`이름을 넣고, 두번째 인자에는 변경할 값을 넣습니다.  
  AnimController.SetBool("isWalk", true); 라면 isWalk 파라미터의 값을 true로 변경한다는 뜻입니다.  
  그렇게 되면 우리가 애니메이터 컨트롤러에서 설정한 화살표의 조건에 맞게 애니메이션이 변경됩니다. 즉 걷기 애니메이션으로 변경된다는 뜻입니다.  
  
#### 테스트  
  
유니티 에디터 상단 플레이 버튼을 눌러 테스트를 해봅니다.   
<p align="center"><img src="/img/UnityFundamental/MixamoUnity3/20.gif"><br/>  
<17. 애니메이션 동작 테스트></p>    
  
앞뒤, 그리고 가만히 있을때 각각의 애니메이션이 진행되는 것을 확인할 수 있을것입니다.  
다만 양옆으로 이동할때에 따른 애니메이션은 우리가 설정하지 않았기 때문에 구현이 되어있지 않습니다.  
여유가 되신다면 양옆으로 이동할 때의 애니메이션도 구현해보시길 바랍니다.  
  
  {% include adsense.html %}
