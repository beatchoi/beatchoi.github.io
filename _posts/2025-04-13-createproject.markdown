---
layout: post
title:  "Unity3D Project 생성하기"
date:   2025-04-13 10:50:07
categories: Unity3D Basics
description: "Unity3D 프로젝트를 생성해 봅니다"
image: 'https://www.csrhymes.com//img/static-site-generator.jpg'
published: true
canonical_url: http://whtls.com/unity3d/basics/2025/04/13/createproject/
---

유니티3D를 설치해봅니다.

## Unity Hub 실행 

이전에 설치한 Unity Hub를 실행합니다. 만약 가입 및 라이선스 등록까지 완료되었다면 다음과 같은 창의 모습을 볼 수 있습니다.  

<p align="center"><img src="/img/UnityBasic/CreateProjects/1.png"><br/>
<01. Unity Hub></p>  

우측 상단 `New Project` 버튼을 눌러 다음 창을 띄웁니다.  

<p align="center"><img src="/img/UnityBasic/CreateProjects/2.png"><br/>
<02. Unity Hub - New Project></p>  

New Project 창에서는  
- 생성할 프로젝트에서 활용한 Unity 버전 선택  
- 생성할 프로젝트의 템플릿  
- 프로젝트 이름  
- 프로젝트 생성 경로  
등을 지정할 수 있습니다.


Unity 버전은 현재 Hub를 통해서 설치된 버전을 선택할 수 있습니다.  
이전 포스팅에서 설치한 것 처럼 여러 버전의 Unity Editor를 설치 했을 때 유용하게 쓸 수 있습니다.  
<p align="center"><img src="/img/UnityBasic/CreateProjects/3.png"><br/>
<03. New Project - Unity Version Select></p>  

템플릿은 Unity 개발 시 가장 많이 활용되는 프로젝트 세팅 환경 입니다.  
Default 상태로는 `Universal 3D` 템플릿이 선택되어 있고, 2D, High Definition 등의 템플릿이 기본으로 제공됩니다.  
이외에도 Mobile 환경의 템플릿, VR 개발을 위한 템플릿 등 다양한 플랫폼을 대상으로하는 개발 환경에 알맞는 템플릿을 다운로드 할 수 있습니다.  
<p align="center"><img src="/img/UnityBasic/CreateProjects/4.png"><br/>
<04. New Project - Templete Select></p>  

프로젝트 이름은 자유롭게 설정할 수 있지만 `영문`과 `숫자`로 그리고 `_`로 이루어질 수 있으며 항상 영문으로 시작해야 합니다.  
한글로 작성해도 생성 자체는 가능하지만 개발 중 에러가 발생할 확률이 높으며 프로젝트 이름에 스페이스도 없는 것이 좋습니다.  
<p align="center"><img src="/img/UnityBasic/CreateProjects/5.png"><br/>
<05. New Project - Project Name></p>  

프로젝트는 원하는 경로에 지정할 수 있지만 다양한 개발 환경에서 문제없이 작업하기 위해서는 프로젝트 경로에 한글이 없는 것이 좋습니다.  
예를 들어 안드로이드 플랫폼에서 APK 빌드 시 경로에 한글이 있으면 빌드 에러가 나는 경우가 있습니다.  
<p align="center"><img src="/img/UnityBasic/CreateProjects/6.png"><br/>
<06. New Project - Location></p>  


모두 설정 후 우측 하단 Create Project 버튼을 누르면 프로젝트가 생성됩니다.  


