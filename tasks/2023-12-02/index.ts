interface IQueue<T> {
  item: T;
  priority: number;
}

export class ChristmasQueue<T> {
  private queue: IQueue<T>[] = [];

  enqueue(item: T, priority: number) {
    this.queue.push({ item, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    if (this.isEmpty()) {
      throw "There are no letters in the queue!";
    }

    const highestPriority = this.queue.at(-1)?.priority;
    const priorityCount = this.queue.filter(
      (item) => item.priority === highestPriority
    ).length;
    const theOldestPriorityIndex = this.queue.length - priorityCount;

    return this.queue.splice(theOldestPriorityIndex, 1).at(0)?.item;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}
