document.getElementById('uploadButton').addEventListener('click', function() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    if (file) {
        var formData = new FormData();
        formData.append('file', file);

        var loader = document.getElementById('loader');
        loader.style.display = 'block'; // Show loader animation

        fetch('https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById('resultMessage').textContent = 'File uploaded successfully. Link: ' + data;
            loader.style.display = 'none'; // Hide loader animation
            saveLinkToGoogleSheet(data);
        })
        .catch(error => {
            console.error('Error:', error);
            loader.style.display = 'none'; // Hide loader animation
            document.getElementById('resultMessage').textContent = 'An error occurred while uploading the file.';
        });
    } else {
        alert('Please select a file to upload.');
    }
});

function saveLinkToGoogleSheet(link) {
    var spreadsheetId = '132llDQJRFBF2dtuX16mF5t4p3v-Z6zgmL36uYh2H1wU';
    var url = 'https://script.google.com/macros/s/AKfycbxqg9ZQYGJqKJOkSzzHefZcMoxE_hWU82rND8GRWbb5K03E0U_4/exec';
    var payload = {
        link: link
    };

    fetch(url + '?spreadsheetId=' + spreadsheetId, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Link saved to Google Sheets.');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
