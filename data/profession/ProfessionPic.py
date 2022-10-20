import sys
import cx_Oracle
sys.path.append('C:\Apache24\htdocs')
from ResponseModel import ResponseModel
class ProfessionPic:
  def pic(Profession):
        dsn_tns = cx_Oracle.makedsn('localhost', '1521', 'xe')
        connection = cx_Oracle.connect(user='SYSTEM', password='BancoDados2021', dsn=dsn_tns)
        cursor = connection.cursor() 
        dataProfession = ([Profession.id])
        sql = """SELECT * FROM profession WHERE id=:0"""
        try:
            cursor.execute(sql, dataProfession)
            rows = cursor.fetchall()
            rowarray_list = []
            for row in rows:
                profession= {"id":row[0],
                        "description":row[1]}
                rowarray_list.append(profession)
            cursor.close()
            return rowarray_list
        except cx_Oracle.IntegrityError as e:
            print(e)
            return ResponseModel(False, "Não foi possível criar uma conexão com o Banco de dados")