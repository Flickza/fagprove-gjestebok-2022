$(document).ready(function() {
    //login form handler
    $('#newUser-form').submit(function (e) {
        e.preventDefault();
        let form = $(this);
        let formData = form.serialize();
        console.log(formData);
    });
})