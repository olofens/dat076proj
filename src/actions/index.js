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
