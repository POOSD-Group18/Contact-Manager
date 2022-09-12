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

    const payload = {username:login,password:password}

    const res = await axios.post(urlBase + '/Login' + extension)
}
