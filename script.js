function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    var loader = document.getElementById("loader");
    loader.style.display = "block";

    var formData = new FormData();
    formData.append('file', file);

    fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
        method: 'POST',
        body: file
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("resultMessage").textContent = data;
        document.getElementById("viewResultButton").style.display = "block";
        loader.style.display = "none";
    })
    .catch(error => {
        console.error('Error:', error);
        loader.style.display = "none";
    });
}
