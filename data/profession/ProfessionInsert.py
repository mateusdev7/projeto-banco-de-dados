import sys
sys.path.append('C:\Apache24\htdocs')
import connection.DataBaseConnection as db
from ResponseModel import ResponseModel
class ProfessionInsert:
  def insert(Profession):
    if db.connection.is_connected():
        cursor = db.connection.cursor()
        sql = "INSERT INTO profession (description, yearsExperience) VALUES (%s, %s)"
        data = (Profession.description, Profession.yearsExperience)
        try:
            cursor.execute(sql, data)
            db.connection.commit()
            cursor.close()
            responseModel = ResponseModel(True, "Profissão criada com sucesso!")
            return responseModel
        except db.Error as error:
            return ResponseModel(False, error)
    else:
        return ResponseModel(False, "Não foi possível criar uma conexão com o Banco de dados")