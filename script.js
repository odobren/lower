function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);
  
  const loader = document.getElementById('loader');
  loader.style.display = "block";
  
  fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("resultMessage").textContent = data.message;
    document.getElementById("viewResultButton").href = data.fileUrl;
    document.getElementById("viewResultButton").style.display = "block";
    loader.style.display = "none";
  })
  .catch(error => {
    console.error('Error:', error);
    loader.style.display = "none";
  });
}
