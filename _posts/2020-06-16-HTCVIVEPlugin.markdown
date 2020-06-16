---
layout: post
title:  "HTC VIVE Plugin 적용(Steam VR Plugin 적용)"
date:   2020-06-17 00:46:07
categories: Unity3D Vive
description: "HTC Vive 프로젝트 환경설정 세팅"
image: 'https://www.pikpng.com/pngl/b/135-1352255_htc-vive-pro-htc-vive-pro-full-kit.png'
published: true
canonical_url: https://www.csrhymes.com/development/2018/05/28/why-use-a-static-site-generator.html
---

## HTC VIVE 설치
HTC VIVE 하드웨어가 미리 세팅이 되어있어야합니다. Lighthouse와  HMD 그리고 컨트롤러를 사용하여 Steam VR 세팅을 미리 완료합니다.

## 유니티 프로젝트 생성
HTC VIVE를 활용한 콘텐츠를 만들기 위해서 유니티 프로젝트를 새로 생성합니다. 

## Steam VR Plugin 설치
Ctrl + 9 를 눌러 에셋스토어에 들어갑니다. 
에셋스토어에서 SteamVR을 검색해서 나오는 Steam VR Plugin을 다운로드 받고 프로젝트로 임포트 합니다. 임포트 말미에 유니티 세팅 변경 창이 나오는데 해당 창 하단에 Accept All을 클릭하여 변경을 해줍니다. 

## Steam VR 적용
프로젝트 창에서 SteamVR/Prefabs 폴더 안에 있는 [CameraRig] 프리펩을 찾습니다. 해당 프리펩을 계층구조창으로 옮겨놓고 계층구조창에 미리 생성되어있는 Main Camera 오브젝트를 제거합니다. 유니티 에디터 중앙 상단의 플레이 버튼을 눌러 테스트를 해봅니다. 

만약 아래와 같은 경고창이 뜬다면 Yes 버튼을 눌러 SteamVR Input 창을 띄웁니다. 해당 창은 VIVE 컨트롤러의 Input을 제어할 수 있는 창입니다. 일단 해당 창 아래의 Save and Generate 버튼을 눌러 Input 세팅을 생성합니다. 씬 저장을 하고 다시 상단 플레이 버튼을 눌러 체크를 완료합니다. 

만약 설정이 모두 제대로 되었다면 VIVE HMD를 착용하였을때 Head Tracking이 제대로 시연 될 것이고 컨트롤러 역시 화면상에 나타날 것 입니다.

