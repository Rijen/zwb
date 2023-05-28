// User defined class
// to store element and its priority
class QElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

// PriorityQueue class
export default class PriorityQueue {

    // An array is used to implement priority
    constructor() {
        this.items = [];
    }

    add(element, priority) {
        // creating object from queue element
        var qElement = new QElement(element, priority);
        var contain = false;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                // Once the correct location is found it is
                // enqueued
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }
        if (!contain) {
            this.items.push(qElement);
        }
    }
    shift() {
        if (this.isEmpty())
            return null;
        return this.items.shift().element;
    }
    pop() {
        if (this.isEmpty())
            return null;
        return this.items.pop().element;
    }
    // front function
    front() {
        if (this.isEmpty())
            return null;
        return this.items[0];
    }
    // rear function
    rear() {
        if (this.isEmpty())
            return null;
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        // return true if the queue is empty.
        return this.items.length == 0;
    }
    // printPQueue()
}