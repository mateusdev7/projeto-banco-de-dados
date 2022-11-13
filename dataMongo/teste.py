import sys
sys.path.append('C:/Apache24/htdocs/projeto-banco-de-dados/projeto-banco-de-dados/')
from dataMongo.users.operationsUsers import OperationsUser

print(OperationsUser.findOneUser(2, "users"))