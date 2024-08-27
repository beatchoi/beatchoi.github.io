---
title: 일산 운정 호수공원 증강현실 미술관
subtitle: 파주시
description: Unity3D,C#,AR,ARFoundation,QRCode
layout: product
image: /img/portfolio/arartgallery/arartgallery.png
price: 96
features:
    - label: 개발 기간 - 2021.02 – 2021.04 (5 년차)
    - label: 수행 PJT  - 어플리케이션 개발 프로젝트    
    - label: 담당 업무 - AR 콘텐츠 개발  
    - label: 개발 비중 - 100%
---

본 프로젝트는 운정 호수 공원 곳곳에 설치한 QR 코드를 인식하여 그림 작가의 작품,  호수 공원에 전시된 전시물 소개 도슨트, 3D 애니메이션 등을 볼 수 있도록 기획된 AOS, IOS 어플리케이션 입니다.  


##### 주요업무  
- Unity3D 와 ARFoundation을 활용한 AR 콘텐츠 개발  
  
##### 획득역량  
- ARFoundation을 활용한 AR 콘텐츠의 개발    
- ZXing 라이브러리를 활용한 QRCode 인식 기능  
- ARFoundation의 device camera의 raw image에 접근하여 픽셀 데이터를 읽는 구조 구현

AR 콘텐츠는 유니티의 ARFoundation을 활용하여 지면인식을 구현하였고 QRCode인식을 위해 Zxing 라이브러리를 활용하였습니다. ARFoundation과 QR 인식을 동시에 진행하기 위해 ARFoundation의 XRCpuImage.ConversionParams
구조체를 사용하여 현재 디바이스에 맺힌 이미지를 가져오고 해당 이미지에서 QR을 인식하기 위해 ZXing 라이브러리의 barcodereader를 사용했습니다.  

##### 주요 코드
아래 코드는 ARFoundation에서 지면 인식 후 지면에 수평인 지면인식객체를 띄우고 이를 성공했을 시 이전에 인식한 QRCode에 할당된 3D 객체를 생성합니다. 스크린의 중심을 기준으로 바라보는 지면에 ARRaycast를 활용해 지면인식객체를 띄우고 그 상태에서 QR을 인식하면 해당 위치에 3D 객체가 자동으로 생성됩니다.  
```
void Update()
{
    //txt.text = qrcode;
    if (!isObjectPlaced)
    {
        UpdatePlacementPose();
        if(placementPoseisValid && qrcode != "") PlaceObject(qrcode);
        
    }
}

private void UpdatePlacementPose()
{
    var screenCenter = ARCamera.ViewportToScreenPoint(new Vector3(0.5f, 0.5f));
    var hits = new List<ARRaycastHit>();

    raycastManager.Raycast(screenCenter, hits, TrackableType.All);
    placementPoseisValid = hits.Count > 0;

    if (placementPoseisValid)
    {
        placementPose = hits[0].pose;
        var cameraForward = ARCamera.transform.forward;
        var cameraBearing = new Vector3(cameraForward.x, 0, cameraForward.z).normalized;

        placementPose.rotation = Quaternion.LookRotation(cameraBearing);
        positionIndicator.SetActive(true);
        positionIndicator.transform.SetPositionAndRotation(placementPose.position, placementPose.rotation);
    }
    else
    {
        positionIndicator.SetActive(false);
    }
}
```

##### 콘텐츠 시연
<p align="center">
<img src="/img/portfolio/arartgallery/arartgallery01.jpg" width="49%">
<img src="/img/portfolio/arartgallery/arartgallery02.jpg" width="49%">
<figcaption align="center">전시물 소개 도슨트 및 작가 작품 콘텐츠</figcaption>
</p>
<br/>
 


