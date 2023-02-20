import { IAllocatedResultTreeData } from "./declare";
import { gqlListData } from "./mock";
// import { data } from "./mock-data";
import { data } from "./mock-data-simple";
// import { data } from "./mock-data-s2";
import { mockGqlList } from "./mock-gql";
import { listData } from "./mock-list";
import { initTreeDataNew, reverseTree } from "./utilsNew";


export const ret = initTreeDataNew(data as any, true);


export const ret1 = initTreeDataNew(data as any, false);

export function walkTree(arr: any[]) {
    let str = "";
    let level = 1;
    const roots = arr.filter(i=>!i.parentId);
    roots.forEach(root=>{
        str += [root.name, root.id, root.parentId].join('--');
        str += "\n";
        str+=getChildren(arr, root.id, level);
        str += "\n";
        str += "\n";
    })

    return str;


    function getChildren(arr: any[], id: string, level: number){
        const children =  arr.filter(item=>item.parentId === id);
        let s = "";
        const currentLevel = level;
        children.forEach(child=>{
            s +=[new Array(currentLevel).fill('=====').join('') + ">",child.name, child.id, child.parentId].join('--');
            s+="\n";
            s+=getChildren(arr, child.id, ++level);
        })
        return s;
    }

}

