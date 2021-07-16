---
layout: post
title:  "믹사모 캐릭터 애니메이션 활용 - Mixamo Character & Animation"
date:   2021-07-16 14:00:07
categories: Unity3D Fundamentals
description: "믹사모 캐릭터 및 애니메이션의 활용"
image: '/img/UnityBasic/CharacterController/06.gif'
published: true
canonical_url: http://beatchoi.github.io/unity3d/basics/2021/07/09/CharacterController2/
---
## 믹사모 캐릭터 및 애니메이션의 활용 :: Mixamo Character & Animation  
  
어도비 믹사모 캐릭터와 애니메이션을 활용하여 유니티에서 캐릭터의 움직임을 적용해 봅시다.  
물론 상업적으로 이용할 시 비용이 발생하는 점 유의 해야하며 관련 저작권도 조심해야 합니다.  
  
## 믹사모 사이트에서
  
`Mixamo.com`에 접속합니다.  
회원가입 및 로그인을 진행합니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/1.PNG"><br/>
<01. 믹사모 사이트 접속></p>  
  
로그인 시 다음과 같은 화면으로 진입할 것입니다.  
다음 창에서 좌측 상단 `Characters`탭을 선택합니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/2.PNG"><br/>
<02. 믹사모 로그인></p>  
  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/3.PNG"><br/>
<03. Character 탭 선택></p>    
  
`Character`탭에서 보이는 여러 캐릭터중 마음에 드는 캐릭터 하나를 선택합니다.  
저는 Racer 캐릭터를 선택하겠습니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/4.PNG"><br/>
<04. 캐릭터 선택></p>  
  
해당 캐릭터를 선택하고 로딩이 완료되면 다음과 같은 T포즈를 하고있는 캐릭터를 좌측 창에서 확인할 수 있습니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/5.PNG"><br/>
<05. 캐릭터 확인></p>  
  
이번엔 애니메이션 선택을 위해 좌측 상단 `Animation`탭을 선택합니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/6.PNG"><br/>
<06. Animation 탭 이동></p>  
  
`Animation`탭에는 다양한 종류의 애니메이션이 존재합니다.  
여러 애니메이션 중 걸어가는 애니메이션을 선택해보겠습니다.  
검색창에 `Walk`를 검색하고 마음에 드는 걷기 애니메이션을 선택합니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/17.PNG"><br/>
<07. 걷기 애니메이션 선택></p>  
  
걷기를 선택하게되면 보통 우측에 다음과 같이 걷는 애니메이션 샘플이 보여집니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/7.gif"><br/>  
<08. 걷기 애니메이션></p>   
  
현재 보여지는 애니메이션은 애니메이션 자체에 앞으로 이동하는 모션이 들어가 있어서 활용하기 힘듭니다.  
우측 탭에서 `In Place`항목을 체크하여 제자리에서 걷는 애니메이션으로 변경합니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/8.PNG"><br/>  
<09. 제자리 걷기 애니메이션></p>  
  
우측 `Download` 버튼을 누르면 다음과 같은 창이 생성되고 동일한 옵션으로 선택한 뒤 우측하단 Download 버튼을 누릅니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/9.PNG"><br/>  
<10. 애니메이션 다운로드></p>
  
##유니티에서  
  
다운로드가 완료되면 유니티 프로젝트를 생성하고 `Project`창에 다운로드받은 애니메이션 파일을 임포트합니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/10.PNG"><br/>  
<11. 애니메이션 파일 임포트></p>
  
임포트한 모델링 파일을 확인해보면 다음과 같이 캐릭터의 텍스쳐가 비어있는 경우가 있습니다.  
원래는 붉은색 옷을 입고있어야 하는데 텍스쳐가 비어 흰색으로 나타난 경우입니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/13.PNG"><br/>
<12. 텍스쳐 확인></p>
  
이럴땐 당황하지 말고 `Project`창에서 임포트한 모델링 파일을 선택한 뒤 `Inspector`창을 확인합니다.  
선택한 김에 해당 파일에 애니메이션이 존재하는지도 확인합니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/11.PNG"><br/>
<13 모델링 파일 선택></p>
  
`Inspector`창에서 상단 우측 `Materials`탭을 선택하고 세번째 항목의 `Textures`버튼을 클릭합니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/12.PNG"><br/>
<12. Materials & Textures></p>
  
텍스쳐를 뽑아줄 것입니다.  
`Textures`버튼을 선택하는 창에서 `Materials`폴더를 하나 생성하여 해당 폴더를 선택합니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/14.PNG"><br/>
<13. 텍스쳐 추출></p>  
  
`NormalMap Settings`라는 창이 뜨게되면 `Fix now`버튼을 눌러줍니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/15.PNG"><br/>
<14. NormalMap Settings></p>
  
다음과 같이 텍스쳐가 캐릭터에 입혀진 것을 확인할 수 있습니다.  
<p align="center"><img src="/img/UnityFundamental/MixamoCharacter/16.PNG"><br/>
<15. 캐릭터 텍스쳐></p>
