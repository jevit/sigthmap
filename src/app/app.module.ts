import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app/app.component';
import { PointComponent } from './point/point.component';
import { PointService } from './point/point.service';
import { MapComponent } from './map/map.component';
import { MapService } from './map/map.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarService } from './toolbar/toolbar.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from './sidebar/sidebar.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarService } from './navbar/navbar.service';
import { PointDetailComponent } from './point-detail/point-detail.component';
import { PointDetailService } from './point-detail/point-detail.service';
import { ParcoursListeComponent } from './parcours-liste/parcours-liste.component';
import { ParcoursListeService } from './parcours-liste/parcours-liste.service';
import { ParcoursDetailComponent } from './parcours-detail/parcours-detail.component';
import { ParcoursDetailService } from './parcours-detail/parcours-detail.service';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  {
    path: 'point',
    component: PointComponent
  },
  {
    path: 'parcours',
    component: ParcoursListeComponent
  },
  {
    path: 'point-detail/:id',
    component: PointDetailComponent
  },
  {
    path: 'parcours-detail/:id',
    component: ParcoursDetailComponent
  },
  {
    path: 'map',
    component: MapComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PointComponent,
    MapComponent,
    ToolbarComponent,
    SidebarComponent,
    NavbarComponent,
    PointDetailComponent,
    ParcoursListeComponent,
    ParcoursDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [PointService,MapService,
				ToolbarService,SidebarService,
				NavbarService,PointDetailService,
				ParcoursDetailService,ParcoursListeService],
  bootstrap: [AppComponent]
})


export class AppModule { }
