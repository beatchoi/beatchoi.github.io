---
title: 키즈카페 AR 공던지기 콘텐츠
subtitle: 개인프로젝트
description: Unity3D,C#,VR,OpenCV,IntelRealsense
layout: product
image: /img/portfolio/arballthrow/arballthrow.jpg
price: 94
features:
    - label: 개발 기간 -  2021.09 - 2022.03 (5, 6 년차)
    - label: 수행 PJT  - 기술 개발 프로젝트    
    - label: 담당 업무 - AR 콘텐츠 개발  
---

본 프로젝트는 키즈카페에 있는 벽면 공던지기 AR 콘텐츠를 하나의 깊이 카메라를 활용하여 구현한 것으로 파란색상의 공을 인식하여 프로젝터를 통해 벽에 쏘여진 풍선을 터트리는 부분을 구현하였습니다.  

주요업무  
- OpenCV 및 Intel Realsense 깊이 카메라를 활용하여 공 인식 기능 구현 및 인터랙티브 콘텐츠 구현  
 
  
획득역량  
- Unity3D 에서 OpenCV의 활용  
- Unity3D 에서 Intel Realsense를 활용한 콘텐츠 구현  
- 깊이 카메라와 현실 세계 간의 좌표 alignment    

<br/>
기존 키즈카페에 있는 공던지기 AR 콘텐츠에는 2개 이상의 비싼 장비들로 이루어져 있어 이를 1개의 깊이 카메라를 활용하여 구현해보기 위해 연구를 진행했습니다. 카메라와 전면 프로젝터 영상과의 거리는 약 3-5미터 정도로 세팅되었고 카메라가 공을 인식할 수 있는 영역을 설정하기 위해 좌상단, 우하단에 빨간색으로 마킹을 했습니다. 파란색 공을 인식시키기 위해 OpenCV 라이브러리를 활용하였고 공과 전면 프로젝터 영상과의 거리를 계산하기 위해 Intel Realsense 카메라와 RealsenseSDK를 활용하였습니다. OpenCV 라이브러리에서 인식하는 영상의 해상도와 Realsense에서 인식하는 영상의 해상도에 차이가 있어 이를 맞추는 작업이 필요했습니다. 인식된 파란색 공의 위치값을 가상의 구에 적용시키고 해당 구가 영상에 속의 풍선과 인터랙션 할 수 있도록 구성하였습니다.
   
  
<p align="center">
<img src="/img/portfolio/arballthrow/arballthrow01.gif" width="46%">
<img src="/img/portfolio/arballthrow/arballthrow02.gif" width="49%">
<figcaption align="center">공 인식 장면 및 벽에 던졌을 때 객체와의 인터랙션 장면</figcaption>
</p>
<br/>
 
  
[RealsenseSDK](https://github.com/IntelRealSense/librealsense/releases/tag/v2.55.1) 
