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
    searchword = request.args.get('id')

    myTask = dbconn.getElapsedTimeWithID(searchword)
    #print(json.dumps(myTask))

    return jsonify(myTask)

@app.route("/get_task_time", methods=['GET', 'POST'])
def getTaskTime():
    req_data = request.get_json()

    print(json.dumps(req_data))

    idNum = req_data['id']
    myTask = dbconn.getElapsedTimeWithID(idNum)
    #print(json.dumps(myTask))

    return jsonify(myTask)

@app.route("/update_time", methods=['GET', 'POST'])
def updateTime():
    #print("Update time:")
    idNum = request.args.get('id')
    time = request.args.get('time')
    dbconn.updateTime(idNum,time)
    return 'OK'

@app.route("/update_datefinished", methods=['GET', 'POST'])
def updateDatefinished():
    #print("Update time:")
    idNum = request.args.get('id')
    datefinished = request.args.get('datefinished')
    dbconn.updateDatefinished(idNum, datefinished)
    return 'OK'

@app.route("/add_task", methods=['GET', 'POST'])
def addTask():

    req_data = request.get_json()

    print(json.dumps(req_data))

    title = req_data['title']
    description = req_data['description']
    estimatedTime = req_data['estimatedTime']

    dbconn.createTask("Erik", title, description, estimatedTime)

    # For testing purposes
    return 'OK'

@app.route("/api/delete_task")
def apiDeleteTask():
    taskId = request.args.get("id")
    dbconn.deleteTask(taskId)
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

@app.route("/update_task", methods=["POST"])
def updateTask():
    taskId = request.form['id']
    title = request.form['title']
    description = request.form['description']
    elapsedTime = request.form['elapsedTime']
    estimatedTime = request.form['estimatedTime']

    dbconn.updateTask(taskId, title, description, elapsedTime, estimatedTime)

    return 'OK'


# Since we are using react-router in our front-end to handle routing, we only want to open up
# our index.html file and our API from the back-end. 
# What you see here below is the back-end always redirecting to the index.html file (react then knows what to do)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
