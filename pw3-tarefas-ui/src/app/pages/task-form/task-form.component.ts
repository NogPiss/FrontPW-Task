import { routes } from './../../app.routes';
import { TaskService } from './../../service/task.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../model/task';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {

  tasks: Task[] = [];
  private fb = inject(FormBuilder);

  id: string | null = null;

  private taskService = inject(TaskService)

  taskForm = this.fb.group({
    id: [null as number | null],
    titulo: ['', Validators.required],
    descricao: [''],
    responsavel: ['', Validators.required],
    dataLimite: ['', Validators.required],
    statusEnum: ['PENDING', Validators.required],
  });

  constructor(private router: Router){
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const task: Task = this.taskForm.value as Task;

    if (this.id) {
      console.log("Executa a atualização")
    } else {
      this.postTask(task)
      console.log("Executa a inserção")
      this.router.navigate(["/tasks"])
      this.loadTask();
    }
  }

  loadTask(): void{
    this.taskService.findAll().subscribe((data) => {
      this.tasks = data;
    });

  }

  postTask(task: Task){
      if(task != null){
        this.taskService.postTask(task).subscribe(() => this.loadTask());
      }
  }

}
