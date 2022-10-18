import sys
sys.path.append('C:\Apache24\htdocs')
import connection.DataBaseConnection as db
from ResponseModel import ResponseModel
class UsersSearch:
  def search():
    if db.connection.is_connected():
        cursor = db.connection.cursor()
        sql = "SELECT * FROM users"
        try:
            cursor.execute(sql)
            rows = cursor.fetchall()
            rowarray_list = []

            for row in rows:
                student= {"id":row[0],
                        "name":row[1],
                        "email":row[2],
                        "descriptionAccess":row[3],
                        "phone":row[4],
                        "zipCode":row[5],
                        "number":row[6],
                        "complement":row[7]}
                rowarray_list.append(student)
            cursor.close()
            return rowarray_list
        except db.Error as error:
            return ResponseModel(False, error)
    else:
        return ResponseModel(False, "Não foi possível criar uma conexão com o Banco de dados")