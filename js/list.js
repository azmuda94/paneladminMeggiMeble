const submit = document.querySelector("#submit");
const inputlogin = document.querySelector("#login");
const inputpassword = document.querySelector("#password");
const buttonremove = document.querySelector("#remove");
const diverrormsg = document.querySelector(".errorMsg");
const selectfilterType = document.querySelector("#filterType");

const urlpathamehome=window.location.pathname;
const urloriginhome=window.location.origin;

async function fetchData(url = '', data = {}, method) {   	
    let response;

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

let myArray = [];

$('.sortable').on('click', function(){
	var column = $(this).data('column')
	var order = $(this).data('order')
	var text = $(this).html()
	text = text.substring(0, text.length - 1)
    
    const filterValue=selectfilterType.value;
    let newArray;

    if (filterValue!=0)
    {
        newArray=myArray.filter((element)=>{
            return element.typeproductid==filterValue;
        })        
        
    }else{
        newArray=myArray;
       
    }

    

	if(order == 'desc'){
		$(this).data('order', "asc")
		newArray = newArray.sort((a,b) => a[column] > b[column] ? 1 : -1)
		text += '&#9660'

	}else{
		$(this).data('order', "desc")
		newArray = newArray.sort((a,b) => a[column] < b[column] ? 1 : -1)
		text += '&#9650'

	}
	$(this).html(text);
	buildTable(newArray);
})

selectfilterType.addEventListener("change", (event) => {
	const filterValue=event.target.value;
    let newArray;

    if (filterValue!=0)
    {
        newArray=myArray.filter((element)=>{
            return element.typeproductid==filterValue;
        })
        
        buildTable(newArray);
    }else{
        buildTable(myArray);
    }
});


function removeProduct(event){
    const id=event.id;
    let errorTxt;
    
    const response = confirm("Czy napewno chcesz usunąć produkt?");

   if (response) {
        fetchData(`https://shopapi-npzh.onrender.com/api/v1/products/${id}`, {},'DELETE')
        .then((data) => {
            alert("Produkt został usunięty.");
             window.location.replace(urloriginhome);
        }).catch((error) => {        
            errorTxt='Produkt nie został usunięty.';
            alert(errorTxt);
        });
       
   } 
}


function buildTable(data){
	var table = document.getElementById('myTable')
	table.innerHTML = ''
	for (var i = 0; i < data.length; i++){
		var row = `<tr>
						<td class="dataname">${data[i].name}</td>
						<td class="dataname">${data[i].typeproduct}</td>
                        <td><img alt="zdjęcie" width="100" height="80" src="${data[i].mainFile}"/></td>
						<td><a href="/image.html?url=${data[i].id}"><i title="dodaj zdjęcie" class="fa-solid fa-plus"></i></a>
						<a title="Edytuj produkt" href="/product.html?url=${data[i].id}"><i class="fa-solid fa-pen-to-square"></i></a>
						<i id="${data[i].id}" onclick="removeProduct(this)" title="Usuń produkt" class="fa-solid fa-trash"></i></td>
				  </tr>`
		table.innerHTML += row
	}


}

fetchData('https://shopapi-npzh.onrender.com/api/v1/typeproducts', {},'GET')
.then((data) => {
    let optionsHTML= `<option value="0">...</option>`
    data.forEach(element => {  
        if(element.name!='Oferta')
        optionsHTML+=`<option value="${element.id}">${element.name}</option>`
    });
    selectfilterType.innerHTML=optionsHTML;
})


fetchData('https://shopapi-npzh.onrender.com/api/v1/products', {},'GET')
.then((data) => {
    data.forEach(element => {       
        const mainFile=element.mainFile;
        let src

        if(mainFile)
        {
            src=element.mainFile.src;
        }            

        myArray.push({
            id:element.id,
            name:element.name,
            typeproduct:element.typeProduct.name,
            typeproductid:element.typeProduct.id,
            mainFile: src,
        })
    });
    buildTable(myArray);

})