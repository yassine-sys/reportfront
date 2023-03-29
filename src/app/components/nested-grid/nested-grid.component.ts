import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Module } from 'src/model/Module';
import { ModuleServicesService } from 'src/app/services/module-services.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModuleFormComponent } from '../moduleform/moduleform.component';
import { MatDialog } from '@angular/material/dialog';
import { SubmoduleformComponent } from '../submoduleform/submoduleform.component';
import { FonctionformComponent } from '../fonctionform/fonctionform.component';
import { SubmoduleService } from 'src/app/services/submodule.service';
import { FunctionService } from 'src/app/services/function.service';


@Component({
  selector: 'app-nested-grid',
  templateUrl: './nested-grid.component.html',
  styleUrls: ['./nested-grid.component.css']
})
export class NestedGridComponent implements OnInit, AfterViewInit {
  @ViewChild(Table) table: Table | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  modules: Module[] = [];
  dataSource: any;
  

  constructor(private primengConfig: PrimeNGConfig,
    private dataService: ModuleServicesService,
    private submoduleService:SubmoduleService,
    private functionService:FunctionService,
    public dialog: MatDialog) {}

    ngOnInit(): void {
      this.dataService.getAllModules().subscribe(data => {
        this.modules = data;
        this.dataSource = new MatTableDataSource(this.modules);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        console.log(this.modules)      
      });
    }
  

  ngAfterViewInit(): void {
    this.primengConfig.ripple = true;
  }

  toggleSubModules(module: any) {
    module.expanded = !module.expanded;
  }

  editElement(module: Module) {
    const dialogRef = this.dialog.open(ModuleFormComponent, {
      width: '350px', 
      data: { module: module }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
    console.log(module)
  }
  
  deleteElement(id:any){
    this.dataService.deleteModule(id).subscribe(
      res=>{this.ngOnInit()},
      err=>{console.log(err);}
    )
  }

  deleteSubmodule(id:any){
    this.submoduleService.deleteSubModule(id).subscribe(res=>{
      this.ngOnInit()
    })
  }
  deleteFunction(id:any){
    this.functionService.deleteFonction(id).subscribe(res=>{
      this.ngOnInit()
    })
  }

  openModuleForm(): void { 
    const dialogRef = this.dialog.open(ModuleFormComponent, {
      width: '350px', 
      data: {}
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openSubModuleForm(): void { 
    const dialogRef = this.dialog.open(SubmoduleformComponent, {
      width: '350px', 
      data: {}
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openFonctionForm(): void { 
    const dialogRef = this.dialog.open(FonctionformComponent, {
      width: '350px', 
      data: {}
    });
  }

  
}
