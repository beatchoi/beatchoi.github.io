---
title: 양평 소나기 마을 황순원 문학촌 AR
subtitle: 양평 황순원 문학촌
description: Unity3D,C#,AR,ARFoundation,QRCode
layout: product
image: /img/portfolio/sonagivillage/sonagivillage.png
price: 95
features:
    - label: 개발 기간 - 2021.02 – 2021.04 (5 년차)
    - label: 수행 PJT  - 어플리케이션 개발 프로젝트    
    - label: 담당 업무 - AR 콘텐츠 개발  
    - label: 개발 비중 - 100%
---

본 프로젝트는 양평 소나기마을에서 방문자들이 즐길 수 있는 AR 어플리케이션 개발 프로젝트로, 소나기 마을 황순원 문학촌 곳곳에 설치되어 있는 QRCode를 어플리케이션으로 인식하게 되면 소설 소나기의 이야기를 AR로 즐길 수 있도록 구현되었습니다.  


##### 주요업무  
- Unity3D 와 ARFoundation을 활용한 AR 콘텐츠 개발  
  
##### 획득역량  
- ARFoundation을 활용한 AR 콘텐츠의 개발    
- ZXing 라이브러리를 활용한 QRCode 인식 기능  
- ARFoundation의 device camera의 raw image에 접근하여 픽셀 데이터를 읽는 구조 구현  
- 사진 촬영 및 영상 녹화 구현  

##### 주요 코드  

아래는 TryAcquireLatestCpuImage를 통해 ARFoundation에서 카매라를 통해 전달되는 영상에 접근하고 해당 영상에서 발견되는 QRCode를 ZXing 라이브러리의 IBarcodeReader를 통해 읽어내는 부분입니다. 인식되는 QRCode에 저장된 text 데이터를 result에서 읽어들입니다.  
```
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
```

##### 콘텐츠 시연    
<p align="center">
<img src="/img/portfolio/sonagivillage/sonagivillage01.gif" width="49%">
<img src="/img/portfolio/sonagivillage/sonagivillage02.gif" width="49%">
<figcaption align="center">소나기 AR 콘텐츠</figcaption>
</p>
<br/>

<p align="center">
<img src="/img/portfolio/sonagivillage/sonagivillage03.gif" width="49%">
<img src="/img/portfolio/sonagivillage/sonagivillage04.gif" width="49%">
<figcaption align="center">소나기 AR 콘텐츠</figcaption>
</p>
<br/>
 


