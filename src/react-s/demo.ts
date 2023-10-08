type TreeNode = {
    id: number
    name: string
    flag: number
    parentId: number
    children: null | TreeNode[]
}

type TreeNodeWithExtraInfo = TreeNode & {
    __parent: TreeNodeWithExtraInfo | null
    __bitset: 0 | 1
    __subtreeBitSet: 0 | 1
    children: TreeNodeWithExtraInfo[] | null
}
type ID = number

const temp: TreeNode[] = [
    {
        id: 4,
        name: '标题1',
        flag: 0,
        parentId: 1,
        children: [{ id: 3, name: '1-12', flag: 0, parentId: 4, children: null }],
    },
    {
        id: 5,
        name: '标题2',
        flag: 0,
        parentId: 1,
        children: [
            { id: 4, name: '2-1', flag: 0, parentId: 5, children: null },
            { id: 6, name: '2-2', flag: 0, parentId: 5, children: null },
        ],
    },
    {
        id: 7,
        name: '标题3',
        flag: 0,
        parentId: 1,
        children: [
            { id: 8, name: '3-1', flag: 0, parentId: 7, children: null },
            { id: 9, name: '3-2', flag: 0, parentId: 7, children: null },
            { id: 10, name: '3-3', flag: 0, parentId: 7, children: null },
        ],
    },
]

const getSelectedSubtree = (nodes: TreeNode[], ids: ID[]): TreeNode[] => {
    const dummyRoot: TreeNodeWithExtraInfo = {
        children: nodes,
    } as any
    const idToNodeMap = new Map<ID, TreeNodeWithExtraInfo>()
    const ans: TreeNode = {
        children: [],
    } as any

    const proprocessNodes = (
        root: TreeNodeWithExtraInfo,
        parent: null | TreeNodeWithExtraInfo
    ): void => {
        if (parent) {
            root.__parent = parent
        }

        const children = root.children
        idToNodeMap.set(root.id, root)

        if (!children) return

        for (const node of children) {
            proprocessNodes(node, root)
        }
    }

    const markFlagFromSelectedNodeToRoot = (id: ID): void => {
        let node = idToNodeMap.get(id)!

        if (!node) {
            throw new Error('Not Implement')
        }

        let parent = node.__parent
        node.__bitset = 1

        while (parent) {
            parent.__subtreeBitSet |= node.__bitset | node.__subtreeBitSet

            node = parent
            parent = parent.__parent
        }
    }

    const bubbleProperties = (ids: ID[]) => {
        for (const id of ids) {
            markFlagFromSelectedNodeToRoot(id)
        }
    }

    const removeFlags = (node: TreeNodeWithExtraInfo): void => {
        node.__bitset = 0
        node.__subtreeBitSet = 0
    }

    const includeSomeFlags = (node: TreeNodeWithExtraInfo): boolean => {
        return (node.__bitset | node.__subtreeBitSet) !== 0
    }

    const dfs = (current: TreeNodeWithExtraInfo, workInProgress: TreeNode) => {
        if (!includeSomeFlags(current)) {
            return
        }

        const children = current.children

        if (!children) return

        for (const node of children) {
            const newNode: TreeNode = {
                ...node,
                children: [],
            }
            if (includeSomeFlags(node)) {
                workInProgress.children!.push(newNode)
                if (node.__subtreeBitSet) {
                    dfs(node, newNode)
                }
            }
        }

        removeFlags(current)
    }

    proprocessNodes(dummyRoot, null)
    bubbleProperties(ids)
    dfs(dummyRoot, ans)

    return ans.children!
}

console.log(getSelectedSubtree(temp, [5, 10]))