import { Component, inject, OnInit, signal } from '@angular/core';
import { Foo } from '@app/classes/foo.entity';
import { urls } from '@app/secrets/urls.env';
import { ApiService } from '@app/services/api.service';

@Component({
    selector: 'app-test-page',
    imports: [],
    templateUrl: './test-page.html',
    styleUrl: './test-page.scss'
})
export class TestPage implements OnInit {

    private readonly apiService = inject(ApiService);

    protected title = signal<string>('Not made the Request');

    ngOnInit(): void {
        this.apiService.simpleGet<Foo[]>(`${ urls.backend }/foos`)
            .subscribe({
                next: response => {
                    this.title.set(response[0].name);
                    console.log(response);
                },
                error: error => {
                    this.title.set('error');
                    console.error(error);
                }
            });
    }
}
