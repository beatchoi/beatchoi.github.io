---
layout: post
title:  "정수 문자열 형변환"
date:   2020-04-23 17:00:00
categories: Unity3D Basics
description: "유니티 정수 문자열 형변환"
image: 'https://www.csrhymes.com//img/static-site-generator.jpg'
published: true
canonical_url: http://whtls.com/unity3d/basics/2020/04/23/type-conversion/
---

유니티에서 문자와 정수를 형변환을 해봅니다.

## 정수와 문자열의 덧셈
정수 a 와 문자열 b를 더해서 다시 문자열로 표현하는 방법입니다.
문자나 숫자를 이런식으로 계산하고 표현해야 하는 때가 생깁니다.
한번 해보도록 하겠습니다.

```
int a = 1;
string b = 2;
```

a 와 b를 더하기 위해서는 형변환이 필요합니다.

먼저 문자열 b를 정수로 형변환 시켜줍니다.

```
int num = int.Parse(b);
```

그리고 형변환 된 num 과 a 를 더해줍니다.

```
a = a+num;
```

정수 a 를 다시 문자열로 바꿔주려면
```
b = a.ToString();
```

문자열 b로 형변환이 잘 이루어 진 것을 볼 수 있습니다.

