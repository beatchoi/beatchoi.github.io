---
title: 순천만 색칠공부
subtitle: 2021 순천시 4차산업 박람회 ‘2021 NEXPO in 순천
description: Unity3D,C#,XR,Network
layout: product
image: /img/portfolio/arcoloring/arcoloring.png
price: 98
features:
    - label: 개발 기간 - 2020.04 – 2020.09 (4 년차)  
    - label: 수행 PJT - 콘텐츠 개발 프로젝트  
    - label: 담당 업무 - AR 콘텐츠 개발  
---

본 프로젝트는 순천만 국가정원을 배경으로 기획된 지역 특화 콘텐츠로 이용자가 태블릿 그림에 색칠을 하면 해당 그림이 3D 객체가 되어 전면 프로젝터에 생성되도록 기획 및 개발하였습니다. 태블릿은 최대 4대가 동시에 메인 PC에 로컬네트워크로 연결되어 있고 이용자가 태블릿으로 색칠을 완료하면 해당 이미지 데이터가 메인 PC로 전송되어 객체를 생성한 후 이미지르 입혀 색칠한 색상이 나타나도록 하였습니다.  
주요업무  
- Unity3D 와 모바일 기기를 활용한 AR 콘텐츠 개발  
- Mirror Network를 활용한 로컬 네트워크 구현   
  
획득역량  
- Unity3D를 활용하여 효율적인 UI의 배치    
- Mirror Network를 활용하여 로컬 네트워크 구현 방법
- 텍스쳐의 데이터화 및 네트워크로의 전송 방법   
- 3D 객체의 텍스쳐 맵핑 셰이더의 이해

본 콘텐츠는 이용자가 원하는 그림에 색상을 칠할 수 있도록 하는 것이 주요 포인트였습니다. 색칠 방법에는 색연필 등으로 직접 칠하는 방식과 물감으로 한 구역을 터치하면 자동으로 색이 채워지는 두가지 방식이 있으며 후자의 방식을 위해 색칠하는 구역의 텍스쳐를 미리 잘라서 각기 다른 객체로 만들어 두었습니다. 색칠을 완료하면 화면을 캡쳐하고 캡쳐한 텍스쳐를 byte등의 데이터로 변환하여 Mirror Network로 연결된 중앙 컴퓨터로 전송합니다. 전송받은 중앙 컴퓨터에서는 해당 데이터를 다시 복호화하여 텍스쳐로 만든 뒤 미리 설정된 3D 객체에 씌워 입히게 됩니다.  
  
<p align="center">
    <img src="/img/portfolio/arcoloring/arcoloring01.gif" width="49%">
    <img src="/img/portfolio/arcoloring/arcoloring02.gif" width="49%">
    <figcaption align="center">색칠 및 객체 생성 모습</figcaption>
</p>
<br/>




