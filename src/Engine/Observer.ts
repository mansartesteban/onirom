type _ObserverItem = {
  event: String,
  callback: Function
}

class Observer {

  observers: _ObserverItem[];
  events: string[] = [];

  constructor(events: string[]) {
    this.observers = [];
    this.events = events;
  }

  $on(events: string | string[], callback: Function) {
    if (typeof events == "string") {
      events = [events];
    }

    events.forEach((event: string) => {
      this.isValidEvent(event);

      this.observers.push({
        event,
        callback,
      });
    });


    return this;
  }

  unset(observer: _ObserverItem) {
    this.observers = this.observers.filter((item: _ObserverItem) => {
      if (item !== observer) {
        return item;
      }
    });
    return this;
  }

  $emit(event: string, ...args: any) {
    let promises: Promise<any>[] = [];

    this.observers
      .filter(observer => observer.event === event)
      .forEach(observer => {
        promises.push(
          Promise.resolve(observer.callback(...args))
        );
      });

    return Promise.all(promises);
  }

  isValidEvent(event: string) {
    if (this.events) {
      if (!this.events.includes(event)) {
        throw new Error(`Event '${event}' is not a valid event`);
      }
    }
  }
}

export default Observer;