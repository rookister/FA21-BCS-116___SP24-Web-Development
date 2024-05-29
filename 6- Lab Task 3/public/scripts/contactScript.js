$(document).ready(function() {
    $('#contactForm').submit(function(event) {
      event.preventDefault();
      var fName = $('#fName').val();
      var lName = $('#lName').val();
      var email = $('#email').val();
      var sub = $('#sub').val();
      var mes = $('#mes').val();
      
      if (fName === '' || lName === '' || email === '' || sub === '' || mes === '') {
        alert('Please fill out all required fields.');
      } else {
        $('#successModal').modal('show');

        setTimeout(function() {
          $('#successModal').modal('hide');
          $('#fName').val('');
          $('#lName').val('');
          $('#email').val('');
          $('#sub').val('');
          $('#mes').val('');
        }, 2000);
      }
    });
});
