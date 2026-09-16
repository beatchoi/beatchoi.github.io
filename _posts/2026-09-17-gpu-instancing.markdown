---
layout: post
title:  "드로우콜 하나, 부품 만 개"
date:   2026-09-17 01:10:00 +0900
categories: Notes
description: "디지털 트윈의 병목은 폴리곤이 아니라 드로우콜입니다. 같은 물건 만 개를 한 번에 그리는 GPU 인스턴싱을 세 가지 방법, 숫자 하나, 그리고 클릭이 안 되는 문제까지 정리합니다."
image: '/img/notes/gpu-instancing/demo-warehouse-heat.jpg'
published: true
canonical_url: https://beatchoi.github.io/notes/2026/09/17/gpu-instancing/
---

앞 글은 배가 파도 위에 뜨는 데서 멈췼습니다. 이번에는 배가 아니라 부품입니다. 창고 하나에 팔레트가 천 개, 공장 한 층에 센서가 수백 개, 조선소 블록 하나에 부품이 십만 개입니다. 디지털 트윈을 만들 때 이 숫자 앞에서 처음 부딪히는 벽은 폴리곤 수가 아닙니다. 물건 하나를 그리라고 GPU에 내리는 명령, 드로우콜의 개수입니다. 세미나 두 번째 트랙 "디지털 트윈을 위한 GPU 인스턴싱" 네 세션을 이 글 하나로 정리합니다.

## 병목은 드로우콜이다

Unity가 물체 하나를 그릴 때 CPU는 셰이더를 고르고, 머티리얼 값을 넘기고, 메시를 지정하고, 그리라고 명령합니다. 이 네 단계가 드로우콜 하나입니다. 물체가 만 개면 CPU가 이 일을 만 번 반복하고, GPU는 명령이 올 때마다 조금 일하고 다시 기다립니다. GPU는 한가하고 CPU가 바쁜, 가장 흔한 형태의 병목입니다.

<figure class="note-fig">
<svg viewBox="0 0 720 200" role="img" aria-label="드로우콜 만 번과 인스턴싱 한 번의 비교">
  <g font-family="IBM Plex Mono, ui-monospace, monospace" font-size="12" fill="currentColor">
    <text x="0" y="16" opacity=".6">GameObject 10,000개</text>
    <text x="0" y="118" opacity=".6">인스턴싱, 같은 메시 10,000개</text>
    <text x="560" y="16" opacity=".6">CPU → GPU 명령</text>
  </g>
  <g fill="none" stroke="currentColor" stroke-opacity=".3">
    <line x1="0" y1="86" x2="720" y2="86"/>
  </g>
  <g fill="#2E52A8">
    <g id="dc"><rect x="0" y="28" width="6" height="40"/></g>
    <use href="#dc" x="9"/><use href="#dc" x="18"/><use href="#dc" x="27"/><use href="#dc" x="36"/><use href="#dc" x="45"/><use href="#dc" x="54"/><use href="#dc" x="63"/><use href="#dc" x="72"/><use href="#dc" x="81"/><use href="#dc" x="90"/><use href="#dc" x="99"/><use href="#dc" x="108"/><use href="#dc" x="117"/><use href="#dc" x="126"/><use href="#dc" x="135"/><use href="#dc" x="144"/><use href="#dc" x="153"/><use href="#dc" x="162"/><use href="#dc" x="171"/><use href="#dc" x="180"/><use href="#dc" x="189"/><use href="#dc" x="198"/><use href="#dc" x="207"/><use href="#dc" x="216"/><use href="#dc" x="225"/><use href="#dc" x="234"/><use href="#dc" x="243"/><use href="#dc" x="252"/><use href="#dc" x="261"/><use href="#dc" x="270"/><use href="#dc" x="279"/><use href="#dc" x="288"/><use href="#dc" x="297"/><use href="#dc" x="306"/><use href="#dc" x="315"/><use href="#dc" x="324"/><use href="#dc" x="333"/><use href="#dc" x="342"/><use href="#dc" x="351"/><use href="#dc" x="360"/><use href="#dc" x="369"/><use href="#dc" x="378"/><use href="#dc" x="387"/><use href="#dc" x="396"/><use href="#dc" x="405"/><use href="#dc" x="414"/><use href="#dc" x="423"/><use href="#dc" x="432"/><use href="#dc" x="441"/><use href="#dc" x="450"/><use href="#dc" x="459"/><use href="#dc" x="468"/><use href="#dc" x="477"/><use href="#dc" x="486"/><use href="#dc" x="495"/><use href="#dc" x="504"/><use href="#dc" x="513"/><use href="#dc" x="522"/>
    <text x="560" y="54" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="12" fill="currentColor" opacity=".7">… × 10,000</text>
    <rect x="0" y="130" width="6" height="40"/>
    <text x="16" y="156" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="12" fill="currentColor" opacity=".7">× 1  (행렬 10,000개는 GPU 버퍼에 이미 있음)</text>
  </g>
  <text x="0" y="194" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="12" fill="currentColor" opacity=".6">막대 하나가 드로우콜 하나. 위는 CPU가 만 번 말하고, 아래는 한 번 말합니다.</text>
