import sys
import cx_Oracle
sys.path.append('C:\Apache24\htdocs')
from ResponseModel import ResponseModel
class UserInsert:
  def insert(User):
    dsn_tns = cx_Oracle.makedsn('localhost', '1521', 'xe')
    connection = cx_Oracle.connect(user='SYSTEM', password='BancoDados2021', dsn=dsn_tns)
    cursor = connection.cursor() 
    dataUser =  [(User.name), (User.email), (User.descriptionAccess), (User.phone), (User.zipCode), (User.numberHome), (User.complement)] 
    sql = ("""insert into users (name, email, descriptionAccess, phone, zipCode, numberHome, complement) values(:0, :1, :2, :3, :4, :5, :6)""")
    connection.commit()
    try:
      cursor.execute(sql, dataUser)
      connection.commit()
      responseModel = ResponseModel(True, "Conta criada com sucesso!")
      return responseModel
    except cx_Oracle.IntegrityError as e:
        print(e)
        return ResponseModel(False, "Não foi possível criar uma conexão com o Banco de dados")