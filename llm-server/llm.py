import pandas as pd
import requests
from langchain.agents import create_pandas_dataframe_agent
from langchain.agents.agent_types import AgentType
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from key import OpenApikey

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app
os.environ["OPENAI_API_KEY"] = OpenApikey


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

    elif input_json["chatbotOption"] == 'Area':
        if input_json["thing"] == 'Publications':
            api_url = "https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_journal_pub&auth=fc22151322bfdd2c3f0626798c9198bc&rows=10000&title="+ input_json["query"]

        elif input_json["thing"] == 'Projects':
            api_url = "https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_project&auth=d05a6d2391a1a4c25e0923034eadfc31&rows=10000&title=" + input_json["query"]

        elif input_json["thing"] == 'IP':
            api_url = "https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_intellectual&auth=a05ea7fb84932d6ccc233e8f818e3e33&rows=10000&title=" + input_json["query"]

    elif input_json["chatbotOption"] == 'Name':
        if input_json["thing"] == 'Publications':
            api_url = "https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_journal_pub&auth=fc22151322bfdd2c3f0626798c9198bc&rows=10000&author_name="+ input_json["query"]

        elif input_json["thing"] == 'Projects':
            api_url = "https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_project&auth=d05a6d2391a1a4c25e0923034eadfc31&rows=10000&pi-copi_name=" + input_json["query"]

        elif input_json["thing"] == 'IP':
            api_url = "https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_intellectual&auth=a05ea7fb84932d6ccc233e8f818e3e33&rows=10000&inventor_name=" + input_json["query"]

        elif input_json["thing"] == 'Supervisors':
            api_url = "https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_rttm&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=10000&supervisoer_name=" + input_json["query"]

        elif input_json["thing"] == 'Education':
            api_url = "https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_faculty&auth=eda78c8a7d78ca83fcb02ff052179b9b&rows=10000&name=" + input_json["query"]

        elif input_json["thing"] == 'Editorials':
            api_url = "https://qalam.nust.edu.pk/odoocms_api?alias=ric_expert_portal_editorial&auth=e09d3d4b09c4e553fcb1901d4b555acf&rows=10000&author_name=" + input_json["query"]
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

# def flatData(json_data, nested_keys):
#     flattened_data = []

#     for item in json_data:
#         flat_items = [{}]

#         for key, value in item.items():
#             if key in nested_keys and isinstance(value, list):
#                 new_flat_items = []
#                 for nested_item in value:
#                     for flat_item in flat_items:
#                         flat_item_copy = flat_item.copy()
#                         flat_item_copy.update(nested_item)
#                         new_flat_items.append(flat_item_copy)
#                 flat_items = new_flat_items
#             else:
#                 for flat_item in flat_items:
#                     flat_item[key] = value

#         for flat_item in flat_items:
#             flattened_data.append(flat_item)

#     return flattened_data

def flatData(json_data, nested_keys):
    flattened_data = []

    for item in json_data:
        flat_items = [{}]

        for key, value in item.items():
            if key in nested_keys and isinstance(value, list) and len(value) > 0:
                new_flat_items = []
                for nested_item in value:
                    for flat_item in flat_items:
                        flat_item_copy = flat_item.copy()
                        for nested_key, nested_value in nested_item.items():
                            flat_item_copy[f"{key}_{nested_key}"] = nested_value
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
    
    elif input_json["chatbotOption"] == 'Area':
        if input_json["thing"] == 'Publications':
            nested_keys = ["author_ids", "findet_ids", "sdgs"] 

        elif input_json["thing"] == 'Projects':
            nested_keys = ["copi_ids", "discipline"]

        elif input_json["thing"] == 'IP':
            nested_keys = ["discipline", "inventor_ids", "ip_status", "school"]

    elif input_json["chatbotOption"] == 'Name':
        if input_json["thing"] == 'Publications':
            nested_keys = ["author_ids", "findet_ids", "sdgs"] 

        elif input_json["thing"] == 'Projects':
            nested_keys = ["copi_ids", "discipline"]

        elif input_json["thing"] == 'IP':
            nested_keys = ["discipline", "inventor_ids", "ip_status", "school"]

        elif input_json["thing"] == 'Education':
            nested_keys = ["award_ids", "experience_ids", "fms_academic_ids", "fms_prof_reg_ids", "master_ids", "profqualification_ids", "scholarship_ids", "training_ids"]

        elif input_json["thing"] == 'Supervisors':
            nested_keys = ["supervisor_ids"]

        elif input_json["thing"] == 'Editorials':
            nested_keys = []

    return flatData(rawData, nested_keys)


