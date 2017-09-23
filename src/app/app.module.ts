import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
// Composants
import { AppComponent } from './app/app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarService } from './toolbar/toolbar.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from './sidebar/sidebar.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarService } from './navbar/navbar.service';
// Map
import { MapComponent } from './map/map.component';
import { MapService } from './map/map.service';
// Point
import { PointDetailComponent } from './point-detail/point-detail.component';
import { PointComponent } from './point/point.component';
import { PointService } from './point/point.service';
//Parcours
import { ParcoursListeComponent } from './parcours-liste/parcours-liste.component';
import { ParcoursService } from './parcours/parcours.service';
import { ParcoursDetailComponent } from './parcours-detail/parcours-detail.component';
// Elevation
import { ElevationComponent } from './elevation/elevation.component';
import { ElevationService } from './elevation/elevation.service';
import { NgChartComponent } from './ng-chart/ng-chart.component';

// Define the routes
const ROUTES = [
  /* Home */
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  /* Détail des points associé à la map */
  {
    path: 'point-liste',
    component: PointComponent
  },
  {
    path: 'point-detail/:id',
    component: PointDetailComponent
  },
  /* Liste de parcours associé à la map */
  {
    path: 'parcours-liste',
    component: ParcoursListeComponent
  },
  {
    path: 'parcours-detail/:id',
    component: ParcoursDetailComponent
  },
  /* Carte */
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'elevation',
    component: ElevationComponent
  },
  {
    path: 'ng-chart',
    component: NgChartComponent
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
      ParcoursDetailComponent,
      ElevationComponent,
      NgChartComponent,
      NgChartComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      ChartsModule,
      RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [
      PointService,
      MapService,
      ToolbarService,
      SidebarService,
      NavbarService,
      ParcoursService,
      ElevationService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
