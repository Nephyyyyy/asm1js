    'use strict';
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const healthyBtn=document.getElementById("healthy-btn")

const calculateBmiBtn=document.getElementById("calculate-bmi-btn")


const tbody = document.getElementById("tbody")
const petArr = []




submitBtn.addEventListener('click', function()
{
    const data = {
        id : idInput.value,
        name: nameInput.value,
        age : parseInt(ageInput.value),
        type: typeInput.value,
        weight:weightInput.value,
        length : parseInt(lengthInput.value),
        color:colorInput.value,
        breed:breedInput.value,
        vaccinated:vaccinatedInput.checked,
        dewormed:dewormedInput.checked,
        sterilized:sterilizedInput.checked,
        date: new Date(),
        bmi: "?",
    };
    const validate = validateData(data);
    if(validate){
        petArr.push(data);
        clearInput();
        renderTableData(petArr);    
    }
});

renderTableData(petArr)
function renderTableData(petArr){
    tbody.innerHTML = '';
    for(let i=0;i<petArr.length;i++)
    {
        const row = document.createElement('tr')
        row.innerHTML = `
        <th scope="row">${petArr[i].id}</th>
        <td>${petArr[i].name}</td>
        <td>${petArr[i].age}</td>   
        <td>${petArr[i].type}</td>
        <td>${petArr[i].weight}</td>
        <td>${petArr[i].length}</td>
        <td>${petArr[i].breed}</td>
        <td>
            <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
        </td>
        <td><i class="bi ${petArr[i].vaccinated ? " bi-check-circle-fill " : " bi-x-circle-fill "}"></i></td>
        <td><i class="bi ${petArr[i].dewormed ? " bi-check-circle-fill " : " bi-x-circle-fill "}"></i></td>
        <td><i class="bi ${petArr[i].sterilized ? " bi-check-circle-fill " : " bi-x-circle-fill "}"></i></td>
        <td>
            ${petArr[i].bmi}

        </td>
        <td>
            ${petArr[i].date.getDate()}/${petArr[i].date.getMonth()+1}/${petArr[i].date.getFullYear()}
        </td>
        <td>
	        <button class="btn btn-danger" onclick="deletePet('${ petArr[i].id }')">Delete</button>
        </td>
        `   ;  
        tbody.appendChild(row); 
    }
}
function deletePet(petId){
    const isDeleted = confirm("Are you sure ?")
    if(isDeleted){
        for(let i= 0 ; i<petArr.length;i++)
        {
            if(petId===petArr[i].id){
                petArr.splice(i,1);
                renderTableData(petArr);
            }
        }
    }
}
function clearInput(){
    idInput.value = ""
    nameInput.value=""
    ageInput.value=""
	typeInput.value = 'Select type'
    weightInput.value=""
    lengthInput.value=""
    colorInput.value="#000000"
    breedInput.value="Select breed"
	vaccinatedInput.checked = false;
    dewormedInput.checked= false;
    sterilizedInput.checked=false;
}
function validateData(data){
    let isValidate = true;
        for(let i =0; i<petArr.length;i++)
        {
            if(data.id===petArr[i].id){
                alert("ID must be unique")
                isValidate =false;
                break;
            }
        }
        if(data.id.trim() ==="")
            {
                alert("khong duoc de trong id ")
                isValidate= false;
            }
        if(isNaN(data.age <1 || data.age>15))
        {
            alert("tuoi chi dc tu 1 den 15")
            isValidate=false;
        }
        if(isNaN(data.weight <1 || data.weight<15))
        {
            alert("can nang chi dc tu 1 den 15")
            isValidate=false;
        }
        if(isNaN(data.length <1 || data.length> 100))
        {
            alert("Length must be between 1 and 100!")
            isValidate= false;
        }
        if(data.type ==="Select Type")
        {
            alert("Please select Type!")
            isValidate= false;
        }
        if(data.breed ==="Select Breed")
        {
            alert("Please select Breed!")
            isValidate= false;
        }
    return isValidate;
}

let healthyCheck= true;
healthyBtn.addEventListener("click",function(){
    if(healthyCheck ===true){
        const healthyPetArr=[];
        for(let i=0; i<petArr.length;i++){
            if(petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized){
                healthyPetArr.push(petArr[i]);
            }
        }
        renderTableData(healthyPetArr)
        healthyBtn.textContent="Show All Pet"
        healthyCheck=false;
    }else{
        renderTableData(petArr);
        healthyBtn.textContent="Show Healthy Pet"
        healthyCheck=true;
    }
})
calculateBmiBtn.onclick= function(){
    for(let i=0;i<petArr.length;i++){
        petArr[i].bmi=
        petArr[i].type==="Dog" 
        ?((petArr[i].weight*703)/petArr[i].length**2).toFixed(2)
        :((petArr[i].weight*886)/petArr[i].length**2).toFixed(2 )
    }
    renderTableData(petArr)
}
    