</svg>
</figure>

GPU 인스턴싱은 같은 메시와 같은 머티리얼을 쓰는 복사본들을 드로우콜 몇 번으로 한꺼번에 그리는 기술입니다. 위치, 회전, 크기, 색, 그 밖의 값은 인스턴스마다 달라도 됩니다. 조건은 메시와 셰이더가 같아야 한다는 것 하나입니다. 창고의 팔레트 천 개는 정확히 이 조건에 맞습니다.

## 세 가지 방법, 숫자 하나

세미나 첫 세션은 같은 원기둥 만 개를 세 가지 방법으로 그려 나란히 놓습니다. 키 1, 2, 3을 누르면 방법이 바뀌고 화면 위에 프레임 시간과 드로우콜 수가 뜹니다.

| 방법 | 드로우콜 | 한 프레임 | 특징 |
|---|---|---|---|
| GameObject.Instantiate | 약 10,000 | 30 ms 이상 | 물체마다 Transform과 렌더러. 쉽지만 가장 느림 |
| Graphics.DrawMeshInstanced | 약 10 | 약 5 ms | 게임오브젝트 없음. 한 번에 1,023개 한도 |
| DrawMeshInstancedIndirect | 1 | 1 ms 안쪽 | 인스턴스 데이터가 GPU 버퍼에 상주. 한도 없음 |

첫 번째 방법은 우리가 늘 쓰는 방식입니다. 프리팹을 만 번 복제하면 씬에 게임오브젝트 만 개가 생기고, Unity가 일부를 묶어 주긴 하지만 CPU 쪽 상태 변경은 만 번에 가깝습니다. 두 번째는 게임오브젝트 없이 행렬 배열만 넘기는 Unity 내장 API인데, 하드웨어 한도 때문에 1,023개씩 끊어서 열 번 부릅니다. 세 번째가 이 트랙의 주인공입니다.

"Indirect"라는 이름은 그릴 개수와 인덱스 수 같은 인자까지 GPU 버퍼에 들어 있다는 뜻입니다. CPU는 "저 버퍼에 적힌 대로 그려라" 한 번만 말합니다. 만 개도, 십만 개도 드로우콜 하나입니다.

<figure class="note-fig">
<img src="/img/notes/gpu-instancing/demo-compare.jpg" alt="" loading="lazy">
<figcaption>세션 1 데모. 같은 원기둥 만 개를 세 방법으로 바꿔 그리며 프레임 시간과 드로우콜 수를 비교합니다. 사진은 게임오브젝트 만 개를 쓰는 첫 번째 방법입니다.</figcaption>
</figure>

## 셰이더가 자기 자리를 찾는 법

세 번째 방법이 가능한 이유는 앞 글의 컴퓨트 셰이더와 같은 장치에 있습니다. 인스턴스 만 개의 변환 행렬을 `StructuredBuffer`에 올려 두고, 셰이더가 자기 번호로 자기 행렬을 읽습니다. 앞 글에서 정점이 `SV_VertexID`로 자기 위치를 읽었다면, 여기서는 인스턴스가 `SV_InstanceID`로 자기 행렬을 읽습니다.

```hlsl
StructuredBuffer<float4x4> _Matrices;     // 인스턴스마다 변환 행렬 하나
StructuredBuffer<float>    _StatusData;   // 인스턴스마다 값 하나

struct Attributes {
    float4 positionOS : POSITION;
    uint   instanceID : SV_InstanceID;    // GPU가 넣어 주는 인스턴스 번호
};

Varyings vert(Attributes IN)
{
    float4x4 mat  = _Matrices[IN.instanceID];
    float3 worldPos = mul(mat, IN.positionOS).xyz;
    OUT.positionCS  = TransformWorldToHClip(worldPos);
    ...
}
```

C# 쪽은 시작할 때 버퍼를 만들어 채우고, 매 프레임 한 줄을 부릅니다.

