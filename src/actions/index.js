export const deleteTask = (task, column) => {
  fetch(`http://127.0.0.1:3000/api/delete_task?id=${task.id}`);
  return {
    type: "DELETE_TASK",
    payload: { task: task, column: column }
  }
}

export const addTask = (task) => {
  return {
    type: "ADD_TASK",
    payload: { task: task }
  }
}

export const startEditTask = (task, column) => {
  return {
    type: "START_EDIT_TASK",
    payload: { task: task, column: column }
  };
};

export const finishEditTask = (task, column) => {
  return {
    type: "FINISH_EDIT_TASK",
    payload: { task: task, column: column }
  };
};

export const closeEditTask = () => {
  return {
    type: "CLOSE_EDIT_TASK"
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
        dispatch(setTasks(responseData));
      });
  };
};

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

export const dragTask = (id, column) => {
  return {
    type: "DRAG",
    payload: { id: id, column: column }
  };
};

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
