class Time {

    static OneMilisecond: number = 1;
    static OneSecond: number = Time.OneMilisecond * 1000;
    static OneMinute: number = Time.OneSecond * 60;
    static OneHour: number = Time.OneMinute * 60;

    static deltaTime: number = 0;
    static lastUpdate: number = performance.now();

    static update() {
        let now = performance.now();
        Time.deltaTime = (now - Time.lastUpdate);
        this.lastUpdate = now;
    }

    static now(): number {
        return performance.now();
    }

    static delta(time: number, lastTime?: number): number {
        lastTime = lastTime ?? Time.lastUpdate;
        return Math.abs(lastTime - time);
    }

}

export default Time;