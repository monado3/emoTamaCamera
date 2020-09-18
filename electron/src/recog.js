// var faceapi = require('./face-api.min.js')

Promise.all([
    // faceapi.nets.tinyFaceDetector.loadFromUri('/models'), //light model for face detection
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models'), //heavy model for face detection
    faceapi.nets.faceExpressionNet.loadFromUri('./models')// for emotion recognition
])


var video = document.getElementById("video");

var pre_emotion = 'neural'

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
