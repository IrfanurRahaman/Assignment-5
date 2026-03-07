document.getElementById('login-btn').addEventListener('click' , function(){
    const username = document.getElementById('username');
    const usernameValue = username.value;

    const password = document.getElementById('password');
    const passwordValue = password.value;

    if(usernameValue != 'admin' || passwordValue != 'admin123'){
        alert('Login Failed');
        return;
    }    
    else{
        alert('Login Successful')
    }

   window.location.assign('home.html');

})