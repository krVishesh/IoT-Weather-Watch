import urequests as requests
import network, utime
from time import sleep
import json
from secret import ssid, password
import bmp_280_sensor_data as bmp280
from machine import Pin

EC2_URL = 'http://65.1.72.152/data/insert'

led = Pin("LED", Pin.OUT)

def blink_led(times, delay):
    for _ in range(times):
        led.on()
        utime.sleep(delay)
        led.off()
        utime.sleep(delay)

def connect_to_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)

    # Wait for connection
    while not wlan.isconnected():
        wlan.connect(ssid, password)
        print("Connecting to Wi-Fi...")
        sleep(1)
        blink_led(4, 0.5)
        
    print("Connected to Wi-Fi")
    blink_led(4, 0.1)

# Function to send data to EC2
def send_data_to_ec2():
    data = {
        "temperature": bmp280.get_temperature(),
        "pressure": bmp280.get_pressure()
    }

    headers = {'Content-Type': 'application/json'}
    
    try:
        response = requests.post(EC2_URL, data=json.dumps(data), headers=headers)
        print(response.text)
        response.close()
    except Exception as e:
        print(f"failed to send data {e}")
    
def send_data_to_ec2_every_4_sec():
    while True:
        send_data_to_ec2()
        blink_led(1, 0.3)
        sleep(4)
    
def start_process():
    connect_to_wifi()
    send_data_to_ec2_every_4_sec()
