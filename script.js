document.getElementById('uploadButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // Show loader animation during upload

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.text();
        document.getElementById("resultMessage").textContent = data;
        document.getElementById("viewResultButton").style.display = "block"; // Show "View Result" button
    } catch (error) {
        console.error('Error:', error);
    } finally {
        loader.style.display = 'none'; // Hide loader animation after upload completes or in case of error
    }
});
