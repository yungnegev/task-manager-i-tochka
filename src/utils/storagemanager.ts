import { type Task, StorageManagerInterface } from '../types/types'

export class StorageManager implements StorageManagerInterface{
    private storeKey = 'stored-tasks'

    get = (): Task[] => {
        const raw = localStorage.getItem(this.storeKey)
        if (raw) return JSON.parse(raw)
        return []
    }

    set = (task: Task) => {
        const list = this.get()
        list.unshift(task)
        const string = JSON.stringify(list)
        localStorage.setItem(this.storeKey, string)
    }

    update = (tasks: Task[]) => {
        const string = JSON.stringify(tasks)
        localStorage.setItem(this.storeKey, string)
    }
}