```csharp
matricesBuf = new ComputeBuffer(totalCount, 64);   // 4×4 float = 64바이트
matricesBuf.SetData(allMatrices);
indirectMat.SetBuffer("_Matrices", matricesBuf);

void Update()
{
    Graphics.DrawMeshInstancedIndirect(mesh, 0, indirectMat, renderBounds, argsBuf);
}
```

마지막 인자 `renderBounds`는 앞 글의 메시 바운드 함정과 같은 자리입니다. Unity는 이 상자로 카메라 밖을 걸러 내는데, 인스턴스는 게임오브젝트가 아니라서 위치를 모릅니다. 상자를 작게 잡으면 카메라를 돌릴 때 만 개가 한꺼번에 사라집니다. 세미나에서 "안 보여요"의 원인은 거의 항상 이것입니다.

## 만 개가 다 똑같으면 트윈이 아니다

만 개를 한 번에 그렸는데 전부 같은 색, 같은 높이면 디지털 트윈으로는 쓸 수 없습니다. 센서 값이 물체마다 달라야 합니다. 두 번째 세션은 인스턴스마다 값 하나를 담는 버퍼를 하나 더 두고, 그 값으로 높이와 색을 정합니다. 버텍스 셰이더가 값에 비례해 Y 크기를 키우고, 프래그먼트 셰이더가 파란색에서 노란색, 빨간색으로 색을 바꿉니다.

<figure class="note-fig">
<img src="/img/notes/gpu-instancing/demo-heatmap.jpg" alt="" loading="lazy">
<figcaption>세션 2 데모. 파이프 만 개가 드로우콜 하나이고, 화면 위 프레임 시간은 5.2ms입니다. 오른쪽 위에 이상 값이 생긴 파이프가 붉게 솟아 있습니다.</figcaption>
</figure>

이 데모에서 CPU가 하는 일은 매 프레임 센서 값 배열 하나를 GPU로 올리는 것뿐입니다. 만 개의 높이와 색은 전부 GPU가 정합니다. 공장의 센서 수백 개를 실시간으로 보는 화면이 이 구조 위에 그대로 올라갑니다.

## 게임오브젝트가 없으면 클릭은 어떻게 하나

여기서 새로운 문제가 생깁니다. 인스턴스는 게임오브젝트가 아니니 콜라이더도 없습니다. 레이캐스트가 아무것도 맞히지 못하고, Unity의 이벤트 시스템은 이 물체들이 있는 줄도 모릅니다. 그런데 GPU는 매 프레임 각 인스턴스를 어느 픽셀에 그렸는지 정확히 알고 있습니다.

그래서 거꾸로 GPU에게 묻습니다. 인스턴스 번호를 색으로 칠하는 별도의 셰이더로 화면 밖 텍스처에 한 번 더 그리고, 마우스 아래 픽셀 하나를 읽어 색을 번호로 되돌립니다. 이것이 GPU 피킹입니다.

<figure class="note-fig">
<svg viewBox="0 0 720 150" role="img" aria-label="GPU 피킹 흐름">
  <g font-family="IBM Plex Mono, ui-monospace, monospace" font-size="12" fill="currentColor">
    <g fill="none" stroke="currentColor" stroke-opacity=".45">
      <rect x="0" y="30" width="160" height="70" rx="2"/>
      <rect x="200" y="30" width="160" height="70" rx="2"/>
      <rect x="400" y="30" width="140" height="70" rx="2"/>
      <rect x="580" y="30" width="140" height="70" rx="2"/>
    </g>
    <g stroke="#2E52A8" stroke-width="1.5" fill="none">
      <line x1="160" y1="65" x2="196" y2="65"/><line x1="360" y1="65" x2="396" y2="65"/><line x1="540" y1="65" x2="576" y2="65"/>
    </g>
    <text x="12" y="56">피킹 셰이더</text><text x="12" y="76" opacity=".65">색 = 인스턴스 번호 + 1</text>
    <text x="212" y="56">화면 밖 텍스처</text><text x="212" y="76" opacity=".65">sRGB 끔, 선형</text>
    <text x="412" y="56">픽셀 하나 읽기</text><text x="412" y="76" opacity=".65">마우스 위치</text>
    <text x="592" y="56">색 → 번호</text><text x="592" y="76" opacity=".65">R + G·256 + B·65536</text>
    <text x="0" y="16" opacity=".6">GPU → CPU, 클릭할 때 한 번</text>
    <text x="0" y="140" opacity=".6">0은 배경. 그래서 번호에 1을 더해 칠하고 읽을 때 1을 뺍니다.</text>
  </g>
