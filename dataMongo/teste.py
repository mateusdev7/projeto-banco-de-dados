import sys
sys.path.append('C:/Apache24/htdocs/projeto-banco-de-dados/projeto-banco-de-dados/')
from dataMongo.users.operationsUsers import OperationsUser

OperationsUser.updateUser(1, "Heitor", "Heitor@gmail.com", "212121", "27929549599", 99, 10, "rua")