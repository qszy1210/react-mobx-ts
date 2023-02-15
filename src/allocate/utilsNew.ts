import { IAllocatedResultData, IAllocatedResultSource, IAllocatedResultTreeData } from "./declare";
import { groupBy, uniqBy, remove, forEach, max } from 'lodash';
import { oc } from './utils';

const getIdFn = (function getId() {
    let count = 1;
    return function(): string {
        return "" + count++;
    }
})();

//按照数据结构, 来源=>目标, 1对多的形式, 即一个来源可能分配给多个目标;
// 所以, 1个目标查找的话, 一定是一个来源;
// 一个来源查找的话, 可能是多个目标;
export function initTreeDataNew(data: IAllocatedResultData[], isPositive: boolean): IAllocatedResultTreeData[] {
    if (isPositive) {
        return initTreeData(data)
    } else {
        return initTreeDataReverse(data);
    }
}
export function initTreeData(data: IAllocatedResultData[]): IAllocatedResultTreeData[] {
    // complete tree property, parentId, level, 以及一些其他辅助信息, 比如 realId, amount, name, objInfo
    if (!data || !data.length) return [];

    const treeItems: IAllocatedResultTreeData[] = [];

    const childrenMap: {[key: string]: IAllocatedResultData[]} = {};
    // 构建缓存map
    data.forEach(item=>{
        // todo oc
        const parentId = oc(item).allocatedResultSource.srcObjectId("");
        if (!childrenMap[parentId]){
            childrenMap[parentId] = [];
        }
        if (!childrenMap[parentId].find(child=>child.id === item.id)) {
            childrenMap[parentId].push(item);
        }
    })

    console.log("childrenMap is ", childrenMap);

    // 如果 expenseData 与 srcObjectId 相同, 构建新节点
    const rootLevelSourceItems = uniqBy(data.filter(i=>(i.expenseDataId) === i.allocatedResultSource.srcObjectId).flatMap(i=>i.allocatedResultSource), "id");

    console.log("rootLevelSourceItems is", rootLevelSourceItems);

    function appendChildrenNode(childrenMapKeyValue: string, parentItemId: string) {
        const children = childrenMap[childrenMapKeyValue];
        // 存在 children, 那么进行递归增加
        if (children && children.length) {
            children.forEach(childItem=>{
                const node = makeNode(childItem, parentItemId);
                treeItems.push(node);
                appendChildrenNode(childItem.id, node.id);
            })
        }
    }

    // 根节点
    rootLevelSourceItems.forEach((item, index)=>{
        const treeNode = makeNodeFromSource(item, "");
        treeItems.push(treeNode);
        appendChildrenNode(item.srcObjectId, treeNode.id);
    })

    // 非根节点
    data.forEach((item,index)=>{
        const node = makeNode(item, "");
        treeItems.push(node);
        appendChildrenNode(item.id, node.id);
    })

    // rootLevelSourceItems.forEach((item, index)=>{
    //     const newItem = makeNodeFromSource(item, "", index+"");
    //     treeItems.push( newItem )

    //     getChildren(treeItems, newItem, data, index + "" + index);

    //     // 根据 parentItem  获取 children
    //     function getChildren(
    //         treeItems: IAllocatedResultTreeData[],
    //         parentItem: IAllocatedResultTreeData,
    //         items: IAllocatedResultData[],
    //         index: string
    //         ) {
    //         for (let i = 0; i < items.length; i++) {
    //             const searchItem = items[i];
    //             // 原始数据, 上下游树中记录的是 srcObjectId, 而不是 id
    //             if (searchItem.allocatedResultSource.srcObjectId === parentItem.treeRelativeId) {
    //                 // return searchItem.id;
    //                 const newNode = makeNode(searchItem, parentItem.id, i + "");
    //                 parentItem.isLeaf = false;
    //                 treeItems.push(newNode);
    //                 // 可以去优化 treeItems
    //                 getChildren(treeItems, newNode, data, index + "" + index);
    //             }
    //         }
    //     }

    // });


    // 将目前构建的 tree, 进行一个 map 索引
    const dataMapWithId = {} as {[key: string]:IAllocatedResultTreeData};
    treeItems.forEach(item => {
        dataMapWithId[item.id] = item;
    });

    //重新 构建 level 和 path
    completeLevelPath(treeItems, dataMapWithId);

    console.log("treeItems is", treeItems);

    summarize(treeItems);

    console.log("merged treeItems is", treeItems);

    return treeItems;
}


