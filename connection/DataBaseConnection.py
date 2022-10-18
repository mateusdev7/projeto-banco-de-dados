import mysql.connector
from mysql.connector import Error
from util.Message import Message as message 
try:
    connection = mysql.connector.connect(host='localhost',
                                                database='beautysalon',
                                                user='root',
                                                password='159630zeust12@')
    if connection.is_connected():
        db_Info = connection.get_server_info()
        message.showMessage("Conectado no Servidor MySQL versão ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        message.showMessage("Você está conectado ao Banco de Dados", record)

except Error as e:
    message.showMessage("Erro ao conectar o Banco de Dados MySQL. Sistema será encerrado", e)
    message.showMessage("Sistema será encerrado!!!!!!!!!!!!")
    quit()
