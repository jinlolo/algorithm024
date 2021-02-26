// 柠檬水找零 https://leetcode-cn.com/problems/lemonade-change/
var lemonadeChange = function (bills) {
    let n5 = 0,
        n10 = 0;

    for (const bill of bills) {
        if (bill === 5) {
            n5++;
        } else if (bill === 10) {
            if (n5 === 0) {
                return false;
            }
            n5--;
            n10++;
        } else {
            if (n5 > 0 && n10 > 0) {
                n5--;
                n10--;
            } else if (n5 >= 3) {
                n5 -= 3;
            } else {
                return false;
            }
        }
    }
    return true
};



// 买卖股票的最佳时机II https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
var maxProfit = function (prices) {
    const n = prices.length;
    const dp = new Array(n).fill(0).map(v => new Array(2).fill(0));
    dp[0][0] = 0, dp[0][1] = -prices[0];
    for (let i = 1; i < n; ++i) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    }
    return dp[n - 1][0];
}



// 分发饼干 https://leetcode-cn.com/problems/assign-cookies/
var findContentChildren = function (g, s) {
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);
    const numOfChildren = g.length, numOfCookies = s.length;
    let count = 0;
    for (let i = 0, j = 0; i < numOfChildren && j < numOfCookies; i++, j++) {
        while (j < numOfCookies && g[i] > s[j]) {
            j++;
        }
        if (j < numOfCookies) {
            count++;
        }
    }
    return count;
};




// 模拟行走机器人 https://leetcode-cn.com/problems/walking-robot-simulation/
var robotSim = function (commands, obstacles) {
    var dx = [0, 1, 0, -1];
    var dy = [1, 0, -1, 0];
    var di = 0;
    var endX = 0;
    var endY = 0;
    var result = 0;
    var hashObstacle = {};
    for (var r = 0; r < obstacles.length; r++) {
        hashObstacle[obstacles[r][0] + '-' + obstacles[r][1]] = true;
    }
    for (var s = 0; s < commands.length; s++) {
        if (commands[s] == -2) {
            di = (di + 3) % 4;
        } else if (commands[s] == -1) {
            di = (di + 1) % 4;
        } else {
            // 每次走一步
            for (var z = 1; z <= commands[s]; z++) {
                var nextX = endX + dx[di];
                var nextY = endY + dy[di];
                // 判断下一步是否为障碍物
                if (hashObstacle[nextX + '-' + nextY]) {
                    break;
                }
                endX = nextX;
                endY = nextY;
                result = Math.max(result, endX * endX + endY * endY);
            }
        }
    }
    return result;
};



// 单词接龙 https://leetcode-cn.com/problems/word-ladder/
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



// 岛屿数量 https://leetcode-cn.com/problems/number-of-islands/
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



// 扫雷游戏 https://leetcode-cn.com/problems/minesweeper/
var updateBoard = (board, click) => {
    const m = board.length;
    const n = board[0].length;
    const dx = [1, 1, 1, -1, -1, -1, 0, 0];
    const dy = [1, 0, -1, 0, 1, -1, 1, -1];
    const inBound = (x, y) => x >= 0 && x < m && y >= 0 && y < n; // 辅助函数

    const update = (x, y) => {
        if (!inBound(x, y) || board[x][y] != 'E') return; // 不在界内或不是E，直接返回
        let count = 0;
        for (let i = 0; i < 8; i++) { // 统计周围雷的个数
            const nX = x + dx[i];
            const nY = y + dy[i];
            if (inBound(nX, nY) && board[nX][nY] == 'M') {
                count++;
            }
        }
        if (count == 0) { // 如果周围没有雷，标记B，递归周围的点
            board[x][y] = 'B';
            for (let i = 0; i < 8; i++) {
                update(x + dx[i], y + dy[i]);
            }
        } else {
            board[x][y] = count + '';
        }
    };

    const [cX, cY] = click;
    if (board[cX][cY] == 'M') { // 第一下就踩雷了
        board[cX][cY] = 'X';
    } else {
        update(cX, cY); // 开启dfs
    }
    return board;
}



// 跳跃游戏 https://leetcode-cn.com/problems/jump-game/
var canJump = function (nums) {
    for (var i = 0, max = 0; i < nums.length; i++)
        if (i <= max) max = Math.max(max, i + nums[i])
        else return false
    return true
}



