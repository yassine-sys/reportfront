import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { FunctionService } from 'src/app/services/function.service';
import { ModuleServicesService } from 'src/app/services/module-services.service';
import { SubmoduleService } from 'src/app/services/submodule.service';
import { ModuleFunction } from 'src/model/ModuleFunction';
import { SubModule } from 'src/model/SubModule';


@Component({
  selector: 'app-fonctionform',
  templateUrl: './fonctionform.component.html',
  styleUrls: ['./fonctionform.component.css']
})
export class FonctionformComponent implements OnInit{

  functionForm!: FormGroup;
  submodules: SubModule[] = [];
  selectedSubmodules: SubModule[] = [];
  fonction!:ModuleFunction


  constructor(private formBuilder: FormBuilder,
    private fonctionService:FunctionService,
    private submoduleService:SubmoduleService,
    private dialogRef: MatDialogRef<FonctionformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  
    ) {}

  

    ngOnInit() {
      this.functionForm = this.formBuilder.group({
        functionName: [this.data?.fonction?.functionName || '', Validators.required],
        submodules: [this.selectedSubmodules],
      });

      this.submoduleService
      .getAllSubModules()
      .pipe(
        map((submodules: SubModule[]) => {
          return submodules.map((submodule) => {
            const selected = this.data?.module?.list_sub_modules?.some((s: SubModule) => s.id === submodule.id) || false;
            return {
              ...submodule,
              selected
            };
          });
        })
      ) .subscribe((submodules) => {
        console.log(submodules)
        this.submodules = submodules;
        this.selectedSubmodules = submodules.filter((s) => s.selected);
        this.functionForm.patchValue({submodules: this.selectedSubmodules});
      });
  }

  saveFonction(): void {
    if (this.functionForm?.valid) {
      const fonctionToSend = {
        id: this.data?.fonction?.id||0,
        functionName: this.functionForm.value.functionName,
        list_sub_modules: this.selectedSubmodules[0],
        
      };
      if (fonctionToSend.id === 0) {
        this.fonctionService.addFonction(fonctionToSend).subscribe((fonction: Object) => {
          this.dialogRef.close();
        });
      } else {
        const fonctionToSend = {
          id: this.data?.fonction?.id||0 ,
          functionName: this.functionForm.value.functionName,
          list_sub_modules: this.selectedSubmodules[0].map((sub:SubModule)=> {
            return {
              id: sub.id,
              subModuleName: sub.subModuleName,
              path: sub.path,
              functions: sub.functions
            };
          }),
        };
        this.fonctionService.updateFonction(fonctionToSend, fonctionToSend.id).subscribe((fonction: Object) => {
          this.dialogRef.close();
        });
      }
    }
  }
  cancel(): void {
    this.dialogRef.close();
  }

  toggleSubmodule(submodule: SubModule): void {
    const index = this.selectedSubmodules.findIndex((s) => s.id === submodule.id);
    if (index !== -1) {
      this.selectedSubmodules.splice(index, 1);
    } else {
      this.selectedSubmodules.push(submodule);
    }
    console.log(this.selectedSubmodules)
  }

     
      
     
    
    }

    


