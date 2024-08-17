---
title: 구로고려대병원 임산부 교육 메타버스
subtitle: 구로고려대병원 산부인과 연구실
description: Unity3D,C#,Metaverse,Network,AzurePlayfab,MPEG-DASH
layout: product
image: /img/portfolio/obstetricsmetaverse/obstetricsmetaverse.png
price: 93
features:
    - label: 개발 기간 -  2022.02 - 2023.03 (6, 7 년차)
    - label: 수행 PJT  - 어플리케이션 개발 프로젝트    
    - label: 담당 업무 - 메타버스 콘텐츠 개발  
---

본 프로젝트는 구로고려대병원 산부인과 연구로써 임산부를 대상으로 원격 산모 교육을 진행할 수 있는 메타버스 어플리케이션 개발 프로젝트 입니다. 자신의 캐릭터를 만들고 메타버스 월드 내에서 라이브 강의, 원격 진료, 영유아 용품 구매를 진행할 수 있도록 기획되었습니다.  


주요업무  
- Unity3D를 활용하여 3D 메타버스 콘텐츠 기획 및 개발 진행  
  
획득역량  
- Azure Playfab 및 Mirror Network를 활용한 온라인 네트워크 서버 구현 및 데이터 전송 구현  
- Azure Blob 을 활용한 동영상 MPEG-DASH 라이브 스트리밍 구현  

로그인 및 네트워크는 Microsoft Azure Playfab을 활용하여 구성하였고 Mirror Network로 UDP 네트워크 서버를 빌드하여 Playfab 서버에 구동시켰습니다. 메타버스 월드는 Unity3D를 이용해 URP환경으로 간단히 구현하였고 라이브 강의실 구현을 위해 OBS 프로그램으로 컴퓨터 화면을 스트리밍하고 해당 주소를 Azure Blob과 연동시켜 영상을 서버로 스트리밍하고 해당 서버에서 다시 본 어플리케이션으로 전송하는 방식으로 구현했습니다.  
  
<p align="center">
<img src="/img/portfolio/obstetricsmetaverse/obstetricsmetaverse01.gif" width="49%">
<img src="/img/portfolio/obstetricsmetaverse/obstetricsmetaverse02.gif" width="49%">
<figcaption align="center">서버 로그인 및 캐릭터 선택 화면</figcaption>
</p>
<br/>

<p align="center">
<img src="/img/portfolio/obstetricsmetaverse/obstetricsmetaverse03.gif" width="49%">
<img src="/img/portfolio/obstetricsmetaverse/obstetricsmetaverse04.gif" width="49%">
<figcaption align="center">메타버스 환경</figcaption>
</p>
<br/>
 