// 搜索旋转排序数组 https://leetcode-cn.com/problems/search-in-rotated-sorted-array/
var search = function (nums, target) {
    let start = 0;
    let end = nums.length - 1;

    while (start <= end) {
        const mid = start + ((end - start) >> 1);
        if (nums[mid] === target) return mid;

        if (nums[mid] >= nums[start]) {
            if (target >= nums[start] && target <= nums[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        } else {
            if (target >= nums[mid] && target <= nums[end]) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    }

    return -1;
}



// 搜索二维矩阵 https://leetcode-cn.com/problems/search-a-2d-matrix/
var searchMatrix = function (matrix, target) {
    if (!matrix || !matrix.length) return false;

    const rows = matrix.length;
    const cols = matrix[0].length;
    let l = 0,
        r = rows * cols - 1,
        mid = 0;

    while (l <= r) {
        mid = ((l + r) / 2) << 0;
        const [x, y] = getCoordFromPos(mid);
        const num = matrix[x][y];
        if (num < target) l = mid + 1;
        else if (num > target) r = mid - 1;
        else return true;
    }

    return false;

    function getCoordFromPos(pos) {
        const x = (pos / cols) << 0;
        const y = pos % cols;
        return [x, y];
    }
};




// 寻找旋转排序数组中的最小值 https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/
var findMin = function (nums) {
    var left = 0;
    var right = nums.length - 1;
    while (left < right) {
        var mid = (left + right) >> 1;
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
};

// 单词接龙II https://leetcode-cn.com/problems/word-ladder-ii/
var findLadders = function (beginWord, endWord, wordList) {
    if (wordList.indexOf(endWord) < 0) return [];
    if (wordList.indexOf(beginWord) == -1) wordList.push(beginWord);

    let allCombDict = new Map();
    let wordLevel = new Map();
    let wordConnection = new Map();
    let L = beginWord.length;
    //建图
    for (let word of wordList) {
        for (let i = 0; i < L; ++i) {
            let key = word.slice(0, i) + "*" + word.slice(i + 1);
            if (allCombDict.has(key)) allCombDict.get(key).push(word);
            else allCombDict.set(key, [word]);
        }
    }
    let queue = [beginWord];
    let wordUsed = new Set();
    let step = 1;
    let flag = 1;
    //帮助我们判断是否能从beginWord到endWord，如果可以则转为0，这可以帮助我们提前结束循环，并且如果不能到达endWord,则不需要再进行DFS 直接返回[];
    //BFS
    while (queue.length && flag) {
        let len = queue.length;
        for (let t = 0; t < len; ++t) {
            let word = queue.shift();
            if (!wordUsed.has(word)) {
                wordUsed.add(word);
                wordLevel.set(word, step);
                if (word == endWord) flag = 0;
                for (let i = 0; i < L; ++i) {
                    let key = word.slice(0, i) + "*" + word.slice(i + 1);
                    if (allCombDict.has(key)) {
                        let connected = allCombDict.get(key).filter((d) => d != word);//这里要去除自身，两个原因：1.connected里面要保存的是该节点的邻居节点，自身不属于；2.如果将自身这个节点加进去会产生重复；
                        if (wordConnection.has(word))
                            wordConnection.get(word).push(...connected);
                        else wordConnection.set(word, [...connected]);
                        queue.push(...connected);
                    }
                }
            }
        }
        step++;
    }
    if (flag) return [];
    let res = [];
    //DFS
    function dfs(list, word, connection, level) {
        let lev = level.get(word);
        if (lev == 1) {
            res.push([...list]);
            return;
        }
        for (let node of connection.get(word)) {
            if (level.get(node) == lev - 1) {
                list.unshift(node);
                dfs(list, node, connection, level);
                list.shift();
            }
        }
    }
    dfs([endWord], endWord, wordConnection, wordLevel);
    return res;
};



// 跳跃游戏II https://leetcode-cn.com/problems/jump-game-ii/
var jump = function (nums) {
    var steps = 0
    var end = 0
    var maxPos = 0
    for (var i = 0; i < nums.length - 1; ++i) {
        maxPos = Math.max(maxPos, nums[i] + i)
        if (i == end) {
            end = maxPos
            ++steps
        }
    }
    return steps
};