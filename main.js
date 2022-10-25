
// Variable Declarations

let form = document.getElementById("form-task")
let title = document.getElementById("title-text")
let description = document.getElementById("message-text")
let currentDate = document.getElementById("due-date")
let tasks = document.getElementById("tasks-cards")
let add = document.getElementById("add")
let deleting = document.getElementById("exampleModal")
let data = [];
// console.log(data)
let sortvalue = document.getElementById("sorts")
let deleteindexx
let editindexx
let count_all = document.getElementById("count-all")
// count_all=0
// let searchinputs = document.getElementById("search-input")



form.addEventListener("submit",(e) => {
    e.preventDefault();                  // prevent refreshing
    formValidation();                   // validating form
});



//Validation Process
//chekking title text feild is empty or not
let formValidation = () => {
    if(title.value === ''){               
        console.log("failure")
    }else{
        console.log("sucess")
        acceptData();
        add.setAttribute("data-bs-dismiss","modal")
        setDismissAttribute();
       
       
    }
}

//Accepting the data

let acceptData = () => {
    data.push({

        text : title.value,
        dis : description.value,
        date : currentDate.value,
        iscomplete : "active"
    });
    localStorage.setItem("data", JSON.stringify(data));
    count_all.innerHTML++
    // console.log(data)
    createTasks();
}

//Creating the blocks for showing task

let createTasks = () => {
    tasks.innerHTML = "";
    console.log("data", data)
    for(i=0;i<data.length;i++ ){
        if(data[i].iscomplete == "active"){
        tasks.innerHTML += ` 
           
        <div class="card d-flex  justify-content-between my-4">
            <div class="card-body d-flex justify-content-between ">
                <div class="chek-main d-flex  align-items-center gap-4">
                    <div>
                        <input class="form-check-input rounded-circle check ms-3 mt-0 mt-0" id=${i} onclick='acceptcheckbox(${i})' type="checkbox" value="" >
                    </div>  
                    <div>
                        <p id="title-to-disp">${data[i].text} <img src="/image/Ellipse 1.png" alt="image"></p>
                        <p id="date-to-disp"> <i class="bi bi-calendar3"></i> &emsp; ${data[i].date}</p>
                    </div>
                </div>
    
    
                <div class="options d-flex  align-items-center gap-4">
                    <i  data-bs-toggle="modal" data-bs-target="#editModal2" onclick = "editTask(${i})" class="bi bi-pencil-fill text-secondary"></i>
                    <i data-bs-toggle="modal" data-bs-target="#forDeletion"  onclick ="deleteTask(${i})" class="bi bi-trash text-danger"></i>
                </div>
            </div>
        </div>
        `;
    }
}
    resetForm();

}

//For deleting the Task



function deleteTask(e){
    deleteindexx = e
};

function deleteT(){
    data.splice(deleteindexx,1)
    console.log(data)
    // all_counter.innerHTML--
    createTasks()
    createCompleteTasks()  
    localStorage.setItem("data", JSON.stringify(data));  
    count_all.innerHTML--
    
}



function editTask(e){
    console.log("Edit modal open")
    editindexx = e
    document.querySelector("#edited-title-text").value=data[e].text;
    document.querySelector("#edited-message-text").value=data[e].des;
    document.querySelector("#edited-due-date").value=data[e].date;
}

function edit(){
    console.log("edit")
    data[editindexx].text = document.getElementById("edited-title-text").value;
    data[editindexx].des = document.getElementById("edited-message-text").value;
    data[editindexx].date = document.getElementById("edited-due-date").value;
    
    createTasks()
    createCompleteTasks() 
    localStorage.setItem("data", JSON.stringify(data));  
  
    console.log(data)
}



let resetForm = () =>{


    title.value = '';
    description.value = '';
    currentDate.value = '';

};

//For retriving the data form the local storage

(() => {
    // console.log(data)
    data = JSON.parse(localStorage.getItem("data"));
    // console.log(data)
    createTasks();
   
})()



