class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  showFirst() {
    return this.head;
  }
  find(item) {
    // Start at the head
    let currNode = this.head;
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // Check for the item
    while (currNode.value.id !== item.id) {
      /* Return null if it's the end of the list 
           and the item is not on the list */
      if (currNode.next === null) {
        return null;
      } else {
        // Otherwise, keep looking
        currNode = currNode.next;
      }
    }
    // Found it
    return currNode;
  }
  shift() {
    let i = 0;
    let oldHead = this.head;
    // if (this.head.value.memory_value === 1) {
    //   return this.head;
    // }
    this.head = this.head.next;
    let currentNode = this.head;
    let prevNode = this.head;
    while (currentNode && i < oldHead.value.memory_value) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      i++;
    }
    if (!currentNode) {
      currentNode.next = oldHead;
      currentNode.value.next = oldHead.value.id;
      oldHead.value.next = null;
      oldHead.next = null;
    } else {
      oldHead.next = currentNode;
      oldHead.value.next = currentNode.value.id;
      prevNode.value.next = oldHead.value.id;
      prevNode.next = oldHead;
    }
    return this.head;
  }
  clear() {
    this.head = null;
  }
}

module.exports = LinkedList;
