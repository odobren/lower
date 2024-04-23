function uploadFiles() {
    const filesInput = document.getElementById('fileInput');
    const files = filesInput.files;

    if (files.length === 0) {
        alert('Please select at least one file.');
        return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }

    fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Files uploaded successfully.');
        console.log('Google Drive Links:');
        data.forEach(link => console.log(link));
    })
    .catch(error => console.error('Error uploading files:', error));
}
