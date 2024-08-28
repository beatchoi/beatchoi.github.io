---
title: Novaflo CPR IoT Device 개발 프로젝트
subtitle: 주식회사 노바플로
description: Unity3D,C#,Arduino,BluetoothLE
layout: product
image: /img/portfolio/cpriot/cpriot.jpg
price: 90
features:
    - label: 개발 기간 - 2024.1 – 2024.6 (8 년차)
    - label: 수행 PJT  - 기술 개발 R&D 프로젝트  
    - label: 담당 업무 - SDK 및 IoT 개발  
    - label: 개발 비중 - 50%(Arduino의 센서 데이터의 블루투스 송수신)  
---

본 프로젝트는 arduino로 구성된 CPR 마네킨에서 사용자가 CPR을 수행하면 BLE로 연결되어 있는 모바일 기기에 현재 수행되고 있는 CPR의 정보를 전송하는 시스템을 구성함으로서 CPR교육을 효율적으로 할수 있도록 기획되었습니다.  

##### 주요업무  
- Unity3D 툴을 활용하여 Arduino 의 BLE 통신을 통한 데이터 전송 SDK 및 콘텐츠 개발  
  
##### 획득역량  
- Arduino 기기와 안드로이드 어플리케이션의 BLE 통신 구현

##### 주요 코드
아래 코드는 아두이노와 모바일 디바이스간의 BLE 송수신을 담당하는 부분입니다. 씬이 시작되면 아래 지정된 Service 및 Characteristic UUID를 스캔하고 스캔에 성공한 디바이스의 BLE 기기 이름이 지정된 이름과 동일한지 파악 후 연결을 진행합니다.  

```
using UnityEngine;
using System.Collections.Generic;
using UnityEngine.UI;
using System.Text;
using System;
using System.IO;

public class BLEGetDevice : MonoBehaviour
{
	public string DeviceName = "";
	public string ServiceUUID = "";
	public string Characteristic = "";

	[SerializeField]
	string readServiceUUID = "00001800-0000-1000-8000-00805f9b34fb";
	[SerializeField]
	string readCharacteristicUUID = "00002a00-0000-1000-8000-00805f9b34fb";

	[SerializeField]
	string writeServiceUUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
	[SerializeField]
	string writeCharacteristicUUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

	public string SERVICE = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
	public string RX = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E";

	public Text StatusField;

	string message;

	private float h = 0;

	enum States
	{
		None,
		Scan,
		Connect,
		RequestMTU,
		Unsubscribe,
		Disconnect,
		Communication,
	}

	private bool _workingFoundDevice = true;
	private bool _connected = false;
	private float _timeout = 0f;
	private States _state = States.None;
	private bool _foundID = false;

	// this is our hm10 device
	private string _address;
	List<GameObject> lineList = new List<GameObject>();


	void Reset()
	{
		_workingFoundDevice = false;    // used to guard against trying to connect to a second device while still connecting to the first
		_connected = false;
		_timeout = 0f;
		_state = States.None;
		_foundID = false;
		_address = null;
		//PanelMiddle.SetActive (false);
	}

	void SetState(States newState, float timeout)
	{
		_state = newState;
		_timeout = timeout;
	}

	void StartProcess()
	{
		StatusField.text = "Initializing...";
		//AddALine();

		Reset();
		BluetoothLEHardwareInterface.Initialize(true, false, () => {

			SetState(States.Scan, 0.1f);
			StatusField.text = "Initialized";

		}, (error) => {

			BluetoothLEHardwareInterface.Log("Error: " + error);
		});
	}

	// Use this for initialization
	void Start()
	{
		StatusField.text = "";

		StartProcess();
	}

	// Update is called once per frame
	void Update()
	{
		if (_timeout > 0f)
		{
			_timeout -= Time.deltaTime;
			if (_timeout <= 0f)
			{
				_timeout = 0f;

				switch (_state)
				{
					case States.None:
						break;

					case States.Scan:
						StatusField.text = "Scanning for NOVAFLO0001 devices...";
						BluetoothLEHardwareInterface.ScanForPeripheralsWithServices(null, (address, name) =>
						{
							StatusField.text = "In Peripheral";
							if (name.Contains(DeviceName))
							{
								_workingFoundDevice = true;

								BluetoothLEHardwareInterface.StopScan();
								StatusField.text = "";

								_address = address;
								PlayerPrefs.SetString("address", address);
								StatusField.text = "Found NOVAFLO0001";

								SetState(States.Connect, 0.5f);
								ChangeScene();
								_workingFoundDevice = false;
							}

						}, null, false, false);
						break;

				}
			}
		}
	}

	void SendString(string value)
	{
		var data = Encoding.UTF8.GetBytes(value);
		BluetoothLEHardwareInterface.WriteCharacteristic(_address, ServiceUUID, Characteristic, data, data.Length, true, (characteristicUUID) => {

			BluetoothLEHardwareInterface.Log("Write Succeeded");
		});
	}

	public void Send(string msg = ">D1112")
	{
		var data = Encoding.UTF8.GetBytes(">D1112");
		Debug.Log($"################# 메세지 전송:{msg} #################" + ServiceUUID + ": " + Characteristic);
		BluetoothLEHardwareInterface.WriteCharacteristic(_address, ServiceUUID, Characteristic, data, data.Length, false, null);
	}

	void SendByte(byte value)
	{
		byte[] data = new byte[] { value };
		BluetoothLEHardwareInterface.WriteCharacteristic(_address, ServiceUUID, Characteristic, data, data.Length, false, (characteristicUUID) => {

			BluetoothLEHardwareInterface.Log("Write Succeeded");
		});
	}

    public void SaveData()
    {
        string filePath = Path.Combine(Application.persistentDataPath, "data.txt");
        WriteTxt(filePath, message);
    }

    void WriteTxt(string filePath, string message)
    {
        DirectoryInfo directoryInfo = new DirectoryInfo(Path.GetDirectoryName(filePath));

        if (!directoryInfo.Exists)
        {
            directoryInfo.Create();
        }

        FileStream fileStream
            = new FileStream(filePath, FileMode.OpenOrCreate, FileAccess.Write);

        StreamWriter writer = new StreamWriter(fileStream, System.Text.Encoding.Unicode);

        writer.WriteLine(message);
        writer.Close();
    }


    public void ChangeScene()
    {
		UnityEngine.SceneManagement.SceneManager.LoadScene("MenuSample");
    }
}
```

 


