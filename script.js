document.getElementById('uploadButton').addEventListener('click', function() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);

    var loader = document.getElementById('loader');
    loader.style.display = 'block';

    fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('resultMessage').textContent = data;
        document.getElementById('viewResultButton').style.display = 'block';
        loader.style.display = 'none';
        // Добавим код для обновления Google Sheets с ссылкой на загруженный файл
        var fileId = data.trim(); // Получаем ID загруженного файла
        updateGoogleSheets(fileId); // Обновляем Google Sheets
    })
    .catch(error => {
        console.error('Error:', error);
        loader.style.display = 'none';
    });
});

function updateGoogleSheets(fileId) {
    var folderId = '1rVx0u2giWedD--e7slojv2617r8umpbO';
    var sheetId = '132llDQJRFBF2dtuX16mF5t4p3v-Z6zgmL36uYh2H1wU';
    var url = 'https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec';

    var data = {
        fileId: fileId,
        folderId: folderId,
        sheetId: sheetId
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('Google Sheets updated:', data);
    })
    .catch(error => {
        console.error('Error updating Google Sheets:', error);
    });
}
