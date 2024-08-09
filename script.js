let calendarScreen = document.querySelector('.calendar-screen') // Екран календаря
let taskScreen = document.querySelector('.task-screen') // Екран завдань
let addTaskScreen = document.querySelector('.add-task-screen') // Екран додавання завдань
let datePicker = document.querySelector('.date-picker') // Поле вибору дати
let selectDateButton = document.querySelector('.select-date') // Кнопка вибору дати
let selectedDateSpan = document.querySelector('.selected-date')
let taskDateSpan = document.querySelector('.task-date') // Елемент для відображення дати завдання
let taskList = document.querySelector('.task-list') // Список завдань
let addTaskButton = document.querySelector('.add-task') // Кнопка додавання завдання
let backToCalendarButton = document.querySelector('.back-to-calendar') // Кнопка повернення до календаря
let cancelAddTaskButton = document.querySelector('.cancel-add-task') // Кнопка скасування додавання завдання
let taskForm = document.querySelector('.task-form') // Форма додавання завдання
let taskInput = document.querySelector('.task-input') // Поле введення тексту завдання

// Ініціалізація порожнього об'єкта для зберігання завдань
let tasks = {}

function showScreen(name){
    calendarScreen.style.display = "none"
    taskScreen.style.display = "none"
    addTaskScreen.style.display = "none"
    name.style.display = "block"
}

selectDateButton.addEventListener("click", function(){
    let choosedDate = datePicker.value
    if(!choosedDate){
        alert("Оберіть дату")
        return
    }
    selectedDateSpan.innerHTML = choosedDate
    taskDateSpan.innerHTML = choosedDate
    showScreen(taskScreen)
    renderTasks(choosedDate)
})

function renderTasks(date){
    taskList.innerHTML = ""
    if(tasks[date]){
        tasks[date].forEach(function(task) {
            li = document.createElement('li')
            li.textContent = task

            const deleteBtn = document.createElement('button')
            deleteBtn.textContent = "Видалити"
            deleteBtn.classList.add('delete')
            li.appendChild(deleteBtn)

            taskList.appendChild(li)
        })
    }
}
// Додавання обробника події на кнопку додавання завдання
addTaskButton.addEventListener('click', function() {
    showScreen(addTaskScreen) // Показати екран додавання завдання
})


// Додавання обробника події на кнопку повернення до календаря
backToCalendarButton.addEventListener('click', function() {
    showScreen(calendarScreen) // Показати екран календаря
})


// Додавання обробника події на кнопку скасування додавання завдання
cancelAddTaskButton.addEventListener('click', function() {
    showScreen(taskScreen) // Показати екран завдань
})


// Додавання обробника події на форму додавання завдання
taskForm.addEventListener('submit', function(e) {
    //За замовчуванням, коли форму відправляють, браузер перезавантажує сторінку, що призводить до втрати всіх даних, які не зберігаються.
    e.preventDefault() // Запобігти стандартній поведінці форми
    let taskText = taskInput.value // Отримання тексту завдання
    let selectedDate = taskDateSpan.innerHTML // Отримання вибраної дати




    if (!tasks[selectedDate]) { // Якщо для вибраної дати немає завдань, створити новий масив
        tasks[selectedDate] = []
    }


    tasks[selectedDate].push(taskText) // Додати нове завдання до масиву завдань для вибраної дати
    taskInput.value = '' // Очистити поле введення
    showScreen(taskScreen) // Показати екран завдань
    renderTasks(selectedDate) // Відобразити завдання для вибраної дати
})


// Додавання обробника події на список завдань для видалення завдань
taskList.addEventListener('click', function(event) {
    if (event.target.className == 'delete') { // Якщо клік був на кнопку видалення
        let taskItem = event.target.parentElement // Отримати елемент завдання
        /*Тут event.target — це елемент, на який було натиснуто,
        а parentElement — це батьківський елемент цього елемента.
        Цей рядок використовує DOM властивість parentElement,
        щоб отримати батьківський елемент від елемента, на який було натиснуто. */
        let selectedDate = taskDateSpan.innerHTML // Отримати вибрану дату
        let taskText = taskItem.firstChild.nodeValue.trim() // Отримати текст завдання
        /*Тут taskItem — це елемент DOM, а firstChild — це перший дочірній вузол цього елемента.
        nodeValue повертає значення текстового вузла,
        а trim() видаляє пробіли з початку та кінця тексту.
        Цей рядок передбачає, що перший дочірній вузол є текстовим вузлом, і використовується для отримання та обробки тексту всередині цього елемента. */
        // Видалити завдання з масиву завдань для вибраної дати
        for (let i = 0; i < tasks[selectedDate].length; i+=1) {
            if (tasks[selectedDate][i] == taskText) {
                tasks[selectedDate].splice(i, 1) // Видалити завдання з масиву
                break
            }
        }
        renderTasks(selectedDate) // Відобразити оновлений список завдань
    }
})



