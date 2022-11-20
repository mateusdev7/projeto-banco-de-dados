import sys
sys.path.append('C:/Apache24/htdocs/projeto-banco-de-dados/projeto-banco-de-dados/')
import json
from flask import Flask, request
from flask_cors import CORS, cross_origin
from dataMongo.userProfession.operationsUserProfession import OperationsUserProfession
from model.userProfession.UserProfession import UserProfession
app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/insert', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def insert():
    data = request.json
    data["id"] = OperationsUserProfession.findLastUserProfession() + 1
    userProfession = UserProfession(**data)
    resultInsert = OperationsUserProfession.insertOneUserProfession(data)
    if (resultInsert):
        returnJson = json.dumps(userProfession.__dict__).encode('utf8')
        return returnJson
    else:
        print("Entrou no else")
        return []

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5002, debug=False, threaded=True)