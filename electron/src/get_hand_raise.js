// author: Kazuaki Oomori
class HandPose {
    constructor() {
        this.v1_x = 0
        this.v1_y = 0
        this.v1_z = 0
        this.v2_x = 0
        this.v2_y = 0
        this.v2_z = 0
    }
    getLength(x, y, z) {
        return x * x + y * y + z * z
    }
    getAngle(finger) {
        this.v1_x = finger[0][0] - finger[1][0]
        this.v1_y = finger[0][1] - finger[1][1]
        this.v1_z = finger[0][2] - finger[1][2]

        this.v2_x = finger[2][0] - finger[1][0]
        this.v2_y = finger[2][1] - finger[1][1]
        this.v2_z = finger[2][2] - finger[1][2]

        var v1_length = this.getLength(this.v1_x, this.v1_y, this.v1_z)
        var v2_length = this.getLength(this.v2_x, this.v2_y, this.v2_z)

        var cos = (this.v1_x * this.v2_x + this.v1_y * this.v2_y + this.v1_z * this.v2_z) / (Math.sqrt(v1_length) * Math.sqrt(v2_length))

        return Math.acos(cos) / (Math.PI / 180)

    }
    check_raise(hands) {
        for (let i = 0; i < hands.length; i++) {
            const index = hands[i].annotations.indexFinger
            const middle = hands[i].annotations.middleFinger
            const pinky = hands[i].annotations.pinky
            const ring = hands[i].annotations.ringFinger
            const thumb = hands[i].annotations.thumb
            const index_angle = this.getAngle(index)
            const middle_angle = this.getAngle(middle)
            const pinky_angle = this.getAngle(pinky)
            const ring_angle = this.getAngle(ring)
            const thumb_angle = this.getAngle(thumb)

            if ((index_angle > 150) && (middle_angle > 150) && (pinky_angle > 150) && (ring_angle > 150) && (thumb_angle > 150)) {
                return true
            }
        }
        return false

    }
}
