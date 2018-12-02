$( document ).ready(function() {
  // sign up
  $('.medico-sign-up-button').click(function() {
    $('.medico-sign-up').addClass('is-active');
  });

  $('.medico-sign-up .close-sign-up').click(function() {
    $('.medico-sign-up').removeClass('is-active');
  });

  $('.medico-sign-up form').submit(function(event) {
    event.preventDefault();

    $.ajax({
        type: 'POST',
        url: '/auth/register',
        data: {
          username: event.target.username.value, 
          password: event.target.password.value,
          name: event.target.name.value,
          email: event.target.email.value,
          doctor: event.target.doctor.checked
        }
    }).done(function() {
      $('.medico-sign-up').removeClass('is-active');      
    });

    return false;
  });

  // navbar
  $(".navbar-burger").click(function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
  });
});