function displaySuccessMessage() {
    alert('Обращение отправлено!');
    window.location.href = 'ura.html'; // Перенаправление на ura.html после успешной загрузки файлов
}

function toggleControls(enable) {
    const buttons = document.querySelectorAll('button');
    const inputs = document.querySelectorAll('input');
    buttons.forEach(button => {
        button.disabled = !enable;
    });
    inputs.forEach(input => {
        input.disabled = !enable;
    });
}

function checkAllFilesUploaded() {
    const loader1 = document.getElementById('loader1');
    const fileList1 = document.getElementById('fileList1');
    const loader = document.getElementById('loader');
    const fileList = document.getElementById('fileList');

    if (loader1.style.display === 'none' && fileList1.children.length > 0 &&
        loader.style.display === 'none' && fileList.children.length > 0) {
        displaySuccessMessage();
    }
}

// Промис, который будет выполняться после загрузки всех файлов и возвращать результат
function uploadAllFiles() {
    toggleControls(false); // Блокируем элементы управления перед началом загрузки

    const promise1 = new Promise((resolve, reject) => {
        const loader1 = document.getElementById('loader1');
        const fileList1 = document.getElementById('fileList1');

        if (loader1.style.display === 'none' && fileList1.children.length > 0) {
            resolve();
        } else {
            reject();
        }
    });

    const promise2 = new Promise((resolve, reject) => {
        const loader = document.getElementById('loader');
        const fileList = document.getElementById('fileList');

        if (loader.style.display === 'none' && fileList.children.length > 0) {
            resolve();
        } else {
            reject();
        }
    });

    return Promise.all([promise1, promise2]);
}

// Обработчик успешной отправки файлов
function handleUploadSuccess() {
    uploadAllFiles()
        .then(() => {
            displaySuccessMessage();
            toggleControls(true); // Разблокируем элементы управления после успешной загрузки
        })
        .catch(error => {
            console.error('Error uploading files:', error);
            toggleControls(true); // Разблокируем элементы управления в случае ошибки загрузки
        });
}
