const createButton = document.querySelector("#createroom");
const videoCont = document.querySelector('.video-self');
const codeCont = document.querySelector('#roomcode');
const joinBut = document.querySelector('#joinroom');
const mic = document.querySelector('#mic');
const cam = document.querySelector('#webcam');

let micAllowed = 1;
let camAllowed = 1;

let mediaConstraints = { video: true, audio: true };

navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then(localstream => {
        videoCont.srcObject = localstream;
    })
    .catch(error => {
        console.error("Error accessing media devices:", error);
    });


function uuidv4() {
    return 'xxyxyxxyx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const createroomtext = 'Creating Room...';

createButton.addEventListener('click', (e) => {
    e.preventDefault();
    createButton.disabled = true;
    createButton.innerHTML = 'Creating Room';
    createButton.classList = 'createroom-clicked';

    setInterval(() => {
        if (createButton.innerHTML < createroomtext) {
            createButton.innerHTML = createroomtext.substring(0, createButton.innerHTML.length + 1);
        }
        else {
            createButton.innerHTML = createroomtext.substring(0, createButton.innerHTML.length - 3);
        }
    }, 500);

    //const name = nameField.value;
    location.href = `/room.html?room=${uuidv4()}`;
});

joinBut.addEventListener('click', (e) => {
    e.preventDefault();
    if (codeCont.value.trim() == "") {
        codeCont.classList.add('roomcode-error');
        return;
    }
    const code = codeCont.value;
    location.href = `/room.html?room=${code}`;
})

codeCont.addEventListener('change', (e) => {
    e.preventDefault();
    if (codeCont.value.trim() !== "") {
        codeCont.classList.remove('roomcode-error');
        return;
    }
})

cam.addEventListener('click', () => {
    camAllowed = !camAllowed; // Toggle camAllowed flag

    mediaConstraints.video = camAllowed;
    
    navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then(localstream => {
            videoCont.srcObject = localstream;
        })
        .catch(error => {
            console.error("Error toggling camera:", error);
        });

    cam.classList.toggle("nodevice");
    cam.innerHTML = camAllowed ? `<i class="fas fa-video"></i>` : `<i class="fas fa-video-slash"></i>`;
});

mic.addEventListener('click', () => {
    micAllowed = !micAllowed; // Toggle micAllowed flag

    mediaConstraints.audio = micAllowed;

    navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then(localstream => {
            videoCont.srcObject = localstream;
        })
        .catch(error => {
            console.error("Error toggling microphone:", error);
        });

    mic.classList.toggle("nodevice");
    mic.innerHTML = micAllowed ? `<i class="fas fa-microphone"></i>` : `<i class="fas fa-microphone-slash"></i>`;
});
