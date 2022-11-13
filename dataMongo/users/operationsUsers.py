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
        for user in mongo.mydb[collection].find():
            userObject = dict(
                id = user["id"],
                name = user["name"],
                email = user["email"]
            )
            list.append(userObject)
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
        mongo.close()
        return lastUser
    
    def findOneUser(id: int, collection: str):
        mongo.connect()
        list = []
        for user in mongo.mydb[collection].find({ "id": id }):
            userObject = {
                "id" : user["id"],
                "name" : user["name"],
                "email" : user["email"],
                "descriptionAccess" : user["descriptionAccess"],
                "phone" : user["phone"],
                "zipCode" : user["zipCode"],
                "numberHome" : user["numberHome"],
                "complement" : user["complement"],
            }
            list.append(userObject)
        mongo.close()
        if (list != []):
            return list[0]
        else:
            return None
    
    def deleteUser(id: int, collection: str):
        mongo.connect()
        mongo.mydb[collection].delete_many({ "id": id })
        mongo.close()
    
    def updateUser(id: int, name: str, email: str, descriptionAccess: str, phone: str, zipCode: int, numberHome: int, complement: str):
        mongo.connect()
        myQuery = { "id": id }
        newValues = { "$set" : { "name": name, "email": email, "descriptionAccess": descriptionAccess, "phone": phone, "zipCode": zipCode, "numberHome": numberHome, "complement": complement }}
        mongo.mycol.update_many(myQuery, newValues)
        mongo.close()