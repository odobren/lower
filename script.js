$(document).ready(function () {
    $('#uploadBtn').click(function () {
        var fileInput = document.getElementById('fileInput');
        var file = fileInput.files[0];
        if (!file) {
            alert('Please select a file.');
            return;
        }
        var formData = new FormData();
        formData.append('file', file);

        $('#loader').show(); // Show loader animation

        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                $('#loader').hide(); // Hide loader animation
                alert('File uploaded successfully!');
                console.log(response);
            },
            error: function (jqXHR, textStatus, errorMessage) {
                $('#loader').hide(); // Hide loader animation
                console.log(errorMessage); // Log any errors
                alert('Error uploading file. Please try again.');
            }
        });
    });
});
