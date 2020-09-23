// author monado3
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { exec } = require('child_process');


class OBSSetUpper {
    basescpath = String.raw`../resources/conf/base_emoTamaCamera.json`;
    gifbasedir = String.raw`../resources/images/characters/*.gif`;

    home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]

    scpath = this.home + String.raw`/AppData/Roaming/obs-studio/basic/scenes/emoTamaCamera.json`;
    gifinstalldir = this.home + String.raw`/.emoTamaCamera/characters`;


    static isInstalled() {
        return fs.existsSync(this.gifinstalldir);
    }
    constructor() {
        this.basesc = JSON.parse(fs.readFileSync(this.basescpath));
        this.sc = null;
    }
    #convert() {
        var sc = this.basesc;
        sc.sources.forEach((src) => {
            var basename = src.settings.file;
            if (basename) {
                var fullpath = path.join(this.gifinstalldir, basename);
                src.settings.file = fullpath.replace(/\\/g, "/");
            }
        })
        this.sc = sc;
    }
    install() {
        this.#convert();

        fs.writeFileSync(this.scpath, JSON.stringify(this.sc, null, "\t"));

        fs.mkdirSync(this.gifinstalldir, { recursive: true }, (err) => {
            if (err) throw err;
        })
        glob(this.gifbasedir, (err, files) => {
            files.forEach(file => {
                var gif = fs.readFileSync(file);
                var savepath = path.join(this.gifinstalldir, path.basename(file));
                fs.writeFileSync(savepath, gif);
            })
        });
    }
}

module.exports = OBSSetUpper;
