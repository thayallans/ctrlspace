import json
import sys
import os
import re

def modify_for_mac(json_file):
    acceptable_desc_length = 22
    long_desc_length = 35
    with open(json_file, "r+") as f:
        data = json.loads(f.read())
        sections = data["sections"] #list of dicts, each its own section
        list_of_sections = [sections[i] for i in range(0, len(sections))] #a list of dictionaries, each being a section of shortcuts
        
        for section in list_of_sections:
            shortcuts = section["shortcuts"]
            for shortcut in shortcuts:
                keys = shortcut["keys"] #list of strings contraining keys to press
                description = shortcut["description"]
                if len(description) > acceptable_desc_length: #logic for checking if desc is too big then adding a space at the end
                    if len(description) > long_desc_length:
                        description += " " #super long descriptions will be marked with 2 spaces 
                    description += " "
                shortcut["description"] = description
                json.dump(data, f)

                if keys.count("Ctrl") == 1:
                    keys[keys.index("Ctrl")] = "Cmd"
                ks = ' '.join(keys) #cast list of keys to a string
                if "/" in ks and "/" != ks[len(ks)-1]:
                    slash_index = ks.index("/")
                    if "/" in description:
                        before_desc = re.search("/(.*) ", description[::-1])
                        after_desc = description[description.index("/"): len(description)]

                        pre_desc = before_desc.group(0)[len(before_desc.group(0))-1:0:-1][1:] #word or char before / in description
                        post_desc = after_desc[1:] #word or char before / in description

                        before = re.search("/(.*) ", ks[::-1])
                        pre = ""
                        if before: 
                            pre = before.group(0)[len(before_desc.group(0))-1:0:-1]
                        else:
                            kl = ks.split()
                            last_in_kl = kl[len(kl)-1]
                            pre = last_in_kl[0:last_in_kl.index("/")]

                        after = ks[slash_index: len(ks)]
                        post = after[1:]
                        #inserting 2 dictionaries for the split up shortcuts
                        shortcuts.insert(shortcuts.index(shortcut), {
                                 "description": description + f"({pre_desc})",
                                 "keys": keys[0:len(keys)-1] + [pre]
                        })

                        shortcuts.insert(shortcuts.index(shortcut), {
                                 "description": description + f"({post_desc})",
                                 "keys": keys[:len(keys)-1] + [post]
                        })
                        
                    else:
                        pre = ""
                        before = re.search("/(.*) ", ks[::-1])
                        if before:
                             pre = before.group(0)[len(before.group(0))-1:0:-1]
                        else:
                             pre = ks[0:slash_index]
                        after = ks[slash_index: len(ks)]
                        post = after[1:]
                        dec = ""
                        inc = ""
                        if "djust" in description:
                            dec = " (decrease)"
                            inc = " (increase)"
                        shortcuts.insert(shortcuts.index(shortcut), {
                                 "description": description + dec,
                                 "keys": keys[0:len(keys)-1] + [pre]

                        })

                        shortcuts.insert(shortcuts.index(shortcut), {
                                 "description": description + inc,
                                 "keys": keys[0:len(keys)-1] + [post]
                        })
                    
                    del(shortcuts[shortcuts.index(shortcut)]) #getting rid of original shorcut since it was replaced by 2 new onesls
                else:
                    continue
        return data
        

def modify_all_files(directory_path):
    all_jsons = [files for files in os.listdir(directory_path) if files != '.DS_Store' ]
    all_dicts = [modify_for_mac(directory_path + f) for f in all_jsons]
    return all_dicts, all_jsons

def saving_all_files():
    directory_path = input("Enter the directory path for which you want to convert windows json files to mac (without quotations):")
    dicts, jsons = modify_all_files(directory_path)
    for i in range(0, len(dicts)):
            with open('mac_' + jsons[i], 'w') as fp:
                json.dump(dicts[i], fp, indent=4)
        
saving_all_files()

# heres a sample filepath -> "/Users/aadilali/repos/ctrlspace/public/content/"

