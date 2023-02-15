//还是按照原有的结构进行数据构建,
//此处对数据结构进行说明
export interface IAllocatedResultTreeData {
    objInfo: string,    // objInfo: 'User_U5W5F161KLL0012', // source ObjectType_对应id, 用来确定来源的维度信息是否一致, 如果 level 和 维度信息一致, 那么我们认为需要对数据进行合并
    name: string,   // name: '人员[张宜红] 金额: 47.05', // source 的 ObjectType的title[对应的实际内容] 金额(amount)
    amount: number, // amount: 47.05, // amount
    id: string, // id: 'X56HK26105P002D', // item 的 id
    parentId: string,   // parentId: 'X56HK26105P001M', // 对应的 parent 中的 item.id, 但是 父子关系是根据 source 中进行确认的
    tempParentIds?: string[],   // 临时 parentid, 用于反转的时候使用
    level: number,  // level: 3,  // 当前tree 的层级
    realId: string, // realId: 'X56HK26105P002D' // 记录当前元素的实际包含内容(如果发生聚合的情况下, 相同维度的 amount 会进行汇总处理)
    path?: string;// 记录上下节点
    toDelete?: boolean;//记录树合并的时候,将要被删除的节点
    treeRelativeId?: string;// 根据原始数据去查找上下游之间关系
    isLeaf?: boolean;//记录当前节点是否为末级节点
}

export interface IAllocatedResultData {
    id: string,
    expenseData: {id: string},
    amount: number,
    targetObjectTypeObject: {
        id: string,
        title: string
    },
    targetObject: {
        id: string,
        name: string
    },
    targetEag: {
        id: string
    },
    allocatedResultSource: IAllocatedResultSource
    [key: string]: any
}

export interface IAllocatedResultSource {
    id: string,
    amount: number,
    srcObjectId: string, //来源单信息, 可能是 expenseId 或者 是 其他的节点
    sourceCostCenter: {
        id: string,
        name: string
    },
    sourcePerson?: {
        id: string,
        name: string
    },
    sourceEag: {
        id: string,
        name: string
    }
    sourceObjectTypeObject: {
        id: string,
        title: string
    }
    [key: string]: any
}
