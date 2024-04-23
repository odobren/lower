function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // Показываем анимированную загрузку

    fetch('https://script.google.com/macros/s/ВАШ_ИД_СКРИПТА/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const fileId = data.fileId;
        const fileUrl = `https://drive.google.com/uc?id=${fileId}`;

        // Копирование ссылки в Google Sheets
        copyLinkToGoogleSheets(fileUrl);

        loader.style.display = 'none'; // Скрываем анимированную загрузку
    })
    .catch(error => {
        console.error('Error:', error);
        loader.style.display = 'none'; // Скрываем анимированную загрузку в случае ошибки
    });
}

function copyLinkToGoogleSheets(fileUrl) {
    const spreadsheetId = 'ВАШ_ID_ТАБЛИЦЫ';
    const sheetName = 'Sheet1';
    const range = 'A1'; // Куда скопировать ссылку

    const valueRangeBody = {
        'values': [
            [fileUrl]
        ]
    };

    const accessToken = 'ВАШ_ACCESS_TOKEN'; // Получите токен авторизации для доступа к Google Shee
