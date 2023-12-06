export class ChristmasEmitter {
  private eventTarget = new EventTarget();

  on(eventName: string, fn: () => void) {
    this.eventTarget.addEventListener(eventName, fn);
  }

  off(eventName: string, fn: () => void) {
    this.eventTarget.removeEventListener(eventName, fn);
  }

  emit(eventName: string) {
    const newEvent = new Event(eventName);
    this.eventTarget.dispatchEvent(newEvent);
  }
}
