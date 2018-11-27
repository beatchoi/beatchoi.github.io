---
layout: post
title:  "Unity3D Assetbundle, 에셋번들 구현하기 01"
date:   2018-11-27 22:01:43 +0530
categories: AssetBundle update
author: "BeatChoi"
---
asdfasdfasdf

{% highlight java %}
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

public class BundleBuilder : Editor {
    [MenuItem("Assets/ Build AssetBundles")]
    static void BuildAllAssetBundles()
    {
        BuildPipeline.BuildAssetBundles(@"C:\Users\BeatChoi.DESKTOP-BSQNIUE\Desktop\HelloVR\AssetBundles", BuildAssetBundleOptions.None, BuildTarget.Android);
    }
}

{% endhighlight %}
