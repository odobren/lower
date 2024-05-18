const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let stream;
const fileInput = document.getElementById('fileInput');
const filenameDisplay = document.getElementById('filenameDisplay');
const form = document.getElementById('form');
const progressBar = document.getElementById('progressBar');
const progressBarStatus = document.getElementById('progressBarStatus');
const fileList1 = document.getElementById('fileList1');
const loader1 = document.getElementById('loader1'); // Loader element

let files = [];

async function startS() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
    } catch (err) {
        console.error('Ошибка при доступе к камере:', err);
    }
}

function startFileInput() {
    fileInput.click();
}

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const fullName = document.getElementById('fullName').value;
        addFile(file, fullName);
        // Сразу отправляем форму после добавления файла
    }
});

function addFile(file, fullName) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);

    files.push({ file, fullName }); // Changed to push instead of reassigning the array
    renderFileList1();
}

function renderFileList1() {
    fileList1.innerHTML = '';
    files.forEach((item, index) => {
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');

        const fileName = document.createElement('span');
        fileName.classList.add('file-name');
        fileName.textContent = `Заявление ${item.fullName}`;
        fileItem.appendChild(fileName);

        const deleteButton = document.createElement('span');
        deleteButton.classList.add('delete-button');
        
        deleteButton.onclick = () => deleteFile(index);
        fileItem.appendChild(deleteButton);

        fileList1.appendChild(fileItem);
    });
}

function deleteFile(index) {
    files.splice(index, 1);
    renderFileList1();
}

function submit() {
    if (files.length === 0) {
        return;
    }

    const file = files[0].file;
    const fullName = files[0].fullName;
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageDataURL = canvas.toDataURL('image/jpeg');
            const filename = `Заявление ${fullName}`;
            uploadToDrive(imageDataURL, filename, fullName);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
}

function uploadToDrive(imageDataURL, filename, fullName) {
    loader1.style.display = 'block'; // Show loader
    const url = "https://script.google.com/macros/s/AKfycby_nWolfRgCK08OSMKYDre2QjFgEwb6lP4TpII3vkFrpfGerqVEehf-3civmmB_-807/exec";
    const data = {
        imageDataURL: imageDataURL,
        filename: filename,
        fullName: fullName
    };
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
    })
   .then(response => {
    if (response.ok) {
        // Hide loader on success
        loader1.style.display = 'none';
        console.log('Uploaded successfully');
        checkAllFilesUploaded(); // Вызов функции после успешной загрузки
    } else {
        throw new Error('Network response was not ok.');
    }
})



    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Hide loader on error
        loader1.style.display = 'none';
    });
}
