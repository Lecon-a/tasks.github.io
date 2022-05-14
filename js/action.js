"use strict";

const task_field = document.querySelector(".task_input");
const isActiveBtn = document.querySelector(".add_btn");
const ul = document.querySelector(".tasks");
let keys = {"values" : []};

if (!localStorage.getItem("tasks")) {  
    localStorage.setItem("tasks", keys.values);
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tasks")) {
        formalTasks();  
    }
    deleteTask(document.querySelectorAll(".delete"));
    isActiveBtn.disabled = true;
    isEnabled();

    addTask(document.querySelector("form"));
});

function  addTask(t) {
    //Todo
    //-Listen to the button click event
    t.onsubmit = () => {
        updateView(task_field);
        return false;
    };
}

function updateView(caption) {
    createLi(caption.value);
    //store in localStorage
    keys.values.push(caption.value);
    localStorage.setItem("tasks", keys.values);
    caption.value = "";
    isActiveBtn.disabled = true;
}

function isEnabled() {
    task_field.onkeyup = () => {
        if (task_field.value.length > 0) {
            isActiveBtn.disabled =  false;
        } else {
            isActiveBtn.disabled =  true;
        }  
    };
}

function createLi(text) {
    const li = document.createElement("li");
    li.innerHTML = `${text}<span class="delete" title="Have you achieved this task that you want to delete?">x</span>`;
    ul.append(li);
}

function formalTasks() {
    keys.values = localStorage.getItem("tasks").split(",");
        for (let i = 0, len = keys.values.length; i < len; i++) {
            createLi(keys.values[i]);
        }
}

function deleteTask(deletes){
    deletes.forEach( del => {
        del.addEventListener("click", () => {
            const deleteList = del.parentElement;
            let taskName = deleteList.innerHTML.split("<")[0];
            keys.values.forEach((item, index) => {
                if (item === taskName){
                    keys.values.splice(index, 1);
                    localStorage.setItem("tasks", keys.values);
                }
            });
            deleteList.style.animationPlayState = "running";
            deleteList.addEventListener("animationend", () => {
                deleteList.remove();
            })
        });
    });
}