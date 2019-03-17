import { returnStatement } from "@babel/types";

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
            var index = newCol.findIndex(task => task.id === action.payload.task.id);
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

        case "ADD_TASK":
            return Object.assign({}, state, {
                todoTasks: state.todoTasks.concat([action.payload.task])
            })

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

        case "DROP":
            if (action.payload.columnFrom === action.payload.columnTo) return state;
            var fromCol = getArray(action.payload.columnFrom, state);
            var toCol = getArray(action.payload.columnTo, state);
            var movedTask = fromCol.filter(
                task => task.id === parseInt(action.payload.id)
            );
            if (action.payload.columnTo === "doneTasks") {
                movedTask[0].datefinished = action.payload.date;
            } else {
                movedTask[0].datefinished = null;
            }
            return Object.assign({}, state, {
                [action.payload.columnFrom]: fromCol.filter(
                    task => task.id !== parseInt(action.payload.id)
                ),
                [action.payload.columnTo]: toCol.concat(movedTask)
            });

        case "UPDATE_TIME":
            var col;
            var toChange;
            if (state.todoTasks.some(task => task.id === action.payload.id)) {
                col = state.todoTasks;
                toChange = "todoTasks";
            } else if (state.doneTasks.some(task => task.id === action.payload.id)) {
                col = state.doneTasks;
                toChange = "doneTasks";
            } else {
                col = state.doingTasks;
                toChange = "doingTasks";
            }
            var index = col.findIndex(task => task.id === action.payload.id);
            col[index].elapsedtime = action.payload.time;

            return Object.assign({}, state, {
                [toChange]: col
            })

        default:
            return state;
    }
};

// Export this function for testing purposes (see reducers.test.js)
function getArray(name, state) {
    switch (name) {
        case "todoTasks":
            return state.todoTasks;
        case "doingTasks":
            return state.doingTasks;
        case "doneTasks":
            return state.doneTasks;
        default:
            return null;
    }
}
