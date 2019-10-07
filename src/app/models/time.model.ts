export class Time {
    t0: number; //
    t1: number;
    dt: number; //diference between t1 and t0

    constructor(t0: number, t1: number) {
        this.t0 = t0;
        this.t1 = t1;
        this.dt = t1 - t0
    }
}