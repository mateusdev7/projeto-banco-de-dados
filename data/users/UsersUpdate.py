import connection.DataBaseConnection as db
from ResponseModel import ResponseModel
class UserUpdate:
  def update(User):
    if db.connection.is_connected():
        cursor = db.connection.cursor()
        sql = """UPDATE users SET name=%s, email=%s, descriptionAccess=%s, phone=%s, zipCode=%s, number=%s, complement=%s WHERE id=%s"""
        data = (User.name, User.email, User.descriptionAccess, User.phone, User.zipCode, User.number, User.complement, User.id)
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
