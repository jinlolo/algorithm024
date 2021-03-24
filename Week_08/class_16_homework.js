// 位1的个数 https://leetcode-cn.com/problems/number-of-1-bits/
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
    let ret = 0;
    for (let i = 0; i < 32; i++) {
        if ((n & (1 << i)) !== 0) {
            ret++;
        }
    }
    return ret;
};

// 2 的幂 https://leetcode-cn.com/problems/power-of-two/
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
    return n > 0 && (n & (n - 1)) == 0;
};

// 颠倒二进制位 https://leetcode-cn.com/problems/reverse-bits/
/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
    let res = 0
    for (let i = 0; i < 32; i++) {
        res = (res << 1) + (n & 1); // 取末尾
        n >>= 1;
    }
    return res >>> 0  // 无符号右移 
};

// 实现 Trie (前缀树) https://leetcode-cn.com/problems/implement-trie-prefix-tree/
/**
 * Initialize your data structure here.
 */
var Trie = function () {
    this.h = {};
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    let h = this.h;
    for (const w of word) {
        !h[w] && (h[w] = {}), h = h[w]
    }
    h.isEnd = 1
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    return (h = this.s(word)) && h.isEnd !== undefined
};

Trie.prototype.s = function (word) {
    let h = this.h
    for (const w of word) {
        if (!h[w]) return false
        h = h[w]
    }
    return h
}

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
    return this.s(prefix) !== false
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

// 省份数量 https://leetcode-cn.com/problems/number-of-provinces/
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
    let res = 0, i = -1, n = isConnected.length, visited = new Uint8Array(n),
        q = new Uint8Array(n ** 2), p1 = p2 = 0
    while (++i < n)
        if (visited[i] === 0) {
            res++
            q[p1++] = i
            while (p2 < p1 && p2 < q.length) {
                const k = q[p2++]
                visited[k] = 1
                for (let j = 0; j < isConnected[k].length; j++)
                    if (isConnected[k][j] && visited[j] === 0) q[p1++] = j
            }
        }
    return res
};

// 岛屿数量 https://leetcode-cn.com/problems/number-of-islands/
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let m = grid.length;
    if (m == 0) {
        return 0;
    }
    let n = grid[0].length;
    let count = 0;
    let parent = [];
    let rank = [];


    let find = (p) => {
        while (p != parent[p]) {
            parent[p] = parent[parent[p]];
            p = parent[p];
        }
        return p;
    }
    let union = (p, q) => {
        let rootP = find(p);
        let rootQ = find(q);
        if (rootP == rootQ) {
            return;
        }
        if (rank[rootP] > rank[rootQ]) {
            parent[rootQ] = rootP;
        } else if (rank[rootP] < rank[rootQ]) {
            parent[rootP] = rootQ;
        } else {
            parent[rootP] = rootQ;
            rank[rootQ]++;
        }
        count--;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] == 1) {
                parent[i * n + j] = i * n + j;
                count++;
            }
            rank[i * n + j] = 0;
        }
    }

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (grid[i][j] == 1) {
                grid[i][j] = 0;
                i - 1 >= 0 && grid[i - 1][j] == 1 && union(i * n + j, (i - 1) * n + j);
                j - 1 >= 0 && grid[i][j - 1] == 1 && union(i * n + j, i * n + j - 1);
                i + 1 < m && grid[i + 1][j] == 1 && union(i * n + j, (i + 1) * n + j);
                j + 1 < n && grid[i][j + 1] == 1 && union(i * n + j, i * n + j + 1);
            }
        }
    }
    return count;
};

// 被围绕的区域 https://leetcode-cn.com/problems/surrounded-regions/
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = (board) => {
    const m = board.length;
    if (m == 0) return;
    const n = board[0].length;
    const dfs = (i, j) => {
        if (i < 0 || i == m || j < 0 || j == n) return;
        if (board[i][j] == 'O') {
            board[i][j] = 'NO';
            dfs(i + 1, j);
            dfs(i - 1, j);
            dfs(i, j + 1);
            dfs(i, j - 1);
        }
    };
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
                if (board[i][j] == 'O') dfs(i, j);
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'NO') board[i][j] = 'O';
            else if (board[i][j] === 'O') board[i][j] = 'X';
        }
    }
};