export function initTreeDataReverse(data: IAllocatedResultData[]): IAllocatedResultTreeData[] {
    // complete tree property, parentId, level, 以及一些其他辅助信息, 比如 realId, amount, name, objInfo

    if (!data || !data.length) return [];

    const treeItems: IAllocatedResultTreeData[] = [];

    // 构建所有的 node (包括 expenseData 来源节点 以及 当前的 target节点)
    const targetCachedMap: {[key:string]: IAllocatedResultData} = {};
    const sourceCachedMap: {[key:string]: IAllocatedResultSource} = {};
    data.forEach((item,index)=>{
        targetCachedMap[item.id] = item;
    });
    // 如果 expenseData 与 srcObjectId 相同, 构建新节点
    const leafLevelItems = uniqBy(data.filter(i=>(i.expenseDataId) === i.allocatedResultSource.srcObjectId).flatMap(i=>i.allocatedResultSource), "id");
    leafLevelItems.forEach(item=>{
        sourceCachedMap[item.id] = item;
    })

    // 构建树
    data.forEach((item, index, arr)=>{
        const newItem = makeNode(item, "", index + "_r");
        treeItems.push(newItem);
        getChildren(treeItems, item, newItem, arr, index + "" + index);
    });

    //获取 以 item 为父元素的节点
    function getChildren(treeItems: IAllocatedResultTreeData[], originalParentItem: IAllocatedResultData, parentItem: IAllocatedResultTreeData, items: IAllocatedResultData[], index: string) {
        const targetItem = targetCachedMap[originalParentItem.allocatedResultSource.srcObjectId];
        const sourceItem = sourceCachedMap[originalParentItem.allocatedResultSource.id];
        if (targetItem) {
            const newNode = makeNode(targetItem, parentItem.id, index + "_r");
            treeItems.push(newNode);
            getChildren(treeItems, targetItem, newNode, items, index + index);//todo change index
        }
        if (sourceItem){
            treeItems.push(makeNodeFromSource(sourceItem, parentItem.id, index+ "_r"));
        }
    }


    // 构建一个以id为key的map
    const dataMapWithId = {} as {[key: string]:IAllocatedResultTreeData};
    treeItems.forEach(item => {
        dataMapWithId[item.id] = item;
    });
    //重新 构建 level 和 path
    completeLevelPath(treeItems, dataMapWithId);

    return treeItems;
}

function makeNode(item: IAllocatedResultData, parentId: string, index?: string): IAllocatedResultTreeData {
    const [objInfo, name] = generateObjInfoAndDisplayStrFromTarget(item);
    const newItem:IAllocatedResultTreeData = {
        objInfo,
        name,
        amount: item.amount,
        // id: `${item.id}_${index}`,
        // todo random
        // id: Math.random() + "",
        id: getIdFn(),
        parentId,
        level: 1,
        realId: item.id,// 初始包含自身
        treeRelativeId: item.id,//target node 中, 当前的 id 即为子节点的父节点(在原始数据中)
        path: objInfo,// 用于辅助,当前的tree层次路径
        isLeaf: true, //默认设置为叶子节点, 后边会进行更新
    };

    return newItem;
}
function makeNodeFromSource(item: IAllocatedResultSource, parentId: string, index?: string): IAllocatedResultTreeData {
    const [objInfo, name] =  generateObjInfoAndDisplayFromSource(item);
    const newItem = {
        objInfo,
        name,
        amount: item.amount,
        // id: `${item.id}_${index}`,
        //todo random
        // id: Math.random() + "",
        id: getIdFn(),
        parentId,
        level: 1,
        realId: item.id,// 初始包含自身
        treeRelativeId: item.srcObjectId,//
        path: objInfo,// 用于辅助,当前的tree层次路径
        isLeaf: false,//从来源出发的一定不是叶子节点
    };

    return newItem;
}

// 反转树, 将 parentId 进行反转即可
// ==> 鉴于非末级节点, 也可能在 target=>source 中作为末级节点, 此处直接 reverse 有些问题(只有末级节点reverse为根节点)
export function reverseTree(treeItems: IAllocatedResultTreeData[]): IAllocatedResultTreeData[] {
    let reverseItems :IAllocatedResultTreeData[] = [];

    const treeMap = treeItems.reduce((obj, item)=>{
        obj[item.id] = item;
        return obj;
    }, {} as {[key:string]: IAllocatedResultTreeData})

    treeItems.forEach(item=>{
        if (item.parentId) {
            const parentItem = treeMap[item.parentId];
            parentItem.tempParentIds  = (parentItem.tempParentIds || []).concat([item.id]);
        }
    });

    reverseItems = constructorTreeByReverse(treeItems);

    completeLevelPath(reverseItems, reverseItems.reduce((obj, item)=>{
        obj[item.id] = item;
        return obj;
    }, {} as {[key:string]: IAllocatedResultTreeData}));


    return reverseItems;
}

