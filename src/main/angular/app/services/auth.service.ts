import { HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { responseJwt, ResponseJwt } from '@app/secrets/response-jwt.env';
import { urls } from '@app/secrets/urls.env';
import { TokenService } from '@app/services/token.service';

export interface AuthorizationBearer extends Record<string, string> {
    Authorization: `Bearer ${ string }`;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly tokenService = inject(TokenService);

    getAuthorizationHeader(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${ this.tokenService.token }`
        } as AuthorizationBearer);
    }

    /**
     * @returns {boolean} True if user Is logged, otherwise false
     */
    checkCredentials(): boolean {
        return this.tokenService.checkToken();
    }

    /**
     * Navigated to the Authorization Server where they key in username and password
     */
    login(): void {
        const searchParams = new URLSearchParams({
            'client_id': responseJwt.clientId,
            'scope': responseJwt.scope,
            'redirect_uri': responseJwt.redirectUri,
            'response_type': responseJwt.responseType
        } as ResponseJwt).toString();

        window.location.assign(urls.authServerUrl + '/auth?' + searchParams);
    }

    /**
     * Delete the user Access Token and Reload the Page
     */
    logout(): void {
        this.tokenService.deleteToken();
        window.location.reload();
    }

}
