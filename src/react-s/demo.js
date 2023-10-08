var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var temp = [
    {
        id: 4,
        name: '标题1',
        flag: 0,
        parentId: 1,
        children: [{ id: 3, name: '1-12', flag: 0, parentId: 4, children: null }]
    },
    {
        id: 5,
        name: '标题2',
        flag: 0,
        parentId: 1,
        children: [
            { id: 4, name: '2-1', flag: 0, parentId: 5, children: null },
            { id: 6, name: '2-2', flag: 0, parentId: 5, children: null },
        ]
    },
    {
        id: 7,
        name: '标题3',
        flag: 0,
        parentId: 1,
        children: [
            { id: 8, name: '3-1', flag: 0, parentId: 7, children: null },
            { id: 9, name: '3-2', flag: 0, parentId: 7, children: null },
            { id: 10, name: '3-3', flag: 0, parentId: 7, children: [{
                id: 11, name: '3-3-1', flag: 0, parentId: 7, children: null
            }] },
        ]
    },
];
var getSelectedSubtree = function (nodes, ids) {
    var dummyRoot = {
        children: nodes
    };
    var idToNodeMap = new Map();
    var ans = {
        children: []
    };
    var proprocessNodes = function (root, parent) {
        if (parent) {
            root.__parent = parent;
        }
        var children = root.children;
        idToNodeMap.set(root.id, root);
        if (!children)
            return;
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var node = children_1[_i];
            proprocessNodes(node, root);
        }
    };
    var markFlagFromSelectedNodeToRoot = function (id) {
        var node = idToNodeMap.get(id);
        if (!node) {
            throw new Error('Not Implement');
        }
        var parent = node.__parent;
        node.__bitset = 1;
        while (parent) {
            parent.__subtreeBitSet |= node.__bitset | node.__subtreeBitSet;
            node = parent;
            parent = parent.__parent;
        }
    };
    var bubbleProperties = function (ids) {
        for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
            var id = ids_1[_i];
            markFlagFromSelectedNodeToRoot(id);
        }
    };
    var removeFlags = function (node) {
        node.__bitset = 0;
        node.__subtreeBitSet = 0;
    };
    var includeSomeFlags = function (node) {
        return (node.__bitset | node.__subtreeBitSet) !== 0;
    };
    var dfs = function (current, workInProgress) {
        if (!includeSomeFlags(current)) {
            return;
        }
        var children = current.children;
        if (!children)
            return;
        for (var _i = 0, children_2 = children; _i < children_2.length; _i++) {
            var node = children_2[_i];
            var newNode = __assign(__assign({}, node), { children: [] });
            if (includeSomeFlags(node)) {
                workInProgress.children.push(newNode);
                if (node.__subtreeBitSet) {
                    dfs(node, newNode);
                }
            }
        }
        removeFlags(current);
    };
    proprocessNodes(dummyRoot, null);
    bubbleProperties(ids);
    dfs(dummyRoot, ans);
    return ans.children;
};
console.log(getSelectedSubtree(temp, [11]));
