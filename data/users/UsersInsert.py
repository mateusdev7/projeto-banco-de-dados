import sys
sys.path.append('C:\Apache24\htdocs')
import connection.DataBaseConnection as db
from ResponseModel import ResponseModel
class UserInsert:
  def insert(User):
    if db.connection.is_connected():
        cursor = db.connection.cursor()
        sql = "INSERT INTO users (name, email, descriptionAccess, phone, zipCode, number, complement) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        data = (User.name, User.email, User.descriptionAccess, User.phone, User.zipCode, User.number, User.complement)
        try:
            cursor.execute(sql, data)
            db.connection.commit()
            cursor.close()
            responseModel = ResponseModel(True, "Usuário criado com sucesso!")
            return responseModel
        except db.Error as error:
            return ResponseModel(False, error)
    else:
        return ResponseModel(False, "Não foi possível criar uma conexão com o Banco de dados")