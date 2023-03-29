import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/model/User';


@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit{
  displayedColumns: string[] = ['uId', 'username', 'dateCreation', 'etat','actions'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) { }
  @ViewChild(MatSort) sort: MatSort | undefined;


  ngOnInit() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
    });
  }

  editUser(user:User){
    console.log(user)
  }

  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe(
      res=>{this.ngOnInit()},
      err=>{console.log(err);}
    )
  }

  openForm():void{
    console.log("test")
  }
}
