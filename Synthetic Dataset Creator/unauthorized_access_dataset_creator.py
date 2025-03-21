import random
import csv
from datetime import datetime, timedelta

# Sample usernames
usernames = ["admin", "root", "test_user", "guest", "user123", "hacker", "anonymous"]

# Possible access statuses and failure reasons
access_outcomes = [
    ("Failed", "Invalid Credentials"),
    ("Failed", "Blocked IP"),
    ("Failed", "Account Locked"),
    ("Failed", "Suspicious Activity"),
    ("Successful", "Authorized Access")
]

# Access types
access_types = ["Login Attempt", "File Access", "System Command Execution"]

# Sample user agents
user_agents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1"
]

# Generate random IP address
def generate_ip():
    return f"{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}"

# Generate fake timestamp
def generate_fake_timestamp(start_time):
    random_time = start_time + timedelta(seconds=random.randint(0, 2592000))  # Random time within 30 days
    return random_time.strftime('%Y-%m-%d %H:%M:%S')

# Generate unauthorized access dataset
def generate_unauthorized_access_dataset(filename="unauthorized_access_dataset.csv", num_entries=1000):
    data = []
    start_time = datetime.now() - timedelta(days=30)

    for _ in range(num_entries):
        timestamp = generate_fake_timestamp(start_time)
        source_ip = generate_ip()
        destination_ip = generate_ip()
        username_attempted = random.choice(usernames)
        user_agent = random.choice(user_agents)
        access_type = random.choice(access_types)
        
        # 70% chance of failure, 30% chance of success
        if random.random() < 0.7:
            access_status, reason = random.choice(access_outcomes[:4])  # Select a failure reason
        else:
            access_status, reason = access_outcomes[4]  # "Successful" access

        data.append([timestamp, source_ip, destination_ip, username_attempted, access_type, access_status, reason, user_agent])

    # Save to CSV
    with open(filename, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["timestamp", "source_ip", "destination_ip", "username_attempted", "access_type", "access_status", "reason", "user_agent"])
        writer.writerows(data)

    print(f"Unauthorized access dataset generated: {filename}")

# Run dataset generation
generate_unauthorized_access_dataset()
