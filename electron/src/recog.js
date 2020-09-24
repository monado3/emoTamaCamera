//const { TouchBarColorPicker } = require("electron");
const electron = require("electron");
require("face-api.js")
const handpose = require("@tensorflow-models/handpose")
const tfjs_core = require("@tensorflow/tfjs-core")
const tfjs_converter = require("@tensorflow/tfjs-converter")


//const remote = electron.remote;
const obs_broker = require("./obs-broker.js");
const obs_b = new obs_broker

function sleep(waitMsec) {
    var startMsec = new Date();

    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
  }


faceapi.env.monkeyPatch({
    Canvas: HTMLCanvasElement,
    Image: HTMLImageElement,
    ImageData: ImageData,
    Video: HTMLVideoElement,
    createCanvasElement: () => document.createElement('canvas'),
    createImageElement: () => document.createElement('img')
})

// From Here: coded by Kazuaki Oomori
Promise.all([
    // faceapi.nets.tinyFaceDetector.loadFromUri('/models'), //light model for face detection
    faceapi.nets.ssdMobilenetv1.loadFromUri('../resources/models'), //heavy model for face detection
    faceapi.nets.faceExpressionNet.loadFromUri('../resources/models')// for emotion recognition
])
// To Here: coded by Kazuaki Oomori

// From Here: coded by Shohei Hisamitsu
const cameraDeviceIds = [/* { deviceId, label } */];

navigator.mediaDevices.enumerateDevices().then(function (mediaDevices) {
    for (let len = mediaDevices.length, i = 0; i < len; i++) {
        const item = mediaDevices[i];
        // カメラデバイスの場合、 kind プロパティには "videoinput" が入っている:
        if (item.kind === "videoinput") {
            const deviceId = item.deviceId;
            const label = item.label;
            // デバイスIDとラベル変数に保存
            cameraDeviceIds.push({ deviceId, label });
        }
    }
    // To Here: coded by Shohei Hisamitsu

    // From Here: coded by Kazuaki Oomori Shohei Hisamitsu
}).then(result => {

    sleep(10000);
    obs_b.connect();
    var video = document.getElementById("video");
    var cameraSelector = document.getElementById("camera-selector");


    var media = navigator.mediaDevices.getUserMedia({
        video: { deviceId: cameraDeviceIds[0].deviceId },//get video
        audio: false,//do not get audio
    });
    // Event for get emotion
    var testTimer
    function startTimer(displaySize, recog_emotion, recog_hand, canvas) {
        testTimer = setInterval(async () => {
            //get face positions and probability of emotions
            const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options()).withFaceExpressions()
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            const hand = await handpose.load()

            let emotion = recog_emotion.get_emotion(detections)

            obs_b.change(avatar, emotion)

            const hands = await hand.estimateHands(video)
            if (hands) {
                // check hand raised or not(true or false)
                const raise = recog_hand.check_raise(hands)
                console.log(raise)
                if (raise) {
                    obs_b.change_emotion("hand")
                }
            }

            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            // faceapi.draw.drawDetections(canvas, resizedDetections)
            // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        }, 1600)
    }

    function stopTimer() {
        //console.log("stop!")
        clearInterval(testTimer);
    }

    var recog_emotion = new Emotion()
    var recog_hand = new HandPose()

    video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video)
        document.body.append(canvas)
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)


        stopTimer();
        startTimer(displaySize, recog_emotion, recog_hand, canvas);
    })

    // リアルタイムに再生（ストリーミング）させるためにビデオタグに流し込む
    media.then((stream) => {
        video.srcObject = stream;
    });
    // To Here: Coded by Kazuaki Oomori Shohei Hisamitsu

    // From Here: Coded by Yuma Ito
    cameraDeviceIds.forEach(camera => {
        const camoption = document.createElement('option');
        camoption.value = camera.deviceId;
        camoption.textContent = camera.label;
        cameraSelector.append(camoption);
    })

    cameraSelector.addEventListener('change', (event) => {
        const cameraid = event.target.value;
        media = navigator.mediaDevices.getUserMedia({
            video: { deviceId: cameraid },//get video
            audio: false,//do not get audio
        }).then((stream) => {
            video.srcObject = stream;
        });
    })

})
