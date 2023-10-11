const submit = document.querySelector("#submit");
const inputismainfile=document.querySelector("#IsMainFile")

const input = document.querySelector('#addimage');
const urloriginhome=window.location.origin;

async function fetchData(url = '', data = {}) {   
	
    let response
       response = await fetch(url, {
       method: 'POST',  
       body:data});


	return response.json(response);
}

submit.addEventListener("click", async(event) => {
    event.preventDefault();

    const product=window.location.search.replace('?url=','');
    const isMainfile=inputismainfile.checked;

    const data = new FormData();

    data.append('img', input.files[0]);
    data.append('product', product);
    if(isMainfile){ 
      data.append('isMainFile', isMainfile);
    }

    /*response = await fetch('https://shopapi-npzh.onrender.com/api/v1/files/uploadAzure'
    ,{method:'POST',
      body:data})

    console.log(response)*/
    document.querySelector(".loader").innerHTML='Wysyłanie...'

    fetchData('https://shopapi-npzh.onrender.com/api/v1/files/uploadAzure', data)
    .then((data) => {        
        window.location.replace(urloriginhome);
    })
    .catch((error) => {        
		const errorTxt='Problem z wysyłką pliku';
		document.querySelector(".errorMsg").innerText=errorTxt;
	 });
});