def modifyData(input_json, data):
    

    # Create a copy of the data to avoid modifying the original data
    modified_data = data
    columns_to_delete = []
    column_rename_dict = {}

    #------------------------------Outside Affiliation University----------------------------------------
    if input_json["chatbotOption"] == 'University':
        columns_to_delete = ["autohr_sequence", "autohr_sequence_compute", "co_author_faculty_staff_id", "co_author_student_id", "country", "faculty_school", "faculty_student_author_compute", "combined_faculty_staff_id", "id", "institute_other_than_nust_temp", "institute", "is_corresponding_author", "is_sole_author", "journal_publication_id", "journal_paper_id", "nust_auth_faculty_staff_id", "student_school", "school"]
        column_rename_dict = {"g_r_count": "Serial number", "title": "Publication title", "country_disp_compute": "country", "name": "Author Name", "journal_publication_year_compute": "Year", "school_disp_compute": "Affiliated university", "affiliation": "status"}


    #------------------------------Search By School----------------------------------------
    elif input_json["chatbotOption"] == 'School':
        if input_json["thing"] == 'Publications':
            columns_to_delete = ["co_author_student_id", "co_author_faculty_staff_id", "faculty_student_author_compute", "institute", "nust_auth_faculty_staff_id"]
            column_rename_dict = {"g_r_count": "Serial number", "combined_faculty_staff_id": "Author name", "faculty_school": "NUST Author Affiliated School", "institute_other_than_nust_temp": "International Author Affiliation", "journal_paper_id": "NRP ID", "school_disp_compute": "NUST Author Affiliation", "cmsid": "CMS ID of Author"}

        elif input_json["thing"] == 'Projects':
            columns_to_delete = ["approved_amount_from_industry", "co_author_student_id", "id", "institute", "project_int_id", "project_state", "rel_coauthor_cnic_no_fms", "rel_coauthor_employed_from", "rel_coauthor_mobile_phone", "title", "show_in_project", "show_in_publications", "gop_vision", "hec_thrust_area", "pi_details_compute", "pi_school_compute", "technology_readiness_level", "total_amount", "discipline"]
            column_rename_dict = {"g_r_count": "Serial number", "application_sector":"Project Application Sector", "approval_date":"Project Approval Date", "approved_amount":"Project Approved Amount (PKR)", "completion_date":"Project Completion Date", "co_author_faculty_staff_id":"Project Author Name", "copi":"Project Member Affiliation ", "copi_id":"Project Title", "faculty_school":"Project Member School", "name":"Project Research Theme", "pi_copi_member":"Project Member Role", "project_status":"Project Status", "submission_date":"Project Submission Data", "cost_in_pkr":"Project Submitted Amount (PKR)", "duration_of_project_integer":"Project Duration (months)", "funding_agency":"Project Funding Agency Name", "funding_from_agency":"Project Funding National or International", "funding_source":"Project funding public or private", "project_type":"Project Type", "funding_source_country":"Project Funding Country"}

        elif input_json["thing"] == 'IP':
            columns_to_delete = ["discipline", "ip_status", "activity_date_deadline", "activity_exception_icon", "activity_summary", "", "curr_pos_users", "show_in_project", "show_in_publications", "co_author_student_id", "id", "publication_id", "initiator_name", "project_type", "active", "activity_exception_decoration", "activity_state", "aol_enable", "code", "effective_date", "message_attachment_count", "message_has_error", "message_has_error_counter", "message_has_sms_error", "message_is_follower", "message_needaction", "message_needaction_counter", "message_unread", "message_unread_counter", "phone", "to_be", "website"]
            column_rename_dict = {"g_r_count": "Serial number", "filing_year": "IP Filing Year", "approval_date": "IP Approval Date", "name": "NUST School", "grant_date":"IP Awarding Date", "affiliation": "Inventor Affiliation", "co_author_faculty_staff_id":"Inventor name", "institute":"NUST School or Other Institute", "title":"IP Title", "inventors":"Inventor Names", "ip_type":"IP Type", "licensing_date":"IP Licensing Date", "project_id":"IP identification ID", "sdgs":"SDGS"}



    #------------------------------Search By Research Area----------------------------------------
    elif input_json["chatbotOption"] == 'Area':
        if input_json["thing"] == 'Publications':
            columns_to_delete = ["abstract", "activity_exception_decoration",  "affiliation", "author_ids_autohr_sequence_compute", "author_ids_co_author_student_id", "author_ids_combined_faculty_staff_id", "author_ids_co_author_faculty_staff_id", "author_ids_country", "author_ids_faculty_student_author_compute", "author_ids_id", "author_ids_institute_other_than_nust_temp", "author_ids_is_corresponding_author", "author_ids_is_sole_author", "author_ids_journal_paper_id", "author_ids_nust_auth_faculty_staff_id", "author_ids_school", "author_ids_student_school", "author_ids_journal_publication_year_compute", "author_ids_school_disp_compute", "citation_count_scopus_opd_on", "citation_count_wos", "collaboration_type", "fin_date_of_approval", "findet_ids_currency_id", "findet_ids_fin_date_of_approval", "findet_ids_fin_e_min_sheet_no", "findet_ids_fin_faculy_staff_id", "findet_ids_fin_remarks",  "online_publication_date", "findet_ids_fin_share_of_author", "findet_ids_autohr_sequence", "findet_ids_designation", "findet_ids_fin_total_finance_award", "findet_ids_journal_publication_id", "findet_ids_id", "findet_ids_pc_applicant_name", "findet_ids_pc_date_of_approval_pub_charg", "findet_ids_pc_e_min_sheet_no", "findet_ids_pc_faculy_staff_id", "findet_ids_pc_name_of_currancy", "findet_ids_pc_share_of_author", "findet_ids_pc_total_pub_charges", "fin_e_min_sheet_no", "hec_jpi", "hec_medallion", "hec_rank_pos_of_journal", "hec_total_journals_in_category", "h_index", "id", "impact_factor_hjrs", "title", "int_h_index", "int_quartiles", "int_rank_pos_of_journal", "int_total_journals_in_category", "int_webofscience_scopus", "paid_open_ended", "pc_approval_date", "pc_e_min_sheet_no", "print_published", "publisher_address", "sdgs", "site_score", "findet_ids"]
            column_rename_dict = {"g_r_count": "Serial number", "all_author_compute": "List of Authors", "author_ids_affiliation": "Author Affiliation Type", "author_ids_autohr_sequence": "Author sequence", "author_ids_country_disp_compute": "Author country", "author_ids_designation":"Author designation", "author_ids_faculty_school":"Author School", "author_ids_institute":"Author International Affiliation", "author_ids_journal_publication_id":"Publication Title", "author_ids_name":"Author Name", "category":"Publication Location", "citation_count_scopus":"Scopus Citation", "country":"Publication Country", "discipline":"Publication Discipline", "doi_info":"DOI", "findet_ids_institute_id":"NUST Institute Affiliation", "hec_hec_category":"HEC Category", "impact_factor":"Impact Factor", "indexation":"Indexation", "journal_info":"Journal Info", "journal_title":"Journal Name", "publication_date":"Print Publication Date", "publication_year_compute":"Publication Year", "publisher_name":"Publisher Name", "school":"NUST School", "state_123":"Publication Status", "type":"Publication Type", "website_link":"Website Link", "sdgs_id":"SDG ID", "sdgs_name":"SDG Name"}

        elif input_json["thing"] == 'Projects':
            columns_to_delete = ["approved_amount_from_industry", "copi_ids_approval_date", "copi_ids_co_author_student_id", "copi_ids_completion_date", "copi_ids_id", "copi_ids_project_int_id", "copi_ids_project_state", "copi_ids_rel_coauthor_cnic_no_fms", "copi_ids_rel_coauthor_employed_from", "copi_ids_rel_coauthor_mobile_phone", "copi_ids_submission_date", "copi_ids_copi_id", "discipline_id", "discipline_show_in_project", "discipline_show_in_publications", "gop_vision", "hec_thrust_area", "id", "technology_readiness_level", "copi_ids", "discipline", "copi_ids_title", "copi_ids_project_status"]
            column_rename_dict = {"g_r_count": "Serial number", "application_sector":"Project Application Sector", "approval_date":"Project Approval Date", "approved_amount":"Project Approved Amount", "completion_date":"Project Completion Date", "copi_ids_co_author_faculty_staff_id":"Project Author Name", "copi_ids_copi":"Co-PI Affiliation", "copi_ids_faculty_school":"Affiliated Institute", "copi_ids_institute":"CoPI's Affiliated University", "copi_ids_name":"CoPI Name", "copi_ids_pi_copi_member":"Position Status PI or CoPI", "cost_in_pkr":"Project Cost", "discipline_name":"Discipline Name", "duration_of_project_integer":"Duration of Project", "funding_agency":"Project Funding Agency", "funding_from_agency":"Project Funding Source National or International", "funding_scheme":"Project Funding Scheme", "funding_source":"Funding Source Public or Private", "funding_source_country":"Funding Source Country", "pi_details_compute":"Project PI Name", "pi_school_compute":"PI School", "project_status":"Project Status", "project_type":"Project Type", "submission_date":"Project submission Date", "title":"Project Title", "total_amount":"Project Amount"}

        elif input_json["thing"] == 'IP':
            columns_to_delete = ["activity_date_deadline", "activity_exception_icon", "activity_summary", "discipline", "curr_pos_users", "inventor_ids", "ip_status_id", "project_id", "project_type", "school_active", "school_activity_date_deadline", "school_activity_exception_decoration", "school_activity_exception_icon", "school_activity_state", "school_activity_summary", "school_aol_enable", "school_id", "school_message_attachment_count", "school_message_has_error", "school_message_has_error_counter", "school_message_has_sms_error", "school_message_is_follower", "school_message_needaction", "school_message_needaction_counter", "school_message_unread", "school_message_unread_counter", "initiator_cms_id", "discipline_id", "discipline_show_in_project", "discipline_show_in_publications", "inventor_ids_affiliation", "inventor_ids_co_author_faculty_staff_id", "inventor_ids_co_author_student_id", "inventor_ids_id", "inventor_ids_institute", "inventor_ids_publication_id"]
            column_rename_dict = {"g_r_count": "Serial number", "filing_year": "IP Filing Year", "approval_date": "IP Approval Date", "inventors": "Inventors", "grant_date":"IP Grant Date", "ip_status_name": "IP Status", "ip_type":"IP Type", "licensing_date":"Licensing Date", "school_code":"School Code", "school_effective_date":"Effective School Date", "school_name":"School Name", "sdgs":"SDG", "title":"IP Title", "initiator_name":"Initiator Name", "discipline_name":"Discipline Name", "inventor_ids_name":"IP Inventor Name"}


    #------------------------------Search By Name----------------------------------------
    elif input_json["chatbotOption"] == 'Name':
        if input_json["thing"] == 'Publications':
            columns_to_delete = ["activity_exception_decoration", "author_ids_autohr_sequence_compute ", "abstract", "author_ids_co_author_student_id", "author_ids_combined_faculty_staff_id", "author_ids_country", "author_ids_id", "author_ids_institute_other_than_nust_temp", "author_ids_is_corresponding_author", "author_ids_co_author_faculty_staff_id", "author_ids_is_sole_author", "author_ids_journal_paper_id", "author_ids_nust_auth_faculty_staff_id", "author_ids_school", "author_ids_student_school", "category", "citation_count_scopus_opd_on", "citation_count_wos", "fin_date_of_approval", "findet_ids_fin_date_of_approval", "findet_ids_fin_e_min_sheet_no", "findet_ids_fin_remarks", "findet_ids_fin_share_of_author", "findet_ids_id", "findet_ids_institute_id", "findet_ids_journal_publication_id", "findet_ids_pc_date_of_approval_pub_charg", "hec_jpi", "hec_medallion", "h_index", "id", "impact_factor_hjrs", "indexation", "int_h_index", "int_webofscience_scopus", "paid_open_ended", "pc_approval_date", "state_123", "title", "findet_ids", "online_publication_date"]
            column_rename_dict = {"g_r_count": "Serial number", "affiliation": "Affiliation - NUST/Other", "all_author_compute": "Publication Authors List", "author_ids_affiliation": "Affiliation - NUST/Local/Foreign", "author_ids_autohr_sequence":"Author Sequence", "author_ids_country_disp_compute":"Author County Affiliation", "author_ids_designation":"Author NUST Designation", "author_ids_faculty_school":"Author NUST School", "author_ids_faculty_student_author_compute":"Author ID", "author_ids_institute":"Author Foreign Affiliation", "author_ids_journal_publication_id":"Publication Title", "author_ids_journal_publication_year_compute":"Publication year", "author_ids_name":"Publication Author Name", "author_ids_school_disp_compute":"Author Affiliation", "citation_count_scopus":"Scopus Citations", "collaboration_type":"Collaboration Type", "country":"Publisher Country", "discipline":"Publication Discipline", "doi_info":"DOI", "findet_ids_autohr_sequence":"Author sequence", "findet_ids_currency_id":"Financial Award currency", "findet_ids_designation":"Author designation", "findet_ids_fin_faculy_staff_id":"Financial award recipient name", "findet_ids_fin_total_finance_award":"Financial Award Amount", "findet_ids_pc_applicant_name":"publication charges applicant name", "findet_ids_pc_e_min_sheet_no":"Publication Charges minute sheet number", "findet_ids_pc_faculy_staff_id":"Publication charges applicant ID", "findet_ids_pc_name_of_currancy":"Publication Charges Currency", "findet_ids_pc_share_of_author":"Publication charges author share", "findet_ids_pc_total_pub_charges":"Publication Charges Amount", "fin_e_min_sheet_no":"Financial Award eminute sheet", "hec_hec_category":"HEC Category", "hec_rank_pos_of_journal":"HEC Rank of Journal", "hec_total_journals_in_category":"HEC Total Journal in Category", "impact_factor":"Impact factor", "int_quartiles":"Web of Science Quartiles", "int_rank_pos_of_journal":"Web of Science Rank of Journal", "int_total_journals_in_category":"Web of Science Total Journals", "journal_info":"Journal Info", "journal_title":"Journal Name", "pc_e_min_sheet_no":"Publication charges minute sheet number", "print_published":"Print/Online Publication", "publication_date":"Print Publication Date", "publication_year_compute":"Publication Year", "publisher_address":"Publisher address", "publisher_name":"Publisher Name", "school":"School Affiliation", "sdgs":"SDGs", "site_score":"Scopus Cite Score", "type":"Publication Type", "website_link":"Website link", "sdgs_id":"SDG Number", "sdgs_name":"SDG Name"}

        elif input_json["thing"] == 'Projects':
            columns_to_delete = ["approved_amount_from_industry", "copi_ids_approval_date", "copi_ids_co_author_student_id", "copi_ids_completion_date", "copi_ids_copi_id", "copi_ids_id", "copi_ids_project_int_id", "copi_ids_project_state", "copi_ids_project_status", "copi_ids_rel_coauthor_cnic_no_fms", "copi_ids_rel_coauthor_employed_from", "copi_ids_rel_coauthor_mobile_phone", "copi_ids_submission_date", "copi_ids_title", "discipline_id", "discipline_show_in_project", "discipline_show_in_publications", "gop_vision", "id", "discipline"]
            column_rename_dict = {"g_r_count": "Serial number", "application_sector":"Project Application Sector", "approval_date":"Project Approval Date", "approved_amount":"Project Approved Amount", "completion_date":"Project Completion Date", "copi_ids_co_author_faculty_staff_id":"Project Author Name", "copi_ids_copi":"Co-PI Affiliation (NUST/Other)", "copi_ids_faculty_school":"Project Author's Affiliated NUST School", "copi_ids_institute":"Project Author's Foreign Affiliation", "copi_ids_name":"Project CoPI Name", "copi_ids_pi_copi_member":"Position Status (PI or CoPI)", "cost_in_pkr":"Project Cost", "discipline_name":"Project Discipline Name", "duration_of_project_integer":"Project Duration (months)", "funding_agency":"Project Funding Agency", "funding_from_agency":"Project Funding Source (National or International)", "funding_scheme":"Project Funding Scheme", "funding_source":"Funding Source (Public or Private)", "funding_source_country":"Funding Source Country", "hec_thrust_area":"HEC Thrust Area", "pi_details_compute":"Project PI Name", "pi_school_compute":"Project PI's NUST Affiliated School", "project_status":"Project Status", "project_type":"Project Type", "submission_date":"Project submission Date", "technology_readiness_level":"Project Technology Readiness Level", "title":"Project Title", "total_amount":"Project Amount"}

        elif input_json["thing"] == 'IP':
            columns_to_delete = ["activity_date_deadline", "activity_exception_icon", "activity_summary", "discipline_id", "curr_pos_users", "discipline_show_in_project", "discipline_show_in_publications", "inventor_ids_co_author_student_id", "inventor_ids_id", "inventor_ids_institute", "ip_status_id", "inventor_ids_co_author_faculty_staff_id", "school_activity_exception_decoration", "school_activity_exception_icon", "school_active", "school_activity_date_deadline", "school_aol_enable", "school_activity_state", "school_activity_summary", "school_effective_date", "school_id", "school_message_has_sms_error", "school_message_is_follower", "school_message_needaction", "school_message_needaction_counter", "school_message_unread", "school_message_unread_counter", "school_message_attachment_count", "school_message_has_error", "school_message_has_error_counter", "school_phone", "school_to_be", "school_website", "initiator_cms_id", "initiator_name", "discipline"]
            column_rename_dict = {"g_r_count": "Serial number", "approval_date": "IP Approval Date", "discipline_name": "IP Discipline Name", "filing_year": "IP Filing Year", "grant_date":"IP Grant Date", "id": "NRP ID", "inventor_ids_affiliation":"Inventor Affiliation (NUST/Student)", "inventor_ids_name":"Inventor Name", "inventor_ids_publication_id":"IP Name", "inventors":"Inventor List", "ip_status_name":"IP Status", "ip_type":"IP Type", "licensing_date":"IP Licensing Date", "project_id":"IP Project ID", "project_type":"Project Type", "school_code":"School", "school_name":"School Name full", "sdgs":"SDG", "title":"IP Title"}

        elif input_json["thing"] == 'Supervisors':
            columns_to_delete = ["supervisor_ids_activity_date_deadline", "supervisor_ids_activity_exception_decoration", "supervisor_ids_activity_exception_icon", "supervisor_ids_activity_state", "supervisor_ids_activity_summary", "supervisor_ids_activity_type_id", "supervisor_ids_activity_user_id", "supervisor_ids_id", "supervisor_ids_message_attachment_count", "supervisor_ids_message_has_error", "supervisor_ids_message_has_error_counter", "supervisor_ids_message_has_sms_error", "supervisor_ids_message_is_follower", "supervisor_ids_message_main_attachment_id", "supervisor_ids_message_needaction", "supervisor_ids_message_needaction_counter", "supervisor_ids_message_unread", "supervisor_ids_message_unread_counter"]
            column_rename_dict = {"g_r_count": "Serial number", "effdt": "Supervision Start Date", "student_acad_career": "Supervision level", "student_acad_program": "Supervision Academic (Program/Course)", "student_id": "Supervision Student Name", "student_institute": "Student School", "supervisor_ids_faculty_school": "Supervisor School", "supervisor_ids_faculty_staff_id":"Supervisor Name", "supervisor_ids_ssr_rs_super_type":"Supervisor Role", "thesis_title":"Thesis Title"}

        elif input_json["thing"] == 'Education':
            columns_to_delete = ["award_ids_faculty_staff_id", "award_ids", "award_ids_nomination", "award_ids_status", "code", "designation", "experience_ids_activity_date_deadline", "experience_ids_activity_exception_decoration", "experience_ids_activity_exception_icon", "experience_ids_activity_state", "experience_ids_activity_summary", "experience_ids_activity_type_id", "experience_ids_activity_user_id", "experience_ids_b", "experience_ids_co_hod_name", "experience_ids_confirmation", "experience_ids_date_acad_from_dt", "experience_ids_date_acad_to_dt", "experience_ids_experience_duration", "experience_ids_fmn_unit_dept", "experience_ids_id", "experience_ids_job_nature", "experience_ids_message_attachment_count", "experience_ids_message_has_error", "experience_ids_faculty_staff_id","experience_ids_message_has_error_counter", "experience_ids_message_has_sms_error", "experience_ids_message_is_follower", "experience_ids_message_main_attachment_id", "experience_ids_message_needaction", "experience_ids_message_needaction_counter", "experience_ids_message_unread", "experience_ids_message_unread_counter", "experience_ids_miltray", "experience_ids_phd", "experience_ids_post_l_to_edt", "experience_ids_post_months_sum", "experience_ids_postphdduration", "experience_ids_post_years_sum", "experience_ids_pre_ledt", "experience_ids_pre_months_sum", "experience_ids_prephdduration", "experience_ids_pre_phd_id", "experience_ids_pre_years_sum", "experience_ids_reason", "experience_ids_ref_designation", "experience_ids_ref_email", "experience_ids_ref_landline", "experience_ids_ref_mobile", "experience_ids_ref_name", "experience_ids_y", "facebook_fms", "fms_academic_ids_activity_date_deadline", "fms_academic_ids_activity_exception_decoration", "fms_academic_ids_activity_exception_icon", "fms_academic_ids_id", "fms_academic_ids_activity_state", "fms_academic_ids_activity_summary", "fms_academic_ids_activity_type_id", "image_128","fms_academic_ids_activity_user_id", "fms_academic_ids_confirmation", "fms_academic_ids_faculty_staff_id", "fms_academic_ids_fms_acad_deg_subcat", "fms_academic_ids_fms_acad_deg_ver", "fms_academic_ids_fms_attachment_filename", "fms_academic_ids_message_attachment_count", "fms_academic_ids_message_has_error", "fms_academic_ids_message_has_error_counter", "fms_academic_ids_message_has_sms_error", "fms_academic_ids_message_is_follower", "fms_academic_ids_message_main_attachment_id", "fms_academic_ids_message_needaction", "fms_academic_ids_message_needaction_counter", "fms_academic_ids_message_unread", "fms_academic_ids_message_unread_counter", "fms_academic_ids_qual_active_status", "fms_prof_reg_ids_faculty_staff_id", "fms_prof_reg_ids_id", "fms_prof_reg_ids_reg_body", "fms_prof_reg_ids_reg_date", "fms_prof_reg_ids_reg_no", "fms_prof_reg_ids_reg_validity", "master_ids_activity_date_deadline", "master_ids_activity_exception_decoration", "master_ids_activity_exception_icon", "master_ids_activity_state", "master_ids_activity_summary", "master_ids_activity_type_id", "master_ids_activity_user_id", "master_ids_emp_earned_leave_nej_month", "master_ids_faculty_staff_id", "master_ids_hr_emp_active_status", "master_ids_hr_emp_at_status", "master_ids_hr_emp_category", "master_ids_hr_emp_conflict_post", "master_ids_hr_emp_def_status", "master_ids_hr_emp_ebps", "master_ids_hr_emp_eff_dt", "master_ids_hr_emp_erp_post_id", "master_ids_hr_emp_hec_supvr", "master_ids_hr_emp_hiring", "master_ids_hr_emp_oo_dt", "master_ids_hr_emp_oo_no", "master_ids_hr_emp_pay_pkg_type", "master_ids_hr_emp_payroll_id", "master_ids_hr_emp_placed_branch", "master_ids_hr_emp_placed_inst_attch", "master_ids_hr_emp_placed_inst_optional", "master_ids_hr_emp_post_auth_dtl", "master_ids_hr_emp_post_ex_auth_dtl", "master_ids_hr_emp_progression_level", "master_ids_hr_emp_project", "master_ids_hr_emp_remarks", "master_ids_hr_emp_salary", "master_ids_hr_emp_status", "master_ids_hr_emp_sub_cat", "master_ids_hr_emp_type", "master_ids_hr_nust_exp_duration_resigned_emp", "master_ids_id", "master_ids_message_attachment_count", "master_ids_message_has_error", "master_ids_message_has_error_counter", "master_ids_message_has_sms_error", "master_ids_message_is_follower", "master_ids_message_main_attachment_id", "master_ids_message_needaction", "master_ids_message_needaction_counter", "master_ids_message_unread", "master_ids_message_unread_counter", "master_ids_rpt_date_from", "master_ids_rpt_date_to", "master_ids_rpt_date_to_resignation", "name_url", "prefix", "profqualification_ids_confirmation", "profqualification_ids_faculty_staff_id","profqualification_ids_fms_profqualification_cert", "profqualification_ids_fms_profqualification_country", "profqualification_ids_fms_profqualification_div", "profqualification_ids_fms_profqualification_dt_from", "profqualification_ids_fms_profqualification_dt_to", "profqualification_ids_fms_profqualification_inst", "profqualification_ids_fms_profqualification_miltary", "profqualification_ids_fms_profqualification_status", "profqualification_ids_id", "scholarship_ids_faculty_staff_id","scholarship_ids_id", "scholarship_ids_obligation", "training_ids_center", "training_ids_id", "training_ids_faculty_staff_id"]
            column_rename_dict = {"g_r_count": "Serial number", "award_ids_awarding_body": "Awarding Body", "award_ids_country_id": "Awarding Country", "award_ids_date": "Award Date", "award_ids_description": "Award Description", "award_ids_name": "Award Name", "award_ids_type":"Award Type", "emp_acad_qualification":"Faculty Academic Qualification", "employed_from":"Faculty employed from date", "experience_ids_date_from":"Experience Date From", "experience_ids_date_to":"Experience Date To", "experience_ids_designation":"Experience Designation", "experience_ids_emp_total_experience":"Total Experience", "experience_ids_experience_type":"Experience Type", "experience_ids_job_description":"Experience Job Description", "experience_ids_org_address":"Experience address", "experience_ids_org_name":"Experience organization Name", "fms_academic_ids_education_year_id":"Educational Degree", "fms_academic_ids_fms_acad_country":"Educational Country", "fms_academic_ids_fms_acad_deg_cat":"Education degree category", "fms_academic_ids_fms_acad_degree":"Educational Degree Name", "fms_academic_ids_fms_acad_degree_duration":"Education degree duration", "fms_academic_ids_fms_acad_deg_status":"educational degree status", "fms_academic_ids_fms_acad_dur_from":"Education Time From", "fms_academic_ids_fms_acad_dur_to":"Education Time To", "fms_academic_ids_fms_acad_obt_perc":"Education Obtained Score", "fms_academic_ids_fms_acad_qualification":"Educational Qualification", "fms_academic_ids_fms_acad_special":"Educational Speciality", "fms_academic_ids_fms_acad_total_perc":"Educational Total Score", "fms_academic_ids_fms_acad_uni":"academic university", "fms_academic_ids_subcat_id":"Educational subcategory", "google_fms":"Google Scholar link", "hr_status":"HR Status", "institute":"NUST Affiliated School", "landline_office":"Faculty landline", "linkedin_fms":"Linkedin Link", "master_ids_hr_desig_rank":"HR Designation Scale", "master_ids_hr_emp_desig":"HR designation", "master_ids_hr_emp_eff_from_dt":"Experience From", "master_ids_hr_emp_eff_from_dt1":"Experience To", "master_ids_hr_emp_placed_dept":"Department of the School Employed In", "master_ids_hr_emp_placed_inst":"School Employed In", "master_ids_hr_nust_exp_duration":"Employment duration", "master_ids_hr_nust_exp_duration_active_emp":"Total Employment duration", "name":"Faculty name", "scholarship_ids_award_body":"Scholarship awarding body", "scholarship_ids_date_from":"Scholarship Date From", "scholarship_ids_date_to":"Scholarship Date To", "scholarship_ids_description":"Scholarship Body", "scholarship_ids_education_id":"Scholarship Qualification", "scholarship_ids_type":"Scholarship Type", "training_ids_date_from":"Training Date From", "training_ids_date_to":"Training Date To", "training_ids_name":"Training Name", "training_ids_organized_by":"Training Organized By", "training_ids_org_body":"Training organization Body", "training_ids_sponsor_body":"Training Sponsoring Body", "training_ids_sponsor_by":"Training Sponsored By", "training_ids_type":"Training Type", "twitter_fms":"Faculty Twitter Link", "web_link":"Faculty Profile web link", "work_email":"Faculty work email" }

        elif input_json["thing"] == 'Editorials':
            columns_to_delete = []
            column_rename_dict = {"g_r_count": "Serial number", "cite_score": "Scopus Cite Score", "country": "Country of Journal", "editor_reviewer_type": "Review Type", "e_issn": "Journal e-ISSN", "id": "NRP ID", "impact_factor": "Impact Factor", "journal_name":"Journal Name", "p_issn":"Journal p-ISSN", "title":"Reviewed Paper Title", "type":"Publication Type"}


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
    columns_for_extraction = ["Supervisor Name", "Project Author name", "Inventor name", "Publication Author Name", "Financial award recipient name", "Project PI Name", "Project CoPI Name"]  

    for column_name in columns_for_extraction:
        if column_name in df.columns:
            df[column_name] = df[column_name].str.split(" - ").str[0]

    return df

