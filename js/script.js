const urlpathame=window.location.pathname;
const urlorigin=window.location.origin;
const urlredirect=urlorigin+'/loginpage.html';

const inputlogout = document.querySelector("#logout");

const authKey=localStorage.getItem("secretKey");


if (urlpathame.toString()=='/loginpage.html' || urlpathame.toString()=='/account.html')
{	console.log(urlpathame);
	if (authKey)
		window.location.replace(urlorigin);
}
else
{	
	if (!authKey)
		window.location.replace(urlredirect);
}


if (urlpathame.toString()!='/loginpage.html')
{

	inputlogout.addEventListener("click", (event) => {
		localStorage.removeItem('secretKey');
		window.location.replace(urlorigin);

	})
}


////////// routing //////////////


if (urlpathame.toString()=='/listofproducts.html')
{
	const removeBtn = document.querySelector('#remove');

	const removeAlert = (e) => {
		e.preventDefault();
		if (confirm('Czy na pewno chcesz usunąć produkt?')) {
			// Save it!
			console.log('Thing was saved to the database.');
		} else {
			// Do nothing!
			console.log('Thing was not saved to the database.');
		}
	};

	removeBtn.addEventListener('click', removeAlert);
}




///// tabele //////
