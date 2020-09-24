// author monado3
const path = require('path');
const { exec } = require('child_process');
const OBSWebSocket = require('obs-websocket-js');

class OBSBroker {

    obsexe = String.raw`C:\PROGRA~1\obs-studio\bin\64bit\obs64.exe`;
    // obsexe = String.raw`D:\download\OBS\obs-studio\bin\64bit\obs64.exe`;
    obsdir = path.dirname(this.obsexe);

    constructor() {
        this.sock = new OBSWebSocket();
        this.avatar = 'ball';
        this.emotion = 'neutral';
        this.herepath = process.cwd();
    }
    launch() {
        process.chdir(this.obsdir);
        exec(`${this.obsexe} --collection "emoTamaCamera" --minimize-to-tray`);
        process.chdir(this.herepath);
    }
    connect() {
        this.sock.connect({ address: 'localhost:4444' })
            // this.sock.connect({ address: '172.27.224.1:4444' }) // for monado3's wsl
            .then(() => {
                console.log('connected to obs!');
                this.sock.send('SetCurrentScene', {
                    'scene-name': 'absent'
                });
            })
            .catch(err => { // Promise convention dicates you have a catch on every chain.
                console.log(err);
                throw new Error("can't connect to obs");
            });
    }
    change_avatar(avatar) {
        var sname = avatar + '_' + this.emotion;
        this.sock.send('SetCurrentScene', {
            'scene-name': sname
        });
        this.avatar = avatar;
    }
    change_emotion(emotion) {
        var sname;
        if (emotion === 'absent') {
            sname = 'absent';
        } else if (emotion === 'hand') {
            sname = 'hand';
        }
        else {
            sname = this.avatar + '_' + emotion;
        }
        this.sock.send('SetCurrentScene', {
            'scene-name': sname
        });
        this.emotion = emotion;
    }
    change(avatar, emotion) {
        var sname;
        if (emotion === 'absent') {
            sname = 'absent';
        } else if (emotion === 'hand') {
            sname = 'hand';
        } else {
            sname = avatar + '_' + emotion;
        }
        this.sock.send('SetCurrentScene', {
            'scene-name': sname
        });
        this.avatar = avatar;
        this.emotion = emotion;
    }
    disconnect() {
        this.sock.disconnect();
    }
    close (){
        exec(`taskkill /im obs64.exe`);
    }
}

module.exports = OBSBroker;
