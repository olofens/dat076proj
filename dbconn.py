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
    rows = cur.fetchall()
    conn.close()

    tasks = []
    for r in rows:
        tasks.append(r)
    return tasks

    






if (__name__ == '__main__'):
    main()