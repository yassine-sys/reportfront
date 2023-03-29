import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { FunctionService } from 'src/app/services/function.service';
import { ModuleServicesService } from 'src/app/services/module-services.service';
import { SubmoduleService } from 'src/app/services/submodule.service';
import { Module } from 'src/model/Module';
import { ModuleFunction } from 'src/model/ModuleFunction';
import { SubModule } from 'src/model/SubModule';

@Component({
  selector: 'app-submoduleform',
  templateUrl: './submoduleform.component.html',
  styleUrls: ['./submoduleform.component.css']
})
export class SubmoduleformComponent implements OnInit{

  submoduleForm!: FormGroup;
  functions: ModuleFunction[] = [];
  selectedFunctions: ModuleFunction[] = [];
  submodule!: SubModule;

 


  constructor( private formBuilder: FormBuilder,
    private submoduleService: SubmoduleService,
    private functionService: FunctionService,
    private moduleService:ModuleServicesService,
    private dialogRef: MatDialogRef<SubmoduleformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  
    ) {}

    

  

  ngOnInit() :void{
    this.submoduleForm = this.formBuilder.group({
      subModuleName: [this.data?.submodule?.subModuleName || '', Validators.required],
      functions: [this.selectedFunctions],
    });

    this.functionService
    .getAllFunction()
    .pipe(
      map((functions: ModuleFunction[])=>{
        return functions.map((fct)=>{
          const selected = this.data?.submodule?.functions?.some((f:ModuleFunction)=>f.id===fct.id)|| false;
          return {
            ...fct,
            selected
          }
        })
      })
    )
    .subscribe((functions)=>{
      this.functions=functions
      this.selectedFunctions=functions.filter((f)=>f.selected)
      this.submoduleForm.patchValue({functions: this.selectedFunctions})
    })
    
   
   
  
  }

  saveSubModule():void{
    if (this.submoduleForm?.valid){
      const submoduleToSend={
        id:this.data?.submodule?.id||0,
        subModuleName:this.submoduleForm.value.subModuleName,
        functions:this.selectedFunctions[0]
      }
      if (submoduleToSend.id === 0) {
        this.submoduleService.addSubmodule(submoduleToSend).subscribe((submodule: Object) => {
          this.dialogRef.close();
        });
    }else{
      const submoduleToSend = {
        id: this.data?.submodule?.id||0 ,
        subModuleName: this.submoduleForm.value.subModuleName,
        functions: this.selectedFunctions[0].map((fct:ModuleFunction)=> {
          return {
            id: fct.id,
            functionName: fct.functionName,
           
          };
        }),
        
      };
      this.submoduleService.updateSubModule(submoduleToSend,submoduleToSend.id).subscribe((submodule: Object)=>{
        this.dialogRef.close();
      })
    }
  }
}
cancel(): void {
  this.dialogRef.close();
}

toggleFunction(fct: ModuleFunction): void {
  const index = this.selectedFunctions.findIndex((s) => s.id === fct.id);
  if (index !== -1) {
    this.selectedFunctions.splice(index, 1);
  } else {
    this.selectedFunctions.push(fct);
  }
  console.log(this.selectedFunctions)
}
 

 

}
