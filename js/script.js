const urlpathame=window.location.pathname;
const urlorigin=window.location.origin;
const urlredirect=urlorigin+'/loginpage.html';

const authKey=localStorage.getItem("authKey");


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

if (urlpathame.toString()=='/loginpage.html')
{
	if (authKey)
		window.location.replace(urlorigin);
}
else
{	
	if (!authKey)
		window.location.replace(urlredirect);
}