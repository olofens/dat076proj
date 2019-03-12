import os
import urllib.parse as up
import psycopg2
import json
from pypika import Query, Table, Field
from psycopg2.extras import RealDictCursor

def main():
    testQuery()

def getOpenConnection():
    with open('config.json') as f:
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

def getTasks():
    conn = getOpenConnection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("SELECT * FROM tasks")
    tasks = cur.fetchall()
    conn.close()

    return tasks

def getElapsedTimeWithID(idNum):
    conn= getOpenConnection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("SELECT * FROM tasks WHERE id={0}".format(idNum))
    task = cur.fetchall()
    #print("Task: ")
    #print(task)
    conn.close()
    return task

def updateTime(idNum, elapsedTime):
    conn = getOpenConnection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("UPDATE tasks SET elapsedTime = {0} WHERE id = {1}".format(elapsedTime, idNum))

    conn.commit()
    conn.close()

def createTask(userId, title, description, estimatedTime):
    conn = getOpenConnection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("INSERT INTO tasks(userId,title,description,estimatedTime) VALUES (%s,%s,%s,%s);", (userId, title, description, estimatedTime))

    conn.commit()

    conn.close()
    
def updateTask(userId, title, description, elapsedTime, estimatedTime):
    conn = getOpenConnection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("UPDATE tasks SET (title, description, elapsedTime, estimatedTime) = (%s,%s,%s,%s) WHERE userId = %s",
    (title, description, elapsedTime, estimatedTime, userId))
    
    conn.close()





if (__name__ == '__main__'):
    main()