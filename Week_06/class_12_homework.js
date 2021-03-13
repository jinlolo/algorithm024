// 最小路径和 https://leetcode-cn.com/problems/minimum-path-sum/
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    let row = grid.length,
        col = grid[0].length;

    // calc boundary
    for (let i = 1; i < row; i++)
        // calc first col
        grid[i][0] += grid[i - 1][0]

    for (let j = 1; j < col; j++)
        // calc first row
        grid[0][j] += grid[0][j - 1]

    for (let i = 1; i < row; i++)
        for (let j = 1; j < col; j++)
            grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1])

    return grid[row - 1][col - 1]
};

// 解码方法 https://leetcode-cn.com/problems/decode-ways/
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
    if (s[0] === '0') return 0

    const len = s.length, dp = [1, 1, ...new Array(len - 1).fill(0)]

    for (let i = 2; i <= len; i++) {
        let lastOne = s.slice(i - 1, i), lastTwo = s.slice(i - 2, i)

        if (lastOne > 0 && lastOne < 10) dp[i] += dp[i - 1]

        if (lastTwo >= 10 && lastTwo <= 26) dp[i] += dp[i - 2]
    }

    return dp[len]
};

// 最大正方形 https://leetcode-cn.com/problems/maximal-square/
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
    let maxSize = 0;
    let dp = new Array(matrix.length);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(matrix[i].length).fill(0);
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === '1') {
                if (i == 0 || j === 0) dp[i][j] = 1;
                else
                    dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
                maxSize = Math.max(maxSize, dp[i][j]);
            }
        }
    }
    return maxSize ** 2;
};

// 任务调度器 https://leetcode-cn.com/problems/task-scheduler/
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
    if (n === 0) return tasks.length

    var i = -1,
        maxCount = 0,
        h = new Uint16Array(26);

    while (++i < tasks.length) h[t = tasks[i].charCodeAt() - 65]++
    h.sort((a, b) => b - a)
    while (h[maxCount + 1] === h[maxCount++]) { }
    return Math.max((h[0] - 1) * (n + 1) + maxCount, i)
};

// 回文子串 https://leetcode-cn.com/problems/palindromic-substrings/
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    const n = s.length;
    let ans = 0;
    for (let i = 0; i < 2 * n - 1; ++i) {
        let l = i / 2, r = i / 2 + i % 2;
        while (l >= 0 && r < n && s.charAt(l) == s.charAt(r)) {
            --l;
            ++r;
            ++ans;
        }
    }
    return ans;
};

// 最长有效括号 https://leetcode-cn.com/problems/longest-valid-parentheses/
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    let maxLen = 0;
    const stack = [];
    stack.push(-1);
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c == '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length) {
                const curMaxLen = i - stack[stack.length - 1];
                maxLen = Math.max(maxLen, curMaxLen);
            } else {
                stack.push(i);
            }
        }
    }
    return maxLen;
};

// 编辑距离 https://leetcode-cn.com/problems/edit-distance/
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
let minDistance = (word1, word2) => {
    let n = word1.length, m = word2.length
    let dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0))
    for (let i = 0; i <= n; i++) {
        dp[i][0] = i
    }
    for (let j = 0; j <= m; j++) {
        dp[0][j] = j
    }

    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= m; j++) {
            if (i * j) {
                dp[i][j] = word1[i - 1] == word2[j - 1] ? dp[i - 1][j - 1] : (Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1)
            } else {
                dp[i][j] = i + j
            }
        }
    }
    return dp[n][m]
};

// 矩形区域不超过 K 的最大数值和 https://leetcode-cn.com/problems/max-sum-of-rectangle-no-larger-than-k/
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var maxSumSubmatrix = function (matrix, k) {
    const row = matrix.length;
    if (!row) return 0;
    const col = matrix[0].length;
    if (!col) return 0;

    let max = -Infinity;
    for (let l = 0; l < col; l++) {
        const list = new Array(row).fill(0);
        for (let r = l; r < col; r++) {
            for (let k = 0; k < row; k++) list[k] += matrix[k][r];
            const m = maxSubarraySumNoMoreThanK(list, k);
            max = Math.max(max, m);
        }
    }

    function maxSubarraySumNoMoreThanK(list, k) {
        let max = -Infinity;
        const preSum = [0];
        let accu = 0;
        for (let i = 0; i < list.length; i++) {
            accu += list[i];
            const index = findLowerBound(preSum, accu - k);
            const sum = accu - preSum[index];
            if (sum <= k) max = Math.max(max, sum);
            insert(preSum, accu);
        }
        return max;
    }

    function insert(nums, target) {
        if (target >= nums[nums.length - 1]) {
            nums.push(target);
            return;
        }
        const index = findLowerBound(nums, target);
        nums.splice(index, 0, target);
    }

    function findLowerBound(nums, target) {
        let l = 0;
        let r = nums.length - 1;
        while (l < r) {
            const mid = l + r >>> 1;
            if (nums[mid] >= target) r = mid;
            else l = mid + 1;
        }
        return l;
    }

    if (max === -Infinity) return 0;
    return max;
};

