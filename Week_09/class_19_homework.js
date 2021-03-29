// 数组的相对排序 https://leetcode-cn.com/problems/relative-sort-array/
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
    return arr1.sort((a, b) => {
        let indexA = arr2.indexOf(a),
            indexB = arr2.indexOf(b)

        if (~indexA && ~indexB) {
            return indexA - indexB
        } else if (~indexA ^ ~indexB) {
            return indexB - indexA
        } else {
            return a - b
        }
    })
};

// 有效的字母异位词 https://leetcode-cn.com/problems/valid-anagram/
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    return s.length == t.length && [...s].sort().join('') === [...t].sort().join('')
};

// 翻转字符串里的单词 https://leetcode-cn.com/problems/reverse-words-in-a-string/
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    return s.trim().replace(/\s+/g, ' ').split(' ').reverse().join(' ')
};

// 同构字符串 https://leetcode-cn.com/problems/isomorphic-strings/
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
    for (let i = 0; i < s.length; i++)
        if (s.indexOf(s[i]) !== t.indexOf(t[i])) return false
    return true
};

// LRU 缓存机制 https://leetcode-cn.com/problems/lru-cache/
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.cache = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    if (this.cache.has(key)) {
        var val = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    } else {
        return -1;
    }

};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    if (this.cache.size < this.capacity && !this.cache.has(key)) {
        this.cache.set(key, value);
    } else if (this.cache.has(key)) {
        this.cache.delete(key);
        this.cache.set(key, value);
    } else if (this.cache.size = this.capacity) {
        this.cache.delete(this.cache.keys().next().value);
        this.cache.set(key, value);
    }
};

// 力扣排行榜 https://leetcode-cn.com/problems/design-a-leaderboard/
var Leaderboard = function () {
    this.board = {};
};

/** 
 * @param {number} playerId 
 * @param {number} score
 * @return {void}
 */
Leaderboard.prototype.addScore = function (playerId, score) {
    this.board[playerId] = (this.board[playerId] || 0) + score;
};

/** 
 * @param {number} K
 * @return {number}
 */
Leaderboard.prototype.top = function (K) {
    return Object.values(this.board).sort((a, b) => b - a).slice(0, K).reduce((acc, curr) => acc + curr);
};

/** 
 * @param {number} playerId
 * @return {void}
 */
Leaderboard.prototype.reset = function (playerId) {
    delete this.board[playerId]
};

// 合并区间 https://leetcode-cn.com/problems/merge-intervals/
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    let res = [];
    intervals.sort((a, b) => a[0] - b[0]);

    let prev = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        let cur = intervals[i];
        if (prev[1] >= cur[0]) { // 有重合
            prev[1] = Math.max(cur[1], prev[1]);
        } else {       // 不重合，prev推入res数组 
            res.push(prev);
            prev = cur;  // 更新 prev
        }
    }

    res.push(prev);
    return res;
};

// 最长递增子序列 https://leetcode-cn.com/problems/longest-increasing-subsequence/
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums, dp = [1]) {
    for (var i = 1; dp[i] = 1, i < nums.length; i++)
        for (var j = 0; j < i; j++)
            nums[i] > nums[j] && (dp[i] = Math.max(dp[i], dp[j] + 1))
    return nums.length < 2 ? nums.length : Math.max(...dp)
};

// 解码方法 https://leetcode-cn.com/problems/decode-ways/
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
    if (!s) return 0
    let len = s.length;
    let dp = Array(len + 1).fill(0);
    dp[0] = 1;
    dp[1] = s[0] === '0' ? 0 : 1;
    for (let i = 2; i <= len; i++) {
        if (s[i - 1] !== '0') {
            dp[i] += dp[i - 1];
        }
        if (s[i - 2] === '1' || (s[i - 2] === '2' && s[i - 1] >= 0 && s[i - 1] <= 6)) {
            dp[i] += dp[i - 2];
        }
    }
    return dp[len];
};

// 翻转对 https://leetcode-cn.com/problems/reverse-pairs/
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (nums) {
    let count = 0;
    let mergeArr = (left, right) => {
        let result = [];
        let left_i = 0;
        let right_j = 0;
        let tmpI = 0, tmpJ = 0;
        while (tmpI < left.length && tmpJ < right.length) {
            if (left[tmpI] / 2 > right[tmpJ]) {
                count += left.length - tmpI;
                tmpJ++;
            } else {
                tmpI++;
            }
        }
        while (left_i < left.length && right_j < right.length) {
            if (left[left_i] < right[right_j]) {
                result.push(left[left_i]);
                left_i++;
            } else {
                result.push(right[right_j]);
                right_j++;
            }
        }
        return [...result, ...left.slice(left_i), ...right.slice(right_j)];
    }
    let mergeSort = (arr) => {
        if (arr.length <= 1) {
            return arr;
        }
        let mid = arr.length >> 1;
        let left = arr.slice(0, mid);
        let right = arr.slice(mid);
        return mergeArr(mergeSort(left), mergeSort(right));
    }
    mergeSort(nums);
    return count;
};

// 最长有效括号 https://leetcode-cn.com/problems/longest-valid-parentheses/
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    const dp = Array(s.length).fill(0);

    for (let i = 1; i < s.length; i++) {
        if (s[i] === ')') {

            if (i - dp[i - 1] - 1 >= 0 && s[i - dp[i - 1] - 1] === '(') {
                dp[i] = dp[i - 1] + 2;

                if (i - dp[i - 1] - 2 > 0) {
                    dp[i] += dp[i - dp[i - 1] - 2];
                }
            }
        }
    }
    return Math.max(...dp, 0);
};

// 赛车 https://leetcode-cn.com/problems/race-car/
/**
 * @param {number} target
 * @return {number}
 */
var racecar = function (target) {
    let dp = [];
    for (let i = 1; i <= target; i++) {
        dp[i] = Number.MAX_VALUE;
        let j = 1, cnt1 = 1;
        for (; j < i; j = (1 << ++cnt1) - 1) {
            for (let k = 0, cnt2 = 0; k < j; k = (1 << ++cnt2) - 1) {
                dp[i] = Math.min(dp[i], cnt1 + 1 + cnt2 + 1 + dp[i - (j - k)]);
            }
        }

        dp[i] = Math.min(dp[i], cnt1 + (i == j ? 0 : 1 + dp[j - i]))
    }

    return dp[target];
};

// 不同的子序列 https://leetcode-cn.com/problems/distinct-subsequences/
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
    const m = s.length, n = t.length;
    if (m < n) {
        return 0;
    }
    const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) {
        dp[i][n] = 1;
    }
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (s[i] == t[j]) {
                dp[i][j] = dp[i + 1][j + 1] + dp[i + 1][j];
            } else {
                dp[i][j] = dp[i + 1][j];
            }
        }
    }
    return dp[0][0];
};