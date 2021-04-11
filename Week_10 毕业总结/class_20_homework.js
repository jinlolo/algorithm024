// 字符串中的第一个唯一字符(https://leetcode-cn.com/problems/first-unique-character-in-a-string/)
/**
 * @param {string} s
 * @return {number}
 */
 var firstUniqChar = function(s) {
    let h = new Uint16Array(26), i = s.length
    while (i--) h[s.charCodeAt(i) - 97]++
    i = -1
    while (++i < s.length) 
        if (h[s.charCodeAt(i) - 97] === 1)
            return i
    return -1
};

// 反转字符串 II(https://leetcode-cn.com/problems/reverse-string-ii/)
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
 var reverseStr = function(s, k) {
    if(k == 1) return s
    let result = ''
    let temp = ''
    let dobulek = 2 * k
    for (let i = 0; i < s.length; i++) { 
        const element = s[i];
        let kyu = i % dobulek
        if(kyu == 0){
            result += temp  
            temp = ''
        }
        if(kyu < k){
            temp = element + temp
        }else {
            temp =  temp + element 
        } 
    }

    return result + temp
};

// 翻转字符串里的单词(https://leetcode-cn.com/problems/reverse-words-in-a-string/)
/**
 * @param {string} s
 * @return {string}
 */
 var reverseWords = function(s) {
    return s.trim().split(/\s+/).reverse().join(' ');
};


// 反转字符串中的单词 III(https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/)
/**
 * @param {string} s
 * @return {string}
 */
 var reverseWords = function(s) {
    const ret = [];
    const length = s.length;
    let i = 0;
    while (i < length) {
        let start = i;
        while (i < length && s.charAt(i) != ' ') {
            i++;
        }
        for (let p = start; p < i; p++) {
            ret.push(s.charAt(start + i - 1 - p));
        }
        while (i < length && s.charAt(i) == ' ') {
            i++;
            ret.push(' ');
        }
    }
    return ret.join('');
};

// 仅仅反转字母(https://leetcode-cn.com/problems/reverse-only-letters/)
/**
 * @param {string} S
 * @return {string}
 */
 var reverseOnlyLetters = function(S) {
    var arr = S.match(/[a-zA-Z]/g)
    if (arr === null) return S
    return S.replace(/[a-zA-Z]/g, () => arr.pop())
}

// 同构字符串(https://leetcode-cn.com/problems/isomorphic-strings/)
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
 var isIsomorphic = function(s, t) {
    const s2t = {};
    const t2s = {};
    const len = s.length;
    for (let i = 0; i < len; ++i) {
        const x = s[i], y = t[i];
        if ((s2t[x] && s2t[x] !== y) || (t2s[y] && t2s[y] !== x)) {
            return false;
        }
        s2t[x] = y;
        t2s[y] = x;
    }
    return true;
};

// 验证回文字符串Ⅱ(https://leetcode-cn.com/problems/valid-palindrome-ii/)
/**
 * @param {string} s
 * @return {boolean}
 */
 var validPalindrome = function(s) {
    let n = s.length;
    if(n < 2){
        return s;
    }
    let isPalindrome = (left,right)=> {
        while(left < right){
            if(s[left++] != s[right--]){
                return false;
            }
        }
        return true;
    }
    for(let i = 0;i < n;i++){
        if(s[i] != s[n-i-1]){
            return isPalindrome(i+1,n-i-1) || isPalindrome(i,n-1-i-1);
        }
    }
    return true;
};

// 字符串转换整数 (atoi)(https://leetcode-cn.com/problems/string-to-integer-atoi/)
/**
 * @param {string} str
 * @return {number}
 */
 var myAtoi = function(str) {
    const number = parseInt(str, 10);

    if(isNaN(number)) {
        return 0;
    } else if (number < Math.pow(-2, 31) || number > Math.pow(2, 31) - 1) {
        return number < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
    } else {
        return number;
    }
};

// 找到字符串中所有字母异位词(https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
 var findAnagrams = function (s, p) {
    const res = [], win = {}, need = {}, pLen = p.length;
    let len = 0, val = 0;
    for (const x of p) {
        if (need[x] === undefined) {
            need[x] = win[x] = 0;
            len++;
        }
        need[x]++;
    }
    for (let i = 0; i < s.length; i++) {
        const j = i - pLen;
        if (s[i] in need && ++win[s[i]] === need[s[i]]) val++;
        if (s[j] in need && win[s[j]]-- === need[s[j]]) val--;
        if (val === len) res.push(j + 1);
    }
    return res;
};

// 最长回文子串(https://leetcode-cn.com/problems/longest-palindromic-substring/)
/**
 * @param {string} s
 * @return {string}
 */
 var longestPalindrome = function(s) {
    if(!s || s.length < 2){
        return s;
    }
    var s_f = s.split('').reverse().join('');
    var resultStr = s[0];
    var maxLen = 1;
    var tmpLen = 1;
    var maxStrIndex = 0;
    var len = s.length;
    //判断字符串是否回文
    function isPalinerome(i,r){
        if(len - i - 1 == r -tmpLen + 1){
            return true
        }
        return false;
    }
    //初始化二维数组
    var len = s.length;
    var arr = new Array(len);
    for(var i = 0;i<len;i++){
        arr[i] = [];
        for(var r = 0;r<len;r++){
            arr[i][r] = 0
        }
    }
    for(var i = 0;i<len;i++){
        for(var r=0;r<len;r++){
            if(s[i] == s_f[r]){
                if(i==0 || r==0){
                    arr[i][r] = 1
                }else{
                    arr[i][r] = arr[i-1][r-1] + 1
                    tmpLen = arr[i][r]
                }
                if(tmpLen > maxLen && isPalinerome(i,r)){
                    maxStrIndex = r;
                    maxLen = tmpLen;
                    resultStr =  s.substring(i-tmpLen+1,i+1);
                }
            }
        }
    }
    return resultStr;
};

// 通配符匹配(https://leetcode-cn.com/problems/wildcard-matching/)
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
 var isMatch = (s, p) => {
    const sLen = s.length;
    const pLen = p.length;
    const dp = new Array(sLen + 1);
    for (let i = 0; i < sLen + 1; i++) {
      dp[i] = new Array(pLen + 1).fill(false);
    }
    dp[0][0] = true;
    for (let j = 1; j <= pLen; j++) {
      dp[0][j] = p[j - 1] == '*' && dp[0][j - 1];
    }
    for (let i = 1; i <= sLen; i++) {
      for (let j = 1; j <= pLen; j++) {
        if (p[j - 1] == '?' || s[i - 1] == p[j - 1])
          dp[i][j] = dp[i - 1][j - 1];
        else if (p[j - 1] == '*' && (dp[i - 1][j] || dp[i][j - 1]))
          dp[i][j] = true;
      }
    }
    return dp[sLen][pLen];
  };

// 不同的子序列(https://leetcode-cn.com/problems/distinct-subsequences/)
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
 var numDistinct = function(s, t) {
	const sLen = s.length, tLen = t.length
	
	function helper(i, j) {
		if (j < 0) {
			return 1
		}
		if (i < 0) {
			return 0
		}
		
		if (s[i] == t[j]) {
			return helper(i-1, j) + helper(i-1, j-1)
		} else {
			return helper(i-1, j)
		}
	}
	return helper(sLen-1, tLen-1) 
};

