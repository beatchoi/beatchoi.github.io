---
title: SM 엔터테인먼트 SMCU AR
subtitle: 주식회사 노바플로
description: Unity3D,C#,Platform,AWS S3,LightshipSDK,addressables, Mapbox
layout: product
image: /img/portfolio/smar/smar.png
price: 91
features:
    - label: 개발 기간 -   2022.6 - 2024.1 (6,7,8 년차)
    - label: 수행 PJT  - 플랫폼 개발 프로젝트    
    - label: 담당 업무 - XR 콘텐츠 개발  
---

본 프로젝트는 사용자가 성수동 일대의 지정된 위치에서 AR 임무를 수행하고 임무를 완수하면 보상을 받을 수 있는 콘텐츠로 임무를 수행하는 과정에서 증강현실 콘텐츠와 함께 사진 및 동영상을 찍고 SMCU AR 커뮤니티에 업로드를 할 수 있도록 개발하였으며 AOS 및 IOS 어플리케이션의 형태로 완성되었습니다.  

주요업무  
- Unity3D 툴을 활용하여 AR, XR 콘텐츠 개발 업무 담당  
  
획득역량  
- REST API 를 활용하여 XR 콘텐츠와의 데이터 전송 기법  
- Niantic Lightship SDK 를 활용한 AR,XR 콘텐츠의 개발 기법  
- 모바일 기기에서의 Universal Render Pipeline 에 대한 이해  
- GPS 를 활용한 위치기반 기술의 활용  
- Addressable 기능을 활용한 에셋의 관리

본 콘텐츠는 초기화, 메인, 지도, AR, 튜토리얼 씬으로 구성하였으며 해당 씬의 구성은 각각 다음과 같습니다.  

초기화 씬에서는
- AWS S3에 업로드 되어있는 에셋들을 다운로드  
- Vuplex Webview로 구현된 웹뷰에서 로그인
  
메인 씬에서는  
- GUI로 구현된 메뉴와 사진, 동영상 라이브러리  
- Vuplex Webview로 구현된 커뮤니티

지도 씬에서는  
- Mapbox로 구현된 gefencing 지도  
- 지도 상에서 AR 미션을 선택할 수 있음
  
AR 씬 및 튜토리얼 에서는
- 지도 씬에서 선택된 미션을 addressable로 로드하고 실행   
- LightshipSDK로 구현된 지면인식 및 VPS 콘텐츠 실행

AR콘텐츠들은 LightshipSDK의 지면인식과 Visual Positioning System을 바탕으로 만들어졌고 모바일 기기를 흔들거나 AR객체를 비추는 등의 인터랙션을 구현하였습니다. 그리고 AR 객체를 현실 배경과 어울리게 만들기 위해 Universal Render Pipeline의 환경에서 개발이 진행되었으며 이를 활용한 다양한 shader를 사용하여 그림자, 포털등을 구현하게 되었습니다.  
    
  
<p align="center">
<img src="/img/portfolio/smar/smar04.gif" width="32%">
<img src="/img/portfolio/smar/smar05.gif" width="32%">
<img src="/img/portfolio/smar/smar06.gif" width="32%">
<figcaption align="center">플랫폼 갤러리, 커뮤니티, 지오펜싱 지도</figcaption>
</p>
<br/>

   
<p align="center">
<img src="/img/portfolio/smar/smar01.gif" width="32%">
<img src="/img/portfolio/smar/smar02.gif" width="32%">
<img src="/img/portfolio/smar/smar03.gif" width="32%">
<figcaption align="center">SMAR AR 콘텐츠</figcaption>
</p>
<br/>
 


