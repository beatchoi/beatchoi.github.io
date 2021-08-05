---
layout: post
title:  "Assets - Stylized Water For URP"
date:   2021-08-05 10:00:07
categories: page-UsefulAssets
description: "Universal  Rendering Pipeline을 활용하는 물 이펙트를 구현해봅니다"
image: '/img/UnityAssets/210805WaterEffect/100.PNG'
published: true
canonical_url: https://beatchoi.github.io/unity3d/page-UsefulAssets/2021/08/05/AssetsWaterEffect/
---
  
  
  {% include adsense.html %}

## Stylized Water For URP
유니티로 콘텐츠를 개발할때 왕왕 필요한 물 이펙트를 구현할때 유용한 `Stylized Water For URP`라는 물 에셋을 활용해봅니다.  
  
## 에셋 구현
#### 에셋 임포트
`Stylized Water For URP`라는 에셋을 프로젝트에 임포트해봅니다.  
`AssetStore`페이지에서 `Stylized Water For URP`에셋을 프로젝트에 추가합니다.    
<p align="center"><img src="/img/UnityAssets/210805WaterEffect/100.PNG"><br/>
<01. Stylized Water For URP 추가></p>
  
프로젝트를 하나 새로 생성하고 `Windows -> Package Manager`에 들어가서 방금 추가한 `Styliezed Water For URP`에셋을 임포트합니다.  
<p align="center"><img src="/img/UnityAssets/210805WaterEffect/1.PNG"><br/>
<02. 에셋 임포트></p>
  
아마 최근 유니티 버전을 사용하고 있다면 다음과 같은 에러들이 콘솔창에 나타날 것입니다.  
<p align="center"><img src="/img/UnityAssets/210805WaterEffect/2.PNG"><br/>
<03. 콘솔창 에러></p>
  
위 에러를 해결하기 위해서는 `Universal RP`를 설치해야합니다.  
`Windows -> Package Manager`에 들어가서 창 상단에 `Packages: Unity Registry`항목을 선택합니다.  
패키지중 `Universal RP`를 선택하고 설치합니다.  
<p align="center"><img src="/img/UnityAssets/210805WaterEffect/3.PNG"><br/>
<04. Universal RP 설치></p>
  
설치가 완료되면 다음과 같은 창이 뜰 수도 있습니다.  
당황하지 말고 아래 `Detect`버튼을 누르고 닫아줍니다.  
<p align="center"><img src="/img/UnityAssets/210805WaterEffect/4.PNG"><br/>
<05. Universal RP 설치></p>
  
`Universal RP` 패키지와 설치 완료되면 이제 에셋 샘플 프리펩을 확인해봅니다.  
`Project`창에서 `Stylized Water For URP -> Prefabs -> Circular Water.prefab`을 끌어다가 계층구조창으로 드래그앤 드롭합니다.  
그럼 다음과 같이 오브젝트의 셰이더가 깨진상태로 불러와질 것입니다.  
<p align="center"><img src="/img/UnityAssets/210805WaterEffect/5.PNG"><br/>
<06. Asset Prefab 확인></p>
  
오브젝트의 텍스쳐가 분홍색으로 나타나는 것은 오브젝트의 머테리얼을 이루는 셰이더가 호환되지 않는다는 것입니다.  
보통의 경우에는 셰이더를 다시 설정하는 것으로 해결이 되지만 지금의 경우에는 `Universal Rendering Pipeline`을 활용하는 것이기 때문에  
조금 다른 방법으로 해결해야 합니다.  
`Edit -> Render Pipeline -> Upgrade Project Materials to UniversalRP Materials`항목을 클릭합니다.  
<p align="center"><img src="/img/UnityAssets/210805WaterEffect/6.PNG"><br/>
<07. Universal RP 머테리얼 업그레이드></p>
  
`Project Settings`창에서 우측 `Graphics`항목의 `Scriptable Render Pipeline Settings`항목에 `URP Pipeline`을 선택합니다.  
<p align="center"><img src="/img/UnityAssets/210805WaterEffect/7.PNG"><br/>
<08. Project Settings></p>
  
여기까지 하셨으면 아마 프리펩의 텍스쳐는 나오지만 씬에 원인을 알수없는 핑크색 사각형이 존재하게 됩니다.  
`Project`창에서 `Stylized Water For URP -> Demos -> URP Renderer`파일을 선택하고 우측 인스펙터 창에서 `Caustics`항목을 체크해제 합니다.  
<p align="center"><img src="/img/UnityAssets/210805WaterEffect/8.PNG"><br/>
<09. Caustics 체크 해제></p>
  
그리고 상단 플레이 버튼을 눌러 확인해보면 다음과 같이 출렁이는 오브젝트를 확인할 수 있습니다.  
<p align="center"><img src="/img/UnityAssets/210805WaterEffect/9.gif"><br/>
<10. Prefab 확인></p>
  
#### Next
다음에는 해당 에셋을 활용한 Water 오브젝트의 속성을 다루어 보도록 하겠습니다.  
  
  
  
  {% include adsense.html %}
  
  


