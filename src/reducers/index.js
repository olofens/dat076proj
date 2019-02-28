const initialState = {
    todoTasks: [],
    doingTasks: [],
    doneTasks: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TODO_CLICK':
            return Object.assign({}, state, {
                todoTasks: state.todoTasks.filter((task) => task.id !== action.payload.task.id),
                doingTasks: state.doingTasks.concat([action.payload.task])
            })

        case 'DOING_CLICK_BACK':
            return Object.assign({}, state, {
                doingTasks: state.doingTasks.filter((task) => task.id !== action.payload.task.id),
                todoTasks: state.todoTasks.concat([action.payload.task])
            })

        case 'DOING_CLICK_FORWARD':
            return Object.assign({}, state, {
                doingTasks: state.doingTasks.filter((task) => task.id !== action.payload.task.id),
                doneTasks: state.doneTasks.concat([action.payload.task])
            }) 
            
        case 'DONE_CLICK':
            return Object.assign({}, state, {
                doneTasks: state.doneTasks.filter((task) => task.id !== action.payload.task.id),
                doingTasks: state.doingTasks.concat([action.payload.task])
            })

        case 'INIT':
            return Object.assign({}, state, {
                todoTasks: action.todoTasks
            })

        default:
            return state
    }
}




function getArray(name) {
    switch (name) {
        case 'todoTasks':
            return initialState.todoTasks
        case 'doingTasks':
            return initialState.doingTasks
        case 'doneTasks':
            return initialState.doneTasks
        default:
            return null
    }
}

function findIndex(array, id) {
    console.log("given array " + JSON.stringify(array))
    for (var i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return i;
        }
    }
    return null;
}