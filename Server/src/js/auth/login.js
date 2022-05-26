$(document).ready(() => {

    //login form handler
    $('#login-form').submit(function (e) {
        e.preventDefault();
        let form = $(this);
        let formData = form.serialize();
        console.log(formData);
    });
})