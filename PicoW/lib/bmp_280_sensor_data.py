from machine import Pin, I2C
from utime import sleep

from bmp280 import BMP280I2C

i2c0_sda = Pin(0)
i2c0_scl = Pin(1)
i2c0 = I2C(0, sda=i2c0_sda, scl=i2c0_scl, freq=400000)

bmp280_i2c = BMP280I2C(0x76, i2c0)

def get_temperature():
    readings = bmp280_i2c.measurements
    return readings['t']

def get_pressure():
    readings = bmp280_i2c.measurements
    return readings['p']