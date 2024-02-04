import pandas as pd
import json
import os

def script(request):
  query_params = request.query_params
  company = query_params.get("company")
  difficulty = query_params.get("difficulty")
  rating = float(query_params.get("rating"))

  file_path = os.path.join(os.path.dirname(__file__), 'excelfile.csv')
  file = pd.read_csv(file_path)

  def filter_df(input_df, company, difficulty, rating):
    try:
      filtered_data = input_df.loc[
        (input_df['Company_Name'] == company) &
        (input_df['Difficulty'] == difficulty) &
        (input_df['Ratings'] >= rating)
      ]
      return filtered_data[['Course_Name', 'Ratings', 'Link']].sort_values(by='Ratings', ascending=False)
    except KeyError:
      print("Enter Correct compName")
      return pd.DataFrame()

  filtered_data = filter_df(file, company, difficulty, rating)

  courses_list = filtered_data.to_dict(orient='records')

  for course in courses_list:
    course['Link'] = course['Link']

  return {"filtered_data": courses_list}
