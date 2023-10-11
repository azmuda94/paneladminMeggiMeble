const submit = document.querySelector("#submit");
const inputismainfile=document.querySelector("#IsMainFile")
const labelismainfile=document.querySelector("#labelIsMainFile")
const product=window.location.search.replace('?url=','');

const input = document.querySelector('#addimage');
const urloriginhome=window.location.origin;

if (!product)
{
  inputismainfile.style.display='none';
  labelismainfile.style.display='none';
}

async function fetchData(url = '', data = {}) {   
	
    let response
       response = await fetch(url, {
       method: 'POST',  
       body:data});

	return response.json(response);
}



submit.addEventListener("click", async(event) => {
    event.preventDefault();   
    const isMainfile=inputismainfile.checked;

    const data = new FormData();

    data.append('img', input.files[0]);
    
    if(product)
    {
      console.log(data);
      data.append('product', product);
    }
   
    if(isMainfile){ 
      data.append('isMainFile', isMainfile);
    }    

    document.querySelector(".loader").innerHTML='Wysyłanie...';
    
    document.getElementById('submit').disabled = true;

    fetchData('https://shopapi-npzh.onrender.com/api/v1/files/uploadAzure', data)
    .then((data) => {        
        window.location.replace(urloriginhome);
    })
    .catch((error) => {        
      document.querySelector(".loader").innerHTML='';
      document.getElementById('submit').disabled = false;

      const errorTxt='Problem z wysyłką pliku';
      document.querySelector(".errorMsg").innerText=errorTxt;
	 });
});

document.querySelector("#submit").display=true;