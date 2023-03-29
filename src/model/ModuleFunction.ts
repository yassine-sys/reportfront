import { SubModule } from "./SubModule";

export interface ModuleFunction {
  map: any;
    id: number;
    functionName: string;
    subModule:SubModule;
    selected?:boolean;
  }