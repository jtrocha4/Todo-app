import { Todo } from '../todo/models/todo';

export const Filters = {
    All: "all",
    Pending: "pending",
    Complete: "completed"
}

const State = {
    todos: [
        // new Todo("Confirmar pago del reloj"),
        // new Todo("Terminar el curso de JS"),
        // new Todo("Realizar el proyecto de Analisis de Redes")
    ],
    filter: Filters.All
}

const initStore = () => {
    console.log("InitStore 🐇")
    loadStore()
}

const loadStore = () => {
    if (!localStorage.getItem('storage')) return
    // console.log(JSON.parse(localStorage.getItem('storage')))
    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('storage'))
    State.todos = todos
    State.filter = filter
}

const saveLocalStorage = () => {
    localStorage.setItem('storage', JSON.stringify(State))
}

const getTodos = (filter = Filters.All) => {

    switch (filter) {
        case Filters.All:
            return [...State.todos]
        case Filters.Complete:
            return State.todos.filter(todo => todo.done)
        case Filters.Pending:
            return State.todos.filter(todo => !todo.done)
        default:
            throw new Error("The filter is not value")
    }

}

const addTodos = (description) => {
    if (!description) throw new Error("The required description")
    State.todos.push(new Todo(description))
    saveLocalStorage()
}

const toogleTodo = (todoId) => {
    State.todos = State.todos.map(el => {
        if (el.id === todoId) {
            el.done = !el.done
        }
        return el
    })
    saveLocalStorage()
}

const deleteTodos = (todoId) => {
    State.todos = State.todos.filter(todo => todo.id !== todoId)
    saveLocalStorage()
}

const deleteCompleted = () => {
    State.todos = State.todos.filter(todo => !todo.done)
    saveLocalStorage()
}

const setSelectorFilter = (newFilters = Filters.All) => {
    State.filter = newFilters
    saveLocalStorage()
}

const getCurrentFilter = () => {
    return State.filter
}

export default {
    addTodos,
    deleteCompleted,
    deleteTodos,
    getCurrentFilter,
    getTodos,
    initStore,
    setSelectorFilter,
    toogleTodo,
}