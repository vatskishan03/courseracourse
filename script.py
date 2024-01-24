import pandas as pd
import sys
import json


file = pd.read_csv('./coursera(7 companies).csv')


def filter_df(input_df, company, difficulty, rating):
    try:
        filtered_data = input_df.loc[
            (input_df['Company_Name'] == company) &
            (input_df['Difficulty'] == difficulty) &
            (input_df['Ratings'] >= rating)
        ]
        return filtered_data[['Course_Name', 'Duration', 'Ratings']]
    except KeyError:
        print("Enter Correct compName")
        return pd.DataFrame()


company = sys.argv[1]
difficulty = sys.argv[2]
rating= float(sys.argv[3])


filtered_data = filter_df(file, company, difficulty, rating)


print(json.dumps(filtered_data.to_dict(orient='records')))
