# 学习笔记

## 搜索算法

### 定义

搜索算法是利用计算机的高性能来有目的的穷举一个问题解空间的部分或所有的可能情况，从而求出问题的解的一种方法。现阶段一般有枚举算法、深度优先搜索、广度优先搜索、A\*算法、回溯算法、蒙特卡洛树搜索、散列函数等算法。在大规模实验环境中，通常通过在搜索前，根据条件降低搜索规模；根据问题的约束条件进行剪枝；利用搜索过程中的中间解，避免重复计算这几种方法进行优化。

#### 运算原理

搜索算法实际上是根据初始条件和扩展规则构造一棵“解答树”并寻找符合目标状态的节点的过程。所有的搜索算法从最终的算法实现上来看，都可以划分成两个部分——控制结构（扩展节点的方式）和产生系统（扩展节点），而所有的算法优化和改进主要都是通过修改其控制结构来完成的。其实，在这样的思考过程中，我们已经不知不觉地将一个具体的问题抽象成了一个图论的模型——树，即搜索算法的使用第一步在于搜索树的建立。完成搜索的过程就是找到一条从根结点到目标结点的路径，找出一个最优的解。这种搜索算法的实现类似于图或树的遍历，通常可以有两种不同的实现方法，即深度优先搜索（DFS——Depth First search）和广度优先搜索（BFS——Breadth First Search）。
