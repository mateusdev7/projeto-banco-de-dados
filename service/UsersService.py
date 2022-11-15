import sys
sys.path.append('C:/Apache24/htdocs/projeto-banco-de-dados/projeto-banco-de-dados/')
import json
from flask import Flask, request
from flask_cors import CORS, cross_origin
from dataMongo.users.operationsUsers import OperationsUser
from model.users.Users import Users
app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/insert', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def insert():
    data = request.json
    data["id"] = OperationsUser.findLastUser() + 1
    user = Users(**data)
    resultInsert = OperationsUser.insertOneUser(data)
    if (resultInsert):
        returnJson = json.dumps(user.__dict__, ensure_ascii=False).encode('utf8')
        return returnJson
    else:
        return []

@app.route('/search', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def search():
    response = OperationsUser.findAllUsers()
    returnJson = json.dumps(response, ensure_ascii=False).encode('utf8')
    return returnJson

@app.route('/delete', methods=['GET', 'POST', 'DELETE'])
@cross_origin(supports_credentials=True)
def delete():
    data = request.json # CPF para remover
    responseDataCPF = OperationsUser.searchUserWithCpf(data["cpf"])
    if (responseDataCPF != None):
        user = Users(**responseDataCPF)
        OperationsUser.deleteUser(data["cpf"])
        dataJsonForJavaScript = json.dumps(user.__dict__, ensure_ascii=False).encode('utf8')
        return dataJsonForJavaScript
    else:
        return []

@app.route('/update', methods=['GET', 'POST', 'UPDATE'])
@cross_origin(supports_credentials=True)
def update():
    data = request.json
    if (data != None):
        user = Users(**data)
        OperationsUser.updateUser(data["id"], data["name"], data["email"], data["descriptionAccess"], data["cpf"])
        returnJson = json.dumps(user.__dict__, ensure_ascii=False).encode('utf8')
        return returnJson
    else: 
        return []

@app.route('/pic', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def pic():
    data = request.json # ID para atualizar
    responseDataID = OperationsUser.findOneUserById(data["id"])
    if (responseDataID != None):
        return responseDataID
    else:
        return []

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=False, threaded=True)