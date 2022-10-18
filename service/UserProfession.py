import sys
sys.path.append('C:\Apache24\htdocs')
import json
from flask import Flask
from flask_cors import CORS, cross_origin
from data.userprofession.UserProfessionSearch import UserProfessionSearch
app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/search', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def search():
    response = UserProfessionSearch.search()
    returnJson = json.dumps(response, ensure_ascii=False).encode('utf8')
    return returnJson

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5002, debug=False, threaded=True)