// 两数之和 https://leetcode-cn.com/problems/two-sum/
function twoSum(nums, target) {
    let len = nums.length,
        result = [],
        map = new Map();

    // 向map内添加元素并记录索引
    for (let i = 0; i < len; i++) {
        map.set(nums[i], i)
    }

    for (let j = 0; j < len; j++) {
        let otherValue = target - nums[j];
        // ** map.has(nums[i]) -> map.has(otherValue)
        // 判断map中是否有目标值与当前元素的差且不得重复
        if (map.has(otherValue) && map.get(otherValue) != j) {
            result.push(j, map.get(otherValue));
            break;
        }
    }

    return result
}

console.log(twoSum([2, 3, 7, 1, 5], 6))