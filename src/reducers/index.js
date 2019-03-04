const initialState = {
  todoTasks: [],
  doingTasks: [],
  doneTasks: [],
  timedTasks: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "TODO_CLICK":
      var startTime = new Date().getTime();
      console.log(action.payload.task);

      return Object.assign({}, state, {
        todoTasks: state.todoTasks.filter(
          task => task.id !== action.payload.task.id
        ),
        doingTasks: state.doingTasks.concat([action.payload.task]),
        timedTasks: state.timedTasks.concat([
          { id: action.payload.task.id, startTime: startTime }
        ])
      });

    case "DOING_CLICK_BACK":
      return Object.assign({}, state, {
        doingTasks: state.doingTasks.filter(
          task => task.id !== action.payload.task.id
        ),
        todoTasks: state.todoTasks.concat([action.payload.task])
      });

    case "DOING_CLICK_FORWARD":
      const currTime = new Date().getTime();
      console.log(state.timedTasks.find(o => o.id === action.payload.task.id));
      const startObject = state.timedTasks.find(
        o => o.id === action.payload.task.id
      );
      const elapsedTime = currTime - startObject.startTime;
      console.log(elapsedTime);
      console.log(action.payload.task.elapsedtime);

      const totalElapsedTime = elapsedTime + action.payload.task.elapsedtime;
      console.log(action.payload.task.elapsedtime);
      console.log(totalElapsedTime);

      var updatedTask = {
        datecreated: action.payload.task.datecreated,
        datefinished: null,
        description: action.payload.task.description,
        elapsedtime: totalElapsedTime,
        estimatedtime: action.payload.task.estimatedtime
      };
      console.log(updatedTask);
      // const startTime = state.timedTasks.find(o => o.startTime === action.payload.task
      return Object.assign({}, state, {
        doingTasks: state.doingTasks.filter(
          task => task.id !== action.payload.task.id
        ),
        doneTasks: state.doneTasks.concat([updatedTask])
      });

    case "DONE_CLICK":
      return Object.assign({}, state, {
        doneTasks: state.doneTasks.filter(
          task => task.id !== action.payload.task.id
        ),
        doingTasks: state.doingTasks.concat([action.payload.task])
      });

    case "INIT":
      return Object.assign({}, state, {
        todoTasks: action.todoTasks
      });

    default:
      return state;
  }
};

function getArray(name) {
  switch (name) {
    case "todoTasks":
      return initialState.todoTasks;
    case "doingTasks":
      return initialState.doingTasks;
    case "doneTasks":
      return initialState.doneTasks;
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
