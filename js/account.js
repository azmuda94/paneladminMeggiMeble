const submit = document.querySelector("#submit");
const inputlogin = document.querySelector("#login");
const inputnewpassword = document.querySelector("#newpassword");
const inputoldpassword = document.querySelector("#oldpassword");
const diverrormsg = document.querySelector(".errorMsg");

const urlpathamehome=window.location.pathname;
const urloriginhome=window.location.origin;

async function fetchData(url = '', data = {}, method) {   
	
	const response = await fetch(url, {
		method: method,
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
        body:JSON.stringify(data)
	});

	return response.json(response);
}


submit.addEventListener("click", (event) => {
	event.preventDefault();

	const loginValue=inputlogin.value;
	const loginnewPassword=inputnewpassword.value;
    const loginoldPassword=inputoldpassword.value;

    if(loginnewPassword=='')
    {
        document.querySelector(".errorMsg").innerText='Należy wpisać nowe hasło!';
        return 
    }

	fetchData('https://shopapi-npzh.onrender.com/api/v1/users/', {name:loginValue,newpassword:loginnewPassword,oldpassword:loginoldPassword},'PUT')
	.then((data) => {

		if(!data.success)
            throw data.error;

        window.location.replace(urloriginhome);
		
	}).catch((error) => {
       
		const errorTxt=error;
		document.querySelector(".errorMsg").innerText=errorTxt;
	  });
	
  });