### nodejs爬虫，爬取boss直聘中招聘信息
啥也不说，先上爬取结果
![未命名](https://user-images.githubusercontent.com/12730273/56999930-f691a880-6be3-11e9-8535-052bbf120c79.png)


#### 使用介绍
git clone https://github.com/Jesse121/crawler.git

建好相关数据表   
在boss文件夹下MYSQL.sql中有已写好的sql语句，根据自己想要爬取的内容选择相应的建表语句，也可以自己写建表语句  
这里我们以前端开发为例  
在命令行中执行以下内容  
```
-- 创建数据库
CREATE DATABASE IF NOT EXISTS boss;
-- 指定数据库
USE boss;
-- user
CREATE TABLE IF NOT EXISTS `fed`(
    `id` INT UNSIGNED AUTO_INCREMENT KEY,
    `jobName` LONGTEXT NOT NULL COMMENT '职位名称',
    `salary` VARCHAR(20) NOT NULL COMMENT '薪资范围',
    `companyName` VARCHAR(50) NOT NULL COMMENT '公司名称',
    `companyInfo` VARCHAR(50) NOT NULL COMMENT '公司信息',
    `time` VARCHAR(20) NOT NULL COMMENT '发布日期',
    `description` LONGTEXT NOT NULL COMMENT '职位描述'
)ENGINE=INNODB CHARSET=UTF8;
```
至此用于存储爬取内容的数据库及数据表已建好，接下来需安装相关依赖包并执行爬虫程序  
如果需要爬取其他内容需修改请求链接，建立新的数据表，修改add函数中数据表名
```
//安装依赖包
npm install
npm start
```
执行后我们可以看到命令行中输出INSERT ID:*  这说明已爬取并存储了多少条数据

### 爬虫程序说明
这里使用了以下依赖包

* superagent根据请求链接去请求相关页面
* cheerio根据请求的返回结果，从中提取要爬取的字段
* mysql将提取的字段存入数据库
