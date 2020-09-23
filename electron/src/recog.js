// var faceapi = require('./face-api.min.js')

Promise.all([
    // faceapi.nets.tinyFaceDetector.loadFromUri('/models'), //light model for face detection
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models'), //heavy model for face detection
    faceapi.nets.faceExpressionNet.loadFromUri('./models')// for emotion recognition
])


var video = document.getElementById("video");

const cameraDeviceIds = [/* { deviceId, label } */];

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
})

var media = navigator.mediaDevices.getUserMedia({
    video: { deviceId: cameraDeviceIds[3]},//get video
    audio: false,//do not get audio
});


// Event for get emotion
video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)

    recog_emotion = new Emotion()

    setInterval(async () => {
        //get face positions and probability of emotions
        const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options()).withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        let emotion = recog_emotion.get_emotion(detections)

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 1000)
})

// リアルタイムに再生（ストリーミング）させるためにビデオタグに流し込む
media.then((stream) => {
    video.srcObject = stream;
});
