function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('File uploaded successfully! Google Drive link: ' + data.driveLink);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error uploading file.');
    });
}
