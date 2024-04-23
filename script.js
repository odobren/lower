function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const loader = document.getElementById('loader');
    loader.style.display = "block"; // Показываем анимированную загрузку

    fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("resultMessage").textContent = data;

        // Получаем ссылку на файл на Google Диске
        const fileUrl = data.trim(); // Предполагается, что скрипт возвращает только ссылку на файл
        // Далее вы можете использовать эту ссылку для передачи ее в Google Sheets
        appendToFileToGoogleSheets(fileUrl);

        // Останавливаем анимацию загрузки и показываем кнопку "Посмотреть результат"
        document.getElementById("viewResultButton").style.display = "block";
        loader.style.display = "none";
    })
    .catch(error => {
        console.error('Error:', error);
        loader.style.display = "none"; // Скрываем анимированную загрузку в случае ошибки
    });
}

function appendToFileToGoogleSheets(fileUrl) {
    // Код для добавления ссылки на файл в Google Sheets
    // Это может потребовать использования Google Sheets API или других методов, 
    // в зависимости от ваших требований и настроек вашего проекта.
}
