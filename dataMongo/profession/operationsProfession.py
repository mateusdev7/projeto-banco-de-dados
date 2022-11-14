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
    
    def findOneProfession(profissao: str):
        mongo.connect()
        list = []
        for prof in mongo.collectionProfession.find({ "description": profissao }):
            professionObject = {
                "id" : prof["id"],
                "description" : prof["description".toLowerCase()],
            }
            list.append(professionObject)
        if (list != []):
            return list[0]
        else:
            return None
    
    # def deleteUser(id: int):
    #     mongo.connect()
    #     mongo.collectionUsers.delete_many({ "id": id })
    #     mongo.close()
    
    # def updateUser(id: int, name: str, email: str, descriptionAccess: str, cpf: str):
    #     mongo.connect()
    #     myQuery = { "id": id }
    #     newValues = { "$set" : { "name": name, "email": email, "descriptionAccess": descriptionAccess, "cpf": cpf}}
    #     mongo.collectionUsers.update_many(myQuery, newValues)
    #     mongo.close()