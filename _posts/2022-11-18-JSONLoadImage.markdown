---
layout: post
title:  "JSON으로 서버에서 이미지 변경"
date:   2022-11-18 14:00:07
categories: Unity3D Fundamentals
description: "클라이언트를 수정하지 않고 이미지 콘텐츠를 변경하기"
image: '/img/Unity.png'
published: true
canonical_url: http://whtls.com/unity3d/basics/2022/11/18/JSONLoadImage/
---

## 개요
빌드된 어플리케이션이나 클라이언트를 수정하지 않고 내부 이미지 콘텐츠를 변경해봅니다.  
AWS에 업로드 되어있는 JSON 파일을 읽고 해당 정보에 따라 서버의 이미지 정보를 받아 클라이언트에 적용시킵니다.  
  
  
## JSON 파일 작성
  
JSONExample.json 파일을 생성하여 다음과 같이 작성합니다.    
  
```ruby
[
   {
       "Name":"01",
       "URL":"AWS 이미지 주소/image01.jpg"
   },

   {
       "Name":"02",
       "URL":"AWS 이미지 주소/image01/image02.jpg"
   },

   {
       "Name":"03",
       "URL":"AWS 이미지 주소/image01/image03.jpg"
   }
]
```
  
## 유니티3D 에디터에서  
#### 스크립트 작성
프로젝트창에서 `JsonHelper.cs`스크립트를 생성합니다.
  
`JsonHelper` 스크립트를 열어서 다음과 같이 작성합니다.  

```ruby
public class JsonHelper
{
	public static T[] GetArray<T>(string json)
	{
		string newJson = "{\"data\":" + json + "}";
		Wrapper<T> w = UnityEngine.JsonUtility.FromJson<Wrapper<T>>(newJson);
		return w.data;
	}

	[System.Serializable]
	class Wrapper<T>
	{
		public T[] data;
	}
}
```
  
* 외부에서 접근하여 활용하는 헬퍼 스크립트이기 때문에 네임스페이스부는 활용하지 않습니다.  
  
  
  `loadjson.cs`스크립트를 생성하고 다음과 같이 작성합니다.  
  
```ruby
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

public class loadjson : MonoBehaviour
{
	public MeshRenderer[] Quad;

	[Serializable]
	public struct Images
    {
		public string Name;
		public string URL;
    }
	[SerializeField]
	Images[] allImages;

	// Start is called before the first frame update
	void Start()
    {
		StartCoroutine(GetJson());
    }


	IEnumerator GetJson()
	{
		string url = "JSON파일 업로드 주소/JSONExample.json";

		UnityWebRequest request = UnityWebRequest.Get(url);
		yield return request.SendWebRequest();

		if (UnityWebRequest.Result.ConnectionError == request.result)
		{
			//show message "no internet "
		}
		else
		{
			if (request.isDone)
			{
				allImages = JsonHelper.GetArray<Images>(request.downloadHandler.text);
				//Debug.Log(allImages[0].Name);
				StartCoroutine(GetImage());
			}
		}
	}


	IEnumerator GetImage()
	{
		for (int i = 0; i < allImages.Length; i++)
		{
			using (UnityWebRequest w = UnityWebRequestTexture.GetTexture(allImages[i].URL))
            {
				yield return w.SendWebRequest();

				if (w.result != UnityWebRequest.Result.Success)
				{
					Debug.Log(w.error);
				}
				else
				{
					Debug.Log("In");
					var tx = DownloadHandlerTexture.GetContent(w);
					Quad[i] .material.mainTexture = tx;
				}
			}
		}
	}
}
```

#### 씬 수정
  
씬에 Quad 오브젝트를 세개 생성하고 로드할 이미지에 맞게 사이즈를 수정하고 배치합니다.  
  
<p align="center"><img src="/img/UnityFundamental/JSONLoadImage/1.PNG"><br/>
<01. Quad 생성></p>  
  
  
계층구조창에 빈 게임 오브젝트를 생성하고 `JSONLoader`로 이름을 변경합니다.  
JSONLoader 오브젝트에 `loadjson.cs`스크립트를 연결하고 변수공란에 Quad 오브젝트들을 연결합니다.  
  
<p align="center"><img src="/img/UnityFundamental/JSONLoadImage/2.PNG"><br/>
<02. JSONLoader 생성 및 오브젝트 연결></p>   
  
## 서버세팅  
  
물론 로컬에서 테스트를 할 수 있지만, 이번엔 AWS S3를 활용하여 데이터를 로드 해 보겠습니다.  
