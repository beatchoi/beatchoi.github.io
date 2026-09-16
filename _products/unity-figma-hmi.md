---
title: Figma → Unity HMI 컨버터와 디자이너 코스
subtitle: Unity Technologies Korea
description: Automotive HMI,Figma REST API,UGUI,UI Toolkit,Editor Extension,Unity AI,Designer Workflow
layout: product
group: unity
image: /img/portfolio/unity/hmi-hero.jpg
price: 207
features:
    - label: 기간 - 2026.03 – 2026.07 (Unity 2년차)
    - label: 역할 - 컨버터 설계·개발, 디자이너 대상 코스 기획과 진행
    - label: 형태 - Unity 에디터 확장 패키지 (Figma Converter v0.1) + 10시간 코스
    - label: 비중 - 핵심 개발 단독, 트레이닝 팀 IP
---

##### 왜 만들었나
자동차 HMI 디자인은 Figma에서 시작하고 Figma에서 살아갑니다. 그런데 그 디자인이 실제로 움직이는 화면이 되려면 개발자가 엔진 안에서 다시 만들어야 했습니다.  
이 인계 과정이 병목입니다. 느리고, 디자인의 정밀도가 깎이고, 반복 작업의 주도권이 디자이너 손을 떠납니다.  
자동차 HMI에서는 디자이너의 영향력이 개발자보다 큰 경우가 많습니다. 그렇다면 디자이너가 자기 디자인을 직접 엔진에 넣고, 코드를 쓰지 않고 인터랙션을 붙여 볼 수 있어야 합니다.  
자동차 전장 기업의 HMI 팀 교육을 준비하면서 이 도구가 필요하다는 것이 분명해졌습니다.

##### 만든 것
Figma 디자인을 Unity UI 프리팹으로 자동 변환하는 에디터 확장입니다.  
- Figma REST API로 파일 구조를 불러와 페이지·프레임·컴포넌트 트리에서 변환할 노드를 고릅니다  
- 변환 대상은 UGUI 캔버스 또는 UI Toolkit 중 선택  
- 이미지 채움과 벡터 노드는 PNG로 내보내고, 폰트는 Google Fonts에서 자동으로 받아 TextMeshPro SDF 폰트 에셋까지 만듭니다  
- 버튼, 토글, 입력 필드 같은 인터랙티브 컴포넌트를 자동으로 감지해 붙입니다  
- 결과는 Figma 프로젝트별 폴더에 프리팹·스프라이트·폰트로 정리됩니다  

이 도구 위에 10시간짜리 디자이너 코스를 설계했습니다. 코딩 경험이 없는 디자이너가 자기 Figma 파일을 Unity로 가져오고, Unity AI에게 말로 인터랙션을 설명해 동작하는 HMI 프로토타입을 만드는 과정입니다.  
목표는 디자이너를 개발자로 만드는 것이 아니라, 개발자 없이 프로토타입을 만들 수 있게 하는 것입니다.

##### 화면
<div class="media-grid">
<figure><video autoplay muted loop playsinline preload="metadata" poster="/img/portfolio/unity/hmi-convert-poster.jpg"><source src="/img/portfolio/unity/hmi-convert.mp4" type="video/mp4"></video><figcaption>Figma 프레임을 그대로 가져온 클러스터 화면. 게이지, 텍스트, 기어 버튼이 UGUI 컴포넌트로 살아 있습니다.</figcaption></figure>
<figure><video autoplay muted loop playsinline preload="metadata" poster="/img/portfolio/unity/hmi-unityai-poster.jpg"><source src="/img/portfolio/unity/hmi-unityai.mp4" type="video/mp4"></video><figcaption>변환한 HMI를 주행 씬에 붙이고 Unity AI로 인터랙션을 더한 프로토타입.</figcaption></figure>
</div>

##### 사업적 결과
- 자동차 전장 기업과 완성차 기업의 디자인·HMI 팀에 코스와 워크플로를 전달했고, 반응이 좋았습니다.  
- 영업 조직과 인접 팀에서 이 워크플로에 대한 관심이 늘었고, 해외 지역에서도 문의가 왔습니다. 한 고객을 위해 만든 도구가 산업 전체를 가로지르는 자산이 된 경우입니다.  
- Unity가 자동차 HMI에서 "디자인에서 런타임까지"의 경로가 될 수 있다는 것을 도구와 코스로 보였습니다.  
- 컨버터는 서드파티 의존이 아닌 트레이닝 팀의 지적 재산이라, 고객 요구에 따라 계속 발전시킬 수 있습니다.

##### 배운 것
가르칠 대상이 개발자가 아닐 때, 교육의 첫 단계는 코스가 아니라 도구였습니다. 도구가 인계 과정을 없애면 코스는 그 위에서 짧아집니다.
