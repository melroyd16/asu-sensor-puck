/*
 * IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
 */
'use strict';
const sensor = require('node-dht-sensor');

function MessageProcessor(option) {
    option = Object.assign({
        deviceId: 'sensorpuck',
        temperatureAlert: 80
    }, option);
    this.deviceId = option.deviceId;
    this.temperatureAlert = option.temperatureAlert
}

MessageProcessor.prototype.getMessage = function (messageId, cb) {
    sensor.read(11, 4, function (err, temperature, humidity) {
        if (err) {
            console.log('puck 0 node Read data failed: ' + err.message);
            return;
        }
        cb(JSON.stringify({
            messageId: messageId,
            deviceId: this.deviceId,
            temperature: ((temperature * 1.8) + 32).toFixed(1),
            humidity: humidity
        }), temperature > this.temperatureAlert);
    });
}

module.exports = MessageProcessor;
