import sys
import json
from conexaoMongo.DataBaseConnectionMongo import MongoConnection
sys.path.append('C:/Apache24/htdocs/projeto-banco-de-dados/projeto-banco-de-dados/')

mongo = MongoConnection()

class OperationsUser():
    def insertOneUser(data: json, collection: str):
        mongo.connect()
        mongo.mydb[collection].insert_one(data)
        mongo.close()
    
    def findAllUsers(collection: str):
        mongo.connect()
        list = []
        for x in mongo.mydb[collection].find():
            list.append(x["name"])
        mongo.close()
        return list
    
    def findLastUser(collection: str):
        mongo.connect()
        list = []
        for x in mongo.mydb[collection].find():
            list.append(x["id"])
        mongo.close()
        if (list == []):
            lastUser = 0
        else:
            lastUser = list[-1]
        return lastUser
    
    def findAndDeleteUser(collection: str):
        mongo.connect()
        mongo.mydb[collection].delete_many({})
        mongo.close()
