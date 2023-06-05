export class Queue {
    
    items: any[] = [];

    enqueue(item:any) {
      this.items.push(item);
    }
  
    dequeue() {
      return this.items.shift();
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  }