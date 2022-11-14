import sys
sys.path.append('C:/Apache24/htdocs/projeto-banco-de-dados/projeto-banco-de-dados/')
import json
from flask import Flask, request
from flask_cors import CORS, cross_origin
from dataMongo.profession.operationsProfession import OperationsProfession
from model.profession.Profession import Profession
app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/insert', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def insert():
    data = request.json
    data["id"] = OperationsProfession.findLastProfession() + 1
    profession = Profession(**data)
    resultInsert = OperationsProfession.insertOneProfession(data)
    if (resultInsert):
        returnJson = json.dumps(profession.__dict__).encode('utf8')
        return returnJson
    else:
        return []

# @app.route('/update', methods=['GET','POST'])
# @cross_origin(supports_credentials=True)
# def update():
#     data = json.loads(json.dumps(request.json))
#     updateProfession = Profession(**data)
#     response = ProfessionUpdate.update(updateProfession)
#     returnJson = json.dumps(response.__dict__, ensure_ascii=False).encode('utf8')
#     return returnJson

# @app.route('/delete', methods=['GET','POST'])
# @cross_origin(supports_credentials=True)
# def delete():
#     data = json.loads(json.dumps(request.json))
#     deleteProfession = Profession(**data)
#     response = ProfessionDelete.delete(deleteProfession)
#     returnJson = json.dumps(response.__dict__, ensure_ascii=False).encode('utf8')
#     return returnJson

# @app.route('/pic', methods=['GET','POST'])
# @cross_origin(supports_credentials=True)
# def pic():
#     data = json.loads(json.dumps(request.json))
#     picProfession = Profession(**data)
#     response = ProfessionPic.pic(picProfession)
#     returnJson = json.dumps(response, ensure_ascii=False).encode('utf8')
#     return returnJson

# @app.route('/search', methods=['GET','POST'])
# @cross_origin(supports_credentials=True)
# def search():
#     response = ProfessionSearch.search()
#     returnJson = json.dumps(response, ensure_ascii=False).encode('utf8')
#     return returnJson

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5001, debug=False, threaded=True)