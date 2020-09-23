//var faceapi = require('./face-api.min.js')

//const { promises } = require("fs");

Promise.all([
    // faceapi.nets.tinyFaceDetector.loadFromUri('/models'), //light model for face detection
    faceapi.nets.ssdMobilenetv1.loadFromUri('../models'), //heavy model for face detection
    faceapi.nets.faceExpressionNet.loadFromUri('../models')// for emotion recognition
])


var video = document.getElementById("video");

var pre_emotion = 'neural'

const cameraDeviceIds = [/* { deviceId, label } */];
/*
navigator.mediaDevices.enumerateDevices().then(function(mediaDevices) {
    for (let len = mediaDevices.length, i = 0; i < len; i++) {
        const item = mediaDevices[i];
        // NOTE: カメラデバイスの場合、 kind プロパティには "videoinput" が入っている:
        if (item.kind === "videoinput") {
        const deviceId = item.deviceId;
        const label = item.label;
        // NOTE: ここでデバイスID（とラベル）を適当な変数に保存しておく
        cameraDeviceIds.push({ deviceId, label });
        }
    }
    console.log("cameras:"+JSON.stringify(cameraDeviceIds));

    let cameras = document.getElementById('cameras');
    for(let i = 0; i < cameraDeviceIds.length; i++){
        let option = document.createElement('option');
        option.setAttribute('value', i);
        option.innerHTML = cameraDeviceIds[i].label;
        cameras.appendChild(option);
    };
    */
    /*
    //document.createElement('option')
    var pulldown = new Promise((resolve, reject)=>{
        for(let i = 1; i <= 12; i++){
            let option = document.createElement('option');
            option.setAttribute('value', i);
            option.innerHTML = i + '月';
            cameras.appendChild(option);
        };
    })
    
    pulldown.then((result)=>{
        console.log("pulldown:"+JSON.stringify(cameras));
    })
    pulldown.catch((err)=>{
        console.log("err:"+err);
    })
});
    */




var media = navigator.mediaDevices.getUserMedia({
    video: true,//get video
    audio: false,//do not get audio
});

// get the most probable key
function maxIndex(a) {
    let indexs = Object.keys(a)
    let index = indexs[0]
    let value = -Infinity
    for (let i = 0, l = indexs.length; i < l; i++) {
        if (value < a[indexs[i]]) {
            value = a[indexs[i]]
            index = indexs[i]
        }
    }
    return index
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options()).withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        //やるならここをクラスに　detections[0]を引数として感情(string)を返すプログラム 人が長時間検出できなければabsent
        if (detections[0]) {
            let emotion = maxIndex(detections[0]["expressions"])
            console.log(emotion)
            pre_emotion = emotion
        } else {
            console.log("pre_emotion")
            emotion = pre_emotion
            console.log(pre_emotion)
        }

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 1000)
})

// リアルタイムに再生（ストリーミング）させるためにビデオタグに流し込む
media.then((stream) => {
    video.srcObject = stream;
});
