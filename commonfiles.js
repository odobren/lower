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
   
    const loader = document.getElementById('loader');
    const fileList = document.getElementById('fileList');

    if (loader.style.display === 'none' && fileList.children.length > 0) {
        displaySuccessMessage();
    }
}

// Функция сохранения состояния загрузки в localStorage
function saveUploadStatus() {
    const uploadStatus = {
        
        loader: document.getElementById('loader').style.display,
        fileList: document.getElementById('fileList').children.length
    };
    localStorage.setItem('uploadStatus', JSON.stringify(uploadStatus));
}

// Функция для проверки состояния загрузки после включения экрана
function checkUploadStatusOnScreenOn() {
    const uploadStatus = JSON.parse(localStorage.getItem('uploadStatus'));
    if (uploadStatus) {
        if (uploadStatus.loader === 'none' && uploadStatus.fileList > 0) {
            displaySuccessMessage();
        }
    }
}

// Обработчик успешной отправки файлов
function handleUploadSuccess() {
    toggleControls(false); // Блокируем элементы управления перед началом загрузки

    uploadAllFiles()
        .then(() => {
            saveUploadStatus(); // Сохраняем состояние загрузки перед переходом на другую страницу
            displaySuccessMessage();
            toggleControls(true); // Разблокируем элементы управления после успешной загрузки
        })
        .catch(error => {
            console.error('Error uploading files:', error);
            toggleControls(true); // Разблокируем элементы управления в случае ошибки загрузки
        });
}

// Запуск проверки состояния загрузки при включении экрана
window.addEventListener('screenon', checkUploadStatusOnScreenOn);
