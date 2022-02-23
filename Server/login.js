
$(document).ready(()=>{
    $("#login").click((event)=>{
        event.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        if(! email)
        {
            alert("please enter email")
        }
        if(! password){
            alert('please enter password')
        }
        url = ` http://localhost:8080/users/login`
        let post_data = JSON.stringify({
            "email": email,
            "password":password
        })
        $.ajax({
            type: 'POST',
            url: url,
            data: post_data,
            success: function(data) {

                alert("Login successful !!")
            },
            error: function (err) {
                alert("login credentials are invalid")
            },
            contentType: "application/json",
            dataType: 'json'
        });
    })
})