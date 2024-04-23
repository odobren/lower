function uploadFile() {
    var fileInput = document.getElementById("fileInput");
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append("file", file);

    var loader = document.getElementById("loader");
    loader.style.display = "block"; // Показываем анимацию загрузки

    fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        var fileId = data; // Получаем ID загруженного файла
        var fileUrl = `https://drive.google.com/uc?export=view&id=${fileId}`; // Формируем ссылку на файл

        // Передаем ссылку на файл в Google Sheets
        google.script.run.saveFileUrlToSheet(fileUrl);

        document.getElementById("resultMessage").textContent = "File uploaded successfully!";
        document.getElementById("viewResultButton").style.display = "block"; // Показываем кнопку "Посмотреть результат"
        loader.style.display = "none"; // Скрываем анимацию загрузки после завершения
    })
    .catch(error => {
        console.error('Error:', error);
        loader.style.display = "none"; // Скрываем анимацию загрузки в случае ошибки
    });
}
