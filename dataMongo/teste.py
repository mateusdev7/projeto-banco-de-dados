import sys
sys.path.append('C:/Apache24/htdocs/projeto-banco-de-dados/projeto-banco-de-dados/')
from dataMongo.profession.operationsProfession import OperationsProfession
from dataMongo.userProfession.operationsUserProfession import OperationsUserProfession

print(OperationsUserProfession.aggregationUserProfessionDois())
