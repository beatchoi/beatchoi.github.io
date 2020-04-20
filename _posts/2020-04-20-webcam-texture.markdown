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
```
void Awake()
{
   WebCamTexture webcamTexture = new WebCamTexture();
   this.GetComponent<MeshRenderer>().material.mainTexture = webcamTexture;
   webcamTexture.Play();
}
```
