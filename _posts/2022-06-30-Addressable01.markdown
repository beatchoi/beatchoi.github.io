---
layout: post
title:  "유니티에서 Addressable 활용하기 - Azure Blob 에서 에셋 받기"
date:   2022-06-30 12:00:07
categories: Unity3D Fundamentals
description: "Addressable을 활용하여 에셋 다운받기"
image: '/img/UnityFundamental/Addressable01/00.png
published: true
canonical_url: https://beatchoi.github.io/unity3d/fundamentals/2022/06/30/Addressable01/
---
  
  
  {% include adsense.html %}
  
  
## Addressables  
이번 포스팅에서는 Addressable Asset System을 활용하여 에셋을 로드해 봅니다.  
Addressable Asset System은 에셋을 조금 더 효율적으로 관리하기 위한 시스템으로  
기존의 Asset Bundle을 기반으로 작동합니다.  
  
프로젝트의 에셋을 관리함으로서 전체 프로젝트의 용량을 줄이거나 효율적으로 수정할 수 있습니다.  
이번 포스팅에서 Azure Blob을 통해서 에셋을 로드해 봅니다.  
    
## Unity3D   
  
프로젝트를 생성하고 `Package Manager`에서 `Addressables` 패키지를 설치합니다.  
    
<p align="center"><img src="/img/UnityFundamental/Addressable01/01.PNG"><br/>
<01. Addressables 다운로드 ></p>  
  
이번엔 로드할 에셋을 만들어봅니다.  
단순한 Cube 오브젝트를 생성하여 `Prefab`으로 만들어 줍니다.  
계층구조창의 Cube 오브젝트는 제거하고 프로젝트 창의 Cube 프리펩을 선탁합니다.  
다음과 같이 `Inspector`창에서 `Addressable` 항목에 체크해줍니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/02.gif"><br/>
<02. Addressables 객체 설정 ></p>  
  
그리고 다음과 같이 `Addressable`의 `Group`창을 띄워줍니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/03.PNG"><br/>
<03. Addressables Group 창 ></p>  
  
  
`Addressable Groups`창에서 `Default Local Group`항목의 드롭다운버튼을 눌러 확인해보면  
위에서 체크한 `Cube`오브젝트가 등록되어 있습니다.  
추후에는 에셋들을 그룹화하여 관리할 수 있습니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/04.gif"><br/>
<04. Addressables Group ></p>  
  
  
## Azure Blob
  
네트워크 스토리지에 빌드된 에셋을 업로드하기 위해 `Azure Blob`을 활용해 봅니다.  
`Azure`에 가입하고 로그인 후 `blob`을 검색해서 `스토리지 계정`항목을 클릭합니다. 
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/05.PNG"><br/>
<05. Azure Blob ></p>  
  
  
그리고 상단 `+만들기` 버튼을 클릭하여 스토리지 생성 창으로 넘어갑니다.  
저장소 계정 생성 창에서 다음과 같이 작성한 후 아래 `검토 + 만들기` 버튼을 누르고 `만들기` 버튼을 한번 더 만들어줍니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/06.gif"><br/>  
<p align="center"><img src="/img/UnityFundamental/Addressable01/07.PNG"><br/>
<06.07. Azure Blob ></p>    
  
기다리면 배포가 완료됩니다.  
아래 `리소스로 이동` 버튼을 눌러줍니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/08.PNG"><br/>
<08. Azure Blob 저장소 계정 배포 ></p>    
  
좌측 탭에서 `컨테이너`항목을 선택합니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/09.PNG"><br/>
<09. Azure Blob 저장소 계정 선택 ></p>    
  
  
좌측 상단  `+컨테이너` 항목을 클릭합니다.  
우측에서 컨테이너 이름을 소문자로 정하고 아래 공용 엑세스 수준을 `Blob`으로 변경합니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/10.gif"><br/>
<10. Azure Blob 컨테이너 생성 ></p>    
  
  
생성된 컨테이너를 우클릭하고 `컨테이너 속성`을 선택합니다.  
그리고 나오는 창의 `URL`항목을 복사합니다.  
해당 URL이 배포된 에셋을 다운로드 받는 경로입니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/11.gif"><br/>
<11. URL 복사 ></p>   
  
