import { MathHelperService } from './math-helper.service';
import { Time } from '../models';
import { TestBed, async } from '@angular/core/testing';
import { ball1Mock } from '../mocks/ball.mock';


describe("Shared Service", function () {
    let service: MathHelperService;
    let t0 = new Date(2019, 10, 7, 8, 8, 8, 8);
    let t1 = new Date(2019, 10, 7, 8, 8, 8, 9);
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [MathHelperService]
        });
        service = TestBed.get(MathHelperService);

    }));
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should be created', () => {
        expect(service.getRandomArbitrary(1, 8)).toBeGreaterThanOrEqual(1);
        expect(service.getRandomArbitrary(1, 8)).toBeLessThanOrEqual(8);
    });
    it('checks if ball has invalid values for x and y coordinates', () => {
        let ball = service.moveBall(ball1Mock, 500, 500, 2.4);
        expect(ball.x).toBeGreaterThanOrEqual(0);
        expect(ball.y).toBeGreaterThanOrEqual(0);
        expect(ball.time.dt).toBeGreaterThanOrEqual(0);
    })
    it("mocks the Date objects and sets them to a given time, and then returns the 'dt' when t1===t0", () => {
        jasmine.clock().install();
        jasmine.clock().mockDate(t0);
        let time = new Time(t0.getTime(), t0.getTime());
        jasmine.clock().tick(50);
        spyOn(service, 'getDt').and.returnValue(time);
        expect(service.getDt(time).dt).toEqual(0);
        jasmine.clock().uninstall();
    });
    it("mocks the Date objects and sets them to a given time, and then returns the 'dt' when t1>=t0", () => {
        jasmine.clock().install();
        jasmine.clock().mockDate(t0);
        jasmine.clock().mockDate(t1);
        let time = new Time(t0.getTime(), t1.getTime());
        jasmine.clock().tick(50);
        spyOn(service, 'getDt').and.returnValue(time);
        expect(service.getDt(time).t0).toBeGreaterThanOrEqual(service.getDt(time).t0);
        jasmine.clock().uninstall();
    });

    it("should generate random color", () => {
        spyOn(service, 'getRandomColor').and.returnValue("#ff00ff");
        expect(service.getRandomColor()).toEqual('#ff00ff');
    });

    it("should generate random hex color", () => {
        spyOn(service, 'getRandomColor').and.returnValue("#ff00ff");
        expect(service.getRandomColor().length).toEqual(7);
    });
});