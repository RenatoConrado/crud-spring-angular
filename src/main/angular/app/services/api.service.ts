import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

    private readonly httpClient = inject(HttpClient);
    private readonly authService = inject(AuthService);

    /**
     * Get a resource object from server using its ID
     */
    getResource<Response>(resourceUrl: string): Observable<Response> {
        return this.httpClient.get<Response>(resourceUrl, {
            headers: this.authService.getAuthorizationHeader()
        });
    }

    simpleGet<Response>(resourceUrl: string): Observable<Response> {
        return this.httpClient.get<Response>(resourceUrl);
    }
}
