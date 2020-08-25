import os
import csv
import json
import pandas as pd

#fname=["2015.csv", "2016.csv", "2017.csv", "2018.csv", "2019.csv"]
f="2015.csv"
fname2="country_codes.csv"

data_path2 = os.path.join("resources", fname2)
data2=pd.read_csv(data_path2)
print(data2.head())

data_path = os.path.join("resources", f)
data_path3=os.path.join("resources", "2015_with_codes.csv")
data=pd.read_csv(data_path)
print(data.head())
year=f.replace('.csv', '')
merged_df=pd.merge(data, data2, how="left", on="Country")
print(merged_df.head())

merged_df.to_csv(data_path3, index=False)

   


        
    










            

        

    






        



