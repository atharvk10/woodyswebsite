from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Connect to database
def db_connect():
    conn = sqlite3.connect("studentAcc.db")
    conn.row_factory = sqlite3.Row
    return conn

# Login function
@app.route('/', methods=["GET", "POST"])
def login():
    error = None
    if request.method == 'POST':
        netid = request.form['netid']
        password = request.form['password']

        conn = db_connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE netid = ? AND password = ?", (netid, password))
        user = cursor.fetchone()
        conn.close()

        if user:
            return redirect(url_for('dashboard', netid=netid))
        else:
            error = 'Invalid NetID or Password'

    return render_template('loginPage.html', error=error)

@app.route('/dashboard')
def dashboard():
    netid = request.args.get('netid')
    return f"<h1>Welcome, {netid}!</h1><p>Login successful.</p>"

if __name__ == '__main__':
    app.run(debug=True)