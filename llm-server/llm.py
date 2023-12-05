import pandas as pd
import requests
from langchain.agents import create_pandas_dataframe_agent
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app
os.environ["OPENAI_API_KEY"] = "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"


def getAPIURL(input_json):
    api_url = ''
    if input_json["chatbotOption"] == 'University':
        api_url = "https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_journal_pub_authors&auth=fc22151322bfdd2c3f0626798c9198ab&rows=1000&outsideinstitute=" + input_json["query"]

    elif input_json["chatbotOption"] == 'School':
        if input_json["thing"] == 'Publications':
            api_url = "https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_journal_pub_author_cms&auth=fc22151322bfdd2c3f0626798c9198cd&rows=10000&institute="+ input_json["schoolOption"]

        elif input_json["thing"] == 'Projects':
            api_url = "https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_project&auth=d05a6d2391a1a4c25e0923034eadfc31&rows=10000&institute=" + input_json["schoolOption"]

        elif input_json["thing"] == 'IP':
            api_url = "https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_intellectual&auth=a05ea7fb84932d6ccc233e8f818e3e33&rows=10000&institute=" + input_json["schoolOption"]

    return api_url

def getData(input_json):
    # Specify the API URL
    api_url = getAPIURL(input_json)
    try:
        # Send an HTTP GET request to the API
        response = requests.get(api_url)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the JSON data from the response
            json_data = response.json()

            # Search for the first list of data in the JSON
            for key, value in json_data.items():
                if isinstance(value, list):
                    data_list = value
                    break
            else:
                # If no list is found, return an empty list
                data_list = []

            return data_list
        else:
            print(f"Failed to fetch data. Status code: {response.status_code}")

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")

    return json_data

def flatData(json_data, nested_keys):
    flattened_data = []

    for item in json_data:
        flat_items = [{}]

        for key, value in item.items():
            if key in nested_keys and isinstance(value, list):
                new_flat_items = []
                for nested_item in value:
                    for flat_item in flat_items:
                        flat_item_copy = flat_item.copy()
                        flat_item_copy.update(nested_item)
                        new_flat_items.append(flat_item_copy)
                flat_items = new_flat_items
            else:
                for flat_item in flat_items:
                    flat_item[key] = value

        for flat_item in flat_items:
            flattened_data.append(flat_item)

    return flattened_data

def flattenData(input_json):
    rawData = getData(input_json)
    nested_keys = []
    
    if input_json["chatbotOption"] == 'University':
        nested_keys = ["author_ids"]

    elif input_json["chatbotOption"] == 'School':
        if input_json["thing"] == 'Publications':
            nested_keys = [""]

        elif input_json["thing"] == 'Projects':
            # nested_keys = ["copi_ids", "discipline"]
            nested_keys = ["copi_ids"]

        elif input_json["thing"] == 'IP':
            # nested_keys = ["discipline", "inventor_ids", "ip_status", "school"]
            nested_keys = ["inventor_ids", "school"]

    return flatData(rawData, nested_keys)


