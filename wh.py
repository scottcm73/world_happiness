import os
import csv
import json

fname=["2015.csv", "2016.csv", "2017.csv", "2018.csv", "2019.csv"]

data=[]
json_str_start=""
json_str=""
for f in fname:
    data_path = os.path.join("resources", f)
    data_path2 = os.path.join("resources", "file.json")
    with open(data_path, 'r') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        year=f.replace('.csv', '')
        json_str_start='{"' + year +'": '

        data_list=list()
        
        for row in reader:
            data_list.append(row)

        data = [dict(zip(data_list[0],row)) for row in data_list]
        data.pop(0)
 
        json_str = json_str + json_str_start + json.dumps(data) + " }, \n"


        
    
print (json_str[0:50])

with open(data_path2, 'w+') as jsonfile:
     
    jsonfile.write(json_str)







            

        

    






        



