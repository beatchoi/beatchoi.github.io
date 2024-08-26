---
title: 봉앤줄 인터랙티브 퍼포먼스 AR
subtitle: 봉앤줄
description: Unity3D,C#,AR,OpenCV,Vision
layout: product
image: /img/portfolio/bongnjoule/bongnjoule01.png
price: 97
features:
    - label: 개발 기간 - 2020.08 – 2020.12 (4 년차)  
    - label: 수행 PJT - 기술 연구 프로젝트    
    - label: 담당 업무 - XR 콘텐츠 개발  
---

본 프로젝트는 봉앤줄의 차이니즈폴 공연에 computer vision을 적용시킨 콘텐츠로 파란색 짐 볼을 인식하여 다른 객체로 표현하고 이를 관람객이 볼 수 있도록 기획되었습니다. 연기자가 바닥에 있는 짐 볼을 들고 폴을 오르내리는 과정에서 관람객이 기존 짐 볼들을 다른 형상으로 보게 하고 메시지를 담기 위해 시작되었습니다.   

###### 주요업무  
- Unity3D 와 OpenCV를 활용한 XR 콘텐츠 개발    
  
###### 획득역량  
- OpenCV를 활용한 영상 전처리 과정에 대하여 이해  
- Unity3D 내에서 OpenCV를 활용하기위한 플러그인화에 대한 이해  
- HSV를 기준으로 한 색상인식 알고리즘 및 객체 인식 기능 구현의 이해

본 모바일 기기에서 작동할 수 있도록 기획 개발되었으며 모바일 기기에서 OpenCV를 구동하기에 퍼포먼스가 조금 부족했었습니다.  
HSV 범위로 파란색을 인식할 수 있는 mask를 생성하고 비트 연산을 통해 해당 영역을 가져왔습니다. 또한 Hough Transform을 통해 원을 검출하여 인식한 영역이 파란색 짐볼인지 아닌지 검출하였습니다. 해당 영역이 파란색 짐볼이라고 판단하였으면 해당 원의 중심 좌표를 계산하여 미리 지정해둔 객체를 위치시켜 파란색 짐볼 위에 덮여서 보일 수 있도록 하였습니다.  
본 콘텐츠에서 구현이 안된부분은 깊이가 계산되지 못해서 퍼포머가 짐볼을 가지도 이동을 할 때 앞뒤 위치 차에 따라서 짐볼을 대체하는 객체의 크기를 조절하지 못해 짐볼이 카메라 가까이 오게될 때 객체의 크기는 그대로라서 싱크가 맞지 않았다는 점입니다. 이는 추후 깊이 카메라를 활용하게되는 계기가 되었습니다.  

###### 주요 코드
본 콘텐츠에서 푸른색과 원을 검출하고, 검출한 부분에 3D 객체를 배치하는 부분입니다.  

먼저 ColorObject 클래스를 선언하고 OpenCV에서 푸른색에 해당하는 최대 및 최소 HSV 값을 저장합니다. 이는 메인 코드에서 클래스를 선언하여 사용합니다.  
```
 public class ColorObject
{
.
.
.
    Scalar HSVmin, HSVmax;
.
.
.
    public ColorObject (string name)
    {
        setType (name);
    
        if (name == "blue") {
        
            setHSVmin (new Scalar (92, 0, 0));
            setHSVmax (new Scalar (124, 256, 256));
        
            //BGR value for Blue:
            setColor (new Scalar (0, 0, 255));
        }
    }
    public void setHSVmin (Scalar min)
    {
        HSVmin = min;
    }

    public void setHSVmax (Scalar max)
    {
        HSVmax = max;
    }
}
```

푸른색 영역을 찾고 원검출 함수를 호출하는 부분입니다. 디바이스의 카메라를 통해 입력된 영상이 OpenCV를 통해 전처리가 진행되는 부분이기 때문에 메인 코드라고 볼 수 있겠습니다. HSV검출로 푸른 영역을 찾고 모폴로지 진행 후 원을 검출합니다.  
```
.
.
.
ColorObject blue = new ColorObject ("blue");
.
.
.
void Update ()
{
    if (webCamTextureToMatHelper.IsPlaying () && webCamTextureToMatHelper.DidUpdateThisFrame ()) {
        
        Mat rgbaMat = webCamTextureToMatHelper.GetMat ();

        Imgproc.cvtColor (rgbaMat, rgbMat, Imgproc.COLOR_RGBA2RGB);
                                
        //first find blue objects
        Imgproc.cvtColor (rgbMat, hsvMat, Imgproc.COLOR_RGB2HSV);
        Core.inRange (hsvMat, blue.getHSVmin (), blue.getHSVmax (), thresholdMat);
        morphOps (thresholdMat);

        trackFilteredObject (blue, thresholdMat, hsvMat, rgbMat);

        Utils.fastMatToTexture2D (rgbMat, texture);
    }
}
```
  
