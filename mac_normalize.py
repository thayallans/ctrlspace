import json
import sys
import os

def modify_for_mac(json_file):
    with open(json_file, "r+") as f:
        data = json.loads(f.read())
        sections = data["sections"]
        list_of_sections = [sections[i] for i in range(0, len(sections))]
              
        for section in list_of_sections:
            shortcuts = section["shortcuts"]
            for shortcut in shortcuts:
                keys = shortcut["keys"]
                if keys.count("Ctrl") == 1:
                    keys[keys.index("Ctrl")] = "Cmd"
        return data
        

def modify_all_files(directory_path):
    all_jsons = [files for files in os.listdir(directory_path) if files != '.DS_Store' ]
    all_dicts = [modify_for_mac(directory_path + "/" + f) for f in all_jsons]
    return all_dicts, all_jsons

def saving_all_files():
    directory_path = input("Enter the directory path for which you want to convert windows json files to mac (without quotations):")
    dicts, jsons = modify_all_files(directory_path)
    for i in range(0, len(dicts)):
            with open('mac_' + jsons[i], 'w') as fp:
                json.dump(dicts[i], fp, indent=4)
        
saving_all_files()