import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface ISession {
  id: number;
  name: string;
  location: string;
  startTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const defaultSession: ISession = {
  id: 0,
  name: '',
  location: '',
  startTime: null,
  createdAt: null,
  updatedAt: null,
};

@Injectable()
export class SessionsService {
  constructor(
    private http: HttpClient,
  ) { }

  private getDefaultStartTime(): string {
    const startTime = new Date();
    startTime.setHours(startTime.getHours() - startTime.getTimezoneOffset() / 60);
    startTime.setMinutes(0);
    return startTime.toISOString().slice(0, 16);
  }

  getDefaultSession(): ISession {
    const session = {...defaultSession};
    session.startTime = this.getDefaultStartTime();
    return session;
  }

  getSessions(): Observable<ISession[]> {
    return this.http.get<ISession[]>('http://localhost:3000/sessions');
  }

  getSessionById(id: number): Observable<ISession> {
    return this.http.get<ISession>(`http://localhost:3000/sessions/${id}`);
  }

  createSession(session: ISession): Observable<ISession> {
    return this.http.post<ISession>('http://localhost:3000/sessions', session);
  }

  updateSession(session: ISession): Observable<ISession> {
    return this.http.put<ISession>('http://localhost:3000/sessions', session);
  }

}
