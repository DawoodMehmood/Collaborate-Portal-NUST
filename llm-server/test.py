import pandas as pd

# def flattenData(json_data, nested_keys):
#     def flatten_dictionary(d, parent_key=''):
#         items = {}
#         for key, value in d.items():
#             new_key = f"{parent_key}_{key}" if parent_key else key
#             if isinstance(value, dict):
#                 items.update(flatten_dictionary(value, new_key))
#             elif isinstance(value, list):
#                 for i, item in enumerate(value):
#                     if isinstance(item, dict):
#                         items.update(flatten_dictionary(item, f"{i}"))
#                     else:
#                         items[f"{i}"] = item
#             else:
#                 items[new_key] = value
#         return items

#     flattened_data = []
#     for item in json_data:
#         flattened_item = {}
#         for key, value in item.items():
#             if key in nested_keys and isinstance(value, list) and all(isinstance(v, dict) for v in value):
#                 for i, sub_dict in enumerate(value):
#                     flattened_sub_dict = flatten_dictionary(sub_dict, f"{i}")
#                     flattened_item.update(flattened_sub_dict)
#             else:
#                 flattened_item[key] = value
#         flattened_data.append(flattened_item)

#     return flattened_data

# def flattenData(json_data, nested_keys):
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

def flattenData(json_data, nested_keys):
    flattened_data = []

    for item in json_data:
        flat_items = [{}] if any(key in nested_keys and isinstance(value, list) for key, value in item.items()) else [item.copy()]

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


