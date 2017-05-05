import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { LoadingStatusService } from '../../providers/index';

describe('AppComponent',()=>{
    let loadingStatus:LoadingStatusService;
    let fixture: ComponentFixture<AppComponent>;
    let component:AppComponent;

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            providers:[LoadingStatusService],
            declarations:[AppComponent],
            schemas:[NO_ERRORS_SCHEMA]
        })
            .compileComponents()
            .then(()=>{
                fixture=TestBed.createComponent(AppComponent);
                component=fixture.componentInstance;
                loadingStatus=TestBed.get(LoadingStatusService);
                fixture.detectChanges();
            });
    }));

    describe('updates loading status for app when status service updates', () => {
        it('sets loading to true when loading status observable updates', () => {
        expect(component.isLoading).toBeFalsy();

        loadingStatus.startLoading();

        expect(component.isLoading).toBeTruthy();
        });
    });

});

// TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// describe('AppComponent', () => {

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [AppComponent],
//       imports: [RouterTestingModule]
//     });
//   });

//   it('should be able to test', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.whenStable().then(() => {
//       expect(true).toBe(true);
//     });
//   }));

// });