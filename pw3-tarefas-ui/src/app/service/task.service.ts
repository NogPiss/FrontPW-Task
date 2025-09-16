import { Task } from './../model/task';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = "http://localhost:8080/Tasks";
  private http = inject(HttpClient);

  findAll(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(id : number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  postTask(task: Task): Observable<Task>{
    return this.http.post<Task>(`${this.apiUrl}/Cadastro`, task);
  }

  constructor() { }
}