# json_data = [
#         {
#             "g_r_count": 1,
#             "author_ids": [
#                 {
#                     "affiliation": "nust",
#                     "autohr_sequence": "1",
#                     "autohr_sequence_compute": "1",
#                     "co_author_faculty_staff_id": "",
#                     "co_author_student_id": "",
#                     "combined_faculty_staff_id": "",
#                     "country": "",
#                     "country_disp_compute": "Pakistan",
#                     "designation": "Faculty",
#                     "faculty_school": "",
#                     "faculty_student_author_compute": "",
#                     "id": "56250",
#                     "institute": "-",
#                     "institute_other_than_nust_temp": "",
#                     "is_corresponding_author": "",
#                     "is_sole_author": "",
#                     "journal_paper_id": "1674",
#                     "journal_publication_id": "Exploiting the power of multiplicity: a holistic survey of network-layer multipath",
#                     "journal_publication_year_compute": "2015",
#                     "name": "Junaid Qadir",
#                     "nust_auth_faculty_staff_id": "",
#                     "school": "",
#                     "school_disp_compute": "-",
#                     "student_school": ""
#                 },
#                 {
#                     "affiliation": "nust",
#                     "autohr_sequence": "2",
#                     "autohr_sequence_compute": "2",
#                     "co_author_faculty_staff_id": "",
#                     "co_author_student_id": "",
#                     "combined_faculty_staff_id": "",
#                     "country": "",
#                     "country_disp_compute": "Pakistan",
#                     "designation": "Student",
#                     "faculty_school": "",
#                     "faculty_student_author_compute": "",
#                     "id": "56251",
#                     "institute": "-",
#                     "institute_other_than_nust_temp": "",
#                     "is_corresponding_author": "",
#                     "is_sole_author": "",
#                     "journal_paper_id": "1674",
#                     "journal_publication_id": "Exploiting the power of multiplicity: a holistic survey of network-layer multipath",
#                     "journal_publication_year_compute": "2015",
#                     "name": "Anwaar Ali",
#                     "nust_auth_faculty_staff_id": "",
#                     "school": "",
#                     "school_disp_compute": "-",
#                     "student_school": ""
#                 },
#                 {
#                     "affiliation": "foreign",
#                     "autohr_sequence": "3",
#                     "autohr_sequence_compute": "3",
#                     "co_author_faculty_staff_id": "",
#                     "co_author_student_id": "",
#                     "combined_faculty_staff_id": "",
#                     "country": "Malaysia",
#                     "country_disp_compute": "Malaysia",
#                     "designation": "",
#                     "faculty_school": "",
#                     "faculty_student_author_compute": "",
#                     "id": "56252",
#                     "institute": "Sunway University",
#                     "institute_other_than_nust_temp": "",
#                     "is_corresponding_author": "",
#                     "is_sole_author": "",
#                     "journal_paper_id": "1674",
#                     "journal_publication_id": "Exploiting the power of multiplicity: a holistic survey of network-layer multipath",
#                     "journal_publication_year_compute": "2015",
#                     "name": "Kok-Lim Alvin Yau",
#                     "nust_auth_faculty_staff_id": "",
#                     "school": "",
#                     "school_disp_compute": "Sunway University",
#                     "student_school": ""
#                 }
#             ],
#             "id": 1674,
#             "title": "Exploiting the power of multiplicity: a holistic survey of network-layer multipath"
#         },
#         {
#             "g_r_count": 2,
#             "author_ids": [
#                 {
#                     "affiliation": "nust",
#                     "autohr_sequence": "1",
#                     "autohr_sequence_compute": "1",
#                     "co_author_faculty_staff_id": "",
#                     "co_author_student_id": "",
#                     "combined_faculty_staff_id": "",
#                     "country": "",
#                     "country_disp_compute": "Pakistan",
#                     "designation": "PhD Student",
#                     "faculty_school": "",
#                     "faculty_student_author_compute": "",
#                     "id": "49019",
#                     "institute": "-",
#                     "institute_other_than_nust_temp": "",
#                     "is_corresponding_author": "",
#                     "is_sole_author": "",
#                     "journal_paper_id": "1760",
#                     "journal_publication_id": "Enterprise systems' life cycle in pursuit of resilient smart factory for emerging aircraft industry: a synthesis of Critical Success Factors?(CSFs), theory, knowledge gaps, and implications",
#                     "journal_publication_year_compute": "2018",
#                     "name": "Asif Rashid",
#                     "nust_auth_faculty_staff_id": "",
#                     "school": "",
#                     "school_disp_compute": "-",
#                     "student_school": ""
#                 },
#                 {
#                     "affiliation": "foreign",
#                     "autohr_sequence": "2",
#                     "autohr_sequence_compute": "2",
#                     "co_author_faculty_staff_id": "",
#                     "co_author_student_id": "",
#                     "combined_faculty_staff_id": "",
#                     "country": "United Kingdom",
#                     "country_disp_compute": "United Kingdom",
#                     "designation": "",
#                     "faculty_school": "",
#                     "faculty_student_author_compute": "",
#                     "id": "49020",
#                     "institute": "University of Cambridge",
#                     "institute_other_than_nust_temp": "",
#                     "is_corresponding_author": "",
#                     "is_sole_author": "",
#                     "journal_paper_id": "1760",
#                     "journal_publication_id": "Enterprise systems' life cycle in pursuit of resilient smart factory for emerging aircraft industry: a synthesis of Critical Success Factors?(CSFs), theory, knowledge gaps, and implications",
#                     "journal_publication_year_compute": "2018",
#                     "name": "Tariq Masood",
#                     "nust_auth_faculty_staff_id": "",
#                     "school": "",
#                     "school_disp_compute": "University of Cambridge",
#                     "student_school": ""
#                 },
#                 {
#                     "affiliation": "foreign",
#                     "autohr_sequence": "3",
#                     "autohr_sequence_compute": "3",
#                     "co_author_faculty_staff_id": "",
#                     "co_author_student_id": "",
#                     "combined_faculty_staff_id": "",
#                     "country": "United Kingdom",
#                     "country_disp_compute": "United Kingdom",
#                     "designation": "",
#                     "faculty_school": "",
#                     "faculty_student_author_compute": "",
#                     "id": "49021",
#                     "institute": "Cranfield University",
#                     "institute_other_than_nust_temp": "",
#                     "is_corresponding_author": "",
#                     "is_sole_author": "",
#                     "journal_paper_id": "1760",
#                     "journal_publication_id": "Enterprise systems' life cycle in pursuit of resilient smart factory for emerging aircraft industry: a synthesis of Critical Success Factors?(CSFs), theory, knowledge gaps, and implications",
#                     "journal_publication_year_compute": "2018",
#                     "name": "John Ahmet Erkoyuncu",
#                     "nust_auth_faculty_staff_id": "",
#                     "school": "",
#                     "school_disp_compute": "Cranfield University",
#                     "student_school": ""
#                 }
#             ],
#             "id": 1760,
#             "title": "Enterprise systems' life cycle in pursuit of resilient smart factory for emerging aircraft industry: a synthesis of Critical Success Factors?(CSFs), theory, knowledge gaps, and implications"
#         }
# ]


