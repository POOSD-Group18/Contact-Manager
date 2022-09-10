const urlBase = 'http://cop-4331-group-18.live/LAMPAPI';
const extension = 'php';

/*<script src="../js/md5.js"></script>*/

async function doRegister()
{
    var sub = true; /*sub checks for anyy failure during the registration*/
    var username = document.getElementById("Login").value;
    /*check for empty field*/
    if(username.length < 1)
    {
        sub=false;
        alert("Username cannot be empty");
    }
    /*check for matching username*/
    /*else if(){
        sub=false;
        alert("Username taken");
        document.getElementById("").innerHTML="*";
    }
    else
    {                   
        document.getElementById("").innerHTML = username;
    }*/

    var password = document.getElementById("Password").value;
    if(password.length < 1)
    {
        sub=false;
        alert("Password cannot be empty");
        /*document.getElementById("").innerHTML="*";*/
    }/*
    else
    {                   
        document.getElementById("").innerHTML = password;
    }*/

    var fname = document.getElementById("FirstName").value;
        if(fname.length<1)
        {
        sub=false;
            alert("First name cannot be empty");
        }
    /*else
        {                       
            document.getElementById("").innerHTML = fname;

        }*/

    var lname = document.getElementById("LastName").value;
        if(lname.length<1)
        {
        sub=false;
            alert("Last name cannot be empty");
        }
    /*else
        {                       
            document.getElementById("").innerHTML = lname;

        }*/

    /*If an error was detected, returns false and register fails*/
    if(sub==false)
    {
        return false;
    }

    try{
        password = md5(password)
        const payload = {fname:fname, lname:lname, login:username, password:password}
        const res = await axios.post(urlBase + '/register' + extension, payload)

        if (res.data.error != ""){
            throw new Error(res.data.error)
        }

        else{
            const userID = res.data.id
            window.location.href = "http://cop-4331-group-18.live/login.html"; 
        }
    }

    catch(e){
        console.log("Error", e)
    }
}