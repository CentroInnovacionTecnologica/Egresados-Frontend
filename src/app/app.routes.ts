import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { Egresados1Component } from './pages/egresados1/egresados1.component';
import { Egresados2Component } from './pages/egresados2/egresados2.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'egresados1', component: Egresados1Component },
    { path: 'egresados2', component: Egresados2Component }
];