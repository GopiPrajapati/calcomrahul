export interface CreateTaskScreenProps {
    route?: Route,
    navigation?: any
}
export interface Route {
    params: Params
}
export interface Params {
    setTasks: any
    onTaskSave: any
};