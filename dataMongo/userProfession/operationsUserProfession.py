import sys
import json
from conexaoMongo.DataBaseConnectionMongo import MongoConnection
sys.path.append('C:/Apache24/htdocs/projeto-banco-de-dados/projeto-banco-de-dados/')

mongo = MongoConnection()

class OperationsUserProfession():
  def insertOneUserProfession(data: json):
    mongo.connect()
    mongo.collectionUserProfession.insert_one(data)
    