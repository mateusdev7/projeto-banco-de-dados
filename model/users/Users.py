class Users(object):
    def __init__(self, id, name, email, descriptionAccess, cpf):
        self.id = id
        self.name = name 
        self.email = email 
        self.descriptionAccess = descriptionAccess 
        self.cpf = cpf
    
    def get_id(self):
        return self.id
    
    def set_id(self, newId):
        self.id = newId
        
    def get_name(self):
        return self.name
    
    def set_name(self, newName):
        self.name = newName
    
    def get_email(self):
        return self.email
    
    def set_email(self, newEmail):
        self.email = newEmail
    
    def get_descriptionAccess(self):
        return self.descriptionAccess
    
    def set_descriptionAccess(self, newDescriptionAccess):
        self.descriptionAccess = newDescriptionAccess
        
    def get_cpf(self):
        return self.cpf
    
    def set_cpf(self, newCpf):
        self.cpf = newCpf
    
    def to_string(self):
        print("ID: " + self.id + "\n Name: " + self.name + "\nEmail: " + self.email + "\nDescription: " + self.description + "\nCPF: " + self.cpf)
    