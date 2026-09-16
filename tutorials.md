---
title: 튜토리얼
subtitle: 2020년부터 쌓인 단계별 글. 주제별 목차로 들어갑니다.
layout: page
permalink: /tutorials/
---

<ul class="courses">
{% for s in site.data.series %}
  <li><a class="n" href="{{ s.link | relative_url }}">{{ s.name }}</a><span class="len">{{ s.count }}편</span><a class="res" href="{{ s.link | relative_url }}">목차 →</a></li>
{% endfor %}
</ul>

<p style="margin-top:28px;color:var(--ink-2)">{{ site.data.series | map: "desc" | join: " · " }}</p>
