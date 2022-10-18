import sys
sys.path.append('C:\Apache24\htdocs')
import json
from flask import Flask, request
from flask_cors import CORS, cross_origin
from data.profession.ProfessionInsert import ProfessionInsert
from data.profession.ProfessionUpdate import ProfessionUpdate
from data.profession.ProfessionDelete import ProfessionDelete
from data.profession.ProfessionSearch import ProfessionSearch
from data.profession.ProfessionPic import ProfessionPic
from model.profession.Profession import Profession
app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/insert', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def insert():
    data = json.loads(json.dumps(request.json))
    insertUser = Profession(**data)
    response = ProfessionInsert.insert(insertUser)
    returnJson = json.dumps(response.__dict__).encode('utf8')
    return returnJson

@app.route('/update', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def update():
    data = json.loads(json.dumps(request.json))
    updateUser = Profession(**data)
    response = ProfessionUpdate.update(updateUser)
    returnJson = json.dumps(response.__dict__, ensure_ascii=False).encode('utf8')
    return returnJson

@app.route('/delete', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def delete():
    data = json.loads(json.dumps(request.json))
    deleteUser = Profession(**data)
    response = ProfessionDelete.delete(deleteUser)
    returnJson = json.dumps(response.__dict__, ensure_ascii=False).encode('utf8')
    return returnJson

@app.route('/pic', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def pic():
    data = json.loads(json.dumps(request.json))
    picProfession = Profession(**data)
    response = ProfessionPic.pic(picProfession)
    returnJson = json.dumps(response, ensure_ascii=False).encode('utf8')
    return returnJson

@app.route('/search', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def search():
    response = ProfessionSearch.search()
    returnJson = json.dumps(response, ensure_ascii=False).encode('utf8')
    return returnJson

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5001, debug=False, threaded=True)