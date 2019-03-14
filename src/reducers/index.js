const initialState = {
    todoTasks: [],
    doingTasks: [],
    doneTasks: [],
    heldTasks: [],
    modalIsOpen: false,
    editTask: {
        title: "",
        description: "",
        elapsedtime: 0
    },
    editVisible: false,
    editColumn: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "START_EDIT_TASK":
            return Object.assign({}, state, {
                editTask: action.payload.task,
                editVisible: true,
                editColumn: action.payload.column
            });

        case "FINISH_EDIT_TASK":
            var col = getArray(action.payload.column, state);
            var newCol = col.slice();
            var index = newCol.findIndex(task => task === action.payload.task);
            newCol[index] = action.payload.task;

            return Object.assign({}, state, {
                editVisible: false, 
                [action.payload.column]: newCol
            })

        case "DELETE_TASK":
            var col = getArray(action.payload.column, state);
            return Object.assign({}, state, {
                [action.payload.column]: col.filter((task) => task.id !== action.payload.task.id)
            })

        case "CLOSE_EDIT_TASK":
            return Object.assign({}, state, {
                editVisible: false
            });

        case "DOING_CLICK_BACK":
            return Object.assign({}, state, {
                doingTasks: state.doingTasks.filter(
                    task => task.id !== action.payload.task.id
                ),
                todoTasks: state.todoTasks.concat([action.payload.task])
            });

        case "DOING_CLICK_FORWARD":
            return Object.assign({}, state, {
                doingTasks: state.doingTasks.filter(
                    task => task.id !== action.payload.task.id
                ),
                doneTasks: state.doneTasks.concat([action.payload.task])
            });

        case "DONE_CLICK":
            return Object.assign({}, state, {
                doneTasks: state.doneTasks.filter(
                    task => task.id !== action.payload.task.id
                ),
                doingTasks: state.doingTasks.concat([action.payload.task])
            });

        case "SHOW_MODAL":
            return Object.assign({}, state, {
                modalIsOpen: true
            });

        case "HIDE_MODAL":
            return Object.assign({}, state, {
                modalIsOpen: false
            });

        case "INIT":
            return Object.assign({}, state, {
                todoTasks: action.todoTasks,
                doneTasks: action.doneTasks
            });

        case "DRAG": // not used atm
            if (action.payload.column == "LEFT") {
                return Object.assign({}, state, {
                    heldTasks: state.todoTasks.filter(
                        task => task.id === parseInt(action.payload.id)
                    )
                });
            } else if (action.payload.column == "MIDDLE") {
                return Object.assign({}, state, {
                    heldTasks: state.doingTasks.filter(
                        task => task.id === parseInt(action.payload.id)
                    )
                });
            } else if (action.payload.column == "RIGHT") {
                return Object.assign({}, state, {
                    heldTasks: state.doneTasks.filter(
                        task => task.id === parseInt(action.payload.id)
                    )
                });
            }

        case "DROP":
            var fromCol = getArray(action.payload.columnFrom, state);
            var toCol = getArray(action.payload.columnTo, state);
            var movedTask = fromCol.filter(
                task => task.id === parseInt(action.payload.id)
            );
            return Object.assign({}, state, {
                [action.payload.columnFrom]: fromCol.filter(
                    task => task.id !== parseInt(action.payload.id)
                ),
                [action.payload.columnTo]: toCol.concat(movedTask)
            });

        default:
            return state;
    }
};

function isMyTask(element, task) {
    return 
}

function getArray(name, state) {
    switch (name) {
        case "todoTasks":
            console.log("hello");
            return state.todoTasks;
        case "doingTasks":
            return state.doingTasks;
        case "doneTasks":
            return state.doneTasks;
        default:
            return null;
    }
}

function findIndex(array, id) {
    console.log("given array " + JSON.stringify(array));
    for (var i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return i;
        }
    }
    return null;
}
