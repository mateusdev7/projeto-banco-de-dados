import sys
import cx_Oracle
sys.path.append('C:\Apache24\htdocs')
from ResponseModel import ResponseModel
class UsersSearch:
  def search():
        dsn_tns = cx_Oracle.makedsn('localhost', '1521', 'xe')
        connection = cx_Oracle.connect(user='SYSTEM',               password='BancoDados2021', dsn=dsn_tns)
        cursor = connection.cursor() 
        sql = "SELECT * FROM users"
        try:
            cursor.execute(sql)
            rows = cursor.fetchall()
            rowarray_list = []

            for row in rows:
                student= {"id":row[0],
                        "name":row[1],
                        "email":row[2],
                        "descriptionAccess":row[3],
                        "phone":row[4],
                        "zipCode":row[5],
                        "numberHome":row[6],
                        "complement":row[7]}
                rowarray_list.append(student)
            cursor.close()
            return rowarray_list
        except cx_Oracle.IntegrityError as e:
            print(e)
            return ResponseModel(False, "Não foi possível criar uma conexão com o Banco de dados")