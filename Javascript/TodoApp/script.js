const form = document.querySelector('#addTaskForm');
const input = document.querySelector('#tasktxt')
const taskList = document.querySelector("#task-list");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
let items=[];

addEventListener();

function addEventListener() {
  form.addEventListener("submit", addNewItem);
  btnDeleteAll.addEventListener("click", deleteAllItems);
  taskList.addEventListener("click", deleteItem);

}

function loadItems(){
    items=getItemFromLS();
    items.forEach (function(item){
      createItem(item);
    })
}

function getItemFromLS(){
    if(localStorage.getItem('items')===null){
        items=[];
    }else{
        items= JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLS(text){
    items= getItemFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

function deleteItemFromLS(text){
    items = getItemFromLS();
    items.forEach(function(item,index){
        if(item === text){
          items.splice(index,1)};
    });
    localStorage.setItem('items',JSON.stringify(items));
}

function createItem(text) {

    const li = document.createElement('li');
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(text));

    const a = document.createElement("a");
    a.classList = "delete-item float-end";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';
  
    //add a to li
    li.appendChild(a);
  
    taskList.appendChild(li);
    
}

function addNewItem(e) {
    if (input.value === "") {
      alert("Please Add New Item");
    }
    
    setItemToLS(input.value);

    createItem(input.value);
    
    input.value = '';
  
    e.preventDefault(); 
}

function deleteItem(e) {
  
    if (e.target.className === "fas fa-times") {
      if (confirm("Are You Sure")) {
      e.target.parentElement.parentElement.remove();}

      deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
  
  e.preventDefault();
}

function deleteAllItems(e){
    if (confirm("Are yuo Sure?")) {
           taskList.innerHTML = "";   
      };
      localStorage.clear();
    e.preventDefault();
}

