function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);

    var loader = document.getElementById('loader');
    loader.style.display = 'block';

    fetch('https://script.google.com/macros/s/ТВОЙ_ИД_СКРИПТА/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log('File uploaded successfully:', data);
        loader.style.display = 'none';
    })
    .catch(error => {
        console.error('Error uploading file:', error);
        loader.style.display = 'none';
    });
}
