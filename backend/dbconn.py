import os
import urllib.parse as up
import psycopg2
import json
from pypika import Query, Table, Field
from psycopg2.extras import RealDictCursor

def main():
    testQuery()

def getOpenConnection():
    with open('backend/config.json') as f:
        data = json.load(f)

    up.uses_netloc.append("postgres")
    conn = psycopg2.connect(
        database="ehjntuba",
        user="ehjntuba",
        password=data["DB_PASSWORD"],
        host="manny.db.elephantsql.com",
        port="5432"
    )

    return conn

def closeThisConnection(conn):
    conn.close()

def testQuery():
    conn = getOpenConnection()
    cur = conn.cursor()
    cur.execute("select * from erik")
    rows = cur.fetchall()
    print(rows)
    conn.close()

#Returns all columns from tasks table
def getTasks():
    conn = getOpenConnection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM tasks")
    tasks = cur.fetchall()
    conn.close()
    return tasks

#Return task with specified id
def getElapsedTimeWithID(idNum):
    conn= getOpenConnection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sqlQuery = "SELECT * FROM tasks WHERE id=%s"
    cur.execute(sqlQuery, [idNum])
    task = cur.fetchall()[0]
    conn.close()
    return task

#Insert task into DB
def createTask(userId, title, description, estimatedTime):
    conn = getOpenConnection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sqlQuery = "INSERT INTO tasks(userId,title,description,estimatedTime) VALUES (%s,%s,%s,%s) RETURNING *"
    cur.execute(sqlQuery, [userId, title, description, estimatedTime])
    myResponse = cur.fetchone()
    conn.commit()
    conn.close()
    return myResponse

#Update task with specified ID
def updateTask(userId, title, description, elapsedTime, estimatedTime, datefinished):
    conn = getOpenConnection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sqlQuery = "UPDATE tasks SET (title, description, elapsedTime, estimatedTime, datefinished) = (%s,%s,%s,%s,%s) WHERE id = %s"
    cur.execute(sqlQuery, [title, description, elapsedTime, estimatedTime, datefinished, userId])
    conn.commit()
    conn.close()

#Update dateFinished in task with specified ID
def updateTaskFin(userId, datefinished):
    conn = getOpenConnection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sqlQuery = "UPDATE tasks SET (datefinished) = ROW(%s) WHERE id = %s"
    cur.execute(sqlQuery, [datefinished, userId])
    conn.commit()
    conn.close()

#Update elapsedTime in task with specified ID
def updateTaskTime(myId, elapsedtime):
    conn = getOpenConnection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sqlQuery = "UPDATE tasks SET (elapsedtime) = ROW(%s) WHERE id = %s"
    cur.execute(sqlQuery, [elapsedtime, myId])
    conn.commit()
    conn.close()

#Delete task with specified ID
def deleteTask(taskId):
    conn = getOpenConnection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    sqlQuery = """DELETE FROM tasks WHERE id = %s"""
    cur.execute(sqlQuery, [taskId])
    conn.commit()
    conn.close()

if (__name__ == '__main__'):
    main()