# # Sample data with nested keys
# json_data = [
#     {
#         "g_r_count": 1,
#         "activity_date_deadline": "",
#         "activity_exception_icon": "",
#         "activity_summary": "",
#         "approval_date": "2019-06-24",
#         "curr_pos_users": "",
#         "discipline": [],
#         "filing_year": "2018",
#         "grant_date": "",
#         "id": 807,
#         "inventor_ids": [
#             {
#                 "affiliation": "nust",
#                 "co_author_faculty_staff_id": "Muhammad Shahzad Younis - 00000003471 - 34203-1339200-7 - SEECS",
#                 "co_author_student_id": "",
#                 "id": "609",
#                 "institute": "",
#                 "name": "Shahzad Younis",
#                 "publication_id": "Soil Moisture Meter "
#             },
#             {
#                 "affiliation": "foreign",
#                 "co_author_faculty_staff_id": "Muhammad Billa Younis - 00000003471 - 34203-1339200-7 - SEECS",
#                 "co_author_student_id": "",
#                 "id": "610",
#                 "institute": "",
#                 "name": "Shahzad Younis",
#                 "publication_id": "Water "
#             }
#         ],
#         "inventors": "Shahzad Younis",
#         "ip_status": [
#             {
#                 "id": "2",
#                 "name": "Granted"
#             }
#         ],
#         "ip_type": "Industrial Design",
#         "licensing_date": "",
#         "project_id": "",
#         "project_type": "",
#         "school": [
#             {
#                 "active": "True",
#                 "activity_date_deadline": "",
#                 "activity_exception_decoration": "",
#                 "activity_exception_icon": "",
#                 "activity_state": "",
#                 "activity_summary": "",
#                 "aol_enable": "",
#                 "code": "SEECS",
#                 "effective_date": "1991-01-03",
#                 "id": "36",
#                 "message_attachment_count": "",
#                 "message_has_error": "",
#                 "message_has_error_counter": "",
#                 "message_has_sms_error": "",
#                 "message_is_follower": "",
#                 "message_needaction": "",
#                 "message_needaction_counter": "",
#                 "message_unread": "",
#                 "message_unread_counter": "",
#                 "name": "School of Electrical Engineering and Computer Science (SEECS)",
#                 "phone": "",
#                 "to_be": "",
#                 "website": ""
#             }
#         ],
#         "sdgs": "",
#         "title": "Soil Moisture Meter ",
#         "initiator_cms_id": "00000003471",
#         "initiator_name": "Muhammad Shahzad Younis"
#     },
#     {
#         "g_r_count": 2,
#         "activity_date_deadline": "",
#         "activity_exception_icon": "",
#         "activity_summary": "",
#         "approval_date": "2019-06-24",
#         "curr_pos_users": "",
#         "discipline": [],
#         "filing_year": "2018",
#         "grant_date": "",
#         "id": 808,
#         "inventor_ids": [
#             {
#                 "affiliation": "nust",
#                 "co_author_faculty_staff_id": "Muhammad Shahzad Younis - 00000003471 - 34203-1339200-7 - SEECS",
#                 "co_author_student_id": "",
#                 "id": "610",
#                 "institute": "",
#                 "name": "Shahzad Younis",
#                 "publication_id": "Smart Dendrometer"
#             }
#         ],
#         "inventors": "Shahzad Younis",
#         "ip_status": [
#             {
#                 "id": "2",
#                 "name": "Granted"
#             }
#         ],
#         "ip_type": "Industrial Design",
#         "licensing_date": "",
#         "project_id": "",
#         "project_type": "",
#         "school": [
#             {
#                 "active": "True",
#                 "activity_date_deadline": "",
#                 "activity_exception_decoration": "",
#                 "activity_exception_icon": "",
#                 "activity_state": "",
#                 "activity_summary": "",
#                 "aol_enable": "",
#                 "code": "SEECS",
#                 "effective_date": "1991-01-03",
#                 "id": "36",
#                 "message_attachment_count": "",
#                 "message_has_error": "",
#                 "message_has_error_counter": "",
#                 "message_has_sms_error": "",
#                 "message_is_follower": "",
#                 "message_needaction": "",
#                 "message_needaction_counter": "",
#                 "message_unread": "",
#                 "message_unread_counter": "",
#                 "name": "School of Electrical Engineering and Computer Science (SEECS)",
#                 "phone": "",
#                 "to_be": "",
#                 "website": ""
#             }
#         ],
#         "sdgs": "",
#         "title": "Smart Dendrometer",
#         "initiator_cms_id": "00000003471",
#         "initiator_name": "Muhammad Shahzad Younis"
#     }
# ]




