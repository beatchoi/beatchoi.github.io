---
title: 봉앤줄 인터랙티브 퍼포먼스 AR
subtitle: 봉앤줄
description: Unity3D,C#,AR,OpenCV,Vision
layout: product
image: /img/portfolio/bongnjoule/bongnjoule01.png
price: 97
features:
    - label: 개발 기간 - 2020.08 – 2020.12 (4 년차)  
    - label: 수행 PJT - 기술 연구 프로젝트    
    - label: 담당 업무 - XR 콘텐츠 개발  
---

본 프로젝트는 봉앤줄의 차이니즈폴 공연에 computer vision을 적용시킨 콘텐츠로 파란색 짐 볼을 인식하여 다른 객체로 표현하고 이를 관람객이 볼 수 있도록 기획되었습니다. 연기자가 바닥에 있는 짐 볼을 들고 폴을 오르내리는 과정에서 관람객이 기존 짐 볼들을 다른 형상으로 보게 하고 메시지를 담기 위해 시작되었습니다.   

주요업무  
- Unity3D 와 OpenCV를 활용한 XR 콘텐츠 개발    
  
획득역량  
- OpenCV를 활용한 영상 전처리 과정에 대하여 이해  
- Unity3D 내에서 OpenCV를 활용하기위한 플러그인화에 대한 이해  
- HSV를 기준으로 한 색상인식 알고리즘 및 객체 인식 기능 구현의 이해

본 모바일 기기에서 작동할 수 있도록 기획 개발되었으며 모바일 기기에서 OpenCV를 구동하기에 퍼포먼스가 조금 부족했었습니다.  
HSV 범위로 파란색을 인식할 수 있는 mask를 생성하고 비트 연산을 통해 해당 영역을 가져왔습니다. 또한 Hough Transform을 통해 원을 검출하여 인식한 영역이 파란색 짐볼인지 아닌지 검출하였습니다. 해당 영역이 파란색 짐볼이라고 판단하였으면 해당 원의 중심 좌표를 계산하여 미리 지정해둔 객체를 위치시켜 파란색 짐볼 위에 덮여서 보일 수 있도록 하였습니다.  
본 콘텐츠에서 구현이 안된부분은 깊이가 계산되지 못해서 퍼포머가 짐볼을 가지도 이동을 할 때 앞뒤 위치 차에 따라서 짐볼을 대체하는 객체의 크기를 조절하지 못해 짐볼이 카메라 가까이 오게될 때 객체의 크기는 그대로라서 싱크가 맞지 않았다는 점입니다. 이는 추후 깊이 카메라를 활용하게되는 계기가 되었습니다.  
  
<p align="center">
<img src="/img/portfolio/bongnjoule/bongnjoule01.gif" width="49%">
<img src="/img/portfolio/bongnjoule/bongnjoule02.gif" width="49%">
<figcaption align="center">파란색 짐볼에 객체 인식 장면</figcaption>
</p>
<br/>
 


