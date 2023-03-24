import { v4 as uuid } from 'uuid'

export class Todo {
    constructor(description) {
        this.id = uuid();
        this.description = description;
        this.createdAt = new Date();
        this.done = false;
    }
}