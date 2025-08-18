import { Routes } from '@angular/router';
import { HomePage } from '@pages/home/home-page/home-page';
import { TestPage } from '@pages/test/test-page/test-page';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'test', component: TestPage },
    { path: '**', redirectTo: '/' }
];