def modifyData(input_json, data):
    

    # Create a copy of the data to avoid modifying the original data
    modified_data = data
    columns_to_delete = []
    column_rename_dict = {}

    if input_json["chatbotOption"] == 'University':
        columns_to_delete = ["autohr_sequence", "autohr_sequence_compute", "co_author_faculty_staff_id", "co_author_student_id", "country", "faculty_school", "faculty_student_author_compute", "combined_faculty_staff_id", "id", "institute_other_than_nust_temp", "institute", "is_corresponding_author", "is_sole_author", "journal_publication_id", "journal_paper_id", "nust_auth_faculty_staff_id", "student_school", "school"]
        column_rename_dict = {"g_r_count": "Serial number", "title": "Publication title", "country_disp_compute": "country", "name": "Author Name", "journal_publication_year_compute": "Year", "school_disp_compute": "Affiliated university", "affiliation": "status"}


    elif input_json["chatbotOption"] == 'School':
        if input_json["thing"] == 'Publications':
            columns_to_delete = ["co_author_student_id", "co_author_faculty_staff_id", "faculty_student_author_compute", "institute", "nust_auth_faculty_staff_id"]
            column_rename_dict = {"g_r_count": "Serial number", "combined_faculty_staff_id": "Author name", "faculty_school": "NUST Author Affiliated School", "institute_other_than_nust_temp": "International Author Affiliation", "journal_paper_id": "NRP Paper ID", "school_disp_compute": "NUST Author Affiliation", "cmsid": "CMS ID of Author"}


        elif input_json["thing"] == 'Projects':
            columns_to_delete = ["approved_amount_from_industry", "co_author_student_id", "id", "institute", "project_int_id", "project_state", "rel_coauthor_cnic_no_fms", "rel_coauthor_employed_from", "rel_coauthor_mobile_phone", "title", "show_in_project", "show_in_publications", "gop_vision", "hec_thrust_area", "pi_details_compute", "pi_school_compute", "technology_readiness_level", "total_amount", "discipline"]
            column_rename_dict = {"g_r_count": "Serial number", "application_sector":"Project Application Sector", "approval_date":"Project Approval Date", "approved_amount":"Project Approved Amount (PKR)", "completion_date":"Project Completion Date", "co_author_faculty_staff_id":"Project Member Name", "copi":"Project Member Affiliation ", "copi_id":"Project Title", "faculty_school":"Project Member School", "name":"Project Research Theme", "pi_copi_member":"Project Member Role", "project_status":"Project Status", "submission_date":"Project Submission Data", "cost_in_pkr":"Project Submitted Amount (PKR)", "duration_of_project_integer":"Project Duration (months)", "funding_agency":"Project Funding Agency Name", "funding_from_agency":"Project Funding National or International", "funding_source":"Project funding public or private", "project_type":"Project Type", "funding_source_country":"Project Funding Country"}



        elif input_json["thing"] == 'IP':
            columns_to_delete = ["discipline", "ip_status", "activity_date_deadline", "activity_exception_icon", "activity_summary", "", "curr_pos_users", "show_in_project", "show_in_publications", "co_author_student_id", "id", "publication_id", "initiator_name", "project_type", "active", "activity_exception_decoration", "activity_state", "aol_enable", "code", "effective_date", "message_attachment_count", "message_has_error", "message_has_error_counter", "message_has_sms_error", "message_is_follower", "message_needaction", "message_needaction_counter", "message_unread", "message_unread_counter", "phone", "to_be", "website"]
            column_rename_dict = {"g_r_count": "Serial number", "filing_year": "IP Filing Year", "approval_date": "IP Filing Date", "name": "NUST School", "grant_date":"IP Awarding Date", "affiliation": "Inventor Affiliation", "co_author_faculty_staff_id":"Inventor name", "institute":"NUST School or Other Institute", "title":"IP Title", "inventors":"Inventor Names", "ip_type":"IP Type", "licensing_date":"IP Licensing Date", "project_id":"IP identification ID", "sdgs":"SDGS"}



    # Delete the specified columns
    for column in columns_to_delete:
        modified_data = [{key: value for key, value in item.items() if key != column} for item in modified_data]


    # Rename columns based on the dictionary
    for item in modified_data:
        for old_column, new_column in column_rename_dict.items():
            if old_column in item:
                item[new_column] = item.pop(old_column)


    return modified_data

def extractNames(df):
    columns_for_extraction = ["Author name", "Project Member Name", "Inventor name"]  

    for column_name in columns_for_extraction:
        if column_name in df.columns:
            df[column_name] = df[column_name].str.split(" - ").str[0]

    return df

def stringToNumber(df):
    columns_to_modify = ["Serial number", "IP Filing Year", "NRP Paper ID", "CMS ID of Author", "Year", "Project Approved Amount (PKR)", "Project Duration (months)", "Project Submitted Amount (PKR)", "initiator_cms_id", "cmsid"]

    # Convert specified columns to numeric
    for col in columns_to_modify:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')

    return df

def stringToDate(df):
    columns_to_modify = ["IP Filing Date", "Project Approval Date", "IP Licensing Date", "IP Awarding Date", "Project Completion Date", "Project Submission Data"]

    # Convert specified columns to datetime
    for col in columns_to_modify:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors='coerce')

    return df

def createDataframe(flattened_data):
    # Create a DataFrame from the flattened data
    df = pd.DataFrame(flattened_data)
    df = extractNames(df)
    df = stringToNumber(df)
    df = stringToDate(df)
    return df

# Save the DataFrame to a CSV file
# df.to_csv('output.csv', index=False)

# print("JSON data has been converted to output.csv")


# df.head()

# df = pd.read_csv("output.csv")

# agent = create_csv_agent(ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0), "output.csv", verbose=True)

# davinci_agent = create_csv_agent(OpenAI(temperature=0), "output.csv", verbose=True)


def getAnswer(query, df):
    davinci_agent = create_pandas_dataframe_agent(ChatOpenAI(model_name="text-davinci-003", temperature=0), df, verbose=True)
    return davinci_agent.run(query)


@app.route('/llm',methods = ["POST"])
def processclaim():
    try:
        input_json = request.get_json()
        print(input_json)

        flattenedData = flattenData(input_json)
        modifiedData = modifyData(input_json, flattenedData)
        df = createDataframe(modifiedData)
        # print(df)
        df.to_csv('output.csv', index=False)

        if (df.empty):
            print("Dataframe is empty")
            output = "No data is available"
        else:
            question = input_json['chatbotSearch']
            output = getAnswer(question, df)

        # output=getAnswer(question, df)
        # output = 'Chatbot turned off temporarily for development purposes'
        print(output)
        return jsonify({"Answer":output})
    except Exception as e:
        return jsonify({"Status": f"Failure - {str(e)}"})
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8095, debug=False)
