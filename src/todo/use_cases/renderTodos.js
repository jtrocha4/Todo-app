import { createTodoHtml } from "./createTodoHtml";

let element

export const renderTodos = (elementId, todos = []) => {

    if (!element)
        element = document.querySelector(elementId)

    if (!element)
        throw new Error`Element ${elementId} not found`

    // Purgar contenido. Para que solo se renderize el ultimo valor que se inserto
    element.innerHTML = ''

    todos.forEach(todo => {
        element.append(createTodoHtml(todo))
    })

    // console.log(elementId, todos)
}