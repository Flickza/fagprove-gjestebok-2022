$(document).ready(function () {
    //login form handler
    $('#newUser-form').submit(function (e) {
        e.preventDefault();
        let form = $(this);
        let formData = form.serialize();
        console.log(formData);
        $.ajax({
            url: '/auth/register',
            method: 'POST',
            data: formData,
            success: function (data) {
                if (data.success) {
                    alert("REGISTRERT!")
                    window.location.href = "/auth/login";
                } else {
                    const errorMessage = data;
                    console.log(errorMessage);
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    });
})