# json_data = [
#     {
#       "g_r_count": 1,
#       "application_sector": "",
#       "approval_date": "2018-04-28",
#       "approved_amount": "",
#       "approved_amount_from_industry": "",
#       "completion_date": "",
#       "copi_ids": [
#         {
#           "approval_date": "2018-04-28",
#           "co_author_faculty_staff_id": "Tughral Yamin - 00000202581 - 61101-1818744-9 - CIPS",
#           "co_author_student_id": "",
#           "completion_date": "",
#           "copi": "nust",
#           "copi_id": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised National Action Plan",
#           "faculty_school": "Centre For International Peace & Stability (CIPS)",
#           "id": "5786",
#           "institute": "-",
#           "name": "Prof Tughral Yamin",
#           "pi_copi_member": "copi",
#           "project_int_id": "5602",
#           "project_state": "l20",
#           "project_status": "apprinprocess",
#           "rel_coauthor_cnic_no_fms": "61101-1818744-9",
#           "rel_coauthor_employed_from": "2013-02-18",
#           "rel_coauthor_mobile_phone": "00923238556824",
#           "submission_date": "2018-01-05",
#           "title": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised National Action Plan"
#         },
#         {
#           "approval_date": "2018-04-28",
#           "co_author_faculty_staff_id": "Muhammad Makki - 00000202578 - 13101-4324808-5 - CIPS",
#           "co_author_student_id": "",
#           "completion_date": "",
#           "copi": "nust",
#           "copi_id": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised National Action Plan",
#           "faculty_school": "Centre For International Peace & Stability (CIPS)",
#           "id": "5787",
#           "institute": "-",
#           "name": "Muhammad Makki",
#           "pi_copi_member": "pi",
#           "project_int_id": "5602",
#           "project_state": "l20",
#           "project_status": "apprinprocess",
#           "rel_coauthor_cnic_no_fms": "13101-4324808-5",
#           "rel_coauthor_employed_from": "2016-04-11",
#           "rel_coauthor_mobile_phone": "09203330528741",
#           "submission_date": "2018-01-05",
#           "title": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised National Action Plan"
#         }
#       ],
#       "cost_in_pkr": 3290000.0,
#       "discipline": [
#         {
#           "id": "46",
#           "name": "Social Sciences and Humanities",
#           "show_in_project": "True",
#           "show_in_publications": "True"
#         }
#       ],
#       "duration_of_project_integer": "",
#       "funding_agency": "Higher Education Commission - Thematic Grant ",
#       "funding_from_agency": "",
#       "funding_scheme": "Thematic Grant ",
#       "funding_source": "Public",
#       "funding_source_country": "Pakistan",
#       "gop_vision": "Democratic Governance, Institutional Reform &amp; Modernization of the Public Sector",
#       "hec_thrust_area": "",
#       "id": 5602,
#       "pi_details_compute": "Muhammad Makki - 00000202578 - 13101-4324808-5 - CIPS",
#       "pi_school_compute": "Centre For International Peace & Stability (CIPS)",
#       "project_status": "Approved / In-Progress",
#       "project_type": "Research",
#       "submission_date": "2018-01-05",
#       "technology_readiness_level": "",
#       "title": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised National Action Plan",
#       "total_amount": ""
#     },
#     {
#       "g_r_count": 2,
#       "application_sector": "Social",
#       "approval_date": "2018-04-10",
#       "approved_amount": "",
#       "approved_amount_from_industry": "",
#       "completion_date": "2019-07-24",
#       "copi_ids": [
#         {
#           "approval_date": "2018-04-10",
#           "co_author_faculty_staff_id": "Muhammad Makki - 00000202578 - 13101-4324808-5 - CIPS",
#           "co_author_student_id": "",
#           "completion_date": "2019-07-24",
#           "copi": "nust",
#           "copi_id": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP",
#           "faculty_school": "Centre For International Peace & Stability (CIPS)",
#           "id": "4514",
#           "institute": "-",
#           "name": "Dr Muhammad Makki",
#           "pi_copi_member": "pi",
#           "project_int_id": "6606",
#           "project_state": "l20",
#           "project_status": "completd",
#           "rel_coauthor_cnic_no_fms": "13101-4324808-5",
#           "rel_coauthor_employed_from": "2016-04-11",
#           "rel_coauthor_mobile_phone": "09203330528741",
#           "submission_date": "2018-01-05",
#           "title": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP"
#         },
#         {
#           "approval_date": "2018-04-10",
#           "co_author_faculty_staff_id": "Tughral Yamin - 00000202581 - 61101-1818744-9 - CIPS",
#           "co_author_student_id": "",
#           "completion_date": "2019-07-24",
#           "copi": "nust",
#           "copi_id": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP",
#           "faculty_school": "Centre For International Peace & Stability (CIPS)",
#           "id": "4515",
#           "institute": "-",
#           "name": "Dr Tughral Yamin",
#           "pi_copi_member": "copi",
#           "project_int_id": "6606",
#           "project_state": "l20",
#           "project_status": "completd",
#           "rel_coauthor_cnic_no_fms": "61101-1818744-9",
#           "rel_coauthor_employed_from": "2013-02-18",
#           "rel_coauthor_mobile_phone": "00923238556824",
#           "submission_date": "2018-01-05",
#           "title": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP"
#         },
#         {
#           "approval_date": "2018-04-10",
#           "co_author_faculty_staff_id": "",
#           "co_author_student_id": "",
#           "completion_date": "2019-07-24",
#           "copi": "student",
#           "copi_id": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP",
#           "faculty_school": "",
#           "id": "4516",
#           "institute": "-",
#           "name": "Faryal Khan ",
#           "pi_copi_member": "member",
#           "project_int_id": "6606",
#           "project_state": "l20",
#           "project_status": "completd",
#           "rel_coauthor_cnic_no_fms": "",
#           "rel_coauthor_employed_from": "",
#           "rel_coauthor_mobile_phone": "",
#           "submission_date": "2018-01-05",
#           "title": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP"
#         },
#         {
#           "approval_date": "2018-04-10",
#           "co_author_faculty_staff_id": "",
#           "co_author_student_id": "",
#           "completion_date": "2019-07-24",
#           "copi": "student",
#           "copi_id": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP",
#           "faculty_school": "",
#           "id": "4517",
#           "institute": "-",
#           "name": "Masooma Jaffri ",
#           "pi_copi_member": "member",
#           "project_int_id": "6606",
#           "project_state": "l20",
#           "project_status": "completd",
#           "rel_coauthor_cnic_no_fms": "",
#           "rel_coauthor_employed_from": "",
#           "rel_coauthor_mobile_phone": "",
#           "submission_date": "2018-01-05",
#           "title": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP"
#         },
#         {
#           "approval_date": "2018-04-10",
#           "co_author_faculty_staff_id": "",
#           "co_author_student_id": "",
#           "completion_date": "2019-07-24",
#           "copi": "student",
#           "copi_id": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP",
#           "faculty_school": "",
#           "id": "4518",
#           "institute": "-",
#           "name": "Ali Akash ",
#           "pi_copi_member": "member",
#           "project_int_id": "6606",
#           "project_state": "l20",
#           "project_status": "completd",
#           "rel_coauthor_cnic_no_fms": "",
#           "rel_coauthor_employed_from": "",
#           "rel_coauthor_mobile_phone": "",
#           "submission_date": "2018-01-05",
#           "title": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP"
#         },
#         {
#           "approval_date": "2018-04-10",
#           "co_author_faculty_staff_id": "",
#           "co_author_student_id": "",
#           "completion_date": "2019-07-24",
#           "copi": "student",
#           "copi_id": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP",
#           "faculty_school": "",
#           "id": "4519",
#           "institute": "-",
#           "name": "Aizah Azam",
#           "pi_copi_member": "member",
#           "project_int_id": "6606",
#           "project_state": "l20",
#           "project_status": "completd",
#           "rel_coauthor_cnic_no_fms": "",
#           "rel_coauthor_employed_from": "",
#           "rel_coauthor_mobile_phone": "",
#           "submission_date": "2018-01-05",
#           "title": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP"
#         },
#         {
#           "approval_date": "2018-04-10",
#           "co_author_faculty_staff_id": "",
#           "co_author_student_id": "",
#           "completion_date": "2019-07-24",
#           "copi": "student",
#           "copi_id": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP",
#           "faculty_school": "",
#           "id": "4520",
#           "institute": "-",
#           "name": "Maryam Tariq",
#           "pi_copi_member": "member",
#           "project_int_id": "6606",
#           "project_state": "l20",
#           "project_status": "completd",
#           "rel_coauthor_cnic_no_fms": "",
#           "rel_coauthor_employed_from": "",
#           "rel_coauthor_mobile_phone": "",
#           "submission_date": "2018-01-05",
#           "title": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP"
#         }
#       ],
#       "cost_in_pkr": 3290625.0,
#       "discipline": [
#         {
#           "id": "1",
#           "name": "Disaster Management",
#           "show_in_project": "True",
#           "show_in_publications": "True"
#         }
#       ],
#       "duration_of_project_integer": "",
#       "funding_agency": "Higher Education Commissioon",
#       "funding_from_agency": "",
#       "funding_scheme": "Thematic Research Grants",
#       "funding_source": "Public",
#       "funding_source_country": "Pakistan",
#       "gop_vision": "Democratic Governance, Institutional Reform &amp; Modernization of the Public Sector",
#       "hec_thrust_area": "",
#       "id": 6606,
#       "pi_details_compute": "Muhammad Makki - 00000202578 - 13101-4324808-5 - CIPS",
#       "pi_school_compute": "Centre For International Peace & Stability (CIPS)",
#       "project_status": "Completed",
#       "project_type": "Research",
#       "submission_date": "2018-01-05",
#       "technology_readiness_level": "",
#       "title": "Reconstructing Pakistan's Counter-terrorism Strategy: Setting Grounds for a Revised NAP",
#       "total_amount": ""
#     }]

