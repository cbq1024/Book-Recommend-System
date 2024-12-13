# 推荐系统与 web 服务的区别及 Lambda 架构

## 一、推荐系统与 web 服务

| 项目     | 思维形式                     | 侧重点             | 描述                                                         |
| -------- | ---------------------------- | ------------------ | ------------------------------------------------------------ |
| web 项目 | 对结果有确定的预期           | 侧重于处理复杂逻辑 | web 项目通常用于处理复杂逻辑、处理高并发、实现高可用，构建一个稳定的信息流 |
| 推荐系统 | 结果是不确定的、是个概率问题 | 侧重于追求指标增长 | 推荐系统 追求指标增长如 留存率、阅读时间、GMV 电商网站成交金额、VV 视频网站 (Video View) |

## 二、大数据 Lambda 架构

### 2.1 Lambda 概述

> [!IMPORTANT]
>
> 大数据 Lambda 系统架构是由 Twitter 工程师 Nathan Marz （Storm 项目发起人提出的） ，该架构旨在 **提供一个结合实时数据和 Hadoop 预先计算的数据环境和混合平台**，提供一个实时的数据试图，其架构包括：

1. 批处理层
   - 数据不可变，可进行任何计算，可水平拓展
   - 高延迟 几分钟 - 几小时 （计算量和数据量不同）
   - 日志收集 Flume
   - 分布式存储 Hadoop
   - 分布式计算 Hadoop MapReduce、Spark
   - 视图存储数据库
     - NoSQL ： Redis、HBase、Cassandra
     - MySQL
     - Mgondb
2. 实时处理层
   - 流式处理、持续计算
   - 存储和分析某个窗口期内的数据
   - 最终正确性 （Eventual accuracy）
   - 实时数据收集 Flume、Kafka
   - 实时数据分析 Spark、Streaming、Storm、Flink
3. 服务层
   - 支持随机读取
   - 需要在非常短的时间内返回结果
   - 读取批处理层和实时处理层结果并对其归并

### 2.2 Lambda 架构图

![image-20240518120401808](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/202405181204875.png)

### 2.3 Lambda 解决的问题及其细节

> [!NOTE]
>
> Lambda 架构主要用于解决离线计算和实时计算共同提供服务的问题

|            | 离线计算                            | 实时计算                      |
| ---------- | ----------------------------------- | ----------------------------- |
| 优点       | 能够处理的数据量很大 PB 级别        | 响应快 ms 级别                |
| 缺点       | 速度比较慢 min 级别                 | 能够处理的数据量小            |
| 涉及的框架 | Hadoop、Spark core、Spark sql、Hive | Spark streaming、Storm、Flink |

1. 消息中间件
   - Flume 日志采集系统
   - Kafka 消息队列
2. 存储相关
   - HBase NoSql 数据库
   - Hive sql 操作 HDFS 数据