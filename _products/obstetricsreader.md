---
title: 구로고려대병원 산모 통증 완화 VR
subtitle: 구로고려대병원 산부인과 연구실
description: Unity3D,C#,VR,OpenCV,IntelRealsense,Tesseract,OCR,Network
layout: product
image: /img/portfolio/obstetricsreader/obstetricsreader.jpg
price: 94
features:
    - label: 개발 기간 -  2021.06 - 2022.02 (5, 6 년차)
    - label: 수행 PJT  - 기술 개발 프로젝트    
    - label: 담당 업무 - VR 콘텐츠 개발  
    - label: 개발 비중 - 100%
---

본 프로젝트는 구로고려대병원 산부인과 연구로써 태아 분만 감시장치의 산모 통증 수치를 OCR 기능을 통하여 읽고 해당 값을 VR 기기로 전송하여 VR 환경 속의 모습을 전송된 통증 수치에 따라 변화시키는 콘텐츠를 개발하였습니다. 

##### 주요업무  
- Unity3D를 활용하여 OCR 기능 기반의 태아 분만 감시장치의 데이터를 읽는 기술 개발  
 
  
##### 획득역량  
- Unity3D 에서 Tesseract 를 활용한 OCR 기능 구현  
- Unity3D 에서 OpenCV 를 활용한 영상 전처리 기법  
- Intel Realsense 깊이 카메라를 활용한 영상 깊이 계산 구현  

##### 주요 코드

아래 코드는 테서렉트로 OCR을 진행하기 전 전처리를 담당하는 부분입니다. 숫자 영역을 grayscale로 변경하고 THRESH_BINARY_INV를 통해 160 이상의 픽셀은 0으로 나머지는 그대로 둡니다. 이 영상을 가우시안블러 후 임계처리를 통해 확실하게 숫자 영역을 분리하고 이 영상을 bitwise_not 하여 검은색 숫자로 만들어 줍니다. 테서렉트 OCR 에서는 검은색 숫자를 읽을 수 있기 때문에 해당 영역을 Recognize 함수를 통해 읽어들입니다.  
```
.
.
.
    if (isRect)
    {
        
        Mat Plate_Thresh = new Mat();
    
        clone = new Mat();
        Imgproc.rectangle(rgbMat, region, new Scalar(0, 0, 255), 2, 1, 0);
    
        Imgproc.cvtColor(rgbMat, rgbMat, Imgproc.COLOR_BGR2GRAY);
        Imgproc.threshold(rgbMat, rgbMat, 160, 255, Imgproc.THRESH_BINARY_INV);
        CropImg = new Mat(rgbMat, region);
        Imgproc.GaussianBlur(CropImg, CropImg, new Size(5, 5), 0);
        Imgproc.adaptiveThreshold(CropImg, Plate_Thresh, 255.0, Imgproc.ADAPTIVE_THRESH_GAUSSIAN_C, Imgproc.THRESH_BINARY_INV, 11, 2);
        Core.bitwise_not(Plate_Thresh, Plate_Thresh);
        Plate_Thresh.copyTo(clone);
        Imgproc.cvtColor(rgbMat, rgbMat, Imgproc.COLOR_GRAY2BGR);
    
        Texture2D texture22 = new Texture2D(Plate_Thresh.width(), Plate_Thresh.height(), TextureFormat.RGB24, false);
        Utils.matToTexture2D(Plate_Thresh, texture22);
        texture22.Apply();
        Recoginze(texture22);
        displayText.text = _text;
        Debug.Log(_text);
        Imgproc.rectangle(rgbMat, region, new Scalar(0, 0, 255), 2, 1, 0);
    }
    Utils.fastMatToTexture2D(rgbMat, texture);
.
.
.
```

위 함수에서 잘라낸 숫자 영역의 Texture2D를 아래 함수들을 통해 분석합니다. 
```
private void Recoginze(Texture2D outputTexture)
{
    _texture = outputTexture;
    ClearTextDisplay();
    _tesseractDriver.Setup(OnSetupCompleteRecognize);
}

private void OnSetupCompleteRecognize()
{
    AddToTextDisplay(_tesseractDriver.Recognize(_texture));
    AddToTextDisplay(_tesseractDriver.GetErrorMessage(), true);
    SetImageDisplay();
}

private void ClearTextDisplay()
{
    _text = "";
}

private void AddToTextDisplay(string text, bool isError = false)
{
    if (string.IsNullOrWhiteSpace(text)) return;

    _text += text;

    if (isError)
        Debug.LogError(text);
    
}
private void SetImageDisplay()
{
    RectTransform rectTransform = outputImage.GetComponent<RectTransform>();
    rectTransform.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical,
        rectTransform.rect.width * _tesseractDriver.GetHighlightedTexture().height / _tesseractDriver.GetHighlightedTexture().width);
    outputImage.texture = _tesseractDriver.GetHighlightedTexture();
}
```
   
##### 콘텐츠 시연
  
<p align="center">
<img src="/img/portfolio/obstetricsreader/obstetricsreader01.gif" width="100%">

<figcaption align="center">자궁 수축 수치 30 미만일 때 나타나는 작은 돌고래</figcaption>
</p>
<br/>
<p align="center">
<img src="/img/portfolio/obstetricsreader/obstetricsreader02.gif" width="100%">

<figcaption align="center">자궁 수축 수치 30 이상일 때 나타나는 큰 고래</figcaption>
</p>
<br/>


