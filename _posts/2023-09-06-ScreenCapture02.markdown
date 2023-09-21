---
layout: post
title:  "콘텐츠 개발 기법 - URP 환경에서 Bloom 및 Volume 포함한 화면 캡처"
date:   2023-09-06 11:00:07
categories: Unity3D Fundamentals
description: "URP 환경에서 화면 캡처를 할 때 Volume이 추가되도록 합니다"
image: '/img/UnityFundamental/ScreenCapture01/7.PNG'
published: true
canonical_url: https://beatchoi.github.io/unity3d/fundamentals/2023/09/06/ScreenCapture02/
---
  
  
  {% include adsense.html %}
  
  
## 화면 캡처 :: Screen Capture  
일반적으로 URP환경에서 Bloom 등의 Volume 이펙트들이 함께 캡처되지 않는 현상이 일어납니다.  
두가지 원인이 있는데 첫번째는 저장할 Texture 및 Texture2D의 크기가 작아 모든 텍스쳐를 저장할 수 없는 경우와  
두번째는 Linear color space의 픽셀을 텍스쳐에 저장 할 수 없는 경우가 있습니다.  
이번 포스팅에서는 URP 환경에서 해당 이펙트들을 함께 캡쳐하는 방법을 알아봅니다.  

## 유니티3D 에디터에서  
#### 스크립트 작성   

```ruby
using UnityEngine.UI;
using System.IO;
.
.
.
    public RawImage PhotoDownload;
.
.
.
    public void TakeScreenShot()
    {
        StartCoroutine(TakeScreenShotCo());
    }

    IEnumerator TakeScreenShotCo()
    {
        Directory.CreateDirectory(Application.persistentDataPath + "/Photos");

        RenderTexture renderTexture = new RenderTexture((int)Screen.width, (int)Screen.height, 24, RenderTextureFormat.DefaultHDR, RenderTextureReadWrite.sRGB);
        Texture2D texture = new Texture2D ((int)Screen.width, (int)Screen.height, TextureFormat.RGBAFloat, false, true);

        yield return new WaitForEndOfFrame();
        Camera.main.targetTexture = renderTexture;
        Camera.main.Render();
        RenderTexture.active = renderTexture;
        texture.ReadPixels (new Rect(0, 0, (int)Screen.width, (int)Screen.height), 0, 0);
        texture.Apply ();
        PhotoDownload.texture = texture;

        Camera.main.targetTexture = null;
        RenderTexture.active = null;
    }

    public void SavePhoto()
    {
        byte[] bytes;
        string fileExt;

        Texture2D texture = new Texture2D((int)Screen.width, (int)Screen.height, TextureFormat.RGBAFloat, false, true);
        texture = (Texture2D)PhotoDownload.mainTexture;

        Color[] pixels = texture.GetPixels();
        for (int p = 0; p < pixels.Length; p++)
        {
            pixels[p] = pixels[p].gamma;
        }
        texture.SetPixels(pixels);

        bytes = texture.EncodeToJPG();
        fileExt = ".jpg";

        Camera.main.targetTexture = null;
        RenderTexture.active = null;
        string filename = System.DateTime.Now.ToString(("yyyyMMddHHmmss")) + fileExt;
        File.WriteAllBytes(Application.persistentDataPath + "/Photos" + "/" + filename, bytes);
    }
```
  
* RenderTexture 를 새로 선언하는 코드에 `RenderTextureFormat.DefaultHDR`, `RenderTextureReadWrite.sRGB` 두개의 인자를 추가합니다.  
* Texture2D를 새로 선언하는 코드에 TextureFormat 인자를 TextureFormat.RGBAFloat으로 변경합니다. 하단 SavePhoto() 함수에도 동일하게 적용합니다.
* 위 부분에서 텍스쳐 포맷을 변경하여 Volume이 추가된 텍스쳐를 저장할 수 있도록 합니다.
* SavePhoto()함수 중간에
  ```ruby
        Color[] pixels = texture.GetPixels();
        for (int p = 0; p < pixels.Length; p++)
        {
            pixels[p] = pixels[p].gamma;
        }
        texture.SetPixels(pixels);
  ```
* 를 통해 각 픽셀을 수작업으로 gamma color space로 변경해 줍니다.  
  
  
  
    {% include adsense.html %}
  
  

  
## 테스트

<p align="center"><img src="/img/UnityFundamental/ScreenCapture01/70.jpg"><br/>
<01. 적용 전 캡처본></p>  
 
<p align="center"><img src="/img/UnityFundamental/ScreenCapture01/71.jpg"><br/>
<02. 적용 후 캡처본></p> 




  
  {% include adsense.html %}



  
  
