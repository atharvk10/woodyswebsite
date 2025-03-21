import sqlite3

conn = sqlite3.connect('WoodysAccounts.db')
cursor = conn.cursor()

def login():
    netid = input("Enter NetID: ")
    password = input("Enter password: ")

    cursor.execute("SELECT * FROM users WHERE netid = ?", (netid, password))
    user = cursor.fetchone()

    if user:
        print("Login successful!")
    else:
        print("Invalid NetID or password.")
        
def menu(student_id):
    
    print("\nWelcome to the Student Meal & Retail Swipe System")
    print("1. View meal swipe total")
    print("2. View retail swipe total")
    print("3. Logout")
    
    choice = input("Select an option: ")

    if choice == "1":
        view_meal_swipes(student_id)
    elif choice == "2":
        view_retail_swipes(student_id)
    elif choice == "3":
        print("Logging out...")
        return
    else:
        print("Invalid option. Try again.")

def view_meal_swipes(student_id):
   
    cursor.execute("SELECT * FROM swipes WHERE student_id = ? AND date = ?", (student_id, '2025-03-21'))
    swipe_data = cursor.fetchone()
    
    if swipe_data:
        print(f"Total meal swipes: {swipe_data[2]}")
    else:
        print("No swipe data found for today.")
    
def view_retail_swipes(student_id):
    
    cursor.execute("SELECT * FROM swipes WHERE student_id = ? AND date = ?", (student_id, '2025-03-21'))
    swipe_data = cursor.fetchone()
    
    if swipe_data:
        print(f"Total retail swipes: {swipe_data[3]}")
    else:
        print("No swipe data found for today.")

def view_past_orders(student_id):

    cursor.execute("SELECT * FROM orders WHERE student_id = ? ORDER BY date DESC", (student_id,))
    orders = cursor.fetchall()

    if orders:
        print("\nYour Past Orders:")
        for order in orders:
            order_id = order[0]
            order_type = order[2]
            swipe_count = order[3]
            order_status = order[4]
            order_date = order[5]
            print(f"Order ID: {order_id}, Type: {order_type.capitalize()}, Swipes: {swipe_count}, Status: {order_status.capitalize()}, Date: {order_date}")
    else:
        print("You have no past orders.")

login()

conn.close()
