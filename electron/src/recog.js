// var faceapi = require('./face-api.min.js')

Promise.all([
    // faceapi.nets.tinyFaceDetector.loadFromUri('/models'), //light model for face detection
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models'), //heavy model for face detection
    faceapi.nets.faceExpressionNet.loadFromUri('./models')// for emotion recognition
])


var video = document.getElementById("video");


var media = navigator.mediaDevices.getUserMedia({
    video: true,//get video
    audio: false,//do not get audio
});


// Event for get emotion
video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)

    var recog_emotion = new Emotion()
    var recog_hand = new HandPose()

    setInterval(async () => {
        //get face positions and probability of emotions
        const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options()).withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        const hand = await handpose.load()

        let emotion = recog_emotion.get_emotion(detections)

        const hands = await hand.estimateHands(video)
        if(hands) {
            // check hand raised or not(true or false)
            const raise = recog_hand.check_raise(hands)
            console.log(raise)
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
