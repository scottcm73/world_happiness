import os
import csv
import json
import pandas as pd

#fname=["2015.csv", "2016.csv", "2017.csv", "2018.csv", "2019.csv"]
f="2017.csv"
fname2="country_codes.csv"


#Got all the correct three letter country codes in 2015wc.csv. 
# Using country and code in all other wc versions of csvs. 
# "wc" stands for with code.

data_path3=os.path.join("..","resources", "2015wc.csv")
data_path = os.path.join("..","resources", f)
data_path2 = os.path.join("..","resources", fname2)


data_path4=os.path.join("..","resources", "2017wc.csv")
# data=pd.read_csv(data_path)
# print(data.head())
# year=f.replace('.csv', '')
# merged_df=pd.merge(data, data2, how="left", on="Country")
# print(merged_df.head())

df3=pd.read_csv(data_path3)
df4=df3[["country", "code"]]
df1=pd.read_csv(data_path)

merged_df=pd.merge(df1, df4, how="left", on="country")
merged_df.columns=(merged_df.columns.str.lower()).str.replace(" ", "_")

print(merged_df.head())

merged_df.to_csv(data_path4, index=False)

   


        
    










            

        

    






        



