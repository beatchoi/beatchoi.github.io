---
title: 교육 자료
subtitle: 진행했거나 진행 중인 프로그램의 자료 페이지입니다. 참가자는 코스 이름을 눌러 들어갑니다.
layout: page
permalink: /training/
---

<ul class="courses">
{% for c in site.data.training %}
  <li><a class="n" href="{{ c.link | relative_url }}">{{ c.name }}</a><span class="len">{{ c.len }}</span><a class="res" href="{{ c.link | relative_url }}">자료 →</a></li>
{% endfor %}
</ul>
