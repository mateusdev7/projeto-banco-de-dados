import cx_Oracle
from ResponseModel import ResponseModel
class UserDelete:
  def delete(User):
    dsn_tns = cx_Oracle.makedsn('localhost', '1521', 'xe')
    connection = cx_Oracle.connect(user='SYSTEM', password='BancoDados2021', dsn=dsn_tns)
    cursor = connection.cursor()
    dataUser = [(User.id)]
    sql = ("""delete from users WHERE id = :0""")
    try:
        cursor.execute(sql, dataUser)
        connection.commit()
        cursor.close()
        # db.connection.close()
        responseModel = ResponseModel(True, "Usuário apagado com sucesso!")
        return responseModel
    except cx_Oracle.IntegrityError as e:
        print(e)
        return ResponseModel(False, "Não foi possível criar uma conexão com o Banco de dados")