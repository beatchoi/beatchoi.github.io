---
title: Unity USD Toolkit
subtitle: Unity Technologies Korea
description: OpenUSD,Runtime Import/Export,UPM Package,C++ Native,P/Invoke,Windows/macOS/Linux
layout: product
group: unity
image: /img/portfolio/unity/usd-hero.jpg
price: 210
features:
    - label: 기간 - 2026.06 – 2026.09 (Unity 2년차)
    - label: 역할 - 기획, 아키텍처, 핵심 개발, 패키징과 릴리스
    - label: 형태 - Unity Package Manager 패키지 (com.unity.usd-toolkit)
    - label: 비중 - 공유 저장소 커밋 34건 중 22건 작성, 어카운트 TAM과 협업
---

##### 왜 만들었나
디지털 트윈과 로보틱스 현장에서는 OpenUSD가 서로 다른 도구 사이의 공용 데이터 형식이 되어 가고 있습니다.  
Omniverse와 Isaac Sim이 USD를 중심으로 돌아가고, 제조 현장의 3D 데이터도 USD로 오가는 경우가 많아졌습니다.  
그런데 Unity의 USD 지원은 에디터에서 에셋을 불러오는 용도에 머물러 있었습니다. 빌드된 애플리케이션 안에서 USD를 읽고 쓰는 길이 없었습니다.  
교육을 진행하던 전자 대기업 고객이 정확히 그 지점을 요구했습니다. 에디터가 아닌 실행 중인 앱에서, 오프라인 변환 없이, USD를 바로 넣고 빼야 한다는 것이었습니다.  
제품 로드맵에 넘기고 기다리는 대신, 진행 중이던 교육 안에서 직접 만들어 고객의 데이터로 바로 확인하게 하는 쪽을 택했습니다.

##### 만든 것
Pixar OpenUSD를 감싼 C++ 네이티브 래퍼를 만들고 Unity C#에서 P/Invoke로 호출하는 구조입니다. 기존 에디터용 USD 패키지에 의존하지 않기 때문에 빌드된 플레이어에서 그대로 동작합니다.  
- 플랫폼: Windows x64, macOS(Intel·Apple Silicon), Linux x64  
- 내보내기: 정적 메시, 씬 계층을 USD Xform으로 보존, 서브메시별 머티리얼 바인딩, PBR 텍스처, .usd / .usda / .usdc / .usdz  
- 불러오기: 파일을 열기 전 크기를 미리 보는 스테이지 메타데이터, 계층 복원, 머티리얼과 텍스처, 알파 컷아웃, 큰 스테이지를 위한 비동기 임포트  
- 샘플: 런타임 내보내기·불러오기 예제 앱이 패키지에 컴파일된 상태로 포함  
- 규모: 런타임 C# 약 4,300줄, 네이티브 C++ 약 3,800줄, 공개 API 타입 16개  
- 릴리스: 2026년 6월부터 9월까지 0.1.0에서 0.7.2까지 13개 버전, 버전마다 체인지로그와 네이티브 ABI 버전 관리

씬 계층 보존, 서브메시 머티리얼, PBR 텍스처 같은 핵심 기능은 고객 요구 목록에 없었지만 실제 콘텐츠를 만나면 없이는 버티지 못한다고 판단해 먼저 넣었습니다. 고객 리뷰에서 나온 요청은 그 위에 얹었습니다.

##### 화면
<div class="media-grid one">
<figure><video autoplay muted loop playsinline preload="metadata" poster="/img/portfolio/unity/usd-import-poster.jpg"><source src="/img/portfolio/unity/usd-import.mp4" type="video/mp4"></video><figcaption>빌드된 앱 안의 런타임 USD 임포트 브라우저. 산업 설비 모델(정점 175만 개)을 열어 계층과 머티리얼을 복원합니다.</figcaption></figure>
</div>

##### 사업적 결과
- 하나의 패키지가 두 고객 인게이지먼트를 받쳤습니다. 전자 대기업 교육에서 시작한 요구를 KITECH 교육에서 범용 툴킷으로 넓혔고, 두 곳 모두에 같은 패키지를 전달했습니다.  
- 고객 산출물이 아니라 재사용 가능한 UPM 패키지로 만들기로 한 결정이 비용을 갚았습니다. 다른 Unity 팀이 인수 프로젝트 없이 그대로 가져가 고객 데모에 확장해 썼고, 그 변경을 다시 공유 패키지로 되돌려 받았습니다.  
- Unity가 갖고 있지 않던 능력을 교육 팀 예산(AIDE)으로 만들었습니다. 에디터 전용이던 USD 지원에 런타임 경로가 생겼습니다.  
- 에이전트 기반 개발을 적극적으로 써서 첫 릴리스까지 한 달이 걸렸습니다. 같은 범위를 이전 방식으로 잡았다면 석 달로 봤습니다.

##### 배운 것
고객 프로젝트를 대신 만들어 주는 대신, 고객 프로젝트와 Unity를 잇는 모듈을 만들어 패키지로 남기면 다음 고객에게 다시 쓸 수 있습니다.  
이 패키지는 그 방식이 한 번의 우연이 아니라는 첫 증거가 되었습니다.