## Unity 3D
  
유니티 3D로 돌아와서 `Addressables Group`창을 확인합니다.  
상단 `Profile: Default`항목을 클릭하고 `Manage Profiles`항목을 클릭합니다.  
`Addressables Profiles`창에서 `Remote` 항목을 `Custom`으로 변경하고  
두번째 `Remote.LoadPath` 항목에 방금 복사한 URL을 붙여넣습니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/12.gif"><br/>
<12. Addressables Profiles ></p>    
  
  
프로젝트 창에서 `AddressableAssetSettings`을 선택합니다.  
우측 인스펙터 창에서 `Content Update` 항목에서 `Build Remote Catalog`항목을 체크합니다.  
아래에 `Load Path` 항목이 방금 붙여넣은 경로와 같은지 확인합니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/13.gif"><br/>
<13. Addressable Asset Settings ></p>    
  
  
프로젝트 창에서 `Default Local Group`을 선택합니다.  
우측 인스펙터 창에서 `Content Packing and Loading`항목에서  
`Build and Load Paths` 항목을 `Remote`로 변경합니다.  
마찬가지로 하단 경로가 방금 붙여넣은 경로와 같은지 확인합니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/15.gif"><br/>
<14. Default Local Group ></p>    
  
  
이제 에셋을 빌드합니다.  
`Addressables Groups`창에서 `Play Mode Script`항목을 클릭하고 하단 3번째 `Use Existing Build`항목을 클릭합니다.  
그리고 동일한 창에서 `Build`항목을 클릭하고 `New Build` -> `Default Build Script`항목을 클릭하여 빌드를 진행합니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/14.gif"><br/>
<15. Asset Build ></p>    
  
  
다음과 같은 경로에 에셋이 빌드가 됩니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/16.PNG"><br/>
<16. Build 완료 ></p>  
  
  
## Azure Blob  
  
아까 `Azure Blob`에서 생성한 컨테이너로 가서 위 빌드한 파일들을 업로드해줍니다.  
상단 `업로드`버튼을 클릭하고 해당 파일을 업로드합니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/17.gif"><br/>
<17. 번들 업로드 ></p>  
  
  
## Unity 3D  
#### Script
  
`AddressableLoad.cs` 스크립트를 생성하고 다음과 같이 작성합니다.   
  
```ruby
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AddressableAssets;

public class AddressableLoad : MonoBehaviour
{
    public void CreateObj()
    {
        Addressables.InstantiateAsync("Assets/Cube.prefab", new Vector3(0, 0, 0), Quaternion.identity);
    }
}

```  
  
* 4 : AddressableAssets 네임스페이스를 추가합니다.  
* 10: InstantiateAsync, 에셋 레퍼런스를 활용한 게임오브젝트 생성 함수
  
  
##테스트
  
테스트를 위해 씬에 빈 게임 오브젝트를 생성하고 이름을 `AddressableLoader`로 변경합니다.  
해당 오브젝트에 `AddressableLoad.cs`스크립트를 인스턴스화 시킵니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/18.PNG"><br/>
<18. 스크립트 인스턴스화 ></p>   
  
  
씬에 버튼 UI를 하나 생성합니다.  
해당 버튼 `OnClick()` 이벤트 함수에 위 `AddressableLoader`오브젝트를 연결하고 작성한 스크립트의 `CreateObj` 함수를 선택합니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/17.gif"><br/>
<19. 버튼 생성 ></p>   

프로젝트창에 생성해둔 `Cube` 프리펩을 삭제하고 플레이 버튼을 눌러 테스트해봅니다.  
아래와 같이 버튼을 눌렀을 때 큐브가 생성되면 성공입니다.  
  
<p align="center"><img src="/img/UnityFundamental/Addressable01/20.gif"><br/>
<20. 테스트 성공 ></p>   
  
  
  {% include adsense.html %}
  
  
  
