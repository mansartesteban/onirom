class Time {

    static OneMilisecond: number = 1;
    static OneSecond: number = Time.OneMilisecond * 1000;
    static OneMinute: number = Time.OneSecond * 60;
    static OneHour: number = Time.OneMinute * 60;

    static deltaTime: number = 0;
    static lastUpdate: number = Date.now();

    static update() {
        let now = Date.now();
        Time.deltaTime = (now - Time.lastUpdate);
        this.lastUpdate = now;
    }

    static now() {
        return Date.now();
    }

    static delta(time: number, lastTime?: number) {
        lastTime = lastTime ?? Time.lastUpdate;
        return Math.abs(lastTime - time);
    }

}

export default Time;