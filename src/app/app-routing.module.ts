import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

import { AppComponent } from './app.component';
import { NamesComponent } from './names/names.component';
import { PostsComponent } from './posts/posts.component';
import { PhotosComponent } from './photos/photos.component';

// Paste in this variable. This will throw an error if you haven't added the adrum.js to index.html.
declare var ADRUM : any;

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'names',
    component: NamesComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'photos',
    component: PhotosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
  vpView: any;

  // Subscribe to the Router URL changes and report the metrics to AppDynamics.
  constructor(public router:Router) {
      this.router.events.subscribe((event:Event) => {
              if (event instanceof NavigationEnd) {
                console.debug('NavigationEnd: '+event.url);

                this.vpView.markViewChangeEnd();
                this.vpView.markViewDOMLoaded();
                this.vpView.markXhrRequestsCompleted();
                this.vpView.markViewResourcesLoaded();
                this.vpView.end();
                ADRUM.report(this.vpView);

              } else if (event instanceof NavigationStart) {
                console.debug('NavigationStart: '+event.url);

                this.vpView = new ADRUM.events.VPageView();
                this.vpView.start();
                this.vpView.markViewChangeStart();
              }
          });
  }
}
