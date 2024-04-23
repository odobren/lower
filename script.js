function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    
    if (!file) {
        alert("Please select a file.");
        return;
    }

    var formData = new FormData();
    formData.append("file", file);

    var loader = document.getElementById('loader');
    loader.style.display = "block";

    fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        alert('File uploaded successfully!');
        loader.style.display = "none";
    })
    .catch(error => {
        alert('There was a problem with your upload. Please try again later.');
        loader.style.display = "none";
        console.error('There was an error!', error);
    });
}