function sliceLastSubString(str: string, separator: string) {
    if (!str) {return str};
    const arr = str.split(separator);
    if (arr.length > 1) {
        return arr.slice(0,-1).join(separator);
    }
    return str;
}
//todo optimized
function findChildrenFromParent(parentId: string, items: IAllocatedResultTreeData[]) {
    return items.filter(i=>i.parentId === parentId);
}
// 汇总, 如果 path(不包含当前级 和 objInfo 一致), 那么我们认为需要进行合并
function summarize(treeItems: IAllocatedResultTreeData[]) {
    // summarize amount (same dimension)
    // const groupedData = groupBy(treeItems, "path");

    const maxLevel = max(treeItems.map(i=>i.level));
    if (maxLevel && maxLevel >= 1) {
        for (let level = 1; level <= maxLevel; level++) {
            summarizeByLevel(treeItems, level);
        }
    }
    // 根据需求要求, 如果是叶子节点,那么不会进行展示, 我们也进行去除
    // remove(treeItems, function(item){return item.toDelete||item.isLeaf})
    remove(treeItems, function(item){return item.toDelete})
}

function summarizeByLevel(treeItems: IAllocatedResultTreeData[], loopLevel: number) {
    const currentLevelItems = treeItems.filter(i => i.level === loopLevel);

    if (currentLevelItems.length) {
        const groupedItems = groupBy(currentLevelItems, function (item) {
            // if (!item.path) {return item.path};
            // return sliceLastSubString(item.path, ",");
            return item.path;
        });

        forEach(groupedItems, function (vals, key) {
            // 同一level, 同一path, 那么需要合并
            if (vals && vals.length) {
                // 取第一个作为合并的元素
                const finalItem:IAllocatedResultTreeData = vals[0];
                // 记录被合并后删除的元素
                const totalAmount = vals.reduce((sum, cur, index) => {
                    if (index > 0) {
                        // 处理合并后待删除的元素
                        cur.toDelete = true;
                        const children = findChildrenFromParent(cur.id, treeItems);
                        if (children && children.length) {
                            finalItem.isLeaf = false;
                            children.forEach(i => i.parentId = finalItem.id);
                        }
                    }
                    //MathCreateor
                    // sum = MathCreator().add(sum, cur.amount);
                    sum += cur.amount;
                    return sum;
                }, 0);
                finalItem.amount = totalAmount;
                finalItem.name = sliceLastSubString(finalItem.name, "金额:") + "金额:" + totalAmount;

                finalItem.realId = vals.map(i=>i.realId).join(",");
            }
        });
    }
}

function completeLevelPath(treeItems: IAllocatedResultTreeData[], dataMapWithId: {[key: string]:IAllocatedResultTreeData}) {

    treeItems.forEach(item => {
        // 初始为1
        item.level = 1;
        let parentItem = dataMapWithId[item.parentId];
        while (parentItem) {
            item.level ++ ;
            item.path = parentItem.objInfo + "," + item.path;
            parentItem = dataMapWithId[parentItem.parentId];
        }
    })

}

// 命名暂时按照原来的属性命名
// 获取所需要的 obj 内容 和 展示 str
// isFromSource 数据信息是否从 source 获取
function generateObjInfoAndDisplayFromSource(item: IAllocatedResultSource): [string, string] {

    const sourceObjectTypeObject = item.sourceObjectTypeObject;

    if (!sourceObjectTypeObject) {
        return ["", ""];
    }

    // 来源 => 目标, 目标查找 parent
    // 有来源类型的, 按照原来的代码, 为有 expenseDate 的数据
    const sourceObjectKey = sourceObjectTypeObject.id == "User" ? "sourcePerson" : "source" + sourceObjectTypeObject.id;

    const sourceObject = item[sourceObjectKey];

    const objInfoStr = makeObjInfoFromSource(item);

    const displayStr = `${sourceObjectTypeObject.title}[${sourceObject.name}] 金额: ${item.amount}`;

    // const parentId = cachedMap[`${sourceObjectType.id}${sourceObject.id}`] && cachedMap[`${sourceObjectType.id}${sourceObject.id}`].id || "";

    return [objInfoStr, displayStr];

}

