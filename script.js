const btn= document.querySelector("#btn");
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer= document.querySelector("#tasks");
const countValue = document.querySelector(".count-value");
let taskCount=0;

document.addEventListener("DOMContentLoaded",()=>{
const displayCount = (taskCount)=>{
    countValue.innerText= taskCount;
};  
const addTask=()=>{
    const taskName = newTaskInput.value.trim();
    
    if(!taskName){
        setTimeout(() => {
            alert("Input cannot be empty");
        }, 200);
        return;
    }
    taskCount++;
    displayCount(taskCount);

    const task= `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit">
        <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="delete">
        <i class="fa-solid fa-trash"></i>
        </button>
    </div>`;

    taskContainer.insertAdjacentHTML("beforeend",task);
    newTaskInput.value='';

    const deleteButtons= document.querySelectorAll(".delete");
    deleteButtons.forEach(button =>{
        button.onclick=()=>{
            button.parentNode.remove();
            taskCount-=1;
            displayCount(taskCount);
        };
    });
    const editButtons= document.querySelectorAll(".edit");
    editButtons.forEach((editBtn)=>{
        editBtn.onclick =(e)=>{
            let targetElement= e.target;
            if(!(e.target.className=="edit")){
                targetElement= e.target.parentElement;
            }
        newTaskInput.value= targetElement.previousElementSibling?.innerText;
        targetElement.parentNode.remove();
        taskCount-=1;
        displayCount(taskCount);
        };
    });
    const tasksCheck= document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox)=>{
        checkBox.onchange=()=>{
            checkBox.nextElementSibling.classList.toggle("completed");
            if(checkBox.checked){
                taskCount-=1;
            }
            else{
                taskCount+=1;
            }
            displayCount(taskCount);
        };
    });
    displayCount(taskCount);
};

btn.addEventListener("click",addTask);

window.onload=()=>{
    taskCount = document.querySelectorAll(".task").length;
    displayCount(taskCount);
    newTaskInput.value="";
}
});
  

