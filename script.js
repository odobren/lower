const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
const loadingContainer = document.getElementById('loading-container');

uploadButton.addEventListener('click', () => {
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Пожалуйста, выберите файл для загрузки.');
        return;
    }

    loadingContainer.style.display = 'block';

    const formData = new FormData();
    for (const file of files) {
        formData.append('file', file);
    }

    fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            loadingContainer.style.display = 'none';
            alert('Файлы успешно загружены!');
        })
        .catch(error => {
            loadingContainer.style.display = 'none';
            console.error(error);
            alert('Ошибка загрузки файла.');
        });
});
