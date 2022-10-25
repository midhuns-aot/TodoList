// Midhun S
// js file for ToDo list


// Variable Declarations

let form = document.getElementById("form-task")             
let title = document.getElementById("title-text")           
let description = document.getElementById("message-text")     
let currentDate = document.getElementById("due-date")       
let tasks = document.getElementById("tasks-cards")          
let add = document.getElementById("add")                    
let deleting = document.getElementById("exampleModal")
let data = [];
let sortvalue = document.getElementById("sorts")
let deleteindexx
let editindexx
let count_all = document.getElementById("count-all")
let count_active = document.getElementById("count-active")
let count_completed = document.getElementById("count-completed")  

countOfTask()
getLocalStorage()


// fuction for form submission 
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

    createTasks();
    setLocalStorage()
}

function setLocalStorage(){
    localStorage.setItem("data", JSON.stringify(data));
}

function getLocalStorage(){
    data = JSON.parse(localStorage.getItem("data")) || []
   
}
    createTasks()
    createCompleteTasks() 
    
//Creating the blocks for showing task
function createTasks(){
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
   countOfTask()
}

//For deleting the Task
function deleteTask(e){
    deleteindexx = e;
};
function deleteT(){
    data.splice(deleteindexx,1)
    console.log(data)
    createTasks()
    createCompleteTasks()
    countOfTask() 
    setLocalStorage()
}

//function for editing Task
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
    console.log(data)
    setLocalStorage()
}

// clear the form inputs after submission
function resetForm(){
    title.value = '';
    description.value = '';
    currentDate.value = '';
};


// adding a attribute to the add butoon to dismiss after submission
let setDismissAttribute = () =>{
    add.click()
    add.setAttribute("data-bs-dismiss","")
}

// setting up the sort button for which type of sort is to be done
sortvalue.addEventListener("change",function(){
    if(this.value == 1){
        titleSorting ()
        createTasks()
        console.log(data)
        setLocalStorage()
    }
    else{
    dateSorting()
    console.log(data)
    createTasks()
    setLocalStorage()
    }
})

// function for function title sorting
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

// function for function date sorting
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
 
// function for checking the task-card is checked or not and seprete them 
function acceptcheckbox(indexofcheck){
    var checkIndex = document.getElementById(indexofcheck);
    if(checkIndex.checked == true){
        data[indexofcheck].iscomplete = "completed"
        
    }
    else{
        data[indexofcheck].iscomplete = "active"
        
    }
    createTasks()
    createCompleteTasks()
    setLocalStorage()
    countOfTask()

}

// creating-completed cards
function createCompleteTasks(){
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
    countOfTask()
}

// Function for display completed task
function displayCompleted(){
   
        document.querySelector('#tasks-cards').style.display = "none"
        document.querySelector('#completed').style.display = "block"
        document.querySelector('#actve').style.display = "none"
        document.querySelector('#cmpletd').style.display = "block"

        console.log("function display complted active")
}

// Function for display active task
function displayActive(){
   
    document.querySelector('#tasks-cards').style.display = "block"
    document.querySelector('#completed').style.display = "none"
    document.querySelector('#actve').style.display = "block"
    document.querySelector('#cmpletd').style.display = "none"
    console.log("function display active")
}

// Function for display all

    function displayAll(){
    
        document.querySelector('#tasks-cards').style.display = "block"
        document.querySelector('#completed').style.display = "block"
        document.querySelector('#actve').style.display = "block"
        document.querySelector('#cmpletd').style.display = "block"
        console.log("function display complted active")
    }

    // Function for clear all the completed task
    function clearCompletedTask(){
        for(j=0; j<data.length;j++){
            if(data[j].iscomplete == "completed"){
                data.splice(j,1)
                j--
            }
            createTasks()
            createCompleteTasks() 
            setLocalStorage() 
            countOfTask()
        }
        console.log("clearCompletedTask")
}


// Function for counting the the tasks

function countOfTask(){


    count_all.innerHTML =""
    count_active.innerHTML =""
    count_completed.innerHTML =""
    for(i = 0 ; i < data.length  ; i++){
        count_all.innerHTML++
        if(data[i].iscomplete == "active"){
            count_active.innerHTML++
        }
        if(data[i].iscomplete == "completed"){
            count_completed.innerHTML++
        }
    }
}


// searchinputs.addEventListener("input", () =>{
    // let searchinputs = document.getElementById("searchinput").value.toUpperCase();
//     const storecads = document.getElementById("tasks-cards")
//     const cardss = document.querySelector(".card")
//     title

//     for( i =0; i <title.length; i++){
//         let match = storecads[i].title[0]

//         if(match){
//             let textedValue = match.textContent || match.innerHTML

//             if(textvalue.toUpperCase().indexOf(searchinputs) > -1){
//                 storecads[i].style.display = "";
//             }else{
//                 storecads[i].style.display = "none";
//             }
//         }
//     }
    


    // const includesValue = data.includes(searchinputs);
    // console.log("enterd in search function")
// })



// searchinputs.addEventListener("input", () =>{
//     console.log("searchhhhh")
//     const includesValue = data.includes(searchinputs);
// })


// searchFnctn = (e) => {
//     const includesValue = data.includes(searchinputs);
//     console.log(includesValue);
// }