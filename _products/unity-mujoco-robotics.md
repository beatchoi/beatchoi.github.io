---
title: MuJoCo in Unity 로보틱스 시뮬레이션
subtitle: Unity Technologies Korea
description: MuJoCo,Robotics,URDF/MJCF,ML-Agents,Reinforcement Learning,Contact-rich Manipulation
layout: product
group: unity
image: /img/portfolio/unity/mujoco-hero.jpg
price: 209
features:
    - label: 기간 - 2026.05 – 2026.07 (Unity 2년차)
    - label: 역할 - 교재 프로젝트 설계·개발, 코스 기획
    - label: 형태 - Unity 프로젝트 2종 (TP_MujocoSimulation, TP_MLAgentRobotics) + 14시간 코스 제안서
    - label: 비중 - 단독 개발, 내부 개발자 포털 등록
---

##### 왜 만들었나
로봇을 다루는 고객들은 Unity의 렌더링과 ROS 연동은 쓰고 싶어 하지만, 물리는 믿지 못했습니다.  
접촉이 많은 조작 작업, 예를 들어 손가락 열일곱 개로 물건을 집는 일은 PhysX와 ArticulationBody로는 연구 수준의 결과를 내기 어렵습니다.  
로보틱스 연구 현장에서는 이미 MuJoCo가 표준에 가까운 물리 엔진이 되어 있었습니다.  
그렇다면 물리는 MuJoCo에 맡기고 렌더링과 로직은 Unity가 맡는 구성을 실제로 끝까지 만들어 보고, 그것을 가르칠 수 있는 형태로 정리하는 것이 필요했습니다.

##### 만든 것
첫 프로젝트는 7축 로봇 팔(OpenArm)과 액추에이터 17개짜리 손(ORCA)이 탁자 위 큐브를 집어 다른 탁자로 옮기는 데모입니다. 에디터 안에서만 돌아갑니다.  
- MJCF와 URDF로 실제 로봇을 불러오고, 관절 제어와 손가락 제어를 세션별 실습 패널로 구성  
- 카르테시안 픽 명령을 내리기 전에 작업 공간 지도에 도달 가능 여부를 먼저 묻는 구조  
- 힘·토크 센서를 붙인 접촉 기반 파지  

두 번째 프로젝트는 같은 물리 위에서 다섯 손가락 로봇 손이 공을 집어 올리는 법을 스스로 배우는 강화학습입니다.  
- ML-Agents로 학습, MuJoCo가 물리 권위  
- 관측 60개를 읽어 행동 17개를 쓰는 2.3MB 신경망. 움직임은 스크립트가 아니라 학습 결과  

이 두 프로젝트를 바탕으로 14시간짜리 중급·고급 코스를 설계했습니다. 플러그인과 네이티브 라이브러리 설치, MJCF 작성과 임포트, 액추에이터와 센서 구성, PhysX와 MuJoCo의 트레이드오프, 외부 Python 프로세스와 물리 상태 동기화까지를 한 줄로 이었습니다.  
범위도 분명히 정했습니다. 비전과 합성 데이터는 추론 엔진 코스로, 강화학습 알고리즘은 ML-Agents 코스로, 산업 통신은 별도 코스로 보냅니다.

##### 화면
<div class="media-grid">
<figure><video autoplay muted loop playsinline preload="metadata" poster="/img/portfolio/unity/mujoco-grasp-poster.jpg"><source src="/img/portfolio/unity/mujoco-grasp.mp4" type="video/mp4"></video><figcaption>OpenArm과 ORCA 손이 큐브를 집어 옮기는 장면. 물리는 MuJoCo, 렌더링은 Unity.</figcaption></figure>
<figure><video autoplay muted loop playsinline preload="metadata" poster="/img/portfolio/unity/mlagent-training-poster.jpg"><source src="/img/portfolio/unity/mlagent-training.mp4" type="video/mp4"></video><figcaption>ML-Agents 학습 중인 로봇 팔. 움직임은 스크립트가 아니라 정책의 출력입니다.</figcaption></figure>
</div>

##### 사업적 결과
- 로보틱스 고객과의 대화에서 "Unity로 물리 정확도가 나오느냐"는 질문에 제안서가 아니라 돌아가는 데모로 답할 수 있게 되었습니다.  
- 엔지니어링 역량 강화 프로그램(ECEP)의 로보틱스 트랙 코스로 제안되어, 트레이닝 팀이 판매할 수 있는 상품 목록이 하나 늘었습니다.  
- KITECH 8일 과정의 로봇 디지털 트윈 세션과 이어져, 한 고객의 교육에서 다른 고객의 코스로 재사용되는 흐름을 만들었습니다.  
- 프로젝트를 내부 개발자 포털에 등록해 다른 팀이 찾아 쓸 수 있게 했습니다.

##### 배운 것
로보틱스에서 Unity의 자리는 물리 엔진을 이기는 것이 아니라, 최고의 물리 엔진을 안에 들이고 그 위에 눈과 손을 붙이는 것이었습니다.
