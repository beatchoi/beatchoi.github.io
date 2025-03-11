---
layout: post
title:  "유니티3D 설치"
date:   2025-03-11 10:50:07
categories: Unity3D Basics
description: "유니티3D를 설치하고 사용법을 익혀봅니다"
image: 'https://www.csrhymes.com//img/static-site-generator.jpg'
published: true
canonical_url: http://whtls.com/unity3d/basics/2020/04/17/unity_00Installation/
---

유니티3D를 설치해봅니다.

## 유니티 허브 다운로드  

<p align="center"><img src="/img/UnityBasic/InstallUnity6/01.png"><br/>
<01. 유니티 다운로드 페이지></p>  
  
[https://unity3d.com/download](https://unity3d.com/download)로 들어가서 `DOWNLOAD FOR xxx` 를 선택합니다

## 유니티 허브 설치  
  
<p align="center"><img src="/img/UnityBasic/InstallUnity6/02.png"><br/>
<02. 유니티 허브 설치></p>  
  
다운로드 받은 파일을 열어서 설치를 진행합니다. 유니티3D 툴에는 다양한 버전이 있습니다. 짧으면 몇달 주기로 버전업이 된 툴이 출시가 되는데 개발 형편상 매번 유니티 툴을 업데이트 할 수는 없습니다. 기존의 프로젝트에서 사용하던 third party sdk 나 소프트웨어들이 새로운 버전의 유니티에서 작동하리란 보장이 없기 때문입니다. 따라서 필요에 따라 여러 버전의 유니티 툴을 한 컴퓨터에 설치할 수 있는데 이를 모두 관리하기 위해 Unity HUB 를 사용한다고 생각하시면 됩니다.

## 유니티 아이디 생성
아이디를 생성해야 유니티 라이선스를 발급받을 수 있기 때문에 다음 절차에 따라 가입을 진행합니다.  
  
<p align="center"><img src="/img/UnityBasic/InstallUnity6/04.png"><br/>
<03. 유니티 아이디 생성></p>  
  
설치된 허브를 실행시키고 `Create account` 버튼을 클릭합니다.  

<p align="center"><img src="/img/UnityBasic/InstallUnity6/05.png"><br/>
<04. 유니티 아이디 생성></p>  
  
리다이렉트된 페이지에서 회원가입을 진행합니다. 
`Email`의 경우 확인 메일이 날아오기 때문에 꼭 사용하고있는 이메일을 넣으셔야 합니다. `Username`의 경우 아이디로 생각하시면 되나 로그인시에는 이메일을 넣기 때문에 꼭 기억하실 필요는 없습니다.  

완료를 하면 이메일로 전송된 확인 메일을 열고 인증절차를 거치면 가입이 완료됩니다.

## 허브의 활용
설치된 허브를 실행시키면 다음과 같은 창을 볼 수 있습니다.  
  
* Projects
유니티3D는 생성하는 `프로젝트` 를 기준으로 콘텐츠를 개발합니다. 예를 들어 증강현실 명함을 만들고 싶다 라면 증강현실 명함 콘텐츠를 위한 프로젝트를 하나 생성해서 개발하는 것이죠. `프로젝트` 탭은 현재까지 생성한 프로젝트를 나열합니다. 생성한 프로젝트의 이름과 경로, 활용된 유니티 툴의 버전 그리고 생성날짜까지 나와있기 때문에 프로젝트 파일 관리가 보다 편리합니다.

* Installs
앞서 언급한 것 처럼 유니티 툴은 한 컴퓨터에 여러가지 버전을 설치할 수 있습니다. `Installs` 탭에서 원하는 버전의 유니티 버전을 설치할 수 있습니다.  

* Learn
`Learn` 탭은 유니티에서 제공하는 샘플 프로젝트 및 튜토리얼 입니다. 입문자들 또는 특정 주제를 가진 콘텐츠를 개발할때 편리하게 사용될 수 있습니다. 

* Community
`Community` 탭은 유니티 관련 뉴스나 질의응답, 포럼등의 링크로 바로 이동할 수 있게 해주는 탭입니다. 
  
## 유니티의 설치  
  
<p align="center"><img src="/img/UnityBasic/InstallUnity6/06.png"><br/>
<05. 유니티 에디터 설치></p>  

`Install` 탭에서 유니티를 설치해 봅니다. 해당 탭의 우측 상단 `Install Editor` 버튼을 눌러줍니다. 
`Official Release`는 정식 버전의 유니티 입니다. `(LTS)`는 Long Term Service stream 이라는 뜻으로 장기 지원 버전이라고 생각하시면 됩니다. 각 년도 버전마다 장기지원 버전이 존재합니다.
`Pre-Release`는 알파 또는 베타버전의 유니티 입니다. 새로운 기능들을 활용해 볼 수 있습니다.

<p align="center"><img src="/img/UnityBasic/InstallUnity6/07.png"><br/>
<06. 유니티 에디터 설치></p>  

Official releases의 UNITY 6 버전을 선택하고 우측 `Install`버튼을 눌러 진행합니다.

<p align="center"><img src="/img/UnityBasic/InstallUnity6/08.png"><br/>
<07. 유니티 에디터 설치></p>  
<p align="center"><img src="/img/UnityBasic/InstallUnity6/09.png"><br/>
<08. 유니티 에디터 설치></p>  

다음 창에서는 콘텐츠 개발 플랫폼을 선택해 줍니다. 유니티는 다양한 플랫폼을 지원하기 때문에 콘텐츠 개발이 용이합니다. 다만 `IOS` 플랫폼의 경우 프로젝트를 빌드 하기 위해서는 `맥OS`가 필요합니다. 맥OS에서는 `Android`, `IOS` 모두 가능합니다. 
최상단 `Microsoft Visual Studio Community`가 선택되어 있는지 확인하시고, `Android SDK & NDK Tools``OpenJDK`항목 선택, 하단의 `WebGL Build Support`도 선택하여 `Continue`를 눌러 진행합니다.

이외에 자신에게 맞는 플랫폼을 찾아 체크를 해주세요. 

## 라이선스 활성화
유니티3D 툴은 무료 유료 라이센스가 있고 무료의 경우에도 다음과 같이 라이선스를 활성화 시켜야합니다.

<p align="center"><img src="/img/UnityBasic/InstallUnity6/10.png"><br/>
<09. 유니티 라이선스 활성화></p>  

로그인을 했으면 허브의 좌측 상단 프로필 버튼을 누르고. 좌측 `Manage Licenses`탭을 선택합니다. 

<p align="center"><img src="/img/UnityBasic/InstallUnity6/11.png"><br/>
<10. 유니티 라이선스 활성화></p>  
<p align="center"><img src="/img/UnityBasic/InstallUnity6/12.png"><br/>
<11. 유니티 라이선스 활성화></p>  

생성된 창에서 우측 상단 `Add` 버튼을 클릭하고 라이선스 중 `Get a free personal license`버튼을 눌러 생성을 완료합니다. 

## 프로젝트의 생성
허브에서 좌측 `Project`탭을 누릅니다.

우측 상단의 `New`버튼을 눌러 프로젝트 생성 창을 띄웁니다.

`프로젝트 이름` 항목에 영문으로 프로젝트 이름을 작성하고 `저장 위치`에 프로젝트가 생성될 경로를 지정합니다. 경로에는 중간에 한글이 들어가지 않도록 해주세요. 한글로 된 폴더는 영문으로 바꿔주셔야 합니다.