let setDismissAttribute = () =>{
    add.click()
    add.setAttribute("data-bs-dismiss","")
}



sortvalue.addEventListener("change",function(){
    if(this.value == 1){
        titleSorting ()
        createTasks()
        localStorage.setItem("data", JSON.stringify(data));
        console.log(data)
    }
    else{
    dateSorting()
    console.log(data)
    localStorage.setItem("data", JSON.stringify(data));
    createTasks()
    }
})


function titleSorting (){

    return data.sort(function(a,b){
    if (a.text.toLowerCase() < b.text.toLowerCase()){
        return -1;
    } 
 
    if (a.text.toLowerCase() < b.text.toLowerCase()){
        return 1;
    } 
    })
}



function dateSorting (){
    return data.sort(function(a,b){
        if(a.date < b.date){
            return -1
        }
        if(a.date > b.date){
            return 1
        }
        return 0
    })
}
 



function acceptcheckbox(indexofcheck){
    var checkIndex = document.getElementById(indexofcheck);
    if(checkIndex.checked == true){
        data[indexofcheck].iscomplete = "completed"
        localStorage.setItem("data", JSON.stringify(data));
    }
    else{
        data[indexofcheck].iscomplete = "active"
        localStorage.setItem("data", JSON.stringify(data));
    }
    createTasks()
    createCompleteTasks()  
 
 
}




let createCompleteTasks = () => {

    document.querySelector('#completed').innerHTML = ""
    console.log("HAI",data)
    for(i=0;i<data.length;i++ ){
        if(data[i].iscomplete == "completed"){
            document.querySelector('#completed').innerHTML += ` 
           
            <div class="card d-flex justify-content-between my-4">
            <div class="card-body d-flex justify-content-between ">
                <div class="chek-main d-flex  align-items-center gap-4">
                    <div>
                        <input class="form-check-input rounded-circle check ms-3 mt-0 mt-0" onclick='acceptcheckbox(${i})' type="checkbox" value=""  id="${i}" checked>
                    </div>  
                    <div>
                        <p id="title-to-disp">${data[i].text} <img src="/image/Ellipse 12 (1).png" alt="image"></p>
                        <p id="date-to-disp"> <i class="bi bi-calendar3"></i> &emsp; ${data[i].date}</p>
                    </div>
                </div>
    
    
                <div class="options d-flex  align-items-center gap-4">
                <i  data-bs-toggle="modal" data-bs-target="#editModal2" onclick = "editTask(${i})" class="bi bi-pencil-fill text-secondary"></i>
                <i data-bs-toggle="modal" data-bs-target="#forDeletion"  onclick ="deleteTask(${i})" class="bi bi-trash text-danger"></i>
            </div>
            </div>
        </div>         
        `;
        }
    
    }
    resetForm();
    
    
}



function displayCompleted(){
   
        document.querySelector('#tasks-cards').style.display = "none"
        document.querySelector('#completed').style.display = "block"
        document.querySelector('#actve').style.display = "none"
        document.querySelector('#cmpletd').style.display = "block"

        console.log("function display complted active")
      
    
}


function displayActive(){
   
    document.querySelector('#tasks-cards').style.display = "block"
    document.querySelector('#completed').style.display = "none"
    document.querySelector('#actve').style.display = "block"
    document.querySelector('#cmpletd').style.display = "none"
    console.log("function display active")
    

}


    function displayAll(){
    
        document.querySelector('#tasks-cards').style.display = "block"
        document.querySelector('#completed').style.display = "block"
        document.querySelector('#actve').style.display = "block"
        document.querySelector('#cmpletd').style.display = "block"
        console.log("function display complted active")
        

    }

    function clearCompletedTask(){
        for(i=0; i<data.length;i++){
            if(data[i].iscomplete == "completed"){
                data.splice(data[i],1)
            }
        }
        console.log("clearCompletedTask")
    }



// search-input.addEventListener("onkeyup",searchFnctn(this))

// searchFnctn = (e) => {
//     const includesValue = data.includes(searchinputs);
//     console.log(includesValue);
// }