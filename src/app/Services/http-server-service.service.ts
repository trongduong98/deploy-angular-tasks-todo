import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServerServiceService {
  private REST_API_SERVER = 'https://6152f6a8c465200017d1a8d4.mockapi.io/task-todo/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'my-auth-token'
    }),
  }

  constructor(private httpClient: HttpClient) { }

  //todo-list-cdk-drag-drop-angular-material
  public getTaskAll(): Observable<any> {
    const url = `${this.REST_API_SERVER}/tasks`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  public getTaskTodo(): Observable<any> {
    const url = `${this.REST_API_SERVER}/tasks?status=todo`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  public getTaskInProcessing(): Observable<any> {
    const url = `${this.REST_API_SERVER}/tasks?status=inProcessing`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  public getTaskDone(): Observable<any> {
    const url = `${this.REST_API_SERVER}/tasks?status=done`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  public updateTask(status, id) {
    let url = `${this.REST_API_SERVER}/tasks/`+ id;
    return this.httpClient.put<any>(url, status, this.httpOptions);
  }
}
