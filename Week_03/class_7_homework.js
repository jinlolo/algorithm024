// 二叉树的最近公共祖先 https://leetcode-cn.com/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    let ans;
    const dfs = (root, p, q) => {
        if (root === null) return false;
        const lson = dfs(root.left, p, q);
        const rson = dfs(root.right, p, q);
        if ((lson && rson) || ((root.val === p.val || root.val === q.val) && (lson || rson))) {
            ans = root;
        }
        return lson || rson || (root.val === p.val || root.val === q.val);
    }
    dfs(root, p, q);
    return ans;
};
// console.log('二叉树的最近公共祖先', lowestCommonAncestor([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 1))


// 从前序与中序遍历序列构造二叉树 https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    let pre = 0, i = 0;
    let build = function (stop) {
        if (inorder[i] != stop) {
            var root = new TreeNode(preorder[pre++])
            root.left = build(root.val)
            i++
            root.right = build(stop)
            return root
        }
        return null
    }
    return build()
};
// console.log('从前序与中序遍历序列构造二叉树', buildTree([4, 2, 3], [5, 1, 8]))


// 组合 https://leetcode-cn.com/problems/combinations/submissions/
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    const result = [];

    const helper = (n, k, path) => {
        if (n < k || k === 0) {
            if (k === 0) {
                result.push(path.slice())
            }
            return;
        }
        helper(n - 1, k - 1, path.concat(n));
        helper(n - 1, k, path);
    }

    helper(n, k, [])
    return result;
};
console.log('组合', combine(5, 2))


// 全排列 https://leetcode-cn.com/problems/permutations/submissions/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const result = [],
        hash = {};

    function dfs(path) {
        if (path.length === nums.length) {
            result.push(path.slice());
            return;
        }

        for (const num of nums) {
            if (hash[num]) continue;
            path.push(num)
            hash[num] = true;
            dfs(path);
            path.pop();
            hash[num] = false;
        }
    }

    dfs([]);
    return result
};
console.log('全排列', permute([1, 2, 3]))


// 全排列II https://leetcode-cn.com/problems/permutations-ii/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    const len = nums.length;
    nums = nums.sort((a, b) => a - b);

    let result = [],
        tmpPath = [],
        hash = {};

    let backtrack = path => {
        if (path.length === len) {
            result.push(path);
            return;
        }

        for (let i = 0; i < len; i++) {
            if (hash[i] || (i > 0 && !hash[i - 1] && (nums[i - 1] === nums[i]))) continue;
            hash[i] = true;
            path.push(nums[i]);
            backtrack(path.slice());
            hash[i] = false;
            path.pop();
        }
    }

    backtrack(tmpPath);
    return result;
};
console.log('全排列II', permuteUnique([1, 1, 2]))