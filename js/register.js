const urlBase = 'http://cop-4331-group-18.live/LAMPAPI';
const extension = 'php';
<script src="js/md5.js"></script>

async function doRegister()
{
    var pass = true; /*pass checks for any failure during the registration*/
    var username = document.getElementById("Login").value;
    /*check for empty field*/
    if(username.length < 1)
    {
        pass=false;
        /*no alerts*/("Username cannot be empty");
    }
    /*check for matching username*/
    /*else if(){
        pass=false;
        alert("Username taken");
        document.getElementById("").innerHTML="*";
    }*/

    var password = document.getElementById("Password").value;
    if(password.length < 1)
    {
        pass=false;
        /*no alerts*/("Password cannot be empty");
    }

    var fname = document.getElementById("FirstName").value;
        if(fname.length<1)
        {
        pass=false;
        /*no alerts*/("First name cannot be empty");
        }

    var lname = document.getElementById("LastName").value;
        if(lname.length<1)
        {
        pass=false;
        /*no alerts*/("Last name cannot be empty");
        }

    /*If an error was detected, returns false and register fails*/
    if(pass==false)
    {
        return false;
    }
    
    /*Hashes password*/
    try{
        password = md5(password)
        const payload = {fname:fname, lname:lname, login:username, password:password}
        const res = await axios.post(urlBase + '/register' + extension, payload)

        if (res.data.error != ""){
            throw new Error(res.data.error)
        }

        else{
            const userID = res.data.id
            window.location.href = "http://cop-4331-group-18.live/index.html"; 
        }
    }

    catch(e){
        console.log("An error has occurred", e)
    }
}