const urlBase = 'http://http://cop-4331-group-18.live/LAMPAPI';
const extension = 'php'

let userId = 0;
let firstName = "";
let lastName = "";


async function doLogin()
{
    userId = 0;
    firstName = "";
    lastName = "";

    let login = document.getElementById("loginName").value;
    let password = document.getElementById("loginPassword").value;

    document.getElementById("loginResult").innerHTML = "";


    try
    {
        const payload = {username:login,password:password}

        const res = await axios.post(urlBase + '/Login' + extension)

        if(res.data.error != ""){
            throw new Error(res.data.error)
        }

        else{
            const userId = res.data.id
            saveCookie("userId", userId)
            window.location.href = "manager.html";
        }
    }

    catch(e){
        document.getElementById("loginResult").innerHTML = 'Invalid username or password.'
        console.log("Invalid username or password")
        
    }
    
}


function doLogout()
{
    userId = 0;
    firstName = "";
    lastname = "";

    document.cookie = "firstName = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "main.html";
}

function saveCookie(cookieName, id)
{
    let minutes = 10;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
    const expires = "expires=" + date.toUTCString();
    document.cookie =  cookieName + "=" + id + "; " + expires + "; path=/";

}