import { Component, OnInit } from '@angular/core';
import { SessionsService, ISession } from '../sessions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { validateConfig } from '@angular/router/src/config';

const defaultSession: ISession = {
    id: 0,
    name: '',
    location: '',
    startTime: new Date(),
    createdAt: null,
    updatedAt: null,
};

@Component({
    templateUrl: './session-detail.component.html',
})
export class SessionDetailComponent implements OnInit {

    session: ISession = { ...defaultSession };
    // TODO CCC: this is hard coded and should be coming from
    // the new Date(), but ISO String not working right
    // fix later
    startTimeAsString = '2018-11-15T23:34';

    formReady = false;

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
                            this.session = session;
                            this.formReady = true;
                            console.log('form ready');
                        // TODO CCC: this is hard coded and should be coming from
                        // the new Date(), but ISO String not working right
                        // fix later
                        // this.startTimeAsString = '';
                    },
                    (error) => {
                        // pop a message... return to list
                        this.router.navigate(['sessions']);
                        console.log('error happened');
                    },
                );
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

        this.session.startTime = this.startTimeAsString;
        console.log(this.session);
        if (this.session.id) {
            // update end point
        } else {
            // create end point
        }

        // this is what we want to do on success
        // put this in the success side for the end points
        // when we get thos working
        this.router.navigate(['sessions']);
        // TODO CCC: we want to show a success message

        // this.sessionsService.createSession(this.session)
        //     .subscribe();
    }
}
