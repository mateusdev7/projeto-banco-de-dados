import cx_Oracle
from ResponseModel import ResponseModel
class UserUpdate:
  def update(User):
    dsn_tns = cx_Oracle.makedsn('localhost', '1521', 'xe')
    connection = cx_Oracle.connect(user='SYSTEM', password='BancoDados2021', dsn=dsn_tns)
    cursor = connection.cursor()
    dataUser = [(User.name), (User.email), (User.descriptionAccess), (User.phone), (User.zipCode), (User.numberHome), (User.complement), (User.id)]
    sql = """UPDATE users SET name=:0, email=:1, descriptionAccess=:2, phone=:3, zipCode=:4, numberHome=:5, complement=:6 WHERE id=:7"""
    try:
        cursor.execute(sql, dataUser)
        connection.commit()
        responseModel = ResponseModel(True, "Usuário alterado com sucesso!")
        return responseModel
    except cx_Oracle.IntegrityError as e:
        print(e)
        return ResponseModel(False, "Não foi possível criar uma conexão com o Banco de dados")
