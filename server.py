#!/usr/bin/env python

import os
from flask import Flask, render_template, jsonify
import dbconn
app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/tasks")
def tasks():
    myList = dbconn.getTasks()
    return jsonify(myList)


@app.route("/add_task")
def addTask():
    userId = request.form['userId']
    title = request.form['title']
    description = request.form['description']
    estimatedTime = request.form['estimatedTime']

    dbconn.createTask(userId,title,description,estimatedTime)





if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