# json_data =  [
#     {
#       "g_r_count": 1,
#       "co_author_faculty_staff_id": "Tughral Yamin - 00000202581 - 61101-1818744-9 - CIPS",
#       "co_author_student_id": "",
#       "combined_faculty_staff_id": "Tughral Yamin - 00000202581 - 61101-1818744-9 - CIPS",
#       "faculty_school": "Centre For International Peace & Stability (CIPS)",
#       "faculty_student_author_compute": "00000202581 - Tughral Yamin",
#       "institute": "CIPS",
#       "institute_other_than_nust_temp": "",
#       "journal_paper_id": 8836,
#       "nust_auth_faculty_staff_id": "",
#       "school_disp_compute": "CIPS",
#       "cmsid": "00000202581"
#     },
#     {
#       "g_r_count": 2,
#       "co_author_faculty_staff_id": "Tughral Yamin - 00000202581 - 61101-1818744-9 - CIPS",
#       "co_author_student_id": "",
#       "combined_faculty_staff_id": "Tughral Yamin - 00000202581 - 61101-1818744-9 - CIPS",
#       "faculty_school": "Centre For International Peace & Stability (CIPS)",
#       "faculty_student_author_compute": "00000202581 - Tughral Yamin",
#       "institute": "CIPS",
#       "institute_other_than_nust_temp": "",
#       "journal_paper_id": 8906,
#       "nust_auth_faculty_staff_id": "",
#       "school_disp_compute": "CIPS",
#       "cmsid": "00000202581"
#     }]



