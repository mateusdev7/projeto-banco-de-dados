import connection.DataBaseConnection as db
from ResponseModel import ResponseModel
class UserDelete:
  def delete(User):
    if db.connection.is_connected():
        cursor = db.connection.cursor()
        sql = """DELETE FROM users WHERE id = %s"""
        data = (User.id)
        try:
            cursor.execute(sql, (data,))
            db.connection.commit()
            cursor.close()
            # db.connection.close()
            responseModel = ResponseModel(True, "Registro apagado com sucesso!")
            return responseModel
        except db.Error as error:
            return ResponseModel(False, error)
    else:
        return ResponseModel(False, "Não foi possível criar uma conexão com o Banco de dados")