</svg>
</figure>

세미나에서 가장 많이 걸리는 함정이 여기 있습니다. 텍스처가 기본값인 sRGB로 만들어지면 GPU가 색에 감마 보정을 걸어서, 128번으로 칠한 인스턴스가 186으로 읽힙니다. 번호를 색에 실어 보내는 텍스처는 반드시 선형으로 만들어야 합니다. 이 한 줄을 모르면 클릭한 팔레트와 전혀 다른 물체가 선택됩니다.

읽기는 클릭할 때 한 번만 합니다. 앞 글에서 GPU 결과를 매 프레임 읽어 오는 것이 왜 나쁜지 이야기했는데, 픽셀 하나를 클릭 순간에 읽는 것은 그 규칙의 예외에 해당합니다. 대신 그 순간 CPU가 GPU를 기다리느라 한 프레임이 살짝 튑니다. 프로파일러에 그 스파이크가 그대로 찍힙니다.

<figure class="note-fig">
<img src="/img/notes/gpu-instancing/demo-picking.jpg" alt="" loading="lazy">
<figcaption>GPU 피킹. 클릭한 파이프 하나가 주황색 윤곽으로 선택됩니다. 콜라이더 없이 화면 밖 텍스처의 픽셀 하나를 읽어 찾아낸 결과입니다.</figcaption>
</figure>

## 실제 창고로

세 번째 세션은 원기둥 만 개 대신 진짜 창고 씬을 씁니다. 팔레트, 선반, 상자, 트롤리처럼 메시가 열세 종류, 물체는 삼천 개쯤입니다. 흐름은 세 단계입니다. 에디터에서 씬을 훑어 메시 이름별로 위치·회전·크기를 JSON으로 뽑고, 실행 시 그 이름을 프리팹의 메시와 머티리얼에 연결하고, 메시 종류마다 버퍼 한 세트를 만들어 종류마다 한 번씩 그립니다. 열세 종류면 드로우콜 열세 번입니다.

게임오브젝트 삼천 개였을 때 중급 GPU에서 15에서 25fps였던 씬이 같은 모양으로 드로우콜 열세 번이 됩니다. 텍스처와 색을 원래 프리팹에서 복사해 오지 않으면 전부 흰색으로 나오는 것, 배치마다 인스턴스 번호가 0부터 다시 시작하니 피킹할 때 배치 오프셋을 더해 줘야 하는 것이 여기서 만나는 두 함정입니다.

<div class="media-grid">
<figure >
<img src="/img/notes/gpu-instancing/demo-warehouse.jpg" alt="" loading="lazy">
<figcaption>세션 3 데모. 팔레트, 선반, 상자, 트롤리 삼천 개가 메시 종류별 열세 번의 드로우콜로 그려집니다. 원래 프리팹의 텍스처와 색을 그대로 가져옵니다.</figcaption>
</figure>

<figure >
<img src="/img/notes/gpu-instancing/demo-warehouse-heat.jpg" alt="" loading="lazy">
<figcaption>같은 씬에 히트맵을 덮은 상태. 팔레트마다 센서 값이 다르고, 셰이더 하나가 원래 텍스처와 열 색을 섞어 그립니다.</figcaption>
</figure>

</div>

## 그런데 CPU가 튄다

네 번째 세션은 프로파일러입니다. 히트맵을 끄면 CPU 메인 스레드가 1.5ms, GPU가 2ms에서 평평합니다. 히트맵을 켜면 GPU는 그대로인데 CPU가 튑니다. 인스턴싱 자체는 문제가 없습니다. 만 개의 센서 값을 CPU가 매 프레임 계산해서 올리는 부분이 병목입니다.

그렇다면 그 계산을 CPU가 아니라 GPU가 하면 어떨까요. 센서 값 버퍼를 채우는 일을 컴퓨트 셰이더에 맡기면, 값을 계산하는 커널과 그것을 읽어 그리는 인스턴싱 셰이더가 같은 GPU 메모리를 두고 만납니다. 앞 글과 이 글이 한 바퀴 돌아 이어지는 자리입니다. 그 이야기는 다음 글에서 합니다.

<p class="note-meta">이 글은 2026년 SMB 세미나 "GPU Instancing - 대규모 렌더링 최적화"와 "디지털 트윈을 위한 GPU 인스턴싱" 4세션 과정의 슬라이드(96장)와 교재 프로젝트를 바탕으로 정리했습니다. 수치는 세미나 데모 씬의 측정값입니다. 세미나 자료는 <a href="/smbseminar/">교육 자료</a>에 있습니다.</p>