morphOps 함수는 모폴로지를 진행하는 함수입니다. 수축을 두번 먼저, 그리고 팽창을 두번 진행합니다. 본 콘텐츠가 진행되는 환경의 특성상 푸른색 짐볼만 인식하게 하기 위해 다음과 같이 진행하였습니다.  
```
private void morphOps (Mat thresh)
{
    //create structuring element that will be used to "dilate" and "erode" image.
    //the element chosen here is a 3px by 3px rectangle
    Mat erodeElement = Imgproc.getStructuringElement (Imgproc.MORPH_RECT, new Size (3, 3));
    //dilate with larger element so make sure object is nicely visible
    Mat dilateElement = Imgproc.getStructuringElement (Imgproc.MORPH_RECT, new Size (8, 8));

    Imgproc.erode (thresh, thresh, erodeElement);
    Imgproc.erode (thresh, thresh, erodeElement);

    Imgproc.dilate (thresh, thresh, dilateElement);
    Imgproc.dilate (thresh, thresh, dilateElement);
}
```
  
trackFilteredObject함수는 푸른색 영역 중 원이 검출되는 영역을 찾습니다. findContours로 푸른색 영역의 윤곽선을 만들고 해당 윤곽선 내의 넓이와 윤곽선의 길이 비율에 따라 원인지 아닌지를 판단합니다. 다만 이 부분에서 위 전처리 과정을 수정해 허프트랜스폼 방식으로 검출을 성공시켜봄이 어떠한가 생각합니다.   
```
private void trackFilteredObject (ColorObject theColorObject, Mat threshold, Mat HSV, Mat cameraFeed)
{
    List<ColorObject> colorObjects = new List<ColorObject> ();
    Mat temp = new Mat ();
    threshold.copyTo (temp);
    //these two vectors needed for output of findContours
    List<MatOfPoint> contours = new List<MatOfPoint> ();
    Mat hierarchy = new Mat ();
    //find contours of filtered image using openCV findContours function
    Imgproc.findContours (temp, contours, hierarchy, Imgproc.RETR_CCOMP, Imgproc.CHAIN_APPROX_SIMPLE);

    //use moments method to find our filtered object
    bool colorObjectFound = false;
    if (hierarchy.rows () > 0) {
        int numObjects = hierarchy.rows ();

        //if number of objects greater than MAX_NUM_OBJECTS we have a noisy filter
        if (numObjects < MAX_NUM_OBJECTS) {
            for (int index = 0; index >= 0; index = (int)hierarchy.get (0, index) [0]) {

                Moments moment = Imgproc.moments (contours [index]);
                double area = moment.get_m00 ();

                if (area > MIN_OBJECT_AREA) {

                    ColorObject colorObject = new ColorObject ();

                    colorObject.setXPos ((int)(moment.get_m10 () / area));
                    colorObject.setYPos ((int)(moment.get_m01 () / area));
                    colorObject.setType (theColorObject.getType ());
                    colorObject.setColor (theColorObject.getColor ());

                    colorObjects.Add (colorObject);

                    colorObjectFound = true;

                } else {
                    colorObjectFound = false;
                }
            }
            //let user know you found an object
            if (colorObjectFound == true) {
                //draw object location on screen
                drawObject (colorObjects, cameraFeed, temp, contours, hierarchy);
            }

        } else {
            Imgproc.putText (cameraFeed, "TOO MUCH NOISE!", new Point (5, cameraFeed.rows () - 10), Imgproc.FONT_HERSHEY_SIMPLEX, 1.0, new Scalar (255, 255, 255, 255), 2, Imgproc.LINE_AA, false);
        }
    }
}
```

마지막으로 원이 검출된다면 해당 영역의 중심점을 찾아 현재 디바이스의 스크린 좌표와 맞추고 해당 위치에 객체를 생성합니다.  
```
private void drawObject (List<ColorObject> theColorObjects, Mat frame, Mat temp, List<MatOfPoint> contours, Mat hierarchy)
{
    Debug.Log("There is Blue");
    for (int i = 0; i < theColorObjects.Count; i++) {
        Imgproc.drawContours (frame, contours, i, theColorObjects [i].getColor (), 3, 8, hierarchy, int.MaxValue, new Point ());
        Imgproc.circle (frame, new Point (theColorObjects [i].getXPos (), theColorObjects [i].getYPos ()), 5, theColorObjects [i].getColor ());
        Debug.Log(theColorObjects[i].getXPos()+"::" + theColorObjects[i].getYPos());
        Eyeball.transform.position = transform.TransformPoint(new Vector3(theColorObjects[i].getXPos()/numW - 0.5f, -theColorObjects[i].getYPos()/numH + 0.5f, 0));
    }
}
```
  
###### 콘텐츠 시연
<p align="center">
<img src="/img/portfolio/bongnjoule/bongnjoule01.gif" width="49%">
<img src="/img/portfolio/bongnjoule/bongnjoule02.gif" width="49%">
<figcaption align="center">파란색 짐볼에 객체 인식 장면</figcaption>
</p>
<br/>
 


