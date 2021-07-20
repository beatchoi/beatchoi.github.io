---
layout: post
title:  "믹사모 캐릭터 애니메이션 활용 2 - Mixamo Character & Animation 2 "
date:   2021-07-16 16:00:07
categories: Unity3D Fundamentals
description: "믹사모 캐릭터 및 애니메이션의 활용 - 2"
image: '/img/UnityFundamental/MixamoUnity/18.gif'
published: true
canonical_url: https://beatchoi.github.io/unity3d/fundamentals/2021/07/16/MixamoUnity2/
---
  
{% include adsense.html %}  
  
  
## 믹사모 캐릭터 및 애니메이션의 활용 2 :: Mixamo Character & Animation 2  
  
저번 포스팅에서 불러온 모델링 파일을 활용하여 애니메이션을 구현해봅니다.  
애니메이션 컨트롤러를 활용하여 애니메이션을 조정합니다.  
  
## 유니티에서  
  
이전 유니티 프로젝트의 `Project`에서 애니메이션 모델링 파일을 선택합니다.  
우측 `Inspector` 창에서 상단 `Animation`탭을 선택하고 하단 `Loop Time`항목을 체크합니다.  
그리고 우측 하단에 `Apply`버튼을 눌러 적용시킵니다.  
걸어다니는 애니메이션의 경우 걷는모션이 연속되기때문에 애니메이션에 루프를 걸어주는 역할을 합니다.  
해당 항목이 체크되어있지 않으면 애니메이션이 한번 걷고 멈추게 됩니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity2/3.PNG"><br/>
<01. Loop Time 체크></p>  
  
그리고 `Inspector` 창 하단에서 플레이 버튼을 누르면 다음과 같이 애니메이션을 확인할 수 있습니다.   
<p align="center"><img src="/img/UnityFundamental/MixamoUnity2/4.gif"><br/>
<02. 애니메이션 체크></p>  
  
`Project`창에 임포트한 모델링을 `계층구조창`으로 끌어다 놓습니다.  
생성한 모델링을 선택하여 우측 `Inspector`창에서 `Animator`라는 컴포넌트를 추가합니다.    
<p align="center"><img src="/img/UnityFundamental/MixamoUnity2/5.PNG"><br/>
<03. `Animator`컴포넌트 추가></p>  
  
`Project`창에서 `Animator Controller`파일을 생성합니다.  
해당 파일이 캐릭터의 애니메이션을 관장하게 됩니다.  
해당 파일의 이름을 `CharacterController`로 수정합니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity2/1.PNG"><br/>
<04. Animator Controller 생성></p>  
  
생성한 `CharacterController`파일을 더블클릭하면 `Animator`창이 열립니다.  
`Animator`창은 다음과 같이 생겼습니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity2/2.PNG"><br/>
<05. Animator 창></p>  
  
`Project` 창에서 임포트한 캐릭터 애니메이션 모델링 파일을 `Animator`창으로 그대로 드래그 앤 드롭 합니다.  
이렇게 생성된 오렌지색 박스가 우리가 임포트한 걸어다니는 `애니메이션 클립`입니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity2/6.gif"><br/>
<06. 애니메이션 클립 등록></p>  
  
계층구조창에서 만들어 놓은 캐릭터를 선택하여 우측 `Inspector`창의 `Animator`컴포넌트의 `Controller`항목에  
`Project`창에 생성해놓은 `CharacterController`파일을 연결시킵니다.  
이렇게 되면 우리가 만든 `Animator Controller`와 캐릭터가 연동됩니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity2/7.gif"><br/>
<07. 애니메이터 컨트롤러 연걸></p>  
  
유니티 에디터 상단에 플레이 버튼을 눌러 캐릭터가 걷기 애니메이션을 재생하는지 확인합니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoUnity/18.gif"><br/>  
<08. 걷기 애니메이션></p>   
  
  
  {% include adsense.html %}
  
  
