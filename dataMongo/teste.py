import sys
sys.path.append('C:/Apache24/htdocs/projeto-banco-de-dados/projeto-banco-de-dados/')
from dataMongo.users.operationsUsers import OperationsUser

userObject = {
                "id" : 1,
                "name" : "Mateus",
                "email" : "mateuspaulo1337@gmail.com",
                "descriptionAccess" : "123456",
                "cpf" : "18727714756",
            }

print(userObject["cpf"])

if (OperationsUser.searchUserWithCpf("12345678985")):
  print("SIM")
else: 
  print("não")