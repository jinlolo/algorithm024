// 有效字母异位词
var isAnagram = function (s, t) {
    return s.split('').sort().join('') === t.split('').sort().join('')
};
console.log('有效字母异位词', isAnagram('car', 'rac'))


// 字母异位词分组
var groupAnagrams = function (strs) {
    let hash = new Map()

    for (let i = 0; i < strs.length; i++) {
        let str = strs[i].split('').sort().join()
        if (hash.has(str)) {
            let temp = hash.get(str)
            temp.push(strs[i])
            hash.set(str, temp)
        } else {
            hash.set(str, [strs[i]])
        }
    }

    return [...hash.values()]
}
console.log('字母异位词分组', groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))

// 两数之和
var twoSum = function (nums, target) {
    let result = [], len = nums.length, map = new Map();

    for (let i = 0; i < len; i++) {
        map.set(nums[i], i)
    }

    for (let j = 0; j < len; j++) {
        let otherValue = target - nums[j];

        if (map.has(otherValue) && map.get(otherValue) !== j) {
            result.push(j, map.get(otherValue))
            break
        }
    }
    return result;
};
console.log('两数之和', twoSum([2, 7, 11, 15], 9))