document.getElementById("uploadButton").addEventListener("click", function() {
    var fileInput = document.getElementById("fileInput");
    var file = fileInput.files[0];
    if (file) {
        var formData = new FormData();
        formData.append("file", file);

        var loader = document.getElementById("loader");
        loader.style.display = "block"; // Показываем анимированную загрузку

        fetch("https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Обрабатываем ответ
            console.log("Response:", data);
            document.getElementById("resultMessage").textContent = data;
            document.getElementById("viewResultButton").style.display = "block"; // Показываем кнопку "Посмотреть результат"
            loader.style.display = "none"; // Скрываем анимированную загрузку после завершения
        })
        .catch(error => {
            // Обрабатываем ошибку
            console.error("Error:", error);
            loader.style.display = "none"; // Скрываем анимированную загрузку в случае ошибки
        });
    }
});
