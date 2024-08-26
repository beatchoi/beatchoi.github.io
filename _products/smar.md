---
title: SM 엔터테인먼트 SMCU AR
subtitle: 주식회사 노바플로
description: Unity3D,C#,Platform,AWS S3,LightshipSDK,addressables, Mapbox
layout: product
image: /img/portfolio/smar/smar.png
price: 91
features:
    - label: 개발 기간 -   2022.6 - 2024.1 (6,7,8 년차)
    - label: 수행 PJT  - 플랫폼 개발 프로젝트    
    - label: 담당 업무 - XR 콘텐츠 개발  
---

본 프로젝트는 사용자가 성수동 일대의 지정된 위치에서 AR 임무를 수행하고 임무를 완수하면 보상을 받을 수 있는 콘텐츠로 임무를 수행하는 과정에서 증강현실 콘텐츠와 함께 사진 및 동영상을 찍고 SMCU AR 커뮤니티에 업로드를 할 수 있도록 개발하였으며 AOS 및 IOS 어플리케이션의 형태로 완성되었습니다.  

##### 주요업무  
- Unity3D 툴을 활용하여 AR, XR 콘텐츠 개발 업무 담당  
  
##### 획득역량  
- REST API 를 활용하여 XR 콘텐츠와의 데이터 전송 기법  
- Niantic Lightship SDK 를 활용한 AR,XR 콘텐츠의 개발 기법  
- 모바일 기기에서의 Universal Render Pipeline 에 대한 이해  
- GPS 를 활용한 위치기반 기술의 활용  
- Addressable 기능을 활용한 에셋의 관리

본 콘텐츠는 초기화, 메인, 지도, AR, 튜토리얼 씬으로 구성하였으며 해당 씬의 구성은 각각 다음과 같습니다.  

초기화 씬에서는
- AWS S3에 업로드 되어있는 에셋들을 다운로드  
- Vuplex Webview로 구현된 웹뷰에서 로그인
  
메인 씬에서는  
- GUI로 구현된 메뉴와 사진, 동영상 라이브러리  
- Vuplex Webview로 구현된 커뮤니티

지도 씬에서는  
- Mapbox로 구현된 gefencing 지도  
- 지도 상에서 AR 미션을 선택할 수 있음
  
AR 씬 및 튜토리얼 에서는
- 지도 씬에서 선택된 미션을 addressable로 로드하고 실행   
- LightshipSDK로 구현된 지면인식 및 VPS 콘텐츠 실행

AR콘텐츠들은 LightshipSDK의 지면인식과 Visual Positioning System을 바탕으로 만들어졌고 모바일 기기를 흔들거나 AR객체를 비추는 등의 인터랙션을 구현하였습니다. 그리고 AR 객체를 현실 배경과 어울리게 만들기 위해 Universal Render Pipeline의 환경에서 개발이 진행되었으며 이를 활용한 다양한 shader를 사용하여 그림자, 포털등을 구현하게 되었습니다.  
    
##### 주요 코드
###### 스크린샷
URP 환경에서 다양한 효과(Bloom, Volume 등)를 활용할 때 화면을 캡쳐하면 URP 효과들이 같이 저장되지 않는 경우들이 생깁니다. 이는 Linear Color Space의 픽셀을 텍스쳐에 저장할 수 없는 경우인데 아래와 같이 저장한 텍스쳐의 픽셀에 모두 접근하여 해당 픽셀을 gamma로 변경해주면 URP효과가 적용된 화면을 저장할 수 있습니다. 아래 코드는 저장된 텍스쳐를 불러와서 픽셀을 수정한 후 이를 파일로 저장하고 썸네일을 생성하는 부분입니다.
```
IEnumerator SavePhotoCo()
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
        string filename = DateTime.Now.ToString(("yyyyMMddHHmmss")) + fileExt;
        File.WriteAllBytes(Application.persistentDataPath + "/Photos" + "/" + filename, bytes);

        //save thumbnail

        Texture2D croppedTexture = new Texture2D(360, 360);
        Texture2D originalTexture = texture;
        Texture2D originalTextureResized = ResizeTexture2D(originalTexture, (int)PhotoDownload.rectTransform.rect.width, (int)PhotoDownload.rectTransform.rect.height);
        croppedTexture.SetPixels(originalTextureResized.GetPixels(0, 277, 360, 360));
        croppedTexture.Apply();

        bytes = croppedTexture.EncodeToJPG();
        File.WriteAllBytes(Application.persistentDataPath + "/Photos" + "/Thumb" + "/" + filename, bytes);

        yield return new WaitForSeconds(2.5f);

        PhotoSaveButton.onClick.Invoke();
    }
```

다음은 어드레서블로 정리한 에셋을 서버로부터 다운로드 받는 부분입니다. 비동기로 진행되며 미리 선언된 다운로드핸들러(DownloadHandle)를 통해 어드레서블 다운로드를 관리합니다. 다운로드되는 과정을 확인하기 위해 UI Progressbar를 통해 표현합니다.  
```
public void DownloadBundle()
    {
        DownloadHandle = Addressables.DownloadDependenciesAsync(LableForBundleDown);
        DownloadHandle.Completed +=
            (Handle) =>
            {
                SizeText.text = string.Concat(DownloadHandle.PercentComplete * 100, "%");
                progressBar.value = DownloadHandle.PercentComplete;              
                anim.SetTrigger("event");
            };
    }
```

다음은 지도 씬에서 핀과 사용자 사이의 실제 거리를 계산하는 부분입니다. 하버사인 공식을 활용하여 두 점간의 직선거리가 아닌 둥근 호 모양의 거리를 계산할 수 있습니다.  
```
public float Calc(float lat1, float lon1, float lat2, float lon2)
{
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Mathf.PI / 180 - lat1 * Mathf.PI / 180;
    var dLon = lon2 * Mathf.PI / 180 - lon1 * Mathf.PI / 180;
    float a = Mathf.Sin(dLat / 2) * Mathf.Sin(dLat / 2) +
      Mathf.Cos(lat1 * Mathf.PI / 180) * Mathf.Cos(lat2 * Mathf.PI / 180) *
      Mathf.Sin(dLon / 2) * Mathf.Sin(dLon / 2);
    var c = 2 * Mathf.Atan2(Mathf.Sqrt(a), Mathf.Sqrt(1 - a));
    distance = R * c;
    distance = distance * 1000f; // meters
                                 //set the distance text on the canvas
    Debug.Log(distance);
    //convert distance from double to float
    float distanceFloat = Mathf.RoundToInt((float)distance);
    return distanceFloat;
}
```

##### 콘텐츠 시연  
<p align="center">
<img src="/img/portfolio/smar/smar04.gif" width="32%">
<img src="/img/portfolio/smar/smar05.gif" width="32%">
<img src="/img/portfolio/smar/smar06.gif" width="32%">
<figcaption align="center">플랫폼 갤러리, 커뮤니티, 지오펜싱 지도</figcaption>
</p>
<br/>

   
<p align="center">
<img src="/img/portfolio/smar/smar01.gif" width="32%">
<img src="/img/portfolio/smar/smar02.gif" width="32%">
<img src="/img/portfolio/smar/smar03.gif" width="32%">
<figcaption align="center">SMAR AR 콘텐츠</figcaption>
</p>
<br/>
 


