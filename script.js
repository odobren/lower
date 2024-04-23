function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);

    var loading = document.getElementById('loading');
    loading.style.display = 'block'; // Показываем анимацию загрузки

    fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('File uploaded successfully:', data);
        loading.style.display = 'none'; // Скрываем анимацию после завершения загрузки
    })
    .catch(error => {
        console.error('Error uploading file:', error);
        loading.style.display = 'none'; // Скрываем анимацию в случае ошибки
    });
}
