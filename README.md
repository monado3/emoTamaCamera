# emoTamaCamera

<!-- ![build](https://img.shields.io/badge/build-pass-green.svg?style=flat) -->
<!-- ![version](https://img.shields.io/badge/version-v1.0-blue.svg?style=flat) -->
![platform](https://img.shields.io/badge/platform-win-lightgrey.svg?style=flat)
![activity](https://img.shields.io/badge/activity-under_development-red.svg?style=flat)
![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

<table>
<thead>
  <tr>
    <th colspan="2">Item</th>
    <th>Screenshot</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td colspan="2">GUI</td>
    <td><img width="180" src="https://user-images.githubusercontent.com/36162674/94247385-01c34200-ff58-11ea-943a-e76ea7011b61.png"></img></td>
  </tr>
  <tr>
    <td rowspan="7">Virtual Camera Output</td>
    <td>happy</td>
    <td><img width="180" src="./electron/resources/images/characters/cat_happy.gif"></img></td>
  </tr>
  <tr>
    <td>sad</td>
    <td><img width="180" src="./electron/resources/images/characters/glasses_sad.gif"></img></td>
  </tr>
  <tr>
    <td>surprised</td>
    <td><img width="180" src="./electron/resources/images/characters/normal_surprised.gif"></img></td>
  </tr>
  <tr>
    <td>fearful/disgusted</td>
    <td><img width="180" src="./electron/resources/images/characters/ribbon_fearful.gif"></img></td>
  </tr>
  <tr>
    <td>angry</td>
    <td><img width="180" src="./electron/resources/images/characters/tie_angry.gif"></img></td>
  </tr>
  <tr>
    <td>neutral</td>
    <td><img width="180" src="./electron/resources/images/characters/normal_neutral.gif"></img></td>
  </tr>
  <tr>
    <td>hand</td>
    <td><img width="180" src="./electron/resources/images/characters/hand.gif"></img></td>
  </tr>
</tbody>
</table>

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

# Note
1. If loading process continues more than 15 seconds, maybe something wrong with oppening obs websocket. Please close the window and try it again.
1. Do not minimize the app window. It is reported that app will stop running for some reasons.
1. If obs is already runnning on background, popup window will apear when you start app. In most cases, press "cancel" is enough. If it doesn't work, kill the background obs process and try it again.
