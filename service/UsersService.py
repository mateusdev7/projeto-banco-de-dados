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
    data["id"] = OperationsUser.findLastUser("users") + 1
    user = Users(**data)
    OperationsUser.insertOneUser(data, "users")
    returnJson = json.dumps(user.__dict__, ensure_ascii=False).encode('utf8')
    return returnJson

@app.route('/search', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def search():
    response = OperationsUser.findAllUsers("users")
    returnJson = json.dumps(response, ensure_ascii=False).encode('utf8')
    return returnJson

@app.route('/delete', methods=['GET','POST', 'DELETE'])
@cross_origin(supports_credentials=True)
def delete():
    data = request.json # ID para remover
    responseDataID = OperationsUser.findOneUser(data["id"], "users")
    if (responseDataID != None):
        user = Users(**responseDataID)
        OperationsUser.deleteUser(data["id"], "users")
        dataJsonForJavaScript = json.dumps(user.__dict__, ensure_ascii=False).encode('utf8')
        return dataJsonForJavaScript
    else:
        return []

# @app.route('/update', methods=['GET','POST'])
# @cross_origin(supports_credentials=True)
# def update():
#     data = json.loads(json.dumps(request.json))
#     updateUser = Users(**data)
#     response = UserUpdate.update(updateUser)
#     returnJson = json.dumps(response.__dict__, ensure_ascii=False).encode('utf8')
#     return returnJson


# @app.route('/pic', methods=['GET','POST'])
# @cross_origin(supports_credentials=True)
# def pic():
#     data = json.loads(json.dumps(request.json))
#     picUser = Users(**data)
#     response = UserPic.pic(picUser)
#     returnJson = json.dumps(response, ensure_ascii=False).encode('utf8')
#     return returnJson

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=False, threaded=True)