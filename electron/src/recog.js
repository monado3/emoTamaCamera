// From Here: coded by Kazuaki Oomori
Promise.all([
    // faceapi.nets.tinyFaceDetector.loadFromUri('/models'), //light model for face detection
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models'), //heavy model for face detection
    faceapi.nets.faceExpressionNet.loadFromUri('./models')// for emotion recognition
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

    // From Here: coded by Kazuaki Oomori
}).then(result => {

    var video = document.getElementById("video");
    var video2 = document.getElementById("video2");
    var cameraSelector = document.getElementById("camera-selector");


    var media = navigator.mediaDevices.getUserMedia({
        video: { deviceId: cameraDeviceIds[0].deviceId },//get video
        audio: false,//do not get audio
    });
    // Event for get emotion
    video.addEventListener('play', () => {
        // const video=document.getElementById('video')
        const video_bbox=document.getElementById('video-bbox')
        video_bbox.removeChild(document.getElementById('face-detector'))
        const canvas = faceapi.createCanvasFromMedia(video)
        canvas.id='face-detector'
        canvas.style.position='absolute'
        canvas.style.zIndex=1;
        canvas.style.left='0px'
        canvas.style.top='0px'
        canvas.style.height=video.height+'px'
        canvas.style.width=video.width+'px'
        video_bbox.appendChild(canvas);

        const video_bbox2=document.getElementById('video-bbox2')
        video_bbox2.removeChild(document.getElementById('face-detector2'))
        const canvas2 = faceapi.createCanvasFromMedia(video)
        canvas2.id='face-detector'
        canvas2.style.position='absolute'
        canvas2.style.zIndex=1;
        canvas2.style.left='0px'
        canvas2.style.top='0px'
        canvas2.style.height=video.height+'px'
        canvas2.style.width=video.width+'px'
        video_bbox2.appendChild(canvas2);

        // document.body.append(canvas);
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)
        faceapi.matchDimensions(canvas2, displaySize)

        var recog_emotion = new Emotion()
        var recog_hand = new HandPose()

        setInterval(async () => {
            //get face positions and probability of emotions
            const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options()).withFaceExpressions()
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            const hand = await handpose.load()

            let emotion = recog_emotion.get_emotion(detections)

            const hands = await hand.estimateHands(video)
            if (hands) {
                // check hand raised or not(true or false)
                const raise = recog_hand.check_raise(hands)
                console.log(raise)
            }

            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            faceapi.draw.drawDetections(canvas, resizedDetections)
            canvas2.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            faceapi.draw.drawDetections(canvas2, resizedDetections)
            faceapi.draw.drawFaceExpressions(canvas2, resizedDetections)
        }, 1600)
    })

    // リアルタイムに再生（ストリーミング）させるためにビデオタグに流し込む
    media.then((stream) => {
        video.srcObject = stream;
        video2.srcObject = stream;
    });
    // To Here: Coded by Kazuaki Oomori

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
            video2.srcObject = stream;
        });
    })

})
