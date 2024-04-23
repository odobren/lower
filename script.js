$(document).ready(function() {
  $('#uploadForm').submit(function(e) {
    e.preventDefault();

    var formData = new FormData();
    var files = $('#fileInput')[0].files;

    for (var i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }

    $('#loading').show();

    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbw5U19DJy6Plkuuf1bY6OQZktK-iT4bBv_4rSM5KBhCOCERXsSkzMVWLXpU0YEsME3f/exec',
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        $('#loading').hide();
        $('#message').text('Файлы успешно загружены!');
        $('#fileInput').val(''); // Clear the file input
      },
      error: function(xhr, status, error) {
        console.error(xhr.responseText);
        $('#loading').hide();
        $('#message').text('Произошла ошибка при загрузке файлов.');
      }
    });
  });
});
