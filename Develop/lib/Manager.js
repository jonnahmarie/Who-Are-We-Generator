// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, phNumber) {
        super(name, id, email);

        this.phNumber = phNumber;
    }

    getPhNumber() {
        return this.phNumber;
    }
}

module.exports = Manager;