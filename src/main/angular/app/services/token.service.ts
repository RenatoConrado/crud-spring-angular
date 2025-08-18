import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Jwt, jwt } from '@app/secrets/jwt.env';
import { urls } from '@app/secrets/urls.env';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

export interface Token {
    access_token: string;
    expires_in: number;
    token_type?: string;
    refresh_token?: string;
    id_token?: string;
}

@Injectable({ providedIn: 'root' })
export class TokenService {

    private readonly httpClient = inject(HttpClient);
    private readonly cookieService = inject(CookieService);
    private readonly router = inject(Router);

    /**
     * Get raw Token as a string
     * @returns {string}
     */
    get token(): string {
        return this.cookieService.get('access_token');
    }

    /**
     * Request access token using authorization code
     * @param {string} code Authorization code
     */
    requestAccessToken(code: string): Observable<Token> {
        const params = new URLSearchParams({
            'client_id': jwt.clientId,
            'grant_type': jwt.grantType,
            'redirect_uri': jwt.redirectUri,
            'code': code
        } as Jwt);

        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        });

        return this.httpClient.post<Token>(
            urls.backend,
            params.toString(),
            { headers: headers }
        );
    }

    /**
     * Save the access token in a Cookie using ngx-cookie-service library
     * and redirect to main page
     * @param {Token} token Access Token
     */
    set token(token: Token) {
        const expireDate = new Date(Date.now() + (token.expires_in * 1000));

        this.cookieService.set(
            'access_token',
            token.access_token,
            expireDate,
            '/',
            undefined,
            true,
            'Strict'
        );
        console.log('Access token:');
        console.log(token);

        this.router.navigateByUrl('/').then(
            value => {
                console.log('Redirecionado para a home page');
                console.log(value);
            },
            reason => {
                console.log('Falhou');
                console.error(reason);
            }
        );
    }

    checkToken(): boolean {
        return this.cookieService.check('access_token');
    }

    deleteToken(): void {
        this.cookieService.delete('access_token');
    }

}
