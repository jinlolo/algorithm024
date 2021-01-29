// 设计循环双端队列
var MyCircularDeque = function (k) {
    // 队列的容量
    this.capacity = k;
    // 使用数组存放队列元素，所有的初始值都是-1，取值的时候直接返回
    this.queue = new Array(k).fill(-1);
    // 队列的头指针，即队列头元素的位置
    this.head = 0;
    // 队列的尾指针，即尾部要插入元素的位置，也就是队列的尾元素的位置+1
    this.tail = 0;
};

// 将index-1，需要考虑index到达数组首尾时需要循环
MyCircularDeque.prototype.reduceIndex = function (index) {
    return (index + this.capacity - 1) % this.capacity;
};

// 将index+1，需要考虑index到达数组首尾时需要循环
MyCircularDeque.prototype.addIndex = function (index) {
    return (index + 1) % this.capacity;
};

/**
 * Adds an item at the front of Deque. Return true if the operation is successful.
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
    // 判断队列是否已满
    if (this.isFull()) {
        return false;
    }

    // 从头部插入元素时，要先将头指针向前移动一位
    this.head = this.reduceIndex(this.head);
    // 在新的头指针位置插入元素
    this.queue[this.head] = value;

    return true;
};

/**
 * Adds an item at the rear of Deque. Return true if the operation is successful.
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function (value) {
    // 判断队列是否已满
    if (this.isFull()) {
        return false;
    }

    // 在尾指针的位置插入元素
    this.queue[this.tail] = value;
    // 将尾指针向后移动一位，指向下一次插入元素的位置
    this.tail = this.addIndex(this.tail);

    return true;
};

/**
 * Deletes an item from the front of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
    // 判断队列是否为空
    if (this.isEmpty()) {
        return false;
    }

    // 将头指针的值置为-1，表示元素被删除
    this.queue[this.head] = -1;
    // 删除元素后，要将头指针向后移动一位
    this.head = this.addIndex(this.head);

    return true;
};

/**
 * Deletes an item from the rear of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function () {
    // 判断队列是否为空
    if (this.isEmpty()) {
        return false;
    }

    // 先将尾指针向前移动一位，指向队尾元素
    this.tail = this.reduceIndex(this.tail);
    // 将队尾元素设置为-1
    this.queue[this.tail] = -1;

    return true;
};

/**
 * Get the front item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
    // 直接返回头指针的元素即可，由于初始值是-1，因此如果队列为空，会返回-1
    return this.queue[this.head];
};

/**
 * Get the last item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function () {
    // 直接返回尾指针-1的元素即可，由于初始值是-1，因此如果队列为空，会返回-1
    return this.queue[this.reduceIndex(this.tail)];
};

/**
 * Checks whether the circular deque is empty or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
    // 如果头尾指针的位置相同，且对应位置的值为-1，表示队列中已无元素，则为空
    return this.head === this.tail && this.queue[this.head] < 0;
};

/**
 * Checks whether the circular deque is full or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
    // 如果头尾指针的位置相同，且对应位置的值不为-1，此时无法再插入元素，则队列已满
    return this.head === this.tail && this.queue[this.head] >= 0;
};


// 接雨水 https://leetcode-cn.com/problems/trapping-rain-water/
var trap = function (height) {

    let left = 0,
        right = height.length - 1,
        result = 0,
        leftMax = 0,
        rightMax = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            leftMax = Math.max(leftMax, height[left]);
            result += leftMax - height[left];
            left++
        } else {
            rightMax = Math.max(height[right], rightMax);
            result += rightMax - height[right];
            right--
        }
    }

    return result
};
console.log('接雨水', trap([4, 2, 0, 3, 2, 5]))