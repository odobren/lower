function uploadFiles() {
    var files = document.getElementById('fileInput').files;
    var formData = new FormData();
    var xhr = new XMLHttpRequest();
    
    for (var i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById('loader').style.display = 'none';
                alert('Files uploaded successfully!');
            } else {
                document.getElementById('loader').style.display = 'none';
                alert('Error uploading files!');
            }
        }
    };

    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec');
    xhr.setRequestHeader('Authorization', 'Bearer ' + 'Your_Access_Token'); // Replace 'Your_Access_Token' with your access token if required
    xhr.send(formData);

    document.getElementById('loader').style.display = 'block';
}
