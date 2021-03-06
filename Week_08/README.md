# 学习笔记

## 字典树

又称单词查找树，Trie 树，是一种树形结构，是一种哈希树的变种。典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。它的优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较，查询效率比哈希树高。

### 性质

1. 根节点不包含字符，除根节点外每一个节点都只包含一个字符；
2. 从根节点到某一节点，路径上经过的字符连接起来，为该节点对应的字符串；
3. 每个节点的所有子节点包含的字符都不相同。

### 操作与实现方法

其基本操作有：查找、插入和删除,当然删除操作比较少见。

搜索字典项目的方法为：

1. 从根结点开始一次搜索；
2. 取得要查找关键词的第一个字母，并根据该字母选择对应的子树并转到该子树继续进行检索；
3. 在相应的子树上，取得要查找关键词的第二个字母,并进一步选择对应的子树进行检索。
4. 迭代过程……
5. 在某个结点处，关键词的所有字母已被取出，则读取附在该结点上的信息，即完成查找。
   其他操作类似处理

## 并查集

并查集，在一些有 N 个元素的集合应用问题中，我们通常是在开始时让每个元素构成一个单元素的集合，然后按一定顺序将属于同一组的元素所在的集合合并，其间要反复查找一个元素在哪个集合中。这一类问题近几年来反复出现在信息学的国际国内赛题中。其特点是看似并不复杂，但数据量极大，若用正常的数据结构来描述的话，往往在空间上过大，计算机无法承受；即使在空间上勉强通过，运行的时间复杂度也极高，根本就不可能在比赛规定的运行时间（1 ～ 3 秒）内计算出试题需要的结果，只能用并查集来描述。
并查集是一种树型的数据结构，用于处理一些不相交集合（disjoint sets）的合并及查询问题。常常在使用中以森林来表示。

### 主要操作

1. 初始化
   把每个点所在集合初始化为其自身。
   通常来说，这个步骤在每次使用该数据结构时只需要执行一次，无论何种实现方式，时间复杂度均为 O(N)。
2. 查找
   查找元素所在的集合，即根节点。
3. 合并
   将两个元素所在的集合合并为一个集合。
   通常来说，合并之前，应先判断两个元素是否属于同一集合，这可用上面的“查找”操作实现。

## 红黑树

红黑树（Red Black Tree） 是一种自平衡二叉查找树，是在计算机科学中用到的一种数据结构，典型的用途是实现关联数组。
红黑树是一种特定类型的二叉树，它是在计算机科学中用来组织数据比如数字的块的一种结构。若一棵二叉查找树是红黑树，则它的任一子树必为红黑树。 [4]
红黑树是一种平衡二叉查找树的变体，它的左右子树高差有可能大于 1，所以红黑树不是严格意义上的平衡二叉树（AVL），但 对之进行平衡的代价较低， 其平均统计性能要强于 AVL 。 [2]
由于每一棵红黑树都是一颗二叉排序树，因此，在对红黑树进行查找时，可以采用运用于普通二叉排序树上的查找算法，在查找过程中不需要颜色信息。

### 特征

红黑树是每个结点都带有颜色属性的二叉查找树，颜色或红色或黑色。 在二叉查找树强制一般要求以外，对于任何有效的红黑树我们增加了如下的额外要求:

1. 结点是红色或黑色。
2. 根结点是黑色。
3. 所有叶子都是黑色。（叶子是 NIL 结点）
4. 每个红色结点的两个子结点都是黑色。（从每个叶子到根的所有路径上不能有两个连续的红色结点）
5. 从任一节结点其每个叶子的所有路径都包含相同数目的黑色结点。
   这些约束强制了红黑树的关键性质: 从根到叶子的最长的可能路径不多于最短的可能路径的两倍长。结果是这个树大致上是平衡的。因为操作比如插入、删除和查找某个值的最坏情况时间都要求与树的高度成比例，这个在高度上的理论上限允许红黑树在最坏情况下都是高效的，而不同于普通的二叉查找树。

## AVL 树

AVL 树是最先发明的自平衡二叉查找树。在 AVL 树中任何节点的两个子树的高度最大差别为 1，所以它也被称为高度平衡树。增加和删除可能需要通过一次或多次树旋转来重新平衡这个树。

### 特点

AVL 树本质上还是一棵二叉搜索树，它的特点是：

1. 本身首先是一棵二叉搜索树。
2. 带有平衡条件：每个结点的左右子树的高度之差的绝对值（平衡因子）最多为 1。
   也就是说，AVL 树，本质上是带了平衡功能的二叉查找树（二叉排序树，二叉搜索树）。

## 位运算

程序中的所有数在计算机内存中都是以二进制的形式储存的。位运算就是直接对整数在内存中的二进制位进行操作。比如，and 运算本来是一个逻辑运算符，但整数与整数之间也可以进行 and 运算。举个例子，6 的二进制是 110，11 的二进制是 1011，那么 6 and 11 的结果就是 2，它是二进制对应位进行逻辑运算的结果（0 表示 False，1 表示 True，空位都当 0 处理）。
