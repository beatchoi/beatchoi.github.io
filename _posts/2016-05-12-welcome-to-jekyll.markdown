---
layout: post
title:  "This is first post!"
date:   2016-05-12 22:01:43 +0530
categories: jekyll update
author: "Hemang"
---
You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight java %}
using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
using Vuforia;

public class SimpleCloudHandler : MonoBehaviour, ICloudRecoEventHandler {

    public ImageTargetBehaviour ImageTargetTemplate;
    private CloudRecoBehaviour mcloudRecoBehaviour;
    private bool misScanning = false;
    private string mTargetMetadata = "";
    Color loadingCol;
    Color loadingCol2;

    public static float pubDownloadProgress;
    public static bool pubIsDone;

    AssetBundle bundle;
    bool[] isSeen;

    // Use this for initialization
    void Start () {
        CloudRecoBehaviour cloudRecoBehaviour = GetComponent<CloudRecoBehaviour>();
        if (cloudRecoBehaviour)
        {
            cloudRecoBehaviour.RegisterEventHandler(this);
        }
        mcloudRecoBehaviour = cloudRecoBehaviour;
	}

    public void OnInitialized(Vuforia.TargetFinder targetFinder)
    {
        
    }

    public void OnInitError(TargetFinder.InitState initError)
    {

    }

    public void OnUpdateError(TargetFinder.UpdateState updateError)
    {

    }

    public void OnStateChanged(bool scanning)
    {
        
        misScanning = scanning;
        if (scanning)
        {
            ObjectTracker tracker = TrackerManager.Instance.GetTracker<ObjectTracker>();
            tracker.TargetFinder.ClearTrackables(false);
        }

        
    }

    public void OnNewSearchResult(TargetFinder.TargetSearchResult targetSearchResult)
    {
        GameObject newImageTarget = Instantiate(ImageTargetTemplate.gameObject) as GameObject;
        GameObject augmentation = null;
        string model_name = targetSearchResult.MetaData;
        if (augmentation != null)
            augmentation.transform.SetParent(newImageTarget.transform);
        if (ImageTargetTemplate)
        {
            ObjectTracker tracker = TrackerManager.Instance.GetTracker<ObjectTracker>();
            ImageTargetBehaviour imageTargetBehaviuour = (ImageTargetBehaviour)tracker.TargetFinder.EnableTracking(targetSearchResult, newImageTarget);
            //DefaultTrackableEventHandler.obj.transform.localScale = new Vector3(10, 10, 10);
        }
        mTargetMetadata = model_name;
        Debug.Log(model_name);
        if(model_name == "dino01")
        {

            StartCoroutine(load("dino01", "https://s3.ap-northeast-2.amazonaws.com/hellovrtest/dino01"));
   
        }
        else if (model_name == "dino02")
        {
            StartCoroutine(load("dino02", "https://s3.ap-northeast-2.amazonaws.com/hellovrtest/dino02"));
            //StartCoroutine(loadingAlpha());
        }
        else if (model_name == "dino03")
        {
            StartCoroutine(load("dino03", "https://s3.ap-northeast-2.amazonaws.com/hellovrtest/dino03"));
            //StartCoroutine(loadingAlpha());
        }

        if (!misScanning)
        {
            mcloudRecoBehaviour.CloudRecoEnabled = true;
        }
    }
    

    IEnumerator load(string AssetName, string BundleURL)
    {
        // Download the file from the URL. It will not be saved in the Cache
        using (UnityWebRequest www = UnityWebRequestAssetBundle.GetAssetBundle(BundleURL))
        {
                www.SendWebRequest();


                while (!www.isDone)
                {
                    yield return null;
                    pubDownloadProgress = www.downloadProgress;
                    pubIsDone = www.isDone;
                }


                if (www.error != null)
                    throw new Exception("WWW download had an error:" + www.error);

                
            bundle = DownloadHandlerAssetBundle.GetContent(www);


            
            if (AssetName == "dino01")
            {
                Instantiate(bundle.LoadAsset("dino01"), DefaultTrackableEventHandler.obj.transform);
                DefaultTrackableEventHandler.obj.transform.GetChild(1).localScale = new Vector3(1, 1, 1);
            }
            else if (AssetName == "dino02")
            {
                Instantiate(bundle.LoadAsset("dino02"), DefaultTrackableEventHandler.obj.transform);
                DefaultTrackableEventHandler.obj.transform.GetChild(1).localScale = new Vector3(1, 1, 1);
            }

            else if (AssetName == "dino03")
            {
                Instantiate(bundle.LoadAsset("dino03"));
                //DefaultTrackableEventHandler.obj.transform.GetChild(1).localScale = new Vector3(1, 1, 1);
            }

            else
            bundle.Unload(false);

        } // memory is freed from the web stream (www.Dispose() gets called implicitly)
    }
}

{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: http://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
