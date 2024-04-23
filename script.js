function uploadFiles() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

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
    .then(response => {
        if (response.ok) {
            alert('Files uploaded successfully!');
        } else {
            alert('Failed to upload files.');
        }
    })
    .catch(error => {
        console.error('Error uploading files:', error);
        alert('Error uploading files. Please try again later.');
    });
}
