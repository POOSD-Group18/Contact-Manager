const urlBase = 'http://cop-4331-group-18.live/LAMPAPI';
const extension = '.php'

async function doLogin()
{
    let login = document.getElementById("loginName").value;
    let password = document.getElementById("loginPassword").value;

    document.getElementById("loginResult").innerHTML = "";

    const reqLength = value => value === '' ? false : true;
    const reqLimits = (length,min,max) => length < min || length > max ? false : true;

    const min = 3, max = 30;

    let valid = true;

    if(!reqLength(login) && !reqLength(password)){
        document.getElementById("loginResult").innerHTML= 'Username or password cannot be blank.'

        valid = false;
    }
    else if(!reqLimits(login.length,min,max)){
        document.getElementById("loginResult").innerHTML = 'Username must be between 3 and 30 characters.'

        valid = false;
    }
    else{
        document.getElementById("loginResult").innerHTML = ''
    }

    if(valid == false){
        return false;
    }

    try
    {
        password = md5(password)
        const payload = {login:login,password:password}

        const res = await axios.post(urlBase + '/Login' + extension,payload);

        if(res.data.error != ""){
            document.getElementById("loginResult").innerHTML = 'Invalid username or password.'
            throw new Error(res.data.error);
        }

        else{
            const userId = res.data.id
            saveCookie("userId", userId)

            //console.log(userId);

            window.location.href = "http://cop-4331-group-18.live/manager.html";
        }
    }

    catch(e){
        console.log("Invalid username or password")
        console.log(e)
    }
}

function doLogout()
{
    document.cookie = "recordId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    window.location.href = "http://cop-4331-group-18.live/";
}

function saveCookie(cookieName, id)
{
    let minutes = 10;
        let date = new Date();
        date.setTime(date.getTime()+(minutes*60*1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie =  cookieName + "=" + id + "; " + expires + "; path=/";
}

function getCookie(name) {
    var cookieArr = document.cookie.split(";");

    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    return null;
}

async function addContact(){
    let firstname = document.getElementById("contactFirstName").value;
    let lastname = document.getElementById("contactLastName").value;
    let phone = document.getElementById("contactPhoneNumber").value;
    let email = document.getElementById("contactEmail").value;
    let address = document.getElementById("contactEmail").value;

    let valid = true;

    try{
        const userId = getCookie("userId");
        const payload = {firstName:firstname, lastName:lastname, email:email, phoneNumber:phone, address:address, userId: userId}
        const res = await axios.post(urlBase + '/AddContact' + extension, payload)

        if(res.data.error != ""){
            throw new Error(res.data.error)
        }
        else{
            console.log(userId)
            window.location.href = "manager.html"
        }
    }

    catch(e){
        window.alert("Something went wrong!");
        console.log(e);
    }
}

async function searchContact(){

    let search = document.getElementById("searchInput").value;
        console.log(search)

    if(search.length < 1){
        document.getElementById("no_contact_found").innerHTML = 'You need to input at least one letter!'
        return;
    }

    try{
        const userId = getCookie("userId");
            console.log(userId)
        const payload = {name:search,userId:userId}
            console.log(payload)
        const res = await axios.post(urlBase + '/SearchContacts' + extension);

        /*if(res.data.error != ""){
            document.getElementById("no_contact_found").innerHTML = 'No contact found, try again or create a new one!'
                console.log(res.data)
            throw new Error(res.data.error)

        }*/
        /*else if(res.data.results.length == 0){
            //window.alert("No contact found!")

            //document.getElementById("no_contact_found").innerHTML = 'No contact found, try again or create a new one!'

            window.location.href = "manager.html"
        }
        else{*/
            window.location.href = "results.html"
        //}
    }

    catch(e){
        console.log(e);
    }
}