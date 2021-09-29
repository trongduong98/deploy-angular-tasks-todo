import { HttpServerServiceService } from './../../Services/http-server-service.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnter,
  CdkDragExit,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { task } from 'src/app/models/task';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-todo-tasks',
  templateUrl: './todo-tasks.component.html',
  styleUrls: ['./todo-tasks.component.css']
})
export class TodoTasksComponent implements OnInit {
  public dataSource:task[] = [];
  public todoItems = [];
  public inProcessingItems = [];
  public doneItems = [];

  constructor( private httpServerService: HttpServerServiceService, public dialog: MatDialog) { }

  public refresh(){
    this.httpServerService.getTaskTodo().subscribe(data => {
      this.todoItems = data
      console.log('TODO:',data)
    })
    this.httpServerService.getTaskInProcessing().subscribe(data => {
      this.inProcessingItems = data;
      console.log('INPROCESSING:',data)
    })
    this.httpServerService.getTaskDone().subscribe(data => {
      this.doneItems = data;
      console.log('DONE:',data)
    })
  }

  

  ngOnInit(): void {
    this.refresh();
  }

  public openDialog(id) {
    const dialogRef = this.dialog.open(TodoDialogComponent,{
      //data output component child
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.refresh();
      this.refresh();
    });
  }



  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      //get status: event.item.data.status
      //get id col: event.container.element.nativeElement.id(cdk-drop-list-0)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      switch (event.container.element.nativeElement.id) {
        case 'cdk-drop-list-0':
          event.item.data.status = "todo";
          break;
        case 'cdk-drop-list-1':
          event.item.data.status = "inProcessing";
          break;
        case 'cdk-drop-list-2':
          event.item.data.status = "done";
          break;
      }
      this.httpServerService.updateTask(event.item.data,event.item.data.id).subscribe((data) => {
        console.log(data);
      })
    }
  }

}
