---
layout: post
title:  "ARProject, 증강현실 콘텐츠 개발자료 01"
date:   2018-11-27 22:01:43 +0530
categories: AssetBundle update
author: "BeatChoi"
---
[증강현실 콘텐츠 개발자료][증강현실 콘텐츠 개발자료]
[가상현실 콘텐츠 개발자료][가상현실 콘텐츠 개발자료]

////
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class rayCasting : MonoBehaviour
{
    public Image redImage;
    float timeElapsed;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        raycast();
    }

    void raycast()
    {
        RaycastHit hit;
        Vector3 forward = transform.TransformDirection(Vector3.forward * 1000);
        if(Physics.Raycast(transform.position, forward, out hit))
        {
            timeElapsed = Time.deltaTime + timeElapsed;
            redImage.fillAmount = timeElapsed / 3;
            Debug.Log(timeElapsed);
            if(timeElapsed >= 3)
            {
                hit.transform.GetComponent<Button>().onClick.Invoke();
                Debug.Log("hit!!");
                timeElapsed = 3;
            }
        }
        else
        {
            timeElapsed = timeElapsed - Time.deltaTime;
            redImage.fillAmount = timeElapsed / 3;
            if(timeElapsed <= 0)
            {
                timeElapsed = 0;
            }
        }
        Debug.DrawRay(transform.position, forward, Color.red);
    }
}




////











[증강현실 콘텐츠 개발자료]: https://drive.google.com/open?id=19BZX4u046I57clEwl0dxtMnds6OEul9-
[가상현실 콘텐츠 개발자료]: https://drive.google.com/open?id=1BqiQ6kiemFutxGp7ejyxt1nORvDPJX1r

