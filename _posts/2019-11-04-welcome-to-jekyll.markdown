---
layout: post
title:  "Unity3D Specifics"
date:   2019-11-04 23:04:43 +0530
categories: Resources update
author: "BeatChoi"
---

Unity Touch Specifics

01. Simple Unity Drag and Drop with Touch

Source Code
{% highlight c %}
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
public class touchSample : MonoBehaviour
{   // Update is called once per frame
    void Update()
    {
       touchDrag();
    }
    void touchDrag()
    {
        if (Input.GetMouseButton(0))
        {
            float depth = Camera.main.transform.position.x + 10;
            Vector3 mousePos = new Vector3(Input.mousePosition.x, Input.mousePosition.y, depth);
            Vector3 objPos = Camera.main.ScreenToWorldPoint(mousePos);
            transform.position = objPos;
        }
    }
}
{% endhighlight %}
