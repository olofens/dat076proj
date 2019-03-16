import reducer from "../index.js"
//import { getArray } from "../index.js"

const dummyTask = {
    datecreated: "Thu, 14 Mar 2019 18:40:07 GMT",
    id: 0,
    title: "Testing jest",
    description: "Test desc",
    estimatedtime: 120,
    elapsedtime: null,
    userid: "Erik"
}
const dummyTaskWithChanges = {
    datecreated: "Thu, 14 Mar 2019 18:40:07 GMT",
    id: 0,
    title: "Testing jest changed",
    description: "Test desc changed",
    estimatedtime: 210,
    elapsedtime: null,
    userid: "Erik"
}

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

const dummyEditTask = {
    title: "Testing jest",
    description: "Test desc",
    estimatedtime: 120
}

describe("reducers", () => {

    it("should return the initial state (default behaviour)", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it("should handle start_edit_task", () => {
        const dummyColumn = "todoTasks";
        expect(
            reducer(initialState, {
                    type: "START_EDIT_TASK",
                    payload: {task: dummyEditTask, column: dummyColumn}
                }
            )
        ).toEqual(
            Object.assign({}, initialState, {
                editTask: dummyEditTask,
                editVisible: true,
                editColumn: dummyColumn
            })
        )
    })

    it("should handle finish_edit_task", () => {
        const dummyColumn = "todoTasks";
        const stateWithStartEditAndTask = Object.assign({}, initialState, {
            editTask: dummyEditTask,
            editVisible: true,
            editColumn: dummyColumn,
            todoTasks: initialState.todoTasks.concat([dummyTask])
        });
        const expectedState = Object.assign({}, stateWithStartEditAndTask, {
            editVisible: false,
            todoTasks: [dummyTaskWithChanges]
        });

        expect(reducer(stateWithStartEditAndTask, {
            type: "FINISH_EDIT_TASK",
            payload: {task: dummyTaskWithChanges, column: dummyColumn}
        })).toEqual(expectedState)
    })

    it("should handle delete_task", () => {
        const dummyColumn = "todoTasks";
        const stateWithTask = Object.assign({}, initialState, {
            todoTasks: initialState.todoTasks.concat([dummyTask])
        });

        expect(reducer(stateWithTask, {
            type: "DELETE_TASK",
            payload: {task: dummyTask, column: dummyColumn}
        })).toEqual(initialState)
    })

    it("should handle close_edit_task", () => {
        const stateWithEditOpened = Object.assign({}, initialState, {
            editVisible: true
        });
        expect(reducer(stateWithEditOpened, {
            type: "CLOSE_EDIT_TASK"
        })).toEqual(initialState)
    })

    it("should handle add task", () => {
        const stateWithAddedTask = Object.assign({}, initialState, {
            todoTasks: initialState.todoTasks.concat([dummyTask])
        });
        expect(reducer(initialState, {
            type: "ADD_TASK",
            payload: {task: dummyTask}
        })).toEqual(stateWithAddedTask)
    })

    it("should handle show_modal", () => {
        const stateWithShowingModal = Object.assign({}, initialState, {
            modalIsOpen: true
        });
        expect(reducer(initialState, {
            type: "SHOW_MODAL"
        })).toEqual(stateWithShowingModal)
    })

    it("should handle show_modal", () => {
        const stateWithShowingModal = Object.assign({}, initialState, {
            modalIsOpen: true
        });
        expect(reducer(stateWithShowingModal, {
            type: "HIDE_MODAL"
        })).toEqual(initialState)
    })

    it("should handle dropping onto same column (no change)", () => {
        const stateWithTask = Object.assign({}, initialState, {
            todoTasks: initialState.todoTasks.concat([dummyTask])
        });
        const dummyColumnFrom = "todoTasks";
        const dummyColumnTo = "todoTasks";
        // null because we are dropping from a column in which tasks are not finished
        // as in have no date here
        const dummyDate = null;
        // id columnFrom columnTo date
        expect(reducer(stateWithTask, {
            type: "DROP",
            payload: {
                id: dummyTask.id, 
                columnFrom: dummyColumnFrom, 
                columnTo: dummyColumnTo,
                date: dummyDate
            }
        })).toEqual(stateWithTask)
    })

    it("should handle dropping from non-done to done column", () => {
        const stateWithNonDoneTask = Object.assign({}, initialState, {
            todoTasks: initialState.todoTasks.concat([dummyTask])
        });
        const stateWithDoneTask = Object.assign({}, initialState, {
            doneTasks: initialState.doneTasks.concat([dummyTask])
        });
        expect(reducer(stateWithNonDoneTask, {
            type: "DROP", 
            payload: {
                id: dummyTask.id,
                columnFrom: "todoTasks", 
                columnTo: "doneTasks",
                date: null
            }
        })).toEqual(stateWithDoneTask)
    })

    it("should handle dropping from done to non-done column", () => {
        const stateWithNonDoneTask = Object.assign({}, initialState, {
            todoTasks: initialState.todoTasks.concat([dummyTask])
        });
        const stateWithDoneTask = Object.assign({}, initialState, {
            doneTasks: initialState.doneTasks.concat([dummyTask])
        });

        expect(reducer(stateWithDoneTask, {
            type: "DROP", 
            payload: {
                id: dummyTask.id,
                columnFrom: "doneTasks", 
                columnTo: "todoTasks",
                date: null
            }
        })).toEqual(stateWithNonDoneTask)
    })
})