json_data = [
    {
      "g_r_count": 1,
      "activity_date_deadline": "",
      "activity_exception_icon": "",
      "activity_summary": "",
      "approval_date": "2017-04-10",
      "curr_pos_users": "",
      "discipline": [],
      "filing_year": "2015.11.27",
      "grant_date": "",
      "id": 814,
      "inventor_ids": [],
      "inventors": "SUNG Tae-Hyun, JEONG Se Yeong, HAMID Jabbar, JUNG  Hyun Jun, AHN Jung Hwan, CHO Jae Yong, HWANG Won Seop",
      "ip_status": [
        {
          "id": "2",
          "name": "Granted"
        }
      ],
      "ip_type": "Patent",
      "licensing_date": "",
      "project_id": "",
      "project_type": "",
      "school": [
        {
          "active": "True",
          "activity_date_deadline": "",
          "activity_exception_decoration": "",
          "activity_exception_icon": "",
          "activity_state": "",
          "activity_summary": "",
          "aol_enable": "",
          "code": "CEME",
          "effective_date": "1991-09-01",
          "id": "42",
          "message_attachment_count": "",
          "message_has_error": "",
          "message_has_error_counter": "",
          "message_has_sms_error": "",
          "message_is_follower": "",
          "message_needaction": "",
          "message_needaction_counter": "",
          "message_unread": "",
          "message_unread_counter": "",
          "name": "College of Electrical & Mechanical Engineering (CEME)",
          "phone": "",
          "to_be": "",
          "website": ""
        }
      ],
      "sdgs": "",
      "title": "Energy harvesting device and wireless switch including the same",
      "initiator_cms_id": "00000278652",
      "initiator_name": "Hamid Jabbar"
    }
  ]





# List of keys with nested data
nested_keys = ["discipline", "inventor_ids", "ip_status", "school"]
#research by publications
# nested_keys = ["author_ids", "findet_ids", "sdgs"] 
# nested_keys = ["author_ids"]
# nested_keys = ["copi_ids", "discipline"]
# nested_keys = [""]

# Flatten the data
flattened_data = flattenData(json_data, nested_keys)

# print(flattened_data)
df = pd.DataFrame(flattened_data)
print(df)
# df.to_csv('researchbyIP.csv', index=False)
