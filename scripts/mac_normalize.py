import json
import sys
import os
import re

def modify_for_mac(json_file):
    with open(json_file, "r+") as f:
        data = json.loads(f.read())
        sections = data["sections"] #list of dicts, each its own section
        list_of_sections = [sections[i] for i in range(0, len(sections))] #a list of dictionaries, each being a section of shortcuts
        
        
        for section in list_of_sections:
            shortcuts = section["shortcuts"]
            for shortcut in shortcuts:
                keys = shortcut["keys"] #list of strings contraining keys to press
                description = shortcut["description"]
                ks = ' '.join(keys) #cast list of keys to a string
                if keys.count("Ctrl") == 1:
                    keys[keys.index("Ctrl")] = "Cmd"

                if "/" in ks and "/" != ks[len(ks)-1]:
                    slash_index = ks.index("/")
                    if "/" in description:
                        before_desc = re.search("/(.*) ", description[::-1])
                        after_desc = description[description.index("/"): len(description)]

                        pre_desc = before_desc.group(0)[2:0:-1] #word or char before / in description
                        post_desc = after_desc[1:] #word or char before / in description

                        before =  re.search("/(.*) ", ks[::-1]) 
                        after = ks[slash_index: len(ks)]
                        pre = before.group(0)[2:0:-1] #word or char before / in shortcut keys
                        post = after[1:] #word or char before / in shortcut keys
                        #inserting 2 dictionaries for the split up shortcuts
                        shortcuts.insert(shortcuts.index(shortcut), {
                                 "description": description + f"({before_desc})",
                                 "keys": keys[0:len(keys)-1] + [before]
                        })

                        shortcuts.insert(shortcuts.index(shortcut), {
                                 "description": description + f"({after_desc})",
                                 "keys": keys[:len(keys)-1] + [after]
                        })
                        
                    else:
                         before = re.search("/(.*) ", ks[::-1])
                         after = ks[slash_index: len(ks)]
                         pre = before.group(0)[2:0:-1]
                         post = after[1:]
                           
                         shortcuts.insert(shortcuts.index(shortcut), {
                                 "description": description + "(decrease/down)",
                                 "keys": keys[0:len(keys)-1] + [pre]

                         })

                         shortcuts.insert(shortcuts.index(shortcut), {
                                 "description": description + "(increase/up)",
                                 "keys": keys[0:len(keys)-1] + [post]
                         })
                    
                    del(shortcuts[shortcuts.index(shortcut)]) #getting rid of original shorcut since it was replaced by 2 new ones
                else:
                    continue
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
        
#saving_all_files()

modify_for_mac("/Users/aadilali/repos/ctrlspace/public/content/airtable.json")

