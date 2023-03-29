import { SubModule } from "./SubModule";

export interface Module {
    map: any;
    id: number;
    moduleName: string;
    list_sub_modules: SubModule[];
    group_module: any[];
    expanded?: boolean;
    rotated?:boolean;
    selected?:boolean;
  }