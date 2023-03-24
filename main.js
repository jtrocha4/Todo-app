import './style.css'
import { App } from './src/todo/app'
import todoStore from './src/store/todo'

todoStore.initStore()
App("#app")