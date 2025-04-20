import sqlite3

# Connect to the database (creates it if it doesn't exist)
conn = sqlite3.connect('studentAcc.db')
cursor = conn.cursor()

# Create tables
cursor.execute('''
CREATE TABLE IF NOT EXISTS student_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    netid TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS meal_swipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    netid TEXT NOT NULL UNIQUE,
    num_meal_swipes INTEGER DEFAULT 0,
    retail_swipes INTEGER DEFAULT 0,
    date DATE NOT NULL
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS ordering_system (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    netid TEXT NOT NULL UNIQUE,
    swipe_type TEXT NOT NULL,
    swipes INTEGER NOT NULL,
    date DATE NOT NULL
)
''')

# Insert test data
cursor.execute('''
INSERT OR IGNORE INTO student_info (netid, password)
VALUES (?, ?)
''', ('john_doe', 'password123'))

cursor.execute('''
INSERT OR IGNORE INTO meal_swipes (netid, num_meal_swipes, retail_swipes, date)
VALUES (?, ?, ?, ?)
''', ('john_doe', 5, 3, '2025-03-21'))

cursor.executemany('''
INSERT OR IGNORE INTO ordering_system (netid, swipe_type, swipes, date)
VALUES (?, ?, ?, ?)
''', [
    ('john_doe', 'meal', 1, '2025-03-21'),
    ('john_doe', 'retail', 1, '2025-03-21')
])

# Commit changes and close connection
conn.commit()
conn.close()

print("studentAcc.db has been created and populated.")
