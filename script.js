function uploadFile() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];

  if (!file) {
    alert('Please select a file.');
    return;
  }

  var formData = new FormData();
  formData.append('file', file);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec');
  xhr.upload.onprogress = function(event) {
    if (event.lengthComputable) {
      var percentComplete = (event.loaded / event.total) * 100;
      console.log(percentComplete);
    }
  };

  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('File uploaded successfully!');
      alert('File uploaded successfully!');
    } else {
      console.error('File upload failed!');
      alert('File upload failed!');
    }
  };

  xhr.onerror = function() {
    console.error('File upload failed!');
    alert('File upload failed!');
  };

  document.getElementById('loading').style.display = 'block';
  xhr.send(formData);
}
