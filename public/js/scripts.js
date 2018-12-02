$( document ).ready(function() {
  // sign up
  $('.medico-sign-up-button').click(function() {
    $('.medico-sign-up').addClass('is-active');
  });

  $('.medico-sign-up .close-sign-up').click(function() {
    $('.medico-sign-up').removeClass('is-active');
  });

  $('.medico-sign-up-submit').click(function(event) {
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
      window.location.reload();   
    });

    return false;
  });

  //signin
  $('.medico-sign-in-button').click(function() {
    $('.medico-sign-in').addClass('is-active');
  });

  $('.medico-sign-in .close-sign-in').click(function() {
    $('.medico-sign-in').removeClass('is-active');
  });

  $('.medico-sign-in form').submit(function(event) {
    event.preventDefault();

    $.ajax({
        type: 'POST',
        url: '/auth/login',
        data: {
          username: event.target.username.value, 
          password: event.target.password.value
        }
    }).done(function() {
      $('.medico-sign-in').removeClass('is-active');
      window.location.reload(); 
    });

    return false;
  });

  // navbar
  $(".navbar-burger").click(function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
  });

  //sign out
  $('.medico-sign-out-button').click(function() {
    $.ajax('/auth/logout');
    window.location.reload(); 
  })
});