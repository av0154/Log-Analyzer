import random
import csv
from datetime import datetime, timedelta

# Sample SQL injection queries
sql_injection_queries = [
    "' OR '1'='1", 
    "UNION SELECT username, password FROM users--", 
    "' OR '1'='1' --", 
    "DROP TABLE users; --", 
    "' OR 1=1 --", 
    "SELECT * FROM users WHERE username='admin' AND password='' OR '1'='1'"
]

# Sample normal SQL queries
normal_sql_queries = [
    "SELECT * FROM products WHERE category='electronics'", 
    "INSERT INTO users (username, password) VALUES ('john', 'pass123')",
    "UPDATE accounts SET balance=100 WHERE user_id=1", 
    "DELETE FROM logs WHERE timestamp < '2024-01-01'"
]

# Sample user agents
user_agents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36"
]

# Generate random IP address
def generate_ip():
    return f"{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}"

# Generate fake timestamp
def generate_fake_timestamp(start_time):
    random_time = start_time + timedelta(seconds=random.randint(0, 2592000))  # Random time within 30 days
    return random_time.strftime('%Y-%m-%d %H:%M:%S')

# Generate dataset
def generate_sql_injection_dataset(filename="sql_injection_dataset.csv", num_entries=1000):
    data = []
    start_time = datetime.now() - timedelta(days=30)

    for _ in range(num_entries):
        timestamp = generate_fake_timestamp(start_time)
        source_ip = generate_ip()
        destination_ip = generate_ip()
        
        if random.random() < 0.3:  # 30% chance of being an SQL injection
            sql_query = random.choice(sql_injection_queries)
            http_status_code_response = 403  # Forbidden
        else:
            sql_query = random.choice(normal_sql_queries)
            http_status_code_response = 200  # OK
        
        user_agent = random.choice(user_agents)
        
        data.append([timestamp, source_ip, destination_ip, sql_query, user_agent, http_status_code_response])

    # Save to CSV with safe formatting
    with open(filename, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file, delimiter=",", quotechar='"', quoting=csv.QUOTE_ALL)
        writer.writerow(["timestamp", "source_ip", "destination_ip", "sql_query", "user_agent", "http_status_code_response"])
        writer.writerows(data)

    print(f"Synthetic SQL injection dataset generated: {filename}")

    # Debugging: Print first few rows
    print("\nSample Data:")
    for row in data[:5]:
        print(row)

# Run dataset generation
generate_sql_injection_dataset()
