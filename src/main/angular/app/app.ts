import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App implements OnInit {

    private readonly appService = inject(AppService);

    protected title = signal<string>('Not made the Request');

    ngOnInit(): void {
        this.appService
        .getTestMessage()
        .subscribe({
            next: (response: string) => this.title.set(response),
            error: error => {
                this.title.set("error")
                console.error(error);
            }
        });
    }

}
