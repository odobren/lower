document.getElementById('uploadButton').addEventListener('click', uploadFile);

function uploadFile() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];

  if (file) {
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

    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status == 200) {
          alert('File uploaded successfully!');
        } else {
          alert('Error uploading file. Please try again.');
        }
      }
    };

    xhr.send(formData);
  } else {
    alert('Please select a file to upload.');
  }
}