def extractStudentNames(df):
    columns_for_extraction = ["Supervision Student Name"]  

    for column_name in columns_for_extraction:
        if column_name in df.columns:
            df[column_name] = df[column_name].str.split(" - ").str[1]

    return df

def stringToNumber(df):
    columns_to_modify = ["Education degree duration", "Education Obtained Score", "Educational Total Score", "Faculty landline", "Serial number", "Author sequence", "Scopus Citation", "Impact Factor", "IP Filing Year", "NRP ID", "CMS ID of Author", "Year", "Project Approved Amount (PKR)","Project Approved Amount","Project Total Amount", "Project Duration (months)", "Project Submitted Amount (PKR)", "initiator_cms_id", "cmsid", "id", "Project Cost", "Project Amount", "Publication Year", "Web of Science Quartiles", "Web of Science Rank of Journal", "Web of Science Total Journals", "Financial Award Amount", "Author sequence", "Scopus Cite Score"]

    # Convert specified columns to numeric
    for col in columns_to_modify:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')

    return df

def stringToDate(df):
    columns_to_modify = ["Award Date", "Faculty employed from", "Experience Date From", "Experience Date To", "Education Time From", "Education Time To", "HR Designation Scale", "Experience From", "Experience To", "Scholarship Date From", "Scholarship Date To", "Supervision Start Date", "IP Approval Date", "Effective School Date", "Project Approval Date", "IP Licensing Date", "IP Awarding Date", "Project Completion Date", "Project Submission Date", "Print Publication Date", "Publication year"]

    # Convert specified columns to datetime
    for col in columns_to_modify:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors='coerce')

    return df

