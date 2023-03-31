import { SubModule } from "./SubModule";

export interface ModuleFunction {
  map: any;
    id: number;
    functionName: string;
    subModule:SubModule;
    submodule?:number;
    selected?:boolean;
  }