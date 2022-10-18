import connection.DataBaseConnection as db
from ResponseModel import ResponseModel
class ProfessionUpdate:
  def update(Profession):
    if db.connection.is_connected():
        cursor = db.connection.cursor()
        sql = """UPDATE profession SET description=%s, yearsExperience=%s WHERE id=%s"""
        data = (Profession.description, Profession.yearsExperience,Profession.id)
        try:
            cursor.execute(sql, data)
            db.connection.commit()
            cursor.close()
            # db.connection.close()
            responseModel = ResponseModel(True, "Alteração feita com sucesso!")
            return responseModel
        except db.Error as error:
            return ResponseModel(False, error)
    else:
        return ResponseModel(False, "Não foi possível criar uma conexão com o Banco de dados")
