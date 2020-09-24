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

# Installation
1. Install `OBS-Studio`
1. Install OBS plugins
    1. Install [obs-virtual-cam v2.0.4](https://github.com/CatxFish/obs-virtual-cam/releases)
        1. Set Up virtual camera on OBS-studio
    1. Install [obs-websocket 4.8](https://github.com/Palakis/obs-websocket/releases)
        1. Set Up web server on OBS-studio
1. npm install at `electon`


# Setup
OBS Studio->Tool->VirtualCam->AutoStart(check)

# Usage
```bash
~\TeamE\electron
npm install
cd electron/src
..\node_modules\.bin\electron .\main.js

