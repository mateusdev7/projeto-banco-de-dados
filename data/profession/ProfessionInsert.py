import sys
import cx_Oracle
sys.path.append('C:\Apache24\htdocs')
from ResponseModel import ResponseModel
class ProfessionInsert:
  def insert(Profession):
    dsn_tns = cx_Oracle.makedsn('localhost', '1521', 'xe')
    connection = cx_Oracle.connect(user='SYSTEM', password='BancoDados2021', dsn=dsn_tns)
    cursor = connection.cursor() 
    dataProfession =  [[Profession.description]] 
    sql = """insert into profession (description) values(:1)"""
    connection.commit()
    try:
      cursor.executemany(sql, dataProfession)
      connection.commit()
      responseModel = ResponseModel(True, "Profissão criada com sucesso!")
      return responseModel
    except cx_Oracle.IntegrityError as e:
        print(e)
        return ResponseModel(False, "Não foi possível criar uma conexão com o Banco de dados")

        