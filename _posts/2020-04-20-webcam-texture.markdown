---
layout: post
title:  "웹캠이 비추는 화면 렌더링하기"
date:   2020-04-17 10:50:07
categories: Unity3D Basics
description: "유니티 내에서 웹캠 인풋을 활용하는 법을 알아봅니다"
image: 'https://www.csrhymes.com//img/static-site-generator.jpg'
published: true
canonical_url: https://www.csrhymes.com/development/2018/05/28/why-use-a-static-site-generator.html
---

유니티 내에서 웹캠 인풋을 활용하는 법을 알아봅니다

## 스크립트 작성
```ruby
void Awake()
{
   WebCamTexture webcamTexture = new WebCamTexture();
   this.GetComponent<MeshRenderer>().material.mainTexture = webcamTexture;
   webcamTexture.Play();
}
```

## 유니티3D 에디터에서
계층구조창에서 Plane 오브젝트를 하나 생성합니다.

생성한 Plane 오브젝트에 작성한 스크립트를 인스턴스화 시킵니다.

## 테스트
PC에 웹캠에 연결된 상태에서 에디터 상단 플레이 버튼을 누릅니다.
Plane 오브젝트에 웹캠의 영상이 렌더링된다면 성공입니다.
