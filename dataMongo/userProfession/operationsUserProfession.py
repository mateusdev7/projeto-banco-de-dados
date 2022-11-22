import sys
import json
from pymongo import MongoClient
from conexaoMongo.DataBaseConnectionMongo import MongoConnection
sys.path.append('C:/Apache24/htdocs/projeto-banco-de-dados/projeto-banco-de-dados/')

mongo = MongoConnection()
class OperationsUserProfession():
    def insertOneUserProfession(data: json):
        mongo.connect()
        resultSearchUser = OperationsUserProfession.searchUserWithCpf(data["cpf"])
        if (resultSearchUser != None):
            mongo.collectionUserProfession.insert_one(data)
            return True
        else:
            return False
    
    def searchUserWithCpf(cpf: str):
        mongo.connect()
        list = []
        for user in mongo.collectionUsers.find({ "cpf": cpf }):
            userObject = {
                "id" : user["id"],
                "name" : user["name"],
                "email" : user["email"],
                "descriptionAccess" : user["descriptionAccess"],
                "cpf" : user["cpf"],
            }
            list.append(userObject)
        if (list != []):
            return list[0]
        else:
            return None
  
    def findLastUserProfession():
        mongo.connect()
        list = []
        for x in mongo.collectionUserProfession.find():
            list.append(x["id"])
        mongo.close()
        if (list == []):
            lastUserProfession = 0
        else:
            lastUserProfession = list[-1]
        return lastUserProfession
    
    
    def aggregateUserProfession():
        list = []
        client = MongoClient("mongodb://localhost:27017/")
        result = client['beautysalon']['userProfession'].aggregate(
        [
            {
                '$lookup': {
                    'from': 'users', 
                    'localField': 'cpf', 
                    'foreignField': 'cpf', 
                    'as': 'users'
                }
            },
            {
                '$unwind': {
                    'path': '$users'
                }
            }, 
            {
                '$project': {
                    'description': 1, 
                    'users': '$users.cpf'
                }
            }, 
            {
                '$group': {
                    '_id': '$description', 
                    'quant': {
                        '$sum': 1
                    }
                }
            }
        ])
        for x in result:
            userProfession = {
                    "description" : x["_id"],
                    "quant" : x["quant"]
                }
            list.append(userProfession)
        if (list == []):
            return None
        else:
            return list
    
    