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



#-------------------------------------------------working with this --------------------------------------------


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
#                         for nested_key, nested_value in nested_item.items():
#                             flat_item_copy[f"{key}_{nested_key}"] = nested_value
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




json_data =  


# IP
# nested_keys = ["discipline", "inventor_ids", "ip_status", "school"]

#publications
# nested_keys = ["author_ids", "findet_ids", "sdgs"] 

# nested_keys = ["author_ids"]

#projects
# nested_keys = ["copi_ids", "discipline"]

#supervisors
# nested_keys = ["supervisor_ids"]


#editorials
# nested_keys = [""]

#profile education
# nested_keys = ["award_ids", "experience_ids", "fms_academic_ids", "fms_prof_reg_ids", "master_ids", "profqualification_ids", "scholarship_ids", "training_ids"]

# Flatten the data
flattened_data = flattenData(json_data, nested_keys)

# print(flattened_data)
df = pd.DataFrame(flattened_data)
print(df)
df.to_csv('nameBy.csv', index=False)
