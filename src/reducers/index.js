const initialState = {
    todoTasks: [],
    doingTasks: [],
    doneTasks: [], 
    heldTasks: []
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

        case 'DRAG': // not used atm
            if (action.payload.column == "LEFT") {
                return Object.assign({}, state, {
                    heldTasks: state.todoTasks.filter((task) => task.id === parseInt(action.payload.id))
                })
            }

            else if (action.payload.column == "MIDDLE") {
                return Object.assign({}, state, {
                    heldTasks: state.doingTasks.filter((task) => task.id === parseInt(action.payload.id))
                })
            }

            else if (action.payload.column == "RIGHT") {
                return Object.assign({}, state, {
                    heldTasks: state.doneTasks.filter((task) => task.id === parseInt(action.payload.id))
                })
            }
        
        case 'DROP':
            if (action.payload.columnFrom == action.payload.columnTo) {
                break;
            } 

            console.log("DROP RUNNING");
            console.log("colfrom: " + action.payload.columnFrom);
            console.log("colto: " + action.payload.columnTo);

            var fromCol = getArray(action.payload.columnFrom, state);
            var toCol = getArray(action.payload.columnTo, state);

            console.log(fromCol);
            console.log(toCol);

            var movedTask = fromCol.filter((task) => task.id === parseInt(action.payload.id));

            console.log(fromCol);

            return Object.assign({}, state, {
                [action.payload.columnFrom]: fromCol.filter((task) => task.id !== parseInt(action.payload.id)),
                [action.payload.columnTo]: toCol.concat(movedTask)
            })
            
        default:
            return state
    }
}




function getArray(name, state) {
    switch (name) {
        case 'todoTasks':
            console.log("hello");
            return state.todoTasks
        case 'doingTasks':
            return state.doingTasks
        case 'doneTasks':
            return state.doneTasks
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