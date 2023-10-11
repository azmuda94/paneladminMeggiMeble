const submit = document.querySelector("#submit");
const inputlogin = document.querySelector("#login");
const inputpassword = document.querySelector("#password");
const buttonremove = document.querySelector("#remove");
const diverrormsg = document.querySelector(".errorMsg");
const selectfilterType = document.querySelector("#filterType");

const urlpathamehome=window.location.pathname;
const urloriginhome=window.location.origin;
const urlhref=window.location.href;

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

function removeImg(event){
    const id=event.id;
    let errorTxt;    
    const response = confirm("Czy napewno chcesz usunąć realizacje?");

   if (response) {
        fetchData(`https://shopapi-npzh.onrender.com/api/v1/files/${id}`, {},'DELETE')
        .then((data) => {
            alert("Realizacja został usunięty.");
             window.location.replace(urlhref);
        }).catch((error) => {        
            errorTxt='Realizacja nie został usunięty.';
            alert(errorTxt);
        });
       
   } 
}


function buildTable(data){
	var table = document.getElementById('myTable')
	table.innerHTML = ''
	for (var i = 0; i < data.length; i++){
		var row = `<tr>					
                        <td><img alt="zdjęcie" width="200" height="160" src="${data[i].src}"/></td>
						<td><i id="${data[i].id}" onclick="removeImg(this)" title="Usuń realizację" class="fa-solid fa-trash"></i></td>
				  </tr>`
		table.innerHTML += row
	}


}

fetchData('https://shopapi-npzh.onrender.com/api/v1/files/forproject', {},'GET')
.then((data) => {
    data.forEach(element => {      
 
        myArray.push({
            id:element.id,            
            src: element.src,
        })
    });
    buildTable(myArray);

})