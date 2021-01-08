---
layout: post
title:  "안드로이드 빌드 - Android Build"
date:   2021-01-08 14:00:07
categories: Unity3D Basics
description: "안드로이드 디바이스로의 빌드"
image: '/img/UnityBasic/AndroidBuild/06.gif'
published: true
canonical_url: http://whtls.com/unity3d/basics/2021/01/08/AndroidBuild/
---

## APK 파일의 생성
쉽게 말하면 윈도우의 EXE 파일과 비슷하다고 보면 됩니다.  
기본적으로 간단하게 테스트를 위한 APK 파일을 생성해서 안드로이드 디바이스에 설치하겠습니다.  
  
## Android Build Support 설치
Unity Hub를 켜고 좌측 하단 `Installs`를 눌러줍니다.  
<p align="center"><img src="/img/UnityBasic/AndroidBuild/01.PNG"><br/>
<01. Unity Hub></p>  
  
`Install`탭에서 현재 설치된 유니티 툴이 나열되어있습니다.  
사용하시는 유니티 버전에서 우측 상단 점 세개 버튼을 누르고 `모듈 추가` 또는 `Add Modules`버튼을 눌러줍니다.  
<p align="center"><img src="/img/UnityBasic/AndroidBuild/02.PNG"><br/>
<02. Add Modules 버튼 클릭></p>  

모듈 추가 창에서 `Android Build Support`항목을 체크하고 좌측 드롭다운 버튼을 클릭하여 나머지 두개의 항목에도 체크를 해줍니다.  
우측 하단 `Done`버튼을 눌러 설치를 진행합니다.  
<p align="center"><img src="/img/UnityBasic/AndroidBuild/03.PNG"><br/>
<03. Android Build Support 체크></p> 

설치가 완료 되었다면 `Unity Hub`의 `Installs`탭에서 유니티 버전 하단에 안드로이드 아이콘이 생성되었을 것입니다.  
<p align="center"><img src="/img/UnityBasic/AndroidBuild/04.PNG"><br/>
<04. Android Icon></p>    
  
## 유니티3D 에디터에서  

우선 Files -> Build Settings 창을 띄워줍니다.  
`Build Settings`창의 `Platform`항목에서 `Android`를 찾아 클릭합니다.  
창의 우측 하단 `Switch Platform`버튼을 눌러 플랫폼 변경을 합니다.  
<p align="center"><img src="/img/UnityBasic/AndroidBuild/05.PNG"><br/>
<05. Android Platform 변경></p>  

변경 후 `Build Settings`창의 좌측 하단에 `Player Settings`버튼을 클릭합니다.  
`Player Settings`창에서 `Identification`항목의 `Package Name`항목을 변경합니다.  
com.소속.패키지이름 의 형식입니다.  `com.`은 유지하고 뒤의 소속 및 패키지이름을 지정합니다.  
꼭 해당 형식을 지켜줘야 합니다.  
<p align="center"><img src="/img/UnityBasic/AndroidBuild/06.PNG"><br/>
<06. Player Settings></p>  

`Build Settings`창에 돌아와서 우측 하단 `Build`버튼을 누르면 빌드가 진행됩니다.  
<p align="center"><img src="/img/UnityBasic/AndroidBuild/07.PNG"><br/>
<07. 빌드 진행></p>  

## Android 기기 에서


## APK 설치

안드로이드 디바이스를 PC와 연결합니다.  
안에 생성된 APK 파일을 안드로이드 디바이스 안의 `Downloads` 폴더로 복사합니다.  
꼭 `Downloads`폴더일 필요는 없으나 편리합니다...  
  
안드로이드 디바이스에서 `Downloads`폴더로 접근하여 복사한 APK 파일을 클릭하여 설치합니다.  
설치가 완료되면 어플리케이션 아이콘이 생성되며 터치하여 실행시킬 수 있습니다.  
  
