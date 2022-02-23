$(document).ready(()=>{
    $("#register").click((event)=>{
        event.preventDefault();
        let first_name = document.getElementById("fname").value;
        let last_name = document.getElementById("lname").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        url = ` http://localhost:8080/users/register`
        let post_data = JSON.stringify({
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password})
            if(! email)
        {
            alert("please enter email")
            return
        }
        if(! password){
            alert('please enter password')
            return
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: post_data,
            success: function(data) {
                alert("Register successful, login to continue")
                window.location("file:///home/shrinkhala/Login%20Page/login.html")
            },
            contentType: "application/json",
            dataType: 'json'
        });
    })
})