import { Location, CommonModule } from '@angular/common';
import { TestBed, fakeAsync, tick, async, inject, ComponentFixture } from '@angular/core/testing';
import { Component, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';

import {routes} from './app-routing.module';

import {
    HeroService,
    UserAuthenticationService,
    LoadingStatusService
}
from './providers/index';

import { 
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroSearchComponent,
    ShellComponent,LoginComponent
} 
from './components/index';

const ID=12;

describe('app-routing module', () => {
  describe('passing guard', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ AppRoutingTestingModule ],
        providers: [
          HeroService,
          {
            provide: UserAuthenticationService, useValue: {
                canActivate: () => {
                return true;
                }
            }
          }
        ]
      });
    });
    it('allows access to dashboard', fakeAsync(inject([ Router, Location ], (router: Router, location: Location) => {
      const fixture = TestBed.createComponent(RootComponent);
      router.resetConfig(routes);
      router.navigate([ 'dashboard' ]);
      advance(fixture);
      expect(location.path()).toEqual('/dashboard');
    })));
    it('allows access to detail with ID', fakeAsync(inject([ Router, Location ], (router: Router, location: Location) => {
      const fixture = TestBed.createComponent(RootComponent);
      router.resetConfig(routes);
      router.navigate([ 'details', ID ]);
      advance(fixture);
      expect(location.path()).toEqual('/details/'+ID);
    })));
    it('allows access to heroes', fakeAsync(inject([ Router, Location ], (router: Router, location: Location) => {
      const fixture = TestBed.createComponent(RootComponent);
      router.resetConfig(routes);
      router.navigate([ 'heroes' ]);
      advance(fixture);
      expect(location.path()).toEqual('/heroes');
    })));
  });
  describe('failing guard', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ AppRoutingTestingModule ],
        providers: [
          HeroService,
          LoadingStatusService,
          UserAuthenticationService
        ]
      });
    });
    it('blocks access to dashboard', fakeAsync(inject([ Router, Location ], (r: Router, location: Location) => {
      const fixture = TestBed.createComponent(RootComponent);
      r.resetConfig(routes);
      r.navigate([ 'dashboard' ]);
      advance(fixture);
      expect(location.path()).toEqual('/login');
    })));
    it('blocks access to detail', fakeAsync(inject([ Router, Location ], (r: Router, location: Location) => {
      const fixture = TestBed.createComponent(RootComponent);
      r.resetConfig(routes);
      r.navigate([ 'details', '${ID}' ]);
      advance(fixture);
      expect(location.path()).toEqual('/login');
    })));
    it('blocks access to heroes', fakeAsync(inject([ Router, Location ], (r: Router, location: Location) => {
      const fixture = TestBed.createComponent(RootComponent);
      r.resetConfig(routes);
      r.navigate([ 'heroes' ]);
      advance(fixture);
      expect(location.path()).toEqual('/login');
    })));
  });
});

@Component({selector: 'app-simple-cmp', template: `simple`})
class SimpleComponent {
}

@Component({selector: 'app-root-cmp', template: `<router-outlet></router-outlet>`})
class RootComponent {
}

function advance(fixture: ComponentFixture<any>): void {
  tick();
  fixture.detectChanges();
}

@NgModule({
  imports: [ RouterTestingModule, CommonModule, RouterTestingModule.withRoutes([ {
    path: 'simple',
    component: SimpleComponent
  } ]) ],
  entryComponents: [
    SimpleComponent,
    RootComponent,
    DashboardComponent,
    ShellComponent,
    HeroDetailComponent,
    HeroesComponent,
    LoginComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    MockBackend,
    BaseRequestOptions,
    {
      provide: Http,
      useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
      deps: [ MockBackend, BaseRequestOptions ]
    }
  ],
  exports: [
    SimpleComponent,
    RootComponent
  ],
  declarations: [
    ShellComponent, DashboardComponent, LoginComponent, HeroesComponent, HeroDetailComponent,
    SimpleComponent,
    RootComponent
  ]
})
class AppRoutingTestingModule {
}
// import {it, describe, expect, inject, injectAsync, beforeEach, beforeEachProviders} from '@angular/testing';
// import {provide} from '@angular/core';
// import {RouteRegistry, Router, ROUTER_PRIMARY_COMPONENT, Location} from '@angular/router';
// import {RootRouter} from '@angular/src/router/router';

// import {AppComponent} from './components/index';

// describe('Routing', () => {

//     let location: Location;
//     let router: Router;

//     beforeEachProviders(() => [ 
//         RouteRegistry,
//         Location,
//         provide(Router, {useClass: RootRouter}),
//         provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent})
//     ]);

//     beforeEach(inject([Router, Location], (r, l) => {
//         router = r;
//         location = l;
//     }));

//     it('Should navigate to Login', (done) => {   
//         router.navigate(['Login']).then(() => {
//             expect(location.path()).toBe('/login');
//             done();
//         }).catch(e => done.fail(e));
//     });

