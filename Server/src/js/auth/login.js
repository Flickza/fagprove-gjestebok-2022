$(document).ready(function() {
    //login form handler
    $('#login-form').submit(function (e) {
        e.preventDefault();
        let form = $(this);
        let formData = form.serialize();
        console.log(formData);
        $.ajax({
            url: '/auth/login',
            method: 'POST',
            data: formData,
            success: function (data) {
                if (data.success) {
                    console.log(data);
                } else {
                    const errorMessage = data;
                    console.log(errorMessage);
                }
            }
        })
    });
})