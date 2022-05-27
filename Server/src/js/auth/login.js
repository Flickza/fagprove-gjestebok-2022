$(document).ready(function () {
    //login form handler
    $('#login-form').submit(function (e) {
        e.preventDefault();
        let form = $(this);
        let formData = form.serialize();
        $.ajax({
            url: '/auth/login',
            method: 'POST',
            data: formData,
            success: function (data) {
                if (data.success) {
                    console.log(data);
                    redirectLogin();
                } else {
                    const errorMessage = data;
                    $(".errorText").html(errorMessage);
                    $(".errorMessage").attr("visible");
                }
            }
        })
    });
    //redirect user after successful login
    const redirectLogin = () => {
        //disable form fields and buttons
        $("#login-form").find("input, button").attr("disabled", true);

        //change color of login button
        $(".btn-login").removeClass('bg-primary').addClass('bg-success');
        //change text of login button
        $(".btn-login").html(`
        <i class="bi bi-check-circle px-1" style="font-size: 1.5rem; font-weight: bold;"></i>
        <span class="fw-bold">Du blir nå logget inn!</span>`);

        setTimeout(function () {
            window.location.href = '/';
        }, 5000);
    }

})