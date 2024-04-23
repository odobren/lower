function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec');
    xhr.upload.onloadstart = function() {
        document.getElementById('loader').style.display = 'block';
    };
    xhr.upload.onloadend = function() {
        document.getElementById('loader').style.display = 'none';
    };
    xhr.send(formData);
}
