import pymongo
import sys
sys.path.append('C:/Apache24/htdocs/projeto-banco-de-dados/projeto-banco-de-dados/')
class MongoConnection:
    def connect(self):
        self.myclient = pymongo.MongoClient("mongodb://localhost:27017/")
        self.mydb = self.myclient["beautysalon"]
        self.collectionUsers = self.mydb["users"]
        self.collectionProfession = self.mydb["profession"]
        self.collectionUserProfession = self.mydb["userProfession"]
    def close(self):
        self.myclient.close()
        
if __name__ == "__main__":
    MongoConnection.connect()




