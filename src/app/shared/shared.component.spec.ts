import { MathHelperService } from './math-helper.service';
import { Time } from '../models';
import { TestBed, async } from '@angular/core/testing';


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