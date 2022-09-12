const urlBase = 'http://cop-4331-group-18.live/LAMPAPI';
const extension = 'php';

async function doLogin(){

    let username = document.getElementById("loginName").value;
    let password = document.getElementById("loginPassword").value;

    document.getElementById("invalid-login-msg").innerHTML = ''

    const isRequired = value => value === '' ? false : true;
    const isBetween = (length,min,max) => length < min || length > max ? false : true;

    let valid = true;

    if(!isRequired(username)){
        window.alert("Username cannot be blank");
        document.getElementById("user-error-msg").innerHTML = 'Username cannot be blank'
        username.focus()
        valid = false;
    }

    else if(!isBetween(username.length,min,max)){
        window.alert("Username must be between 3 and 25 characters.");
        document.getElementById("user-error-msg").innerHTML = 'Username must be between 3 and 25 characters.'
        username.focus();
        valid = false;
    }

    else{
        document.getElementById(user-error-msg).innerHTML = ''
    }
    
    if (!isRequired(password)) {
        window.alert("Password cannot be blank.");
        document.getElementById("pass-error-msg").innerHTML = 'Password cannot be blank.'
        password.focus();
        valid = false;
    }
    
    else{
        document.getElementById("pass-error-msg").innerHTML = ''
    }

    if(success == false){
        return false;
    } 

    try{
        password = md5(password)
        const loadit = {firstName:firstname,lastName:lastname,login:username,password:password}
        const res = await axios.post(urlBase + '/register' + extension,loadit)

        if(res.data.error != ""){
            throw new Error(res.data.error)
        }

        else{
            const userID = res.data.id
            //cookie
            window.location.href = "register.html"
        }
    }

    catch(e){
        document.getElementById("invalid-login-msg").innerHTML = 'Invalid username or password'
        console.log("Error happened :(",e)
    }




}