// 单词搜索 II https://leetcode-cn.com/problems/word-search-ii/
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
    // 构建字典树
    class TrieNode {
        constructor() {
            this.END = false;
            this.children = new Array(26);
        }
        containsKey(letter) {
            return this.children[letter.charCodeAt() - 97] != undefined;
        }
        put(letter, newTrieNode) {
            this.children[letter.charCodeAt() - 97] = newTrieNode;
        }
        getNext(letter) {
            return this.children[letter.charCodeAt() - 97];
        }
        setEnd() {
            this.END = true;
        }
        isEnd() {
            return this.END;
        }
    }
    let root = null;
    let Trie = function () {
        root = new TrieNode();
    }
    Trie.prototype.insert = (word) => {
        let currNode = root;
        for (let i = 0; i < word.length; i++) {
            if (!currNode.containsKey(word[i])) {
                currNode.put(word[i], new TrieNode());
            }
            currNode = currNode.getNext(word[i]);
        }
        currNode.setEnd();
    }
    let searchPrefix = (word) => {
        let currNode = root;
        for (let i = 0; i < word.length; i++) {
            if (currNode.containsKey(word[i])) {
                currNode = currNode.getNext(word[i]);
            } else {
                return null;
            }
        }
        return currNode;
    }
    Trie.prototype.search = (word) => {
        let currNode = searchPrefix(word);
        return currNode != null && currNode.isEnd();
    }
    Trie.prototype.startsWith = (prefix) => {
        let currNode = searchPrefix(prefix);
        return currNode != null;
    }
    // 初始化变量
    let m = board.length;
    let n = board[0].length;
    // 初始化字典树
    let wordsTrie = new Trie();
    for (let i = 0; i < words.length; i++) {
        wordsTrie.insert(words[i]);
    }
    // 搜索方向向量
    let dx = [-1, 1, 0, 0];
    let dy = [0, 0, -1, 1];
    // DFS 搜索
    let boardDFS = (i, j, curStr) => {
        let restore = board[i][j];
        curStr += restore;
        // 字典树中找到了
        if (wordsTrie.search(curStr) && result.indexOf(curStr) == -1) {
            result.push(curStr);
        }
        // 减枝 - 拼接字符判断是否存在于字典树中，如果前缀都不是，直接false
        if (!wordsTrie.startsWith(curStr)) {
            return;
        }
        // 前进
        board[i][j] = '#';
        for (let r = 0; r < 4; r++) {
            let tmp_i = dx[r] + i;
            let tmp_j = dy[r] + j;
            // 边界情况处理
            if (tmp_i >= 0 && tmp_i < m && tmp_j >= 0 && tmp_j < n && board[tmp_i][tmp_j] != '#') {
                boardDFS(tmp_i, tmp_j, curStr);
            }
        }
        // 还原(回溯)
        board[i][j] = restore;
    }
    // 寻找结果
    let result = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            boardDFS(i, j, '');
        }
    }
    return result;
};

// N 皇后 https://leetcode-cn.com/problems/n-queens/
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = (n) => {
    const board = new Array(n);
    for (let i = 0; i < n; i++) {     // 棋盘的初始化
        board[i] = new Array(n).fill('.');
    }
    const res = [];
    const isValid = (row, col) => {
        for (let i = 0; i < row; i++) { // 之前的行
            for (let j = 0; j < n; j++) { // 所有的列
                if (board[i][j] == 'Q' &&   // 发现了皇后，并且和自己同列/对角线
                    (j == col || i + j === row + col || i - j === row - col)) {
                    return false;             // 不是合法的选择
                }
            }
        }
        return true;
    };
    const helper = (row) => {   // 放置当前行的皇后
        if (row == n) {           // 递归的出口，超出了最后一行
            const stringsBoard = board.slice(); // 拷贝一份board
            for (let i = 0; i < n; i++) {
                stringsBoard[i] = stringsBoard[i].join(''); // 将每一行拼成字符串
            }
            res.push(stringsBoard); // 推入res数组
            return;
        }
        for (let col = 0; col < n; col++) { // 枚举出所有选择
            if (isValid(row, col)) {          // 剪掉无效的选择
                board[row][col] = "Q";          // 作出选择，放置皇后
                helper(row + 1);                // 继续选择，往下递归
                board[row][col] = '.';          // 撤销当前选择
            }
        }
    };
    helper(0);  // 从第0行开始放置
    return res;
};

// N 皇后 II https://leetcode-cn.com/problems/n-queens-ii/
/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
    let count = 0

    const dfs = (x, y, arr) => {
        for (let [x0, y0] of arr) {
            if (y === y0 || Math.abs(x - x0) === Math.abs(y - y0)) {
                return
            }
        }
        if (x === n - 1) {
            count++
            return
        }
        for (let i = 0; i < n; i++) {
            arr.push([x, y])
            dfs(x + 1, i, arr)
            arr.pop()
        }
    }
    for (let i = 0; i < n; i++) {
        dfs(0, i, [])
    }
    return count
};