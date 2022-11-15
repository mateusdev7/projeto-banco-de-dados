import sys
import json
from conexaoMongo.DataBaseConnectionMongo import MongoConnection
sys.path.append('C:/Apache24/htdocs/projeto-banco-de-dados/projeto-banco-de-dados/')

mongo = MongoConnection()

class OperationsProfession():
    def insertOneProfession(data: json):
        mongo.connect()
        resultSearchProfession = OperationsProfession.findOneProfession(data["description"])
        if (resultSearchProfession == None):
            mongo.collectionProfession.insert_one(data)
            return True
        else:
            return False
    
    def findOneProfession(description: str):
        mongo.connect()
        list = []
        for prof in mongo.collectionProfession.find({ "description": description.lower() }):
            professionObject = {
                "id" : prof["id"],
                "description" : prof["description"],
            }
            list.append(professionObject)
        if (list != []):
            return list[0]
        else:
            return None
    
    def findAllProfessions():
        mongo.connect()
        list = []
        for profession in mongo.collectionProfession.find():
            professionObject = dict(
                id = profession["id"],
                description = profession["description"],
            )
            list.append(professionObject)
        mongo.close()
        return list
    
    def findLastProfession():
        mongo.connect()
        list = []
        for x in mongo.collectionProfession.find():
            list.append(x["id"])
        mongo.close()
        if (list == []):
            lastProfession = 0
        else:
            lastProfession = list[-1]
        return lastProfession
    
    def findOneProfessionById(id: int):
        mongo.connect()
        list = []
        for prof in mongo.collectionProfession.find({ "id": id }):
            professionObject = {
                "id" : prof["id"],
                "description" : prof["description"],
            }
            list.append(professionObject)
        if (list != []):
            return list[0]
        else:
            return None
    
    def deleteProfession(id: int):
        mongo.connect()
        mongo.collectionProfession.delete_one({ "id": id })
        mongo.close()
    
    def updateProfession(id: int, description: str):
        mongo.connect()
        myQuery = { "id": id }
        newValues = { "$set" : { "description": description}}
        mongo.collectionProfession.update_many(myQuery, newValues)
        mongo.close()