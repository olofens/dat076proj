#!/usr/bin/env python

import os
from flask import Flask, render_template, jsonify, request, json
import dbconn

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/tasks")
def tasks():
    myList = dbconn.getTasks()
    return jsonify(myList)

@app.route("/add_task", methods=['GET', 'POST'])
def addTask():
    
    req_data = request.get_json()

   

    print(json.dumps(req_data))

    title = req_data['title']
    description = req_data['description']
    estimatedTime = req_data['estimatedTime']


    dbconn.createTask("Erik",title,description,estimatedTime)

    return 'OK'


@app.route("/update_task")
def updateTask():
    taskId = request.form['id']
    title = request.form['title']
    description = request.form['description']
    elapsedTime = request.form['elapsedTime']
    estimatedTime = request.form['estimatedTime']
    
    dbconn.updateTask(taskId,title,description,elapsedTime, estimatedTime)



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
