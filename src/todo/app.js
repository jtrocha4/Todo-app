/**
    El ?raw es un modificador de la URL que se utiliza para obtener el contenido de un archivo como una cadena de texto sin procesar (raw).
    Se utiliza principalmente en Vite para obtener el contenido de archivos estáticos, como archivos HTML, CSS, JS o cualquier otro tipo de archivo que contenga datos que puedan ser útiles como cadenas de texto sin procesar.
 */
import html from './app.html?raw'
import todoStore, { Filters } from '../store/todo'
import { renderPending, renderTodos } from './use_cases'

/**
 * 
 * @param {String} elementId element where the application will be rendered
 */

const elementHtml = {
    todoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    clearCompleted: '.clear-completed',
    TodosFilters: '.filter',
    pendingCount: '#pending-count'
}

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter())
        renderTodos(elementHtml.todoList, todos)
        updatePendingCount()
    }

    const updatePendingCount = () => {
        renderPending(elementHtml.pendingCount)
    }

    (() => {
        const app = document.createElement("div")
        app.innerHTML = html
        document.querySelector(elementId).append(app)
        displayTodos()
    })()

    //Referencias Html
    const newDescriptionInput = document.querySelector(elementHtml.newTodoInput)
    const todoListUl = document.querySelector(elementHtml.todoList)
    const clearCompleted = document.querySelector(elementHtml.clearCompleted)
    const filtersLi = document.querySelectorAll(elementHtml.TodosFilters)

    //Listener
    newDescriptionInput.addEventListener('keyup', (e) => {

        if (e.key !== 'Enter') return
        if (e.target.value.trim().length === 0) return

        todoStore.addTodos(e.target.value)
        displayTodos()

        e.target.value = ''

    })


    todoListUl.addEventListener('click', (e) => {
        const elementDad = e.target.closest("[data-id]")
        //    console.log(elementDad.getAttribute("data-id"))
        todoStore.toogleTodo(elementDad.getAttribute("data-id"))
        displayTodos()
    })

    todoListUl.addEventListener('click', (e) => {
        const elementDad = e.target.closest("[data-id]")
        // const btnDelete = e.target.closest(".destroy")

        // if(e.target !== btnDelete) return
        // console.log(`Delete ${elementDad.getAttribute("data-id")}`)

        // todoStore.deleteTodos(elementDad.getAttribute("data-id"))
        // displayTodos()

        //Metodo 2
        const isDestroyElement = e.target.className == "destroy"
        if (!isDestroyElement) return

        todoStore.deleteTodos(elementDad.getAttribute("data-id"))
        displayTodos()
    })

    clearCompleted.addEventListener('click', () => {
        todoStore.deleteCompleted()
        displayTodos()
    })

    filtersLi.forEach(el => {
        el.addEventListener('click', (e) => {
            //Removes the selected when selecting another link
            filtersLi.forEach(el => el.classList.remove("selected"))

            //Adds the select when selecting a link
            e.target.classList.add("selected")

            console.log(e.target.id)
            switch (e.target.id) {
                case "filter-todos":
                    todoStore.setSelectorFilter(Filters.All)
                    break;
                case "filter-pending":
                    todoStore.setSelectorFilter(Filters.Pending)
                    break;
                case "filter-completed":
                    todoStore.setSelectorFilter(Filters.Complete)
                    break;
            }
            displayTodos()
        })
    })
}