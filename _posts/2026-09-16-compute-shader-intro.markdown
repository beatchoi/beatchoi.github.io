---
layout: post
title:  "컴퓨트 셰이더, 화면에 그리지 않는 셰이더"
date:   2026-09-16 22:40:00 +0900
categories: Notes
description: "GPU를 그림이 아니라 계산에 쓰는 법. 커널 하나와 숫자 하나, 그리고 배가 파도 위에 뜨려면 생기는 질문."
image: ''
published: true
canonical_url: https://beatchoi.github.io/notes/2026/09/16/compute-shader-intro/
---

조선소에서 배를 설계하는 분들과 Unity 수업을 할 때 가장 먼저 받은 질문은 "바다를 어떻게 그리느냐"가 아니었습니다. "파도 위에 배가 실제처럼 흔들리려면 몇 개의 점을 계산해야 하느냐"였습니다. 바다 한 장을 256×256 격자로 깔면 정점이 65,536개입니다. 이 점들을 매 프레임 움직여야 하고, 그 위에 배가 떠야 하고, 배가 지나간 자리에 항적이 남아야 합니다. 이 질문에 답하려고 컴퓨트 셰이더 세미나를 만들었습니다.

## 그리지 않는 셰이더

셰이더는 보통 그리는 데 씁니다. 버텍스 셰이더가 정점의 위치를 정하고, 프래그먼트 셰이더가 픽셀의 색을 정합니다. 둘 다 렌더링 파이프라인에 묶여 있어서 입력과 출력이 정해져 있습니다.

컴퓨트 셰이더는 그 파이프라인 바깥에 있습니다. 입력과 출력을 마음대로 정하고, GPU의 수천 개 코어에 같은 계산을 한 번에 시킵니다. 그림을 그리지 않아도 됩니다. 파도의 높이를 구해도 되고, 입자 20만 개의 위치를 옮겨도 되고, 점군에 라벨을 붙여도 됩니다. GPU를 그래픽 카드가 아니라 계산기로 쓰는 것입니다.

CPU는 코어가 여덟 개나 열여섯 개고, 하나하나가 복잡한 분기와 순서가 있는 일을 잘합니다. GPU는 코어가 수천 개고, 하나하나는 단순하지만 같은 일을 대량으로 동시에 합니다. 65,536개의 점에 같은 공식을 적용하는 일은 정확히 GPU의 일입니다.

## 커널 하나

컴퓨트 셰이더의 최소 단위는 커널이라고 부르는 함수입니다. 아래는 세미나에서 처음 보여 주는 커널을 줄인 것입니다. 평평한 격자의 정점을 사인 파도로 밀어 올립니다.

```hlsl
#pragma kernel CSSineDisplace

RWStructuredBuffer<float3> _Vertices;   // GPU가 결과를 쓰는 버퍼
StructuredBuffer<float3>   _BaseVertices; // 원래 위치, 읽기 전용
float _Time, _Amplitude, _Frequency, _Speed;

[numthreads(256, 1, 1)]
void CSSineDisplace(uint3 id : SV_DispatchThreadID)
{
    float3 base = _BaseVertices[id.x];
    float y = _Amplitude * sin(base.x * _Frequency + _Time * _Speed);
    _Vertices[id.x] = float3(base.x, base.y + y, base.z);
}
```

읽는 법은 세 줄만 알면 됩니다. `numthreads(256, 1, 1)`은 스레드 256개를 한 묶음으로 만든다는 뜻입니다. C#에서 `Dispatch(256, 1, 1)`을 부르면 그 묶음을 256개 띄우니 스레드 65,536개가 동시에 이 함수를 실행합니다. `SV_DispatchThreadID`는 그중 이 스레드가 몇 번째인지 GPU가 넣어 주는 번호이고, 이 번호가 곧 정점의 인덱스가 됩니다.

