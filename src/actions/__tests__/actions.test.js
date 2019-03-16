import * as actions from "../index.js"
import "isomorphic-fetch"

const dummyTask = {
    datecreated: "Thu, 14 Mar 2019 18:40:07 GMT",
    id: 0,
    title: "Testing jest",
    description: "Test desc",
    estimatedtime: 120,
    elapsedtime: null,
    userid: "Erik"
}

const dummyColumn = "todoTasks"

describe("actions", () => {
    it("should create an action to add a task", () => {
        const expectedAction = {
            type: "ADD_TASK",
            payload: { task: dummyTask }
        }
        expect(actions.addTask(dummyTask)).toEqual(expectedAction)
    })

    it("should create an action to start editing a task", () => {
        const expectedAction = {
            type: "START_EDIT_TASK",
            payload: { task: dummyTask, column: dummyColumn }
        }
        expect(actions.startEditTask(dummyTask, dummyColumn)).toEqual(expectedAction)
    })

    it("should create an action to finish editing a task", () => {
        const expectedAction = {
            type: "FINISH_EDIT_TASK",
            payload: { task: dummyTask, column: dummyColumn }
        }
        expect(actions.finishEditTask(dummyTask, dummyColumn)).toEqual(expectedAction)
    })

    it("should create an action to stop editing a task", () => {
        const expectedAction = {
            type: "CLOSE_EDIT_TASK"
        }
        expect(actions.closeEditTask()).toEqual(expectedAction)
    })

    it("should create an action to show modal", () => {
        const expectedAction = {
            type: "SHOW_MODAL"
        }
        expect(actions.showModal()).toEqual(expectedAction)
    })

    it("should create an action to hide modal", () => {
        const expectedAction = {
            type: "HIDE_MODAL"
        }
        expect(actions.hideModal()).toEqual(expectedAction)
    })

    it("should call a function (namely setTasks)", () => {
        expect(actions.init()).toEqual(expect.any(Function))
    })

    it("should create first arrays", () => {
        const expectedAction = {
            type: "INIT",
            todoTasks: [],
            doneTasks: []
        }
        expect(actions.setTasks([])).toEqual(expectedAction)
    })

    it("should create an action to start a drag", () => {
        const dummyId = 0;
        const expectedAction = {
            type: "DRAG",
            payload: { id: dummyId, column: dummyColumn }
        }
        expect(actions.dragTask(dummyId, dummyColumn)).toEqual(expectedAction)
    })

    it("should create an action to drop a task onto doneTasks column", () => {
        const dummyDate = new Date().toISOString().slice(0, 19).replace("T", " ");
        const dummyColFrom = "todoTasks";
        const dummyColTo = "doneTasks";
        const dummyId = 1;
        const expectedAction = {
            type: "DROP",
            payload: { id: dummyId, columnFrom: dummyColFrom, columnTo: dummyColTo, date: dummyDate }
        }
        expect(actions.dropTask(dummyId, dummyColFrom, dummyColTo, dummyDate)).toEqual(expectedAction)
    })
})