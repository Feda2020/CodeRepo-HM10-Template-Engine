// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    // Returns the name
    getName() {
        return this.name;
    }
    // Returns the Id
    getId() {
        return this.id;
    }
    // Returns the Email
    getEmail() {
        return this.email;
    }
    // Returns the employee role/title
    getRole() {
        return 'Employee';
    }
}

// Module export 
module.exports = Employee;