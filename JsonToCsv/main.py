import json
import csv
import os


json_file_path = './dummy.json'  # Update this if the file is elsewhere

if not os.path.exists(json_file_path):
    print(f"Error: The file '{json_file_path}' does not exist.")
    exit(1)

with open(json_file_path, 'r', encoding='utf-8') as json_file:
    try:
        data = json.load(json_file)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        exit(1)

csv_file = 'output.csv'

with open(csv_file, mode='w', newline='', encoding='utf-8') as file:
    fieldnames = data[0].keys()
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    writer.writeheader()
    writer.writerows(data)

print(f"CSV file '{csv_file}' has been created successfully.")