<figure class="note-fig">
<svg viewBox="0 0 720 180" role="img" aria-label="numthreads 256 곱하기 Dispatch 256은 스레드 65,536개">
  <g font-family="IBM Plex Mono, ui-monospace, monospace" font-size="12" fill="currentColor">
    <text x="0" y="16" opacity=".6">Dispatch(256, 1, 1)</text>
    <text x="0" y="172" opacity=".6">numthreads(256, 1, 1) × 256 그룹 = 65,536 스레드, 정점 하나에 스레드 하나</text>
  </g>
  <g fill="none" stroke="currentColor" stroke-opacity=".35">
    <rect x="0" y="28" width="172" height="120" rx="2"/>
    <rect x="184" y="28" width="172" height="120" rx="2"/>
    <rect x="368" y="28" width="172" height="120" rx="2"/>
    <rect x="552" y="28" width="168" height="120" rx="2" stroke-dasharray="3 4"/>
  </g>
  <g font-family="IBM Plex Mono, ui-monospace, monospace" font-size="11" fill="currentColor" opacity=".7">
    <text x="8" y="44">그룹 0</text><text x="192" y="44">그룹 1</text><text x="376" y="44">그룹 2</text><text x="560" y="44">… 그룹 255</text>
  </g>
  <g fill="#2E52A8">
    <!-- 16x8 dots per group = 128 shown, representing 256 -->
    <g id="dots">
      <rect x="8" y="54" width="5" height="5"/><rect x="18" y="54" width="5" height="5"/><rect x="28" y="54" width="5" height="5"/><rect x="38" y="54" width="5" height="5"/><rect x="48" y="54" width="5" height="5"/><rect x="58" y="54" width="5" height="5"/><rect x="68" y="54" width="5" height="5"/><rect x="78" y="54" width="5" height="5"/><rect x="88" y="54" width="5" height="5"/><rect x="98" y="54" width="5" height="5"/><rect x="108" y="54" width="5" height="5"/><rect x="118" y="54" width="5" height="5"/><rect x="128" y="54" width="5" height="5"/><rect x="138" y="54" width="5" height="5"/><rect x="148" y="54" width="5" height="5"/><rect x="158" y="54" width="5" height="5"/>
    </g>
    <use href="#dots" y="10"/><use href="#dots" y="20"/><use href="#dots" y="30"/><use href="#dots" y="40"/><use href="#dots" y="50"/><use href="#dots" y="60"/><use href="#dots" y="70"/><use href="#dots" y="80"/>
    <use href="#dots" x="184"/><use href="#dots" x="184" y="10"/><use href="#dots" x="184" y="20"/><use href="#dots" x="184" y="30"/><use href="#dots" x="184" y="40"/><use href="#dots" x="184" y="50"/><use href="#dots" x="184" y="60"/><use href="#dots" x="184" y="70"/><use href="#dots" x="184" y="80"/>
    <use href="#dots" x="368"/><use href="#dots" x="368" y="10"/><use href="#dots" x="368" y="20"/><use href="#dots" x="368" y="30"/><use href="#dots" x="368" y="40"/><use href="#dots" x="368" y="50"/><use href="#dots" x="368" y="60"/><use href="#dots" x="368" y="70"/><use href="#dots" x="368" y="80"/>
    <g opacity=".35"><use href="#dots" x="552"/><use href="#dots" x="552" y="10"/><use href="#dots" x="552" y="20"/><use href="#dots" x="552" y="30"/><use href="#dots" x="552" y="40"/><use href="#dots" x="552" y="50"/><use href="#dots" x="552" y="60"/><use href="#dots" x="552" y="70"/><use href="#dots" x="552" y="80"/></g>
  </g>
</svg>
<figcaption>스레드 하나가 정점 하나를 맡습니다. for 문이 없습니다. 반복은 GPU가 공간으로 펼쳐 놓습니다.</figcaption>
</figure>

버퍼 두 개가 있는 이유도 짚어 둡니다. `_BaseVertices`는 원래 위치를 읽기만 하고, `_Vertices`에 결과를 씁니다. 하나로 합치면 이전 프레임의 변위 위에 다시 변위가 쌓여서 파도가 무한히 자랍니다. 세미나에서 이 둘을 합쳐 보는 실습을 하면 방 안의 바다가 하늘로 올라갑니다.

## 숫자 하나

세미나 두 번째 세션은 같은 파도 공식을 CPU와 GPU에서 각각 돌려 나란히 놓는 데모입니다. 공식은 사인 파도보다 조금 복잡한 게르스트너 파도이고, 파도 여러 개를 겹칩니다. 격자 크기를 올리면서 한 프레임에 걸리는 시간을 재면 이렇게 나옵니다.

| 격자 | 정점 수 | CPU 한 프레임 | GPU 한 프레임 |
|---|---|---|---|
| 64 × 64 | 4,096 | 약 0.5 ms | 약 0.05 ms |
| 256 × 256 | 65,536 | 약 15 ms | 약 0.1 ms |
| 512 × 512 | 262,144 | 60 ms 이상 | 약 0.2 ms |

CPU는 정점 수에 비례해 늘어나고, GPU는 코어가 남는 동안 거의 늘지 않습니다. 256×256에서 CPU는 이미 한 프레임 예산(60fps 기준 16.7ms)을 다 씁니다. 배도, 항적도, UI도 넣기 전입니다.

표에서 더 중요한 것은 시간이 아니라 데이터가 어디 있느냐입니다. CPU 방식은 계산한 정점을 매 프레임 GPU로 다시 올려야 합니다. GPU 방식은 컴퓨트 셰이더가 쓴 버퍼를 렌더링 셰이더가 `SV_VertexID`로 바로 읽습니다. 데이터가 GPU를 떠나지 않습니다. 세미나에서는 이것을 "GPU 전용 파이프라인"이라고 부르고, 이 한 문장이 4시간 과정의 절반입니다.

## 그런데 배는 CPU에 있습니다

여기서 조선소의 질문이 되돌아옵니다. 파도는 GPU가 계산합니다. 배는 Unity의 물리 엔진, 즉 CPU 위에 떠 있습니다. 배가 흔들리려면 선체 아래 몇 지점의 파도 높이를 CPU가 알아야 합니다.

GPU에서 결과를 읽어 오면 두세 프레임이 늦습니다. 배가 파도보다 늦게 반응합니다. 65,536개 정점을 매 프레임 통째로 복사해 오는 것도 낭비입니다. 필요한 것은 여섯 점의 높이일 뿐입니다.

세미나의 마지막 세션은 이 문제를 다룹니다. 답은 한 줄이지만, 그 답이 왜 맞는지와 언제 틀리는지가 한 세션입니다. 그 이야기는 다음 글로 미룹니다. 그리고 그 다음에는 배가 아니라 부품 이야기를 합니다. 조선소의 블록 하나에 부품이 십만 개인데, 그것을 드로우콜 하나로 그리는 법입니다.

<p class="note-meta">이 글은 2026년 SMB 세미나 "Compute Shader - GPU 컴퓨팅의 활용"과 조선·해양 고객 교육의 교재 프로젝트를 바탕으로 정리했습니다. 세미나 자료는 <a href="/smbseminar/">교육 자료</a>에 있습니다.</p>
