// TODO: Write code to define and export the Employee class

class Employee {
    constructor(name, id, email) {
        this.name = name,
        this.id = id,
        this.email = email
    }

    getName() {
        return this.Name
    }

    getId() {
        return this.id
    }

    getEmail() {
        return this.email
    }

    getTitle() {
        return this.constructor.name
    }
}