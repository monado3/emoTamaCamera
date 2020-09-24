// author: Kazuaki Oomori
const faceapi = require("face-api.js")

Promise.all([
    // faceapi.nets.tinyFaceDetector.loadFromUri('/models'), //light model for face detection
    faceapi.nets.ssdMobilenetv1.loadFromUri('../resources/models'), //heavy model for face detection
    faceapi.nets.faceExpressionNet.loadFromUri('../resources/models')// for emotion recognition
])


class Emotion {
    constructor() {
        // count: the number of times when there are no people
        this.count = 0
        this.pre_emotion = 'neural'
    }
    // get the most probable key
    maxIndex(expressions) {
        let indexs = Object.keys(expressions)
        let index = indexs[0]
        let value = -Infinity
        for (let i = 0, l = indexs.length; i < l; i++) {
            if (value < expressions[indexs[i]]) {
                value = expressions[indexs[i]]
                index = indexs[i]
            }
        }
        return index
    }
    get_emotion(detections) {
        let emotion
        if (detections[0]) {
            // if detect people
            this.count = 0
            emotion = this.maxIndex(detections[0]["expressions"])
            // console.log(emotion)

            // threshold of emotion 
            if (detections[0]["expressions"][emotion] < 0.8) {
                // console.log("pre_emotion")
                emotion = this.pre_emotion
            }

            this.pre_emotion = emotion
        } else {
            // if don't detect people
            this.count += 1
            if (this.count > 5) {
                // the case that cannot detect more than 5 times in a row
                // console.log("absent")
                return "absent"
            }
            // console.log("pre_emotion")
            emotion = this.pre_emotion
            // console.log(this.pre_emotion)
        }

        return emotion
    }
}


