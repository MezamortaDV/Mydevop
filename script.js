const todoinput = document.querySelectorAll(".form-control")[0];
const findtodo = document.querySelectorAll(".form-control")[1];
const todoform = document.querySelector("#todo-form");
const listgroup = document.querySelector(".list-group");
const clearAllTodo = document.getElementById("clear-todos");



addeventlistener();

function addeventlistener(){
    todoform.addEventListener("submit",addTodo);

    document.addEventListener("DOMContentLoaded",firstPageLoadStorage);

    listgroup.addEventListener("click",deletetodo);

    findtodo.addEventListener("keyup",filtertodo);

    clearAllTodo.addEventListener("click",clearTodos);

    listgroup.addEventListener("click",checkcontrol);
    
};



function clearTodos(){
    if(confirm("Tüm listeyi silmek istediğinize emin misiniz?")){
        while(listgroup.firstElementChild != null){
            listgroup.removeChild(listgroup.firstElementChild);
        }

        localStorage.removeItem("todos");
    }
}

function filtertodo(e){
    const todofilter = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(todofilter) == -1) {
            listItem.setAttribute("style","display:none !important");
        }
        else{
            listItem.setAttribute("style","display:block");
        }
    });
}

function deletetodo(e){
    if(e.target.className == "fa fa-remove"){
        e.target.parentElement.parentElement.remove();

        deletetodofromstorage(e.target.parentElement.parentElement.textContent);
    }
}

function deletetodofromstorage(deletestorage){
    let todoquery = addQueryStorage();
    todoquery.forEach(function(todo,index){
        if(todo.name == deletestorage){
            todoquery.splice(index,1)
        }
    })

    localStorage.setItem("todos",JSON.stringify(todoquery));
};

function firstPageLoadStorage(){
    let todos = addQueryStorage();
    todos.forEach(function(todo){
        addtodoUI(todo.name);
        
    });
    
};

function addTodo(e){
    const inputvalue = todoinput.value.trim()
    const checkinfo = {"name":inputvalue,"checkcontrol":false};
    
    let todos = addQueryStorage();
     
    if(todos.indexOf(inputvalue) == -1){
        addtodoUI(checkinfo["name"]);
        addStorage(checkinfo);
    }else{
        alert("Bu görevden daha önce eklemiştiniz.")
    }
    
    e.preventDefault();
};

function addQueryStorage(){
    let todos;

    if(localStorage.getItem("todos") == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    };

    return todos;
};

function addStorage(inputvalue){
    let todos = addQueryStorage();

    todos.push(inputvalue);

    localStorage.setItem("todos",JSON.stringify(todos));
};

function addtodoUI(inputvalue){
    const createcheck = document.createElement("input");
    const createItem = document.createElement("li");
    const createItemlink = document.createElement("a");
    const div = document.createElement("div");

    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.marginLeft = "5px";
    div.className = "nodes"

    createcheck.className = "form-check-input";
    createcheck.type = "checkbox"
    createcheck.value = "";
    createcheck.id= "flexCheckDefault";
    createcheck.checked = false;
    


    createItemlink.href = "#";
    createItemlink.className = "delete-item"
    createItemlink.innerHTML = "<i class = 'fa fa-remove'></i>"

    createItem.className = "list-group-item d-flex justify-content-between";
    
    div.appendChild(document.createTextNode(inputvalue));
    div.appendChild(createcheck);
    createItem.appendChild(div);
    createItem.appendChild(createItemlink);

    listgroup.appendChild(createItem);

    todoinput.value="";

    

};

function checkcontrol(e){
    let Uicheck;
    let checks = addQueryStorage();
    checks.forEach((checkC)=>{
        if(e.target.className == "form-check-input"){
            Uicheck=e.target.parentElement.textContent;
            if(checkC.name == Uicheck){
                checkC.checkcontrol = e.target.checked
            }
            localStorage.setItem("todos",JSON.stringify(checks))
        }
    })
    
}


    
    




