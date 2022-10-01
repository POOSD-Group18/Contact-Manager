const urlBase = 'http://cop-4331-group-18.live/LAMPAPI';
const extension = '.php'

async function doLogin(){
    let login = document.getElementById("loginName").value;
    let password = document.getElementById("loginPassword").value;
    document.getElementById("loginResult").innerHTML = "";
    
    //Live search varables
    //const liveSearch = document.getElementById("searchInput");
    //let searchTerm = '';

    const reqLength = value => value === '' ? false : true;
    const reqLimits = (length,min,max) => length < min || length > max ? false : true;
    const min = 3, max = 30;
    let valid = true;
    var pageNum=0;

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
            window.location.href = "http://cop-4331-group-18.live/manager.html";
        }
    }
    catch(e)
    {
        console.log("Invalid username or password")
        console.log(e)
    }
}

function doLogout(){
    document.cookie = "recordId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    window.location.href = "http://cop-4331-group-18.live/";
}

function saveCookie(cookieName, id){
    let minutes = 10;
    let date = new Date();
    date.setTime(date.getTime()+(minutes*60*1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie =  cookieName + "=" + id + "; " + expires + "; path=/";
}

function getCookie(name){
    var cookieArr = document.cookie.split(";");

    for(var i = 0; i < cookieArr.length; i++)
    {
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

    let valid = true;
    const reqLength = value => value === '' ? false : true;

    if(!reqLength(firstname)){
        document.getElementById("addfnameResult").innerHTML= 'First name cannot be blank.'
        valid = false;
    }
    else{
        document.getElementById("addfnameResult").innerHTML= ''
    }

    if(!reqLength(lastname)){
        document.getElementById("addlnameResult").innerHTML= 'Last name cannot be blank.'
        valid = false;
    }
    else{
        document.getElementById("addlnameResult").innerHTML= ''
    }

    if(!reqLength(phone)){
        document.getElementById("addphoneResult").innerHTML= 'Phone number cannot be blank.'
        valid = false;
    }
    else{
        document.getElementById("addphoneResult").innerHTML= ''
    }

    if(!reqLength(email)){
        document.getElementById("addemailResult").innerHTML= 'E-mail cannot be blank.'
        valid = false;
    }
    else{
        document.getElementById("addemailResult").innerHTML= ''
    }

    if(valid == false){
        return;
    }

    else{
        try
        {
            document.getElementById("addResult").style.display = "block";

            const userId = getCookie("userId");
            const payload = {firstName:firstname, lastName:lastname, email:email, phoneNumber:phone, address:'', userId: userId}
            const res = await axios.post(urlBase + '/AddContact' + extension, payload)

            //console.log(res)
            //window.location.href = "http://cop-4331-group-18.live/manager.html"
        }
        catch(e)
        {
            //window.alert("Something went wrong!");
            console.log(e);
        }
    }
}

function clearAdd(){
    document.getElementById("contactFirstName").value = '';
    document.getElementById("contactLastName").value = '';
    document.getElementById("contactPhoneNumber").value = '';
    document.getElementById("contactEmail").value = '';
    document.getElementById("addResult").style.display = "none";
}

/*
liveSearch.addEventListener('input', (event) => {

	searchTerm = event.target.value.toLowerCase();
	searchContact(0);
    
}
*/

async function searchContact(pageTurn){
	let isNull = 0;

		let search = document.getElementById("searchInput").value;
	
    
    //let search = searchTerm;
    //console.log(search)
    
    if(parseInt(pageTurn) != 0)
    {
        pageNum = pageNum + pageTurn;
    }
    else
    {
        pageNum = 0;
    }
    console.log(pageNum)
    
    var table = document.getElementById("output");

    try{
        const userId = parseInt(getCookie("userId"));
      
    
        const payload = {name:search,userId:userId, pageNum:parseInt(pageNum)}
        
        
        
        const res = await axios.post(urlBase + '/LazySearch' + extension, payload);

        if(res.length < 1){
            document.getElementById("no_contact_found").innerHTML = 'No contact found. Try again or create a new one!'
            throw new Error(res.data.error)
        }

        else if(res.data.error == "No Records Found"){
            document.getElementById("no_contact_found").innerHTML = 'No contact found. Try again or create a new one!'
            throw new Error(res.data.error)
        }

        else{
            document.getElementById("no_contact_found").innerHTML = ''
            data = res.data
            table.innerHTML = ''; //clears results table betwewen each run
            //console.log(res.data)

            table = document.createElement("table")
            document.getElementById("output").appendChild(table);

            //creates header rows
            let thead = table.createTHead();
            let row1 = thead.insertRow(0);

            row1.setAttribute('class','first_row')

            let fname_cell = row1.insertCell(0);
            fname_cell.setAttribute('class','cName')
            fname_cell.innerHTML = "First Name"
            let lname_cell = row1.insertCell(1);
            lname_cell.setAttribute('class','cName')
            lname_cell.innerHTML = "Last Name"
            let email_cell = row1.insertCell(2);
            email_cell.setAttribute('class','cEmail')
            email_cell.innerHTML = "E-Mail"
            let phone_cell = row1.insertCell(3);
            phone_cell.setAttribute('class','cPhone')
            phone_cell.innerHTML = "Phone Number"

        let entry = 0;

            //prints cells of each entry
            for(let i = 0; i < res.data.length; i++)
            {
                if(!res.data[i]){
                    break;
                }
                let row = thead.insertRow(i+1);
                let fname_cell = row.insertCell(0);
                fname_cell.innerHTML = res.data[i].FirstName
                let lname_cell = row.insertCell(1);
                lname_cell.innerHTML = res.data[i].LastName
                let email_cell = row.insertCell(2);
                email_cell.innerHTML = res.data[i].Email
                let phone_cell = row.insertCell(3);
                phone_cell.innerHTML = res.data[i].PhoneNumber
                //create edit button
                let button1 = document.createElement("button");

                //button1.innerText = "EDIT/DELETE";
                //button1.className = "editButton";

                button1.setAttribute('class','editbtn_png')

                row.appendChild(button1);

                //opens edit form
                button1.onclick = function(){
                    document.getElementById("editForm").style.display = "block";
                    //document.getElementById("editForm").style.visibility = "visible"
                    //populate form fields
                    document.getElementById("edit_fname").value = res.data[i].FirstName;
                    document.getElementById("edit_lname").value = res.data[i].LastName;
                    document.getElementById("edit_email").value = res.data[i].Email;
                    document.getElementById("edit_number").value = res.data[i].PhoneNumber;

                    //document.getElementById("savebtn").onclick = updateContact(res.data[i].ID);
                    document.getElementById("savebtn").onclick = () => updateContact(res.data[i].ID);

                    document.getElementById("confirmation").onclick = function(){
                        document.getElementById("editPage1").style.display = "none";
                        document.getElementById("editPage2").style.display = "block";
                    }

                    document.getElementById("cancelDelete").onclick = function(){
                        document.getElementById("editPage2").style.display = "none";
                        document.getElementById("editPage1").style.display = "block";
                    }

                    document.getElementById("deletebtn").onclick = () => deleteContact(res.data[i].ID);
                    /*let savebtn = document.getElementById("savebtn");
                    savebtn.onclick = console.log("You clicked the save button!")
                    */
                }
                entry++;
            }

            let row = thead.insertRow(entry + 1);

            if(pageNum > 0)
            {
                let button3 = document.createElement("button");
                //button3.innerText = "Go Back a Page";
                //button3.className = "load_next_button";
                button3.setAttribute('class','load_previous_button')
                row.appendChild(button3);

                button3.onclick = function(){
                    searchContact(-1);
                }

            }

            if(entry == 10)
            {

                let button2 = document.createElement("button");
                //button2.innerText = "Load More";
                //button2.className = "load_previous_button";
                button2.setAttribute('class','load_next_button')
                row.appendChild(button2);

                button2.onclick = function(){
                    searchContact(1);
                }
            }
        }
    }
    catch(e){
        console.log(e);
    }
}




async function updateContact(i){

    let fname = document.getElementById("edit_fname").value;
    let lname = document.getElementById("edit_lname").value;
    let email = document.getElementById("edit_email").value;
    let phone = document.getElementById("edit_number").value;

    console.log(fname,lname,email,phone,i)


    try{

    //const tempaddress = "random"
    const payload = {id:i,firstName:fname,lastName:lname,email:email,phoneNumber:phone,address:''}

    console.log(payload)

    const res = await axios.post(urlBase + '/UpdateContact' + extension,payload)

    if(res.data.error != ""){
        throw new Error(res.data.error)
    }

    else{
        window.location.href = "http://cop-4331-group-18.live/manager.html"
        console.log("sucessfully edited")
    }
}

    catch(e){
        console.log(e)
    }
}


async function deleteContact(i){


    try{

        const payload = {id:i}
        const res = await axios.post(urlBase + "/DeleteContact" + extension,payload)

        if(res.data.error != ""){
            throw new Error(res.data.error)
        }

        else{
            window.location.href = "http://cop-4331-group-18.live/manager.html"
        }
    }

    catch(e){
        console.log(res.data.error,e)
    }

}



//closes edit form
function closeForm() {
    document.getElementById("editForm").style.display = "none";
}





async function doRegister()
{
    let success = true; /*success checks for any failure during the registration*/

    var fname = document.getElementById("FirstName").value;
    var lname = document.getElementById("LastName").value;
    var username = document.getElementById("Login").value;
    var password = document.getElementById("Password").value;
    var confirmp = document.getElementById("ConfirmPassword").value;

    /*check for empty field, returns error and register fails if an empty field is found*/
    if(fname.length<1 || lname.lengtth<1)
    {
    success=false;
    document.getElementById("nameResult").innerHTML = 'First name or last name cannot be empty'
    }
    else{
        document.getElementById("nameResult").innerHTML = ''
    }

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
    else if(password !== confirmp){
        success=false;
        document.getElementById("passResult").innerHTML = 'Password do not match'
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
            window.location.href = "http://cop-4331-group-18.live/";
        }
    }

    catch(e){
        console.log("An error has occurred", e)
        console.log(e);
    }
}