// 青蛙过河 https://leetcode-cn.com/problems/frog-jump/
/**
 * @param {number[]} stones
 * @return {boolean}
 */
var canCross = function (stones) {
    let len = stones.length;
    let no_way = {};
    return jump(0, 0);

    function jump(curr, jumpLength) {
        if (curr == len - 1) return true;
        if (no_way[curr + ":" + jumpLength]) return false;

        for (let i = curr + 1; i < len; i++) {
            let length = stones[i] - stones[curr];
            if (length > jumpLength + 1) break;
            else if (length < jumpLength - 1) continue;
            else if (jump(i, length)) return true;
        }
        no_way[curr + ":" + jumpLength] = true;
        return false;
    }
};

// 分割数组的最大值 https://leetcode-cn.com/problems/split-array-largest-sum/
/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function (nums, m) {
    let left = 0, right = 0;
    let len = nums.length;
    for (let i = 0; i < len; i++) {
        right += nums[i];
        if (left < nums[i]) {
            left = nums[i]
        }
    }
    function check(mid, m) {
        let sum = 0;
        let cnt = 1;
        for (let i = 0; i < len; i++) {
            if (sum + nums[i] > mid) {
                cnt++;
                sum = nums[i]
            } else {
                sum += nums[i]
            }
        }
        return cnt <= m;
    }
    while (left < right) {
        let mid = Math.floor((left + right) / 2)
        if (check(mid, m)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left
};

// 学生出勤记录 II https://leetcode-cn.com/problems/student-attendance-record-ii/
/**
 * @param {number} n
 * @return {number}
 */
var checkRecord = function (n) {
    let P = 1, // 不含A以P结尾的数量
        L = 1, // 不含A以L结尾不以LL结尾的数量 
        LL = 0, // 不含A以LL结尾的数量 
        A = 1, // 含有A并且以A结尾的数量 
        AP = 0, // 含有A并且以P结尾的数量 
        AL = 0, // 含有A并且以L结尾不以LL结尾的数量 
        ALL = 0;// 含有A并且以LL结尾的数量 
    for (let i = 1; i < n; ++i) {
        [P, L, LL, A, AP, AL, ALL] = [
            (P + L + LL) % 1000000007,
            P,
            L,
            (P + L + LL) % 1000000007,
            (A + AP + AL + ALL) % 1000000007,
            (A + AP) % 1000000007,
            AL
        ]
    }
    return (P + L + LL + A + AP + AL + ALL) % 1000000007
};

// 最小覆盖子串 https://leetcode-cn.com/problems/minimum-window-substring/
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = (s, t) => {
    let minLen = s.length + 1;
    let start = s.length;     // 结果子串的起始位置
    let map = {};             // 存储目标字符和对应的缺失个数
    let missingType = 0;      // 当前缺失的字符种类数
    for (const c of t) {      // t为baac的话，map为{a:2,b:1,c:1}
        if (!map[c]) {
            missingType++;        // 需要找齐的种类数 +1
            map[c] = 1;
        } else {
            map[c]++;
        }
    }
    let l = 0, r = 0;                // 左右指针
    for (; r < s.length; r++) {      // 主旋律扩张窗口，超出s串就结束
        let rightChar = s[r];          // 获取right指向的新字符
        if (map[rightChar] !== undefined) map[rightChar]--; // 是目标字符，它的缺失个数-1
        if (map[rightChar] == 0) missingType--;   // 它的缺失个数新变为0，缺失的种类数就-1
        while (missingType == 0) {                // 当前窗口包含所有字符的前提下，尽量收缩窗口
            if (r - l + 1 < minLen) {    // 窗口宽度如果比minLen小，就更新minLen
                minLen = r - l + 1;
                start = l;                 // 更新最小窗口的起点
            }
            let leftChar = s[l];          // 左指针要右移，左指针指向的字符要被丢弃
            if (map[leftChar] !== undefined) map[leftChar]++; // 被舍弃的是目标字符，缺失个数+1
            if (map[leftChar] > 0) missingType++;      // 如果缺失个数新变为>0，缺失的种类+1
            l++;                          // 左指针要右移 收缩窗口
        }
    }
    if (start == s.length) return "";
    return s.substring(start, start + minLen); // 根据起点和minLen截取子串
};

// 戳气球 https://leetcode-cn.com/problems/burst-balloons/
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
    let n = nums.length;
    // 添加两侧的虚拟气球
    let points = [1, ...nums, 1];
    let dp = Array.from(Array(n + 2), () => Array(n + 2).fill(0));
    // 最后一行开始遍历,从下往上
    for (let i = n; i >= 0; i--) {
        // 从左往右
        for (let j = i + 1; j < n + 2; j++) {
            for (let k = i + 1; k < j; k++) {
                dp[i][j] = Math.max(
                    dp[i][j],
                    points[j] * points[k] * points[i] + dp[i][k] + dp[k][j]
                );
            }
        }
    }
    return dp[0][n + 1];
};