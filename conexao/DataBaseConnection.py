import sys
sys.path.append('C:\Apache24\htdocs')
import cx_Oracle 
from util.Message import Message as message 

class DataBaseConnection():
    cx_Oracle.init_oracle_client(lib_dir="C:\Program Files\Oracle\instantclient_21_7")
    try:
        dsn_tns = cx_Oracle.makedsn('localhost', '1521', 'xe')
        connection = cx_Oracle.connect(user='SYSTEM', password='BancoDados2021', dsn=dsn_tns)
        cursor = connection.cursor() 
        message.showMessage("Conectado no Servidor ORACLE versão ", connection.version)
        message.showMessage("Você está conectado ao Banco de Dados Versão",  cx_Oracle.clientversion())

    except cx_Oracle.IntegrityError as e:
        message.showMessage("Erro ao conectar o Banco de Dados MySQL. Sistema será encerrado", e)
        message.showMessage("Sistema será encerrado!!!!!!!!!!!!", e)
        quit()