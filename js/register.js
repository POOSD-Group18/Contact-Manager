const urlBase = 'http://cop-4331-group-18.live/LAMPAPI';
const extension = '.php'
/*<script src="js/md5.js"></script>*/

async function doRegister()
{
    let success = true; /*success checks for any failure during the registration*/

    var fname = document.getElementById("FirstName").value;
    var lname = document.getElementById("LastName").value;
    var username = document.getElementById("Login").value;
    var password = document.getElementById("Password").value;
        if(fname.length<1)
        {
        success=false;
        document.getElementById("fnameResult").innerHTML = 'First name cannot be empty'
        }
        else{
            document.getElementById("fnameResult").innerHTML = ''
        }

    
       if(lname.length<1)
        {
        success=false;
        document.getElementById("lnameResult").innerHTML = 'Last name cannot be empty'
        }
        else{
            document.getElementById("lnameResult").innerHTML = ''
        }

   
    /*check for empty field, returns error and register fails if an empty field is found*/
    if(username.length < 1)
    {
        success=false;
        document.getElementById("loginResult").innerHTML = 'Username cannot be empty'
    }
    else{
        document.getElementById("loginResult").innerHTML = ''
    }
    /*check for matching username*/
    /*else if(){
        pass=false;
        alert("Username taken");
        document.getElementById("").innerHTML="*";
    }*/

   
    if(password.length < 3 || password.length > 25)
    {
        success=false;
        document.getElementById("passResult").innerHTML = 'Please create a password between 3 - 25 characters'
    }
    else{
        document.getElementById("passResult").innerHTML = ''
    }

    /*If an error was detected, returns false and register fails*/
    if(success==false)
    {
        return false;
    }
    
    /*Hashes password*/
    try{
        password = md5(password)
        const payload = {firstName:fname, lastName:lname, login:username, passwordHash:password}
        const res = await axios.post(urlBase + '/Register' + extension, payload);
        if (res.data.error != ""){
            window.alert("Error");
            throw new Error(res.data.error)
        }

        else{
            const userId = res.data.id
            saveCookie("userId", userId)
            window.location.href = "http://cop-4331-group-18.live/manager.html"; 
        }
    }

    catch(e){
        console.log("An error has occurred", e)
        console.log(e);
    }
}

function saveCookie(cookieName, id)
{
    let minutes = 10;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
    const expires = "expires=" + date.toUTCString();
    document.cookie =  cookieName + "=" + id + "; " + expires + "; path=/";

}