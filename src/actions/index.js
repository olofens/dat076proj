// Delete a task in specified column. 
export const deleteTask = (task, column) => {
  fetch("http://127.0.0.1:3000/api/delete_task", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "id": task.id })
  });
  return {
    type: "DELETE_TASK",
    payload: { task: task, column: column }
  }
}

// Add a task. Always ends up in todoTasks.
export const addTask = (task) => {
  return {
    type: "ADD_TASK",
    payload: { task: task }
  }
}

// Update the state to reflect which task is currently being edited (and which column 
// this task is in)
export const startEditTask = (task, column) => {
  return {
    type: "START_EDIT_TASK",
    payload: { task: task, column: column }
  };
};

// Pass in a new task and the column in which it should be contained
// This task is mutated and will replace an already existing task (with the same id)
// in the column specified
export const finishEditTask = (task, column) => {
  return {
    type: "FINISH_EDIT_TASK",
    payload: { task: task, column: column }
  };
};

// Here we cancel the started editing. Used to just close the modal.
export const closeEditTask = () => {
  return {
    type: "CLOSE_EDIT_TASK"
  };
};

// Used to open the adding modal
export const showModal = () => {
  return {
    type: "SHOW_MODAL"
  };
};

// Used to close the adding modal (used when cancelling the adding process)
export const hideModal = () => {
  return {
    type: "HIDE_MODAL"
  };
};

// Sends request to API to get the existing tasks. 
// Then calls next action setTasks which disperses these gotten tasks
// and fills the state appropriately. 
export const init = () => {
  return dispatch => {
    return fetch("http://127.0.0.1:3000/tasks")
      .then(response => response.json())
      .then(responseData => {
        dispatch(setTasks(responseData));
      });
  };
};

// Fills the state with the given tasks. 
// If a task doesn't have a datefinished attribute set, then it should be spawned
// in the todo-column. Otherwise it is done and should be spawned in the done-column.
export const setTasks = data => {
  console.log(data);
  const array1 = data;
  const todoArray = array1.filter(task => {
    return task.datefinished === null || task.datefinished === "null";
  });
  const doneArray = array1.filter(task => {
    return task.datefinished !== null && task.datefinished !== "null";
  });

  return {
    type: "INIT",
    todoTasks: todoArray,
    doneTasks: doneArray
  };
};

 // Used to notify the state that a task is being dragged. 
 // Useful when wanting to determine where a coming drop action
 // was dragged from. 
export const dragTask = (id, column) => {
  return {
    type: "DRAG",
    payload: { id: id, column: column }
  };
};

// Called when an action is dropped in a column. If a task is dropped
// in the done-column, then set its datefinished attribute. 
// If the user is dragged away from the done-column, the user
// wants to continue working with this task, so we remove the value
// set on datefinished. 
// Also update database with same information. 
export const dropTask = (id, columnFrom, columnTo) => {
  var date;
  if (columnTo === "doneTasks") {
    date = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  } else {
    date = null;
  }
  fetch("http://127.0.0.1:3000/api/update_task_fin", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "id": id, "datefinished": date })
  });

  return {
    type: "DROP",
    payload: { id: id, columnFrom: columnFrom, columnTo: columnTo, date: date }
  };
};

// Used to update the time when toggling from middleTasks
// and when dropping from middleTask to somewhere else 
// if the user doesn't stop the timer before dragging. 
export const updateTime = (id, time) => {
  fetch("http://127.0.0.1:3000/api/update_task_time", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "id": id, "elapsedtime": time })
  });

  return {
    type: "UPDATE_TIME",
    payload: { id: id, time: time }
  }
}
