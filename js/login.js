const submit = document.querySelector("#submit");
const inputlogin = document.querySelector("#login");
const inputpassword = document.querySelector("#password");
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
	const loginPassword=inputpassword.value;

	console.log(loginValue,loginPassword)

	fetchData('https://shopapi-npzh.onrender.com/api/v1/users/login', {name:loginValue,password:loginPassword},'POST')
	.then((data) => {
		const secretKey=data.secretKey;
		
		if (secretKey)
		{
			localStorage.setItem('secretKey',secretKey);
			window.location.replace(urloriginhome);
		}
	})
	.catch((error) => {
		const errorTxt='Błędne dane logowania';

		document.querySelector(".errorMsg").innerText=errorTxt;
	  });
	
  });