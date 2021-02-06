// 二叉树的中序遍历
var inorderTraversal = function (root) {
    const res = [];
    const inorder = (root) => {
        if (root == null) {
            return;
        }
        inorder(root.left);
        res.push(root.val);
        inorder(root.right);
    };
    inorder(root);
    return res;
};
console.log('二叉树的中序遍历', inorderTraversal([1, null, 2, 3]))


// 二叉树的前序遍历
var preorderTraversal = function (root) {
    let result = []
    var preOrderTraverseNode = (node) => {
        if (node) {
            result.push(node.val)
            preOrderTraverseNode(node.left)
            preOrderTraverseNode(node.right)
        }
    }
    preOrderTraverseNode(root)
    return result
};
console.log('二叉树的前序遍历', preorderTraversal([1, null, 2, 3]))


// N叉树的后序遍历
var postorder = function (root) {
    if (!root) return []
    function houxu(root, res) {
        if (!root) {
            return []
        }
        if (root.children) {
            root.children.map(child => houxu(child, res))
        }
        res.push(root.val)
        return res
    }
    return houxu(root, [])
};
console.log('N叉树的后序遍历', postorder([1, null, 3, 2, 4, null, 5, 6]))


// N叉树的前序遍历
var preorder = function (root) {
    let result = []
    var dfs = function (node) {
        if (node === null) {
            return
        }
        result.push(node.val)
        for (let i = 0; i < node.children.length; i++) {
            dfs(node.children[i])
        }
        return
    }
    dfs(root)
    return result
};
console.log('N叉树的前序遍历', preorder([1, null, 3, 2, 4, null, 5, 6]))


// N叉树的层序遍历
var levelOrder = function (root) {
    if (!root) return []

    let ans = []
    const dfs = (r = root, d = 0) => {
        if (d >= ans.length) ans.push([r.val])
        else ans[d].push(r.val)
        for (const child of r.children)
            dfs(child, d + 1)
    };
    dfs()
    return ans
}
console.log('N叉树的层序遍历', levelOrder([1, null, 3, 2, 4, null, 5, 6]))


// 丑数
var nthUglyNumber = function (n) {
    const res = new Array(n);
    res[0] = 1;

    let ptr2 = 0, // 下个数字永远 * 2
        ptr3 = 0, // 下个数字永远 * 3
        ptr5 = 0; // 下个数字永远 * 5

    for (let i = 1; i < n; ++i) {
        res[i] = Math.min(res[ptr2] * 2, res[ptr3] * 3, res[ptr5] * 5);
        if (res[i] === res[ptr2] * 2) {
            ++ptr2;
        }
        if (res[i] === res[ptr3] * 3) {
            ++ptr3;
        }
        if (res[i] === res[ptr5] * 5) {
            ++ptr5;
        }
    }

    return res[n - 1];
}
console.log('丑数', nthUglyNumber(10))


// 前K个高频元素
var topKFrequent = function (nums, k) {
    let map = new Map(), arr = [...new Set(nums)]
    nums.map((num) => {
        if (map.has(num)) map.set(num, map.get(num) + 1)
        else map.set(num, 1)
    })

    return arr.sort((a, b) => map.get(b) - map.get(a)).slice(0, k);
};
console.log('前K个高频元素', topKFrequent([1, 1, 1, 2, 2, 3], 2))