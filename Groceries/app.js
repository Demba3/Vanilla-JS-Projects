// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editId = "";
// ****** EVENT LISTENERS **********
form.addEventListener("submit",addItem);
clearBtn.addEventListener("click",clearItems)
window.addEventListener("DOMContentLoaded", setupItems);
// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if(value && !editFlag){
        createListItem(id, value);
        displayAlert("value Entered", "success");
        addToLocalStorage(id, value);
        setBackToDefault();
        container.classList.add("show-container");
    }
    else if(value && editFlag){
        editElement.innerHTML = value;
        displayAlert("Item edited successfully", "success");
        editLocalStorage(editId, value);
        setBackToDefault();
    }
    else{
        displayAlert("please enter value", "danger");
    }   
}

//display alert
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`)
    // remove alert
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`)
    }, 1000);
}

function clearItems(){
    const items = document.querySelectorAll(".grocery-item");
    if(items.length > 0){
        items.forEach(item => {
            list.removeChild(item);
        });
        container.remove("show-container");
        displayAlert("Empty List", "success");
        setBackToDefault();
        localStorage.removeItem("list");
    }
}
//delete function
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove("show-container");
    }
    displayAlert("Item Removed", "success");
    setBackToDefault();
    removeFromLocalStorge(id);
}
//edit function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = "edit";
}

//setup function
function setupItems(){
    items = getLocalStorage();
    if(items.length > 0){
        items.forEach((item) => {
            createListItem(item.id, item.value);
        })
        container.classList.add("show-container");
    }
}
function createListItem(id, value){
    const element = document.createElement("article");
    element.classList.add("grocery-item");

    const dataAtribute = document.createAttribute("data-id");
    dataAtribute.value = id;
    element.setAttributeNode(dataAtribute);

    element.innerHTML = `<p class="title">${value}</p>
  <div class="btn-container">
    <button type="button" class="edit-btn">
      <i class="fas fa-edit"></i>
    </button>
    <button type="button" class="delete-btn"s>
      <i class="fas fa-trash"></i>
    </button>
  </div>`;
  const editBtn = element.querySelector(".edit-btn");
  const deleteBtn = element.querySelector(".delete-btn");
  editBtn.addEventListener("click", editItem);
  deleteBtn.addEventListener("click", deleteItem);
  list.appendChild(element);
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
    const grocery = {id, value};
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editId = "";
    submitBtn.textContent = "submit";
}
function removeFromLocalStorge(id){
    let items = getLocalStorage();
    items = items.filter((item) => {
        if(item.id !== id)
            return item;
    })
    localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value){
    let items = getLocalStorage();
    items = items.filter((item) => {
        if(item.id === id){
            item.value = value;
        }
        return item;
    })
    localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage(){
    let items = localStorage.getItem("list");
    items = (items)?JSON.parse(items) : [];
    return items;
}
// ****** SETUP ITEMS **********
