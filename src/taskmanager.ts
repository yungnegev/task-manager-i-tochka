import { type Task, FilterModel, TaskManagerInterface, StorageManagerInterface } from './types/types.js';
import { StorageManager } from './utils/storagemanager.js';
import { genuid, getnow, formatDate } from './utils/utils.js';

export class TaskManager implements TaskManagerInterface{
    private storagemanager: StorageManagerInterface;
    private tasks: Task[];
    private filtermodel: FilterModel

    constructor() {
        this.storagemanager = new StorageManager()
        this.tasks = this.storagemanager.get()
        this.filtermodel = {
            byCompleted: document.querySelector<HTMLInputElement>('.filter-completed')?.checked ?? false
        }
    }

    init = () => {
        this.render(this.tasks)
    }

    create = (e: Event) => {
        const raw = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(raw.entries()) as unknown as Task;
        const task: Task = {
            id: genuid(),
            title: data.title,
            description: data.description,
            completed: data.completed == 'on' ? true : false,
            date: getnow(),
            deadline: formatDate(data.deadline),
            location: data.location ?? '',
            assignee: data.assignee ?? '',
        }

        this.storagemanager.set(task)
    }

    update = (e: Event) => {
        const el = e.target as HTMLInputElement
        const task = this.tasks.find(task => task.id == el.value)
        if (!task) return;
        task.completed = el.checked
        const updated = this.tasks.map(t => t.id == task.id ? task : t)
        this.storagemanager.update(updated)
        this.tasks = updated
        this.render(updated)
    }

    delete = (e: Event) => {
        const el = e.target as HTMLButtonElement
        const task = this.tasks.find(task => task.id == el.value)
        if (!task) return;
        const updated = this.tasks.map(t => t.id == task.id ? null : t).filter(t => t != null)
        this.storagemanager.update(updated)
        this.tasks = updated
        this.render(updated)
    }

    filter = (e: Event) => {
        const el = e.target as HTMLInputElement
        if (el.dataset.type == 'completed') {
            this.filtermodel.byCompleted = el.checked
        }
        this.render(this.tasks)
    }

    private render = (tasks: Task[]) => {
        if (this.filtermodel.byCompleted) {
            tasks = this.tasks.filter(task => !task.completed)
        }

        const list = document.querySelector<HTMLUListElement>('.task-list')
        if (!list) throw new Error('no list')
        list.innerHTML = ''

        for (const task of tasks) {
            const li = document.createElement('li')
            li.classList.add('task-item')
            li.innerHTML = `
                <h3>${task.title} <span class="created">Созданно: ${task.date}</span></h3>
                <p>${task.description}</p>
                ${task.assignee && `<p><span class='param'>Ответственное лицо: </span>${task.assignee}</p>`}
                ${task.location && `<p><span class='param'>Место проведения: </span>${task.location}</p>`}
                ${task.deadline && `<p><span class='param'>Крайний срок: </span>${task.deadline}</p>`}
                <div class='actions'>
                    <label for="task-completed">выполнено: </label>
                    <input name="task-completed" type="checkbox" value=${task.id} class="status-input" ${task.completed && 'checked'}>
                    <button type="button" class="delete-button" value=${task.id}>🗑️</button>
                </div>
            `
            list.appendChild(li)
        }
        this.listen()
    }

    private listen() {
        document.querySelector<HTMLFormElement>('form')?.addEventListener('submit', this.create)
        document.querySelectorAll<HTMLInputElement>('.status-input')?.forEach(el => el.addEventListener('click', this.update))
        document.querySelectorAll<HTMLButtonElement>('.delete-button')?.forEach(el => el.addEventListener('click', this.delete))
        document.querySelector<HTMLInputElement>('.filter-completed')?.addEventListener('click', this.filter)
    }
}