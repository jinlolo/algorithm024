# 学习笔记

## Hash 表

Hash Table 是一种用于存储键值对（key value pair）的数据结构，因为 Hash Table 根据 key 查询 value 的速度很快，所以它常用于实现 Map、Dictinary、Object 等数据结构。如上图所示，Hash Table 内部使用一个 hash 函数将传入的键转换成一串数字，而这串数字将作为键值对实际的 key，通过这个 key 查询对应的 value 非常快，时间复杂度将达到 O(1)。Hash 函数要求相同输入对应的输出必须相等，而不同输入对应的输出必须不等，相当于对每对数据打上唯一的指纹。

一个 Hash Table 通常具有下列方法：

1.add：增加一组键值对
2.remove：删除一组键值对
3.lookup：查找一个键对应的值

代码实现方式如下：

```
function hash(string, max) {
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
        hash += string.charCodeAt(i);
    }
    return hash % max;
}

function HashTable() {
    let storage = [];
    const storageLimit = 4;

    this.add = function (key, value) {
        var index = hash(key, storageLimit);
        if (storage[index] === undefined) {
            storage[index] = [
                [key, value]
            ];
        } else {
            var inserted = false;
            for (var i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    storage[index][i][1] = value;
                    inserted = true;
                }
            }
            if (inserted === false) {
                storage[index].push([key, value]);
            }
        }
    }

    this.remove = function (key) {
        var index = hash(key, storageLimit);
        if (storage[index].length === 1 && storage[index][0][0] === key) {
            delete storage[index];
        } else {
            for (var i = 0; i < storage[index]; i++) {
                if (storage[index][i][0] === key) {
                    delete storage[index][i];
                }
            }
        }
    }

    this.lookup = function (key) {
        var index = hash(key, storageLimit);
        if (storage[index] === undefined) {
            return undefined;
        } else {
            for (var i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    return storage[index][i][1];
                }
            }
        }
    }
}
```

## 树(Tree)

Tree 的数据结构和自然界中的树极其相似，有根、树枝、叶子，如上图所示。Tree 是一种多层数据结构，与 Array、Stack、Queue 相比是一种非线性的数据结构，在进行插入和搜索操作时很高效。在描述一个 Tree 时经常会用到下列概念：

1.Root（根）：代表树的根节点，根节点没有父节点
2.Parent Node（父节点）：一个节点的直接上级节点，只有一个
3.Child Node（子节点）：一个节点的直接下级节点，可能有多个
4.Siblings（兄弟节点）：具有相同父节点的节点
5.Leaf（叶节点）：没有子节点的节点
6.Edge（边）：两个节点之间的连接线
7.Path（路径）：从源节点到目标节点的连续边
8.Height of Node（节点的高度）：表示节点与叶节点之间的最长路径上边的个数
9.Height of Tree（树的高度）：即根节点的高度
10.Depth of Node（节点的深度）：表示从根节点到该节点的边的个数
11.Degree of Node（节点的度）：表示子节点的个数

以二叉查找树为例，展示树在 Javascript 中的实现。在二叉查找树中，即每个节点最多只有两个子节点，而左侧子节点小于当前节点，而右侧子节点大于当前节点

一个二叉查找树应该具有以下常用方法：

1.add：向树中插入一个节点
2.findMin：查找树中最小的节点
3.findMax：查找树中最大的节点
4.find：查找树中的某个节点
5.isPresent：判断某个节点在树中是否存在
6.remove：移除树中的某个节点

代码实现如下：

```
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor() {
    this.root = null;
}

add(data) {
    const node = this.root;
    if (node === null) {
        this.root = new Node(data);
        return;
    } else {
        const searchTree = function (node) {
            if (data < node.data) {
                if (node.left === null) {
                    node.left = new Node(data);
                    return;
                } else if (node.left !== null) {
                    return searchTree(node.left);
                }
            } else if (data > node.data) {
                if (node.right === null) {
                    node.right = new Node(data);
                    return;
                } else if (node.right !== null) {
                    return searchTree(node.right);
                }
            } else {
                return null;
            }
        };
        return searchTree(node);
    }
}

findMin() {
    let current = this.root;
    while (current.left !== null) {
        current = current.left;
    }
    return current.data;
}

findMax() {
    let current = this.root;
    while (current.right !== null) {
        current = current.right;
    }
    return current.data;
}

find(data) {
    let current = this.root;
    while (current.data !== data) {
        if (data < current.data) {
            current = current.left
        } else {
            current = current.right;
        }
        if (current === null) {
            return null;
        }
    }
    return current;
}

isPresent(data) {
    let current = this.root;
    while (current) {
        if (data === current.data) {
            return true;
        }
        if (data < current.data) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    return false;
}

remove(data) {
    const removeNode = function (node, data) {
        if (node == null) {
            return null;
        }
        if (data == node.data) {
            // node 没有子节点
            if (node.left == null && node.right == null) {
                return null;
            }
            // node 没有左侧子节点
            if (node.left == null) {
                return node.right;
            }
            // node 没有右侧子节点
            if (node.right == null) {
                return node.left;
            }
            // node 有两个子节点
            var tempNode = node.right;
            while (tempNode.left !== null) {
                tempNode = tempNode.left;
            }
            node.data = tempNode.data;
            node.right = removeNode(node.right, tempNode.data);
            return node;
        } else if (data < node.data) {
            node.left = removeNode(node.left, data);
            return node;
        } else {
            node.right = removeNode(node.right, data);
            return node;
        }
    }
    this.root = removeNode(this.root, data);
    }
}
```

## 图(Graph)

Graph 是节点（或顶点）以及它们之间的连接（或边）的集合。Graph 也可以称为 Network（网络）。根据节点之间的连接是否有方向又可以分为 Directed Graph（有向图）和 Undrected Graph（无向图）。Graph 在实际生活中有很多用途.

在 Javascript 中，Graph 可以用一个矩阵（二维数组）表示，广度优先搜索算法可以实现如下：

```
function bfs(graph, root) {
    var nodesLen = {};

    for (var i = 0; i < graph.length; i++) {
        nodesLen[i] = Infinity;
    }

    nodesLen[root] = 0;

    var queue = [root];
    var current;

    while (queue.length != 0) {
        current = queue.shift();

        var curConnected = graph[current];
        var neighborIdx = [];
        var idx = curConnected.indexOf(1);
        while (idx != -1) {
            neighborIdx.push(idx);
            idx = curConnected.indexOf(1, idx + 1);
        }

        for (var j = 0; j < neighborIdx.length; j++) {
            if (nodesLen[neighborIdx[j]] == Infinity) {
                nodesLen[neighborIdx[j]] = nodesLen[current] + 1;
                queue.push(neighborIdx[j]);
            }
        }

    }
    return nodesLen;
}
```
