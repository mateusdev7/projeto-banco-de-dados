import cx_Oracle
from ResponseModel import ResponseModel
class ProfessionUpdate:
  def update(Profession):
      dsn_tns = cx_Oracle.makedsn('localhost', '1521', 'xe')
      connection = cx_Oracle.connect(user='SYSTEM', password='BancoDados2021', dsn=dsn_tns)
      cursor = connection.cursor() 
      dataProfession = [(Profession.description), (Profession.id)]
      sql = """UPDATE profession SET description =:0 WHERE id =:1"""
      try:
          cursor.execute(sql, dataProfession)
          connection.commit()
          responseModel = ResponseModel(True, "Profissão atualizada com sucesso!")
          return responseModel
      except cx_Oracle.IntegrityError as e:
          print(e)
          return ResponseModel(False, "Não foi possível criar uma conexão com o Banco de dados")
