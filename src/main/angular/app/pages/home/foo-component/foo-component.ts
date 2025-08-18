import { Component, inject } from '@angular/core';
import { Foo } from '@app/classes/foo.entity';
import { urls } from '@app/secrets/urls.env';
import { ApiService } from '@app/services/api.service';

@Component({
    selector: 'app-foo-component',
    imports: [],
    templateUrl: './foo-component.html',
    styleUrl: './foo-component.scss'
})
export class FooComponent {

    private readonly apiService = inject(ApiService);

    protected foo = new Foo('sample foo');

    getFoo() {
        this.apiService.getResource<Foo[]>(`${ urls.backend }/foos`)
            .subscribe({
                next: data => this.foo = data[0],
                error: error => {
                    console.error(error);
                    this.foo.name = 'Error';
                }
            });
    }
}
