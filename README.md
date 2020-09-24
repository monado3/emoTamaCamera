# emoTamaCamera

<!-- ![build](https://img.shields.io/badge/build-pass-green.svg?style=flat) -->
<!-- ![version](https://img.shields.io/badge/version-v1.0-blue.svg?style=flat) -->
![platform](https://img.shields.io/badge/platform-win-lightgrey.svg?style=flat)
![activity](https://img.shields.io/badge/activity-under_development-red.svg?style=flat)
![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# Requirements
- A Web Camera
- [OBS Studio (GUI Software)](https://obsproject.com/ja/download)
- OBS plugins
    - [obs-virtual-cam](https://github.com/CatxFish/obs-virtual-cam/releases)
    - [obs-websocket](https://github.com/Palakis/obs-websocket/releases)
- npm

# Installation
1. Install `OBS-Studio`
1. Install OBS plugins
    1. Install [obs-virtual-cam v2.0.4](https://github.com/CatxFish/obs-virtual-cam/releases)
        1. Set Up virtual camera on OBS-studio
            1. Launch OBS Studio
            1. Open the VirtualCam Settings in Tool at the top bar
            1. check the button of `AutoStart`
            1. click `start` button
            1. close OBS Studio
    1. Install [obs-websocket 4.8](https://github.com/Palakis/obs-websocket/releases)
1. change directory for the installation of this app
1. `$ git clone https://github.com/shortintern2020-C-cryptograph/TeamE.git`
1. `$ cd TeamE/electron`
1. `$ npm install`

# Usage
```
$ cd path/to/this/app
$ cd electron/src
$ ../node_modules/.bin/electron ./main.js
```

