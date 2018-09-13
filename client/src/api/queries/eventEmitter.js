class Emitter {
  constructor() {
    const delegate = document.createDocumentFragment();
    ['addEventListener', 'dispatchEvent', 'removeEventListener'].forEach(f => {
      this[f] = (...xs) => delegate[f](...xs);
    });
  }
}

class EventEmitter extends Emitter {}

export default EventEmitter;