// 产生 objInfo, 用于作为比较的节点是否一致的凭证
function makeObjInfoFromSource(sourceInfo: IAllocatedResultSource) {

    const objectTypeId = oc(sourceInfo).sourceObjectTypeObject.id("");
    const objectDataKey = objectTypeId == "User" ? "sourcePerson" : "source" + objectTypeId;
    const objectId = objectTypeId + '_' + sourceInfo[objectDataKey].id

    const costCenterId = oc(sourceInfo).sourceCostCenter.id("");
    const eagId = oc(sourceInfo).sourceEag.id("");

    return [
        eagId,
        costCenterId,
        objectId,
    ].filter(i=>i).join("_");

}
// 产生 objInfo, 用于作为比较的节点是否一致的凭证
function makeObjInfoFromTarget(targetInfo: IAllocatedResultData) {
    const objectTypeId = oc(targetInfo).targetObjectTypeObject.id("");
    // const keyName = `targetObject${objectTypeId}`;
    // todo oc
    const costCenterId = objectTypeId === "CostCenter" ? oc(targetInfo).targetObject.id("") : "";
    const objectId = objectTypeId + "_" + oc(targetInfo).targetObject.id("");
    const eagId = oc(targetInfo).targetEag.id("");

    return [
        eagId,
        costCenterId,
        objectId,
    ].filter(i=>i).join("_");
}
// 命名暂时按照原来的属性命名
// 获取所需要的 obj 内容 和 展示 str
function generateObjInfoAndDisplayStrFromTarget(item: IAllocatedResultData): [string, string] {

    const targetObjectTypeObject = item.targetObjectTypeObject;
    const targetObject = item.targetObject;

    // const objInfo = makeObjInfoFromSource(item.allocatedResultSource);
    const objInfo = makeObjInfoFromTarget(item);
    const displayStr = `${targetObjectTypeObject.title}[${targetObject.name}] 金额: ${item.amount}`

    return [objInfo, displayStr]

}

// 获取真实的 source 信息
function getSourceInfo(item: IAllocatedResultData): [{id: string, title: string}, {id: string, name:string}] {
    if (!item || !item.allocatedResultSource) {
        console.warn("不存在分摊来源");
        return [] as any;
    }

    const sourceTypeObject = item.allocatedResultSource.sourceObjectTypeObject;

    if (!sourceTypeObject) {
        console.warn("不存在分摊来源类型");
        return [] as any;
    }

    const sourceObjectKey = sourceTypeObject.id == "User" ? "sourcePerson" : "source" + sourceTypeObject.id;

    const sourceObject = item.allocatedResultSource[sourceObjectKey];

    return [sourceTypeObject, sourceObject];

}

// 获取父节点
// 如果 srcObjectId 在本数组中找到(id), 那么 找到的目标节点, 为当前节点的父节点
// 查找 parentId 的时候, source 只有一个.
function getParentId(item: IAllocatedResultData, items: IAllocatedResultData[]): string{
    const srcObjectId = item.allocatedResultSource && item.allocatedResultSource.srcObjectId;
    if (srcObjectId) {
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            if ((element.expenseDataId) === srcObjectId) {
                return element.allocatedResultSource.id;
            }
            if (element.id === srcObjectId) {
                return element.id;
            }
        }
    }

    return "";
}

// 根据临时反转构建新的树结构
function constructorTreeByReverse(treeItems: IAllocatedResultTreeData[]) {
    const retNewTreeItems: IAllocatedResultTreeData[] = [];
    // 查找所有的根节点
    const rootNodes = treeItems.filter(i=>!i.tempParentIds || !i.tempParentIds.length
        );
    //基于原来的树结构, 每一个树的子节点都需要重新创建(除非只有一个节点)
    rootNodes.forEach((rootNode, index)=>{
        rootNode.parentId = "";
        const newRootNode = Object.assign({}, rootNode, {id: `${rootNode.id}_${index}`});
        retNewTreeItems.push(newRootNode);
        copyNode(newRootNode);

        function copyNode(parentNode: IAllocatedResultTreeData) {
            const childNode = treeItems.find(ii => ii.tempParentIds && ii.tempParentIds.includes(parentNode.realId));
            if (childNode) {
                const newNode = Object.assign({}, { ...childNode }, { id: `${childNode.id}_${index}`, realId: childNode.id, parentId: parentNode.id})
                retNewTreeItems.push(newNode);
                copyNode(newNode);
            }
        }
    })

    retNewTreeItems.forEach(item=>{
        item.tempParentIds = undefined;
        delete item.tempParentIds;
    })

    return retNewTreeItems;
}

