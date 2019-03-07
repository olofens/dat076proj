export const todoClick = (task) => {
    return {
        type: 'TODO_CLICK',
        payload: {task: task}
    }
}

export const doingClickBack = (task) => {
    return {
        type: 'DOING_CLICK_BACK',
        payload: {task: task}
    }
}

export const doingClickForward = (task) => {
    return {
        type: 'DOING_CLICK_FORWARD',
        payload: {task: task}
    }
}

export const doneClick = (task) => {
    return {
        type: 'DONE_CLICK',
        payload: {task: task}
    }
}

export const showModal = () => {
    return {
        type: 'SHOW_MODAL'
        
    }
}

export const hideModal = () => {
    return {
        type: 'HIDE_MODAL'
        
    }
}



export const init = () => {
    return(dispatch) => {
        return fetch("http://127.0.0.1:3000/tasks").then(response => response.json()) .then((responseData) => {
            dispatch(updateTasks(responseData));
        })
    }
}

export const updateTasks = (data) => {
    console.log(data);
    return {
        type: "INIT",
        todoTasks: data
    }
}

export const dragTask = (id, column) => {
    console.log("drag");
    return {
        type: "DRAG",
        payload: {id: id, column: column}
    }
}

export const dropTask = (id, columnFrom, columnTo) => {
    return {
        type: "DROP", 
        payload: {id: id, columnFrom: columnFrom, columnTo:columnTo}
    }
}
