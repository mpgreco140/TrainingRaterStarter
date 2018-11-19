import { Component, OnInit } from '@angular/core';
import { SessionsService, ISession } from '../sessions.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './session-detail.component.html',
})
export class SessionDetailComponent implements OnInit {

    session: ISession;

    constructor(
        private sessionsService: SessionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        const idAsString = this.route.snapshot.paramMap.get('entityId');
        // tslint:disable-next-line:radix
        const id = isNaN(parseInt(idAsString)) ? 0 : parseInt(idAsString);
        if (id) {
            this.sessionsService.getSessionById(id)
                .subscribe(
                    (session) => {
                        session.startTime = new Date(session.startTime).toISOString().slice(0, 16);
                        this.session = session;
                    },
                    (error) => {
                        // pop a message... return to list
                        this.router.navigate(['sessions']);
                        console.log('error happened');
                    },
                );
        } else {
            this.session = this.sessionsService.getDefaultSession();
        }
    }

    private formValid(): boolean {
        if (this.session.name.trim() && this.session.location.trim()) {
            return true;
        }
        return false;
    }

    submit(): void {
        if (!this.formValid()) {
            // TODO CCC: add not valid message here
            console.log('form not valid');
            return;
        }

        const session = {...this.session};

        // convert the input elements startTime into the correct format for the API
        const startTime = new Date(session.startTime);
        startTime.setHours(startTime.getHours() - (startTime.getTimezoneOffset() / 60));
        session.startTime = startTime.toISOString();

        if (session.id) {
            // update end point
            this.sessionsService.updateSession(session)
                .subscribe(() => {
                    this.router.navigate(['sessions']);
                });
        } else {
            // create end point
            this.sessionsService.createSession(session)
                .subscribe(() => {
                    this.router.navigate(['sessions']);
                });
        }

    }

    cancel(): void {
        this.router.navigate(['sessions']);
    }
}