//     it('Should navigate to Register', (done) => {   
//         router.navigate(['Register']).then(() => {
//             expect(location.path()).toBe('/register');
//             done();
//         }).catch(e => done.fail(e));
//     });
// });

// describe('app-routing module',()=>{

//     describe('passing guard',()=>{
        
//         beforeEach(()=>{
//             TestBed.configureTestingModule({
//                 import:[AppRoutingTestingModule],
//                 providers:[
//                     HeroService,
//                     {
//                         provide: UserAuthenticationService, 
//                         useValue: {
//                             canActivate: ()=>{
//                                 return true;
//                             }
//                         }
//                     }
//                 ]
//             });
//         });

//         it('allows access to dashboard',fakeAsync(inject([Router, Location],(router:Router, location:Location)=>{
//             const fixture=TestBed.createComponent(DashboardComponent);
//             router.resetConfig(routes);
//             router.navigate(['dashboard']);
//             advance(fixture);
//             expect(location.path()).toEqual('/dashboard');
//         })));
//     });

// });

// @Component({selector: 'app-simple-cmp', template: `simple`})
// class SimpleComponent {
// }

// @Component({selector: 'app-root-cmp', template: `<router-outlet></router-outlet>`})
// class RootComponent {
// }

// function advance(fixture:ComponentFixture<any>): void{
//     tick();
//     fixture.detectChanges();
// }

// @NgModule({
//   imports: [ RouterTestingModule, CommonModule, RouterTestingModule.withRoutes([ {
//     path: 'simple',
//     component: SimpleComponent
//   } ]) ],
//   entryComponents: [
//     SimpleComponent,
//     RootComponent,
//     DashboardComponent,
//     ShellComponent,
//     HeroDetailComponent,
//     HeroesComponent,
//     LoginComponent
//   ],
//   schemas: [ NO_ERRORS_SCHEMA ],
//   providers: [
//     MockBackend,
//     BaseRequestOptions,
//     {
//       provide: Http,
//       useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
//       deps: [ MockBackend, BaseRequestOptions ]
//     }
//   ],
//   exports: [
//     SimpleComponent,
//     RootComponent
//   ],
//   declarations: [
//     ShellComponent, DashboardComponent, LoginComponent, HeroesComponent, HeroDetailComponent,
//     SimpleComponent,
//     RootComponent
//   ]
// })

// class AppRoutingTestingModule {}

// describe('Router: App',()=>{
//     let location:Location;
//     let router:Router;
//     let fixture;

//     beforeEach(()=>{
//          TestBed.configureTestingModule({
//             imports:[RouterTestingModule.withRoutes(routes)],
//             declarations:[
//                 AppComponent,
//                 DashboardComponent,
//                 HeroesComponent,
//                 HeroDetailComponent
//             ]
//         });
//     });

//     beforeEach(inject([ Router, Location],(_router:Router, _location:Location)=>{
//         location=_location;
//         router=_router;
//     }));

//     it('should go to dashboard', async(() => {
//     let fixture = TestBed.createComponent(HeroDetailComponent);
//     fixture.detectChanges();
//     router.navigate(['/details/12']).then(() => {
//       expect(location.path()).toBe('/details/12');
//       console.log('after expect');
//     });
//   }));
//     // router=TestBed.get(Router);
//     // location=TestBed.get(Location);

//     // fixture=TestBed.createComponent(AppComponent);
//     // router.initialNavigation();

//     // it('fakeAsync works', fakeAsync(() => {
//     //     let promise = new Promise((resolve) => {
//     //     setTimeout(resolve, 10)
//     //     });
//     //     let done = false;
//     //     promise.then(() => done = true);
//     //     tick(50);
//     //     expect(done).toBeTruthy();
//     // }));

//     // it('navigate to "" redirects you to /dashboard',fakeAsync(()=>{
//     //     router.navigate(['']);
//     //     tick(50);
//     //     expect(location.path()).toBe('/dashboard');
//     // }));
// });
// // import { async, inject, TestBed } from '@angular/core/testing';

// // import { Router } from '@angular/router';

// // import { HeroesComponent, HeroDetailComponent, DashboardComponent } from './components/index';

// // class MockRouter{
// //     navigateByUrl(url:string){
// //         return url;
// //     }
// // }

// // describe('component: DashboardComponent',()=>{
// //     let component:DashboardComponent;

// //     // updated beforeEach
// //     // beforeEach(async(()=>{
// //     //     TestBed.configureTestingModule({
// //     //         declarations:[DashboardComponent],
// //     //         providers:[
// //     //             {provide: Router, useClass:MockRouter}
// //     //         ]
// //     //     })
// //     //     .compileComponents().then(()=>{
// //     //         const fixture=TestBed.createComponent(DashboardComponent);
// //     //         component=fixture.componentInstance;
// //     //     });
// //     // }));

// //     it('should have a defined component', () => {
// //         expect(component).toBeDefined();
// //     });

// // });


