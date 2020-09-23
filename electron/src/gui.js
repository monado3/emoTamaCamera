// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const bt1 = document.getElementById('bt1');
const bt2 = document.getElementById('bt2');
const bt3 = document.getElementById('bt3');
const bt4 = document.getElementById('bt4');
const bt5 = document.getElementById('bt5');
const bt_list = [bt1, bt2, bt3, bt4, bt5];
const character = document.getElementById('character');

function changeButtonColor(index) {
    bt_list.forEach((bt, idx) => {
        bt.style.backgroundColor = 'rgb(187, 164, 64)';
        if (idx === index) { bt.style.backgroundColor = 'rgb(187, 164, 64)'; }
        else { bt.style.backgroundColor = '#51587b'; }
    });
}

bt1.addEventListener('click', () => {
    character.src = '../resources/images/characters/normal_neutral.gif';
    changeButtonColor(0);
});
bt2.addEventListener('click', () => {
    character.src = '../resources/images/characters/cat_neutral.gif';
    changeButtonColor(1);

});
bt3.addEventListener('click', () => {
    character.src = '../resources/images/characters/glasses_neutral.gif';
    changeButtonColor(2);
});
bt4.addEventListener('click', () => {
    character.src = '../resources/images/characters/ribbon_neutral.gif';
    changeButtonColor(3);
});
bt5.addEventListener('click', () => {
    character.src = '../resources/images/characters/tie_neutral.gif';
    changeButtonColor(4);
});
// navigator.mediaDevices.enumerateDevices()
// .then(function(devices) {
//     console.log(devices);
//     devices.forEach(function(device) {
//       console.log(device.kind + ": " + device.label +
//                   " id = " + device.deviceId);
//     });
// });

// console.log(navigator.mediaDevices);
// navigator.mediaDevices.getUserMedia()
// .then(function(stream) {
//     console.log(stream);
// });

//coded by Yuma Ito
