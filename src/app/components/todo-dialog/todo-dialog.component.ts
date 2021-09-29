import { HttpServerServiceService } from './../../Services/http-server-service.service';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.css']
})
export class TodoDialogComponent implements OnInit {
  public select: string;
  public name: string;
  public id: number;

  constructor(private httpServerService: HttpServerServiceService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {id: number}) { }

  ngOnInit(): void {
    this.httpServerService.getTaskAll().subscribe((data) => {
      for(let i=0; i<data.length; i++){
        if(data[i].id===this.data.id){
          this.select = data[i].status;
          this.name = data[i].name;
          this.id = data[i].id;
        }
      }
    })
  }

  public onSubmit() {
    const dataNew = {id: this.data.id, name: this.name, status: this.select}
    this.httpServerService.updateTask(dataNew, this.data.id).subscribe((data) => {
      console.log(data)
    })
    this.dialog.closeAll();
  }

}
