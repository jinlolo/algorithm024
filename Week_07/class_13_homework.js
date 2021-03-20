// 爬楼梯 https://leetcode-cn.com/problems/climbing-stairs/
/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = function (n) {
    if (n <= 0) return 0;
    if (n <= 2) return n;

    let arr = [1, 1]

    for (let i = 2; i <= n; i++) {
        arr.push(arr[i - 1] + arr[i - 2])
    }
    return arr[n]
};

// 括号生成 https://leetcode-cn.com/problems/generate-parentheses/
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    const res = [];

    const dfs = (lRemain, rRemain, str) => { // 左右括号所剩的数量，str是当前构建的字符串
        if (str.length == 2 * n) { // 字符串构建完成
            res.push(str);           // 加入解集
            return;                  // 结束当前递归分支
        }
        if (lRemain > 0) {         // 只要左括号有剩，就可以选它，然后继续做选择（递归）
            dfs(lRemain - 1, rRemain, str + "(");
        }
        if (lRemain < rRemain) {   // 右括号比左括号剩的多，才能选右括号
            dfs(lRemain, rRemain - 1, str + ")"); // 然后继续做选择（递归）
        }
    };

    dfs(n, n, ""); // 递归的入口，剩余数量都是n，初始字符串是空串
    return res;
};

// 有效的数独 https://leetcode-cn.com/problems/valid-sudoku/
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
    let box_val = new Array(9).fill(0).map(() => new Map())
    let row_val = new Array(9).fill(0).map(() => new Map())
    let col_val = new Array(9).fill(0).map(() => new Map())
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === '.') continue
            let num = board[i][j]
            let box_idx = Math.floor(i / 3) * 3 + Math.floor(j / 3)
            if (box_val[box_idx].has(board[i][j])) return false
            if (row_val[i].has(board[i][j])) return false
            if (col_val[j].has(board[i][j])) return false
            box_val[box_idx].set(board[i][j], 1)
            row_val[i].set(board[i][j], 1)
            col_val[j].set(board[i][j], 1)
        }
    }
    return true
};

// 单词接龙 https://leetcode-cn.com/problems/word-ladder/
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
    let wordListSet = new Set(wordList);
    if (!wordListSet.has(endWord)) {
        return 0;
    }
    let beginSet = new Set();
    beginSet.add(beginWord);
    let endSet = new Set();
    endSet.add(endWord)
    let level = 1;
    // BFS
    while (beginSet.size > 0) {
        let next_beginSet = new Set();
        for (let key of beginSet) {
            for (let i = 0; i < key.length; i++) {
                for (let j = 0; j < 26; j++) {
                    let s = String.fromCharCode(97 + j);
                    if (s != key[i]) {
                        let new_word = key.slice(0, i) + s + key.slice(i + 1);
                        if (endSet.has(new_word)) {
                            return level + 1;
                        }
                        if (wordListSet.has(new_word)) {
                            next_beginSet.add(new_word);
                            wordListSet.delete(new_word);
                        }
                    }
                }
            }
        }
        beginSet = next_beginSet;
        level++;
        if (beginSet.size > endSet.size) {
            let tmp = beginSet;
            beginSet = endSet;
            endSet = tmp;
        }
    }
    return 0;
}

// 最小基因变化 https://leetcode-cn.com/problems/minimum-genetic-mutation/
/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function (start, end, bank) {
    let bankSet = new Set(bank);
    if (!bankSet.has(end)) return -1;
    let queue = [[start, 0]];
    let dna = ["A", "C", "G", "T"];
    while (queue.length) {
        let [node, count] = queue.shift();
        if (node === end) return count;
        for (let i = 0; i < node.length; i++) {
            for (let j = 0; j < dna.length; j++) {
                let d = node.slice(0, i) + dna[j] + node.slice(i + 1);
                if (bankSet.has(d)) {
                    queue.push([d, count + 1]);
                    bankSet.delete(d);
                }
            }
        }
    }
    return -1;
};

// N皇后 https://leetcode-cn.com/problems/n-queens/submissions/
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

// 解数独 https://leetcode-cn.com/problems/sudoku-solver/
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = (board) => {
    const hasConflit = (r, c, val) => {  // 判断是否有行列和框框的冲突
        for (let i = 0; i < 9; i++) {
            if (board[i][c] == val || board[r][i] == val) { // 行或列里有冲突
                return true;
            }
        }
        const subRowStart = Math.floor(r / 3) * 3; // 对于小框，行有三种起始索引 0、3、6
        const subColStart = Math.floor(c / 3) * 3; // 对于小框，列有三种起始索引 0、3、6
        for (let i = 0; i < 3; i++) {              // 遍历所在的小框
            for (let j = 0; j < 3; j++) {
                if (val == board[subRowStart + i][subColStart + j]) { // 发现了重复数
                    return true;
                }
            }
        }
        return false; // 没有发生冲突
    };

    const fill = (i, j) => {
        if (j == 9) {              // 列越界，填完一行，填下一行
            i++;
            j = 0;
            if (i == 9) return true; // 都填完了，返回true
        }
        if (board[i][j] != ".") return fill(i, j + 1); // 不是空白格，递归填下一格

        for (let num = 1; num <= 9; num++) {           // 枚举出当前格的所有可填的选择
            if (hasConflit(i, j, String(num))) continue; // 如果存在冲突，跳过这个选择
            board[i][j] = String(num);                   // 作出一个选择
            if (fill(i, j + 1)) return true; // 如果基于它，填下一格，最后可以解出数独，直接返回true
            board[i][j] = ".";               // 如果基于它，填下一格，填1-9都不行，回溯，恢复为空白格
        }
        return false; // 尝试了1-9，每个都往下递归，都不能做完，返回false
    };

    fill(0, 0); // 从第一个格子开始填
    return board;
};