def createDataframe(flattened_data):
    # Create a DataFrame from the flattened data
    df = pd.DataFrame(flattened_data)
    df = extractNames(df)
    df = extractStudentNames(df)
    df = stringToNumber(df)
    df = stringToDate(df)
    return df

# Save the DataFrame to a CSV file
# df.to_csv('output.csv', index=False)

# print("JSON data has been converted to output.csv")


# df.head()

# df = pd.read_csv("output.csv")

# agent = create_csv_agent(ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0), "output.csv", verbose=True)



def getAnswer(query, df):
    davinci_agent = create_pandas_dataframe_agent(
    ChatOpenAI(temperature=0, model='gpt-3.5-turbo-0613', ), 
    df, 
    verbose=True, 
    agent_type=AgentType.OPENAI_FUNCTIONS,
    agent_executor_kwargs={"handle_parsing_errors":True}
    )
    return davinci_agent.run(query + " , always return unique and fully complete answers")


@app.route('/llm',methods = ["POST"])
def processclaim():
    try:
        input_json = request.get_json()
        print(input_json)
        flattenedData = flattenData(input_json)
        modifiedData = modifyData(input_json, flattenedData)
        df = createDataframe(modifiedData)
        print(df)
        # df.to_csv('ResearchByIP-new.csv', index=False)

        if (df.empty):
            print("Dataframe is empty")
            output = "No data is available"
        else:
            question = input_json['chatbotSearch']
            output = getAnswer(question, df)

        # output = 'Chatbot turned off temporarily for development purposes'
        print(output)
        return jsonify({"Answer":output})
    except Exception as e:
        return jsonify({"Status": f"Failure - {str(e)}"})
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8095, debug=False)
