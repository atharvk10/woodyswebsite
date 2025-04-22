from flask import Flask, render_template, send_from_directory, request, redirect, url_for
import sqlite3
import os

app = Flask(__name__, template_folder='Login/templates')

def db_connect():
    conn = sqlite3.connect("Login/studentAcc.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/", methods = ["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        netid = request.form["netid"]
        password = request.form["password"]

        conn = db_connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM student_info WHERE netid = ? AND password = ?", (netid, password))
        user = cursor.fetchone()
        conn.close()

        if user:
            return redirect(url_for("home", netid = netid))
        else:
            error = "Invalid NetID or Password"

    return render_template("loginPage.html", error=error)
    
@app.route("/home")
def home():
    return send_from_directory("Home", "HomePage.html")

if __name__== "__main__":
    app.run(debug=True)