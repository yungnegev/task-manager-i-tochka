const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

export function genuid(): string {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return s4() + s4() + '-' + s4() + s4()
}

export function getnow(): string {
    const newDate = new Date()
    return newDate.toLocaleDateString("ru-RU", options)
}

export function formatDate(date: string): string {
    if (date.length == 0) return ''
    const newDate = new Date(date)
    return newDate.toLocaleDateString("ru-RU", options)
}