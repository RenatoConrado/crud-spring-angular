import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { TokenService } from '@app/services/token.service';
import { FooComponent } from '@pages/home/foo-component/foo-component';

@Component({
    selector: 'app-home-page',
    imports: [
        FooComponent
    ],
    templateUrl: './home-page.html',
    styleUrl: './home-page.scss'
})
export class HomePage implements OnInit {

    private readonly authService = inject(AuthService);
    private readonly tokenService = inject(TokenService);

    protected isLoggedIn: boolean = false;

    /**
     * If is not Logged, obtain access token using authorization code,
     * save the access token in a Cookie and redirect to Main Page
     */
    ngOnInit(): void {
        this.isLoggedIn = this.authService.checkCredentials();
        if (this.isLoggedIn) {
            return;
        }

        const urlSearchParams = new URLSearchParams(window.location.search);
        console.log(urlSearchParams);

        const paramValue = urlSearchParams.get('code');
        if (!paramValue) {
            return;
        }
        console.log(paramValue);

        this.tokenService.requestAccessToken(paramValue)
            .subscribe({
                next: token => this.tokenService.token = token,
                error: error => console.error(error)
            });
    }

    protected login(): void {
        this.authService.login();
    }

    protected logout(): void {
        this.authService.logout();
    }

}
