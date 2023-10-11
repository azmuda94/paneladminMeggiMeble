const submit = document.querySelector("#submit");
const inputname = document.querySelector("#name");
const inputdescription = document.querySelector("#description");
const inputsize = document.querySelector("#size");
const diverrormsg = document.querySelector(".errorMsg");
const selecttype = document.querySelector("#type");
const imagetitle = document.querySelector("#image-title");

const urloriginhome=window.location.origin;
const product=window.location.search.replace('?url=','');


async function fetchData(url = '', data = {}, method) {   	
    let response

    if(method!='GET')
    {
          response = await fetch(url, {
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
    }else{
        response = await fetch(url, {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
             'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',            
         });
    }

	return response.json(response);
}

if(product){
    imagetitle.innerHTML='Zdjęcia';
}


fetchData('https://shopapi-npzh.onrender.com/api/v1/typeproducts', {},'GET')
.then((data) => {
   
    let optionsHTML= `<option value="0">...</option>`
    data.forEach(element => {  
        if(element.name!='Oferta')
        optionsHTML+=`<option value="${element.id}">${element.name}</option>`
    });
    selecttype.innerHTML=optionsHTML;
});



submit.addEventListener("click", async(event) => {
    event.preventDefault();    

    const nameValue=inputname.value;
    const descriptionValue=inputdescription.value;
    const sizeValue=inputsize.value;
    const typeValue=selecttype.value;

    let errorTxt;
  
    console.log(nameValue,descriptionValue,sizeValue,typeValue);

    const data={
        name:nameValue,
        description:descriptionValue,
        size:sizeValue,
        typeProduct:typeValue,
    }

    if(nameValue=='')
    {
        errorTxt='Należy wskazać nazwę produktu.';
		document.querySelector(".errorMsg").innerText=errorTxt;
    }else if(typeValue==0)
    {
        errorTxt='Należy wskazać kategorie produktu.';
		document.querySelector(".errorMsg").innerText=errorTxt;
    }else{

        fetchData('https://shopapi-npzh.onrender.com/api/v1/products/', data,'POST')
        .then((data) => {        
            window.location.replace(urloriginhome);
        })
        .catch((error) => {        
            errorTxt='Problem z utworzeniem produktu.';
            document.querySelector(".errorMsg").innerText=errorTxt;
        });
    }
});