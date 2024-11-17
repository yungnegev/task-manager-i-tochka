// столкнулся с ошибкой когда запускал index.html при помощи live server (vscode extension), помогло добавить .js в импорты
// Loading module from “http://127.0.0.1:5500/dist/taskmanager was blocked because of a disallowed MIME type (“text/html”).index.html
import { TaskManager } from './taskmanager.js'

document.addEventListener('DOMContentLoaded', () => {
    const taskmanager = new TaskManager()
    taskmanager.init()
})
