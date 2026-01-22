import taskSlice from './TaskSlice'

export function loadState() {
    try {
        const getState = localStorage.getItem('tasks');
        return getState ? JSON.parse(getState) : undefined
    } catch (error) {
        console.error(error);
        return undefined
    }
}

export const saveState = (state) => {
    try {
        const saveToLocalStorage = JSON.stringify(state)
        localStorage.setItem("tasks", saveToLocalStorage)
    } catch (error) {
        console.error(error)
    }
}