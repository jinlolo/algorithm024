// 删除排序数组中的重复项 https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
var removeDuplicates = function (nums) {
    let p1 = 0,
        p2 = 0,
        len = nums.length;

    while (p2 < len) {
        if (nums[p1] != nums[p2]) {
            p1++;
            nums[p1] = nums[p2];
        }
        p2++
    }
    return p1 + 1
};


// 旋转数组 https://leetcode-cn.com/problems/rotate-array/
var rotate = function (nums, k) {
    // 每次递减
    while (k--) {
        // 将数组最后一位弹出并插入到头部
        nums.unshift(nums.pop())
    }
    return nums
};
console.log('旋转数组', rotate([1, 2, 3, 4, 5, 6, 7], 2))


// 合并两个有序链表 https://leetcode-cn.com/problems/merge-two-sorted-lists/
var mergeTwoLists = function (l1, l2) {
    if (l1 === null) return l2;
    if (l2 === null) return l1;

    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    } else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    }
};
console.log('合并两个有序链表', mergeTwoLists([1, 2, 3], [1, 3, 4]))


// 合并两个有序数组 https://leetcode-cn.com/problems/merge-sorted-array/
function merge(nums1, m, nums2, n) {
    if (!n) return

    for (let i = 0; i < n; i++) {
        nums1[m + 1] = nums2[i]
    }

    return nums1.sort((a, b) => a - b)
}
console.log('合并有序数组', merge([1, 3, 5], 2, [2, 7, 0], 3))


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
console.log('两数之和', twoSum([2, 3, 7, 1, 5], 6))


// 移动零 https://leetcode-cn.com/problems/move-zeroes/
function moveZero(nums) {
    // 方法一
    let i = 0,
        j = 0,
        len = nums.length;

    while (i < len) {
        if (nums[i] !== 0) {
            [nums[i], nums[j]] = [nums[j], nums[i]]
            i++;
            j++;
        } else {
            i++;
        }
    }
    return nums;

    // 方法二
    // for (let k = nums.length - 1; k--;) {
    //     if (nums[k] === 0) {
    //         nums.splice(k, 1);
    //         nums.push(0)
    //     }
    // }
    // return nums

    // 方法三
    // let left = [], right = [];
    // for (let l = 0; l < nums.length; l++) {
    //     if (nums[l]) {
    //         left.push(nums[l])
    //     } else {
    //         right.push(0)
    //     }
    // }
    // return left.concat(right)
}
console.log('移动零', moveZero([1, 0, 4, 5, 3]))


// 加一 https://leetcode-cn.com/problems/plus-one/
function plusOne(nums) {
    let len = nums.length;

    for (let i = len - 1; i >= 0; i--) {
        // nums[i]++;
        // nums[i] = nums[i] % 10;
        // if (nums[i]) return nums

        if (++nums[i] > 9) nums[i] = 0
        else return nums
    }

    // nums[0] = 1;
    // nums.push(0);
    nums.unshift(1);
    return nums;
}
console.log('加一', plusOne([0, 2, 0, 3, 1, 4]))