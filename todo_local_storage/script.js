document.addEventListener('DOMContentLoaded',()=>{
    const todoInput = document.getElementById('todo-input')
const addTaskBtn = document.getElementById('add-task-btn')
const todoList = document.getElementById('todo-list')


let tasks =  JSON.parse(localStorage.getItem('tasks')) || []
tasks.forEach((task)=> renderTask(task))

addTaskBtn.addEventListener('click', ()=>{
    let taskText = todoInput.value.trim()
    if(taskText === '') return

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }

    tasks.push(newTask)
    savetask()
    renderTask(newTask)
   
    todoInput.value = ''
   
    
})

function renderTask(task){
    const li = document.createElement('li')
    li.setAttribute('data-id', task.id)
    if(task.completed) li.classList.add('completed')
    li.innerHTML= `<span>${task.text}</span>
    <button>Delete</button>`
    todoList.appendChild(li)

    li.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON') return
        task.completed = !task.completed
        li.classList.toggle('completed')
        savetask()
    })
    li.querySelector('button').addEventListener('click',(e)=>{
        
        tasks = tasks.filter((t)=> t.id !== task.id)
        li.remove()
        savetask()
    })
}

function savetask(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
})