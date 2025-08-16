import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from './config/app.config';

@Injectable({ providedIn: 'root' })
export class AppService {

    private readonly httpClient = inject(HttpClient);

    getTestMessage(): Observable<string> {
        console.log(apiUrl);
        return this.httpClient.get(`${ apiUrl }/test`, { responseType: 'text' });
    }

}
