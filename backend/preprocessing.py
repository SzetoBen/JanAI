import pandas as pd
import json

def process_csv(file_path):
    df = pd.read_csv(file_path, header=None)
    cols = ["term", "definition"]
    df.columns = cols
    df.to_json(f"{file_path[:len(file_path) - 4]}_flash_cards.json", orient='records')
    


if __name__ == "__main__":
    process_csv("./states_and_capitals.csv")