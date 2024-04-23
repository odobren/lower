const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const loadingContainer = document.getElementById('loadingContainer');

uploadButton.addEventListener('click', () => {
    const files = fileInput.files;

    if (files.length > 0) {
        loadingContainer.style.display = 'block';

        const formData = new FormData();

        for (const file of files) {
            formData.append('file', file);
        }

        fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            loadingContainer.style.display = 'none';
        })
        .catch(error => {
            console.error(error);
            loadingContainer.style.display = 'none';
        });
    }
});
