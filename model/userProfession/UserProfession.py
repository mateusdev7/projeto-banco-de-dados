class UserProfession(object):
    def __init__(self, id, cpf, description):
        self.id = id
        self.cpf = cpf
        self.description = description 
    
    def get_id(self):
        return self.id
    
    def set_id(self, newId):
        self.id = newId
    
    def get_cpf(self):
        return self.cpf
    
    def set_cpf(self, newCpf):
        self.cpf = newCpf
    
    def get_description(self):
        return self.description
    
    def set_description(self, newDescription):
        self.description = newDescription
    
    def to_string(self):
        print("ID: " + self.id + "\nCPF: " + self.cpf + "\nDescription: " + self.description)
    
    
