#!/usr/bin/env python

import os
from flask import Flask, render_template, jsonify, request, json
import dbconn

app = Flask(__name__)


@app.route("/tasks")
def tasks():
    myList = dbconn.getTasks()
    return jsonify(myList)

@app.route("/get_task")
def getTask():
    req = request.get_json()
    wantedId = req['id']
    myTask = dbconn.getElapsedTimeWithID(wantedId)
    return jsonify(myTask)

@app.route("/get_task_time", methods=['GET', 'POST'])
def getTaskTime():
    req_data = request.get_json()
    print(json.dumps(req_data))
    idNum = req_data['id']
    myTask = dbconn.getElapsedTimeWithID(idNum)
    return jsonify(myTask)



@app.route("/add_task", methods=['GET', 'POST'])
def addTask():

    req_data = request.get_json()

    print(json.dumps(req_data))

    title = req_data['title']
    description = req_data['description']
    estimatedTime = req_data['estimatedTime']

    resp = dbconn.createTask("Erik", title, description, estimatedTime)

    # For testing purposes
    return jsonify(resp)

@app.route("/api/delete_task", methods=["POST"])
def apiDeleteTask():
    req_data = request.get_json()
    taskId = req_data['id']
    print(req_data)
    dbconn.deleteTask(taskId)
    return "OK"

@app.route("/api/update_task_fin", methods=["POST"])
def apiUpdateTaskFin():
    req_data = request.get_json()
    dbconn.updateTaskFin(
        req_data["id"],
        req_data["datefinished"]
    )
    return "OK"

@app.route("/api/update_task_time", methods=["POST"])
def apiUpdateTaskTime():
    req_data = request.get_json()
    dbconn.updateTaskTime(
        req_data["id"],
        req_data["elapsedtime"]
    )
    return "OK"

@app.route("/api/update_task", methods=["POST"])
def apiUpdateTask():
    req_data = request.get_json()
    dbconn.updateTask(
        req_data["id"],
        req_data["title"],
        req_data["description"],
        req_data["elapsedtime"],
        req_data["estimatedtime"],
        req_data["datefinished"]
    )
    return "OK"

# Since we are using react-router in our front-end to handle routing, we only want to open up
# our index.html file and our API from the back-end. 
# What you see here below is the back-end always redirecting to the index.html file (react then knows what to do)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
