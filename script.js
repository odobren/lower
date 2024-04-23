function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Получаем ссылку на файл из ответа
        const fileLink = data;

        // Копируем ссылку на файл в буфер обмена
        navigator.clipboard.writeText(fileLink)
            .then(() => {
                // Сообщение о успешной загрузке и копировании ссылки
                document.getElementById('resultMessage').textContent = 'File uploaded successfully. Link copied to clipboard.';
            })
            .catch(err => {
                console.error('Failed to copy link: ', err);
                document.getElementById('resultMessage').textContent = 'File uploaded successfully, but failed to copy link to clipboard.';
            });

        loader.style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('resultMessage').textContent = 'An error occurred while uploading the file.';
        loader.style.display = 'none';
    });
}
