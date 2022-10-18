import sys
sys.path.append('C:\Apache24\htdocs')
import connection.DataBaseConnection as db
from ResponseModel import ResponseModel
class ProfessionSearch:
  def search():
    if db.connection.is_connected():
        cursor = db.connection.cursor()
        sql = "SELECT * FROM profession"
        try:
            cursor.execute(sql)
            rows = cursor.fetchall()
            rowarray_list = []

            for row in rows:
                profession= {"id":row[0],
                        "description":row[1],
                        "yearsExperience":row[2]}
                rowarray_list.append(profession)
            cursor.close()
            return rowarray_list
        except db.Error as error:
            return ResponseModel(False, error)
    else:
        return ResponseModel(False, "Não foi possível criar uma conexão com o Banco de dados")