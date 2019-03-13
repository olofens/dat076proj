export const startEditTask = (task, column) => {
    return {
        type: "START_EDIT_TASK",
        payload: { task: task, column: column }
    }
}

export const finishEditTask = (task, column) => {
    return {
        type: "FINISH_EDIT_TASK",
        payload: { task: task, column: column }
    };
};

export const doingClickBack = task => {
    return {
        type: "DOING_CLICK_BACK",
        payload: { task: task }
    };
};

export const doingClickForward = task => {
    return {
        type: "DOING_CLICK_FORWARD",
        payload: { task: task }
    };
};


export const closeEditTask = () => {
    return {
        type: "CLOSE_EDIT_TASK"
    }
}

export const doneClick = task => {
    return {
        type: "DONE_CLICK",
        payload: { task: task }
    };
};

export const showModal = () => {
    return {
        type: "SHOW_MODAL"
    };
};

export const hideModal = () => {
    return {
        type: "HIDE_MODAL"
    };
};

export const init = () => {
    return dispatch => {
        return fetch("http://127.0.0.1:3000/tasks")
            .then(response => response.json())
            .then(responseData => {
                dispatch(updateTasks(responseData));
            });
    };
};

export const updateTasks = data => {
    console.log(data);
    const array1 = data;
    const todoArray = array1.filter(task => {
        return task.datefinished === null;
    });
    const doneArray = array1.filter(task => {
        return task.datefinished !== null;
    });
    console.log("Todoarray: ");
    console.log(todoArray);
    console.log("Donearray: ");
    console.log(doneArray);

    return {
        type: "INIT",
        todoTasks: todoArray,
        doneTasks: doneArray
    };
};

export const dragTask = (id, column) => {
    console.log("drag");
    return {
        type: "DRAG",
        payload: { id: id, column: column }
    };
};

export const dropTask = (id, columnFrom, columnTo) => {
    return {
        type: "DROP",
        payload: { id: id, columnFrom: columnFrom, columnTo: columnTo }
    };
};
