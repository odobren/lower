document.getElementById('uploadButton').addEventListener('click', function() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    if (file) {
        var formData = new FormData();
        formData.append('file', file);

        var loader = document.getElementById('loader');
        loader.style.display = 'block'; // Показываем анимацию загрузки

        fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Обновляем Google Sheets с полученной ссылкой на файл
            updateGoogleSheets(data);
            loader.style.display = 'none'; // Скрываем анимацию загрузки после завершения
        })
        .catch(error => {
            console.error('Error:', error);
            loader.style.display = 'none'; // Скрываем анимацию загрузки в случае ошибки
        });
    }
});

function updateGoogleSheets(fileUrl) {
    var spreadsheetId = '132llDQJRFBF2dtuX16mF5t4p3v-Z6zgmL36uYh2H1wU';
    var folderId = '1rVx0u2giWedD--e7slojv2617r8umpbO';
    // Допишите код для обновления Google Sheets с полученной ссылкой на файл
}
