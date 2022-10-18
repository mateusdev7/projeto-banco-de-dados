import sys
sys.path.append('C:\Apache24\htdocs')
import connection.DataBaseConnection as db
from ResponseModel import ResponseModel
class UserProfessionSearch:
  def search():
    if db.connection.is_connected():
        cursor = db.connection.cursor()
        sql = "SELECT * FROM userprof"
        try:
            cursor.execute(sql)
            rows = cursor.fetchall()
            rowarray_list = []

            for row in rows:
                userProfession= {
                        "idUserProf":row[0],
                        "idUser":row[1],
                        "idProfession": row[2]}
                rowarray_list.append(userProfession)
            cursor.close()
            return rowarray_list
        except db.Error as error:
            return ResponseModel(False, error)
    else:
        return ResponseModel(False, "Não foi possível criar uma conexão com o Banco de dados")