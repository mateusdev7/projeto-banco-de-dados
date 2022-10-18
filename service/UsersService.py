import sys
sys.path.append('C:\Apache24\htdocs')
import json
from flask import Flask, request
from flask_cors import CORS, cross_origin
from data.users.UsersInsert import UserInsert
from data.users.UsersUpdate import UserUpdate
from data.users.UsersDelete import UserDelete
from data.users.UsersSearch import UsersSearch
from data.users.UsersPic import UserPic
from model.users.Users import Users
app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/insert', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def insert():
    data = json.loads(json.dumps(request.json))
    insertUser = Users(**data)
    response = UserInsert.insert(insertUser)
    returnJson = json.dumps(response.__dict__, ensure_ascii=False).encode('utf8')
    return returnJson

@app.route('/update', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def update():
    data = json.loads(json.dumps(request.json))
    updateUser = Users(**data)
    response = UserUpdate.update(updateUser)
    returnJson = json.dumps(response.__dict__, ensure_ascii=False).encode('utf8')
    return returnJson

@app.route('/delete', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def delete():
    data = json.loads(json.dumps(request.json))
    deleteUser = Users(**data)
    response = UserDelete.delete(deleteUser)
    returnJson = json.dumps(response.__dict__, ensure_ascii=False).encode('utf8')
    return returnJson

@app.route('/pic', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def pic():
    data = json.loads(json.dumps(request.json))
    picUser = Users(**data)
    response = UserPic.pic(picUser)
    returnJson = json.dumps(response, ensure_ascii=False).encode('utf8')
    return returnJson

@app.route('/search', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def search():
    response = UsersSearch.search()
    returnJson = json.dumps(response, ensure_ascii=False).encode('utf8')
    return returnJson

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=False, threaded=True)