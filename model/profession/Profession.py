class Profession(object):
    def __init__(self, id, description):
        self.id = id
        self.description = description
    
    def get_id(self):
        return self.id
    
    def set_id(self, newId):
        self.id = newId
    
    def get_description(self):
        return self.description
    
    def set_description(self, newDescription):
        self.id = newDescription
    