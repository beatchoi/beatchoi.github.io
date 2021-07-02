---
layout: post
title:  "ARFoundation QRCode Reader"
date:   2021-07-21 16:21:17
categories: ARPage
description: " Zxing 과 ARFoundation을 활용한 QRCode Reader 만들기"
image: '/img/UnityVR/OculusQuest/01XRToolkit/ARFoundation.jpg'
published: true
canonical_url: https://beatchoi.github.io/arpage/2021/04/23/ARFoundationQRCodeReader/
---

#### 프로젝트 생성 및 세팅
새로운 프로젝트를 생성하고 ARFoundation을 임포트 합니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/03QRCodeReader/1.ARFoundationImport.PNG"><br/>
<01. ARFoundation 임포트></p>  
  
프로젝트의 플랫폼도 Android로 변경합니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/03QRCodeReader/2.PlatformAndroid.PNG"><br/>
<02. 플랫폼 변경></p>  
  
계층구조창에서 마우스 우클릭 -> XR -> ARSessionOrigin 및 ARSession 오브젝트를 생성합니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/03QRCodeReader/3.ARFoundationSceneSetting.PNG"><br/>
<03. ARFoundation 씬 세팅></p>  
  
프로젝트 창에서 폴더를 새로 생성하고 폴더의 이름을 "Plugins"로 설정합니다.  
"Plugins" 폴더 안에 다음 플러그인을 넣어줍니다.  
    
[zxing.unity.dll ](https://github.com/beatchoi/beatchoi.github.io/raw/master/Files/zxing.unity.dll)
  
<p align="center"><img src="/img/UnityAR/ARFoundation/03QRCodeReader/12.Zxingdll.PNG"><br/>
<04. Zxing 플러그인 임포트></p>  
  
Player Setting 창에서 Allow 'Unsafe' Code 항목을 체크합니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/03QRCodeReader/4.AllowUnsafeCode.PNG"><br/>
<05. Unsafe 코드 활성화></p>  

#### 스크립트 생성
ReadQRCode.cs 스크립트를 생성하고 다음과 같이 작성합니다.
    
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using ZXing;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;
using UnityEngine.UI;

public class ReadQRCode : MonoBehaviour
{
    public ARCameraManager CameraManager;
    public Text txt;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(CameraManager.TryAcquireLatestCpuImage(out XRCpuImage image)){
            using (image)
            {
                var conversionParams = new XRCpuImage.ConversionParams(image, TextureFormat.R8, XRCpuImage.Transformation.MirrorY);
                var dataSize = image.GetConvertedDataSize(conversionParams);
                var grayscalePixels = new byte[dataSize];

                unsafe
                {
                    fixed (void* ptr = grayscalePixels)
                    {
                        image.Convert(conversionParams, new System.IntPtr(ptr), dataSize);
                    }
                }

                IBarcodeReader barcodeReader = new BarcodeReader();
                var result = barcodeReader.Decode(grayscalePixels, image.width, image.height, RGBLuminanceSource.BitmapFormat.Gray8);

                if(result != null)
                {
                    txt.text = result.Text;
                }
            }
        }
    }
}
```
  
해당 스크립트를 AR Session Origin 오브젝트에 인스턴스화 시킵니다.  
(빈 게임 오브젝트를 생성해서 해당 스크립트를 인스턴스화 해도 상관없습니다.)  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/03QRCodeReader/8.ScriptInstance.PNG"><br/>
<06. ReadQRCode 스크립트 인스턴스화></p> 
  
계층구조창에서 마우스 오른쪽 클릭, -> UI -> Text 를 클릭하여 텍스트 UI 오브젝트를 생성합니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/03QRCodeReader/9.TextUI.PNG"><br/>
<07. 텍스트 오브젝트 생성></p> 
  
해당 텍스트 오브젝트의 크기 및 폰트 사이즈를 다음과 같이 변경합니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/03QRCodeReader/10.TextSize.PNG"><br/>
<08. 텍스트 오브젝트 설정 변경></p> 
  
AR Session Origin에 인스턴스화 한 ReadQRCode 스크립트 컴포넌트의  
CameraManager 항목에는 AR Session Origin의 자식오브젝트인 AR Camera 를  
Txt 항목에는 위에서 생성한 Canvas 오브젝트의 자식오브젝트인 Text 를 연결시킵니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/03QRCodeReader/11.ReadQRCode_Instance.PNG"><br/>
<09. 인스턴스 변수 항목 연결></p> 
  

#### 빌드 하기

다음과 같이 안드로이드 빌드를 위한 세팅을 마친 후 APK 빌드를 하여 안드로이드 디바이스에서 확인합니다.  
  
<p align="center"><img src="/img/UnityAR/ARFoundation/03QRCodeReader/5.BuildSetting.PNG"><br/>
<10. 빌드 세팅></p> 
  
<p align="center"><img src="/img/UnityAR/ARFoundation/03QRCodeReader/6.BuildSetting2.PNG"><br/>
<11. 빌드 세팅></p> 
  
  
