function select_cam() {
    const cameraDeviceIds = [/* { deviceId, label } */];

    navigator.mediaDevices.enumerateDevices().then(function(mediaDevices) {
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
        console.log("cameras:"+JSON.stringify(cameraDeviceIds));
        console.log("deviceID:"+cameraDeviceIds[3].deviceId);
        return cameraDeviceIds;
    })
}