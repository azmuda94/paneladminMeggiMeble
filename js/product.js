const submit = document.querySelector("#submit");
const inputname = document.querySelector("#name");
const inputdescription = document.querySelector("#description");
const inputsize = document.querySelector("#size");
const diverrormsg = document.querySelector(".errorMsg");
const selecttype = document.querySelector("#type");
const imagetitle = document.querySelector("#image-title");
const title= document.querySelector("#title");
const photomodify= document.querySelector(".photomodify");
const imageimgmainfile = document.querySelector("#imgmainfile");
const divothersfiles= document.querySelector("#divothersfiles");

const urloriginhome=window.location.origin;
const urlhref=window.location.href;
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


function changeImg(event){
   
    imageimgmainfile.src=event.src;
    imageimgmainfile.width="200";
    imageimgmainfile.height="160";
    imageimgmainfile.dataset.file=event.dataset.img;
}

function removeImg(event){
   
    const fileId=event.dataset.bin;

    const response = confirm("Czy napewno chcesz usunąć zdjęcie?");

    if (response) {

        fetchData(`https://shopapi-npzh.onrender.com/api/v1/files/${fileId}`, {},'DELETE')
        .then((data) => {
            alert("Zdjęcie zostało usunięty.");
            window.location.replace(urlhref);
        }).catch((error) => {        
            errorTxt='Zdjęcie nie został usunięty.';
            alert(errorTxt);
        });
    }
   
}

if(product){
    imagetitle.innerHTML='Zdjęcia';
    title.innerHTML='Edycja produktu';

    fetchData(`https://shopapi-npzh.onrender.com/api/v1/products/${product}`, {},'GET')
    .then((data) => {    
        let errorTxt

        const {name,size,typeProduct,description,mainFile}=data.product;
        const {files}=data;
        const typeProductId=typeProduct.id;
        let fileSrc, fileId;
        

        fetchData('https://shopapi-npzh.onrender.com/api/v1/typeproducts', {},'GET')
        .then((data) => {        
            let optionsHTML= `<option value="0">...</option>`
            data.forEach(element => {  
                if(element.name!='Oferta')
                optionsHTML+=`<option value="${element.id}">${element.name}</option>`
            });
            selecttype.innerHTML=optionsHTML;

            if(mainFile)
            {
                fileSrc=mainFile.src;
                fileId=mainFile.id;
    
                imageimgmainfile.src=fileSrc;
                imageimgmainfile.width="200";
                imageimgmainfile.height="160";
                imageimgmainfile.dataset.file=fileId;
            }
    
            inputname.value=name;
            inputdescription.value=description || '';
            inputsize.value=size || '';
            selecttype.value=typeProductId;

            let imgHTML=''

            files.forEach(element=>{
               
                imgHTML+=`<div class="imgmin" id="${element.id}"><i data-bin="${element.id}" onclick="removeImg(this)" title="Usuń zdjęcie" class="fa-solid fa-trash clicked"></i><img data-img="${element.id}" height="100" width="120" onclick="changeImg(this)" src="${element.src}"/></div>`
            })

            divothersfiles.innerHTML=imgHTML;
        });     


    })
    .catch((error) => {        
        errorTxt='Problem z pobraniem danych produktu.';
        document.querySelector(".errorMsg").innerText=errorTxt;
    });
}else{
    title.innerHTML='Dodawanie produktu';

    fetchData('https://shopapi-npzh.onrender.com/api/v1/typeproducts', {},'GET')
    .then((data) => {
    
        let optionsHTML= `<option value="0">...</option>`
        data.forEach(element => {  
            if(element.name!='Oferta')
            optionsHTML+=`<option value="${element.id}">${element.name}</option>`
        });
        selecttype.innerHTML=optionsHTML;
    });
}



submit.addEventListener("click", async(event) => {
    event.preventDefault();    

    const nameValue=inputname.value;
    const descriptionValue=inputdescription.value;
    const sizeValue=inputsize.value;
    const typeValue=selecttype.value;
    const imageValue=imageimgmainfile.dataset.file;

    let errorTxt;

    const data={
        name:nameValue,
        description:descriptionValue,
        size:sizeValue,
        typeProduct:typeValue,
        mainFile:imageValue,
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

        if(product){
            fetchData(`https://shopapi-npzh.onrender.com/api/v1/products/${product}`, data,'PUT')
            .then((data) => {        
                window.location.replace(urloriginhome);
            })
            .catch((error) => {        
                errorTxt='Problem z aktualizacją produktu.';
                document.querySelector(".errorMsg").innerText=errorTxt;
            });
            
        }else{
            fetchData(`https://shopapi-npzh.onrender.com/api/v1/products/`, data,'POST')
            .then((data) => {        
                window.location.replace(urloriginhome);
            })
            .catch((error) => {        
                errorTxt='Problem z utworzeniem produktu.';
                document.querySelector(".errorMsg").innerText=errorTxt;
            });
        }
    }
});




