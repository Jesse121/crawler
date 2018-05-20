-- 创建数据库
CREATE DATABASE IF NOT EXISTS lagou;
-- 指定数据库
USE lagou;
-- user
CREATE TABLE IF NOT EXISTS `fed`(
    `id` INT UNSIGNED AUTO_INCREMENT KEY,
    `positionName` LONGTEXT NOT NULL COMMENT '职位名称',
    `salary` VARCHAR(20) NOT NULL COMMENT '薪资范围',
    `address` VARCHAR(500) NOT NULL COMMENT '工作地址',
    `companyName` VARCHAR(100) NOT NULL COMMENT '公司名称',
    `companySize` VARCHAR(20) NOT NULL COMMENT '公司人数',
    `industryField` VARCHAR(50) NOT NULL COMMENT '从事方向',
    `createTime` VARCHAR(20) NOT NULL COMMENT '发布日期',
    `description` LONGTEXT NOT NULL COMMENT '职位描述'
)ENGINE=INNODB CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS `php`(
    `id` INT UNSIGNED AUTO_INCREMENT KEY,
    `positionName` LONGTEXT NOT NULL COMMENT '职位名称',
    `salary` VARCHAR(20) NOT NULL COMMENT '薪资范围',
    `address` VARCHAR(500) NOT NULL COMMENT '工作地址',
    `companyName` VARCHAR(100) NOT NULL COMMENT '公司名称',
    `companySize` VARCHAR(20) NOT NULL COMMENT '公司人数',
    `industryField` VARCHAR(50) NOT NULL COMMENT '从事方向',
    `createTime` VARCHAR(20) NOT NULL COMMENT '发布日期',
    `description` LONGTEXT NOT NULL COMMENT '职位描述'
)ENGINE=INNODB CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS `node`(
    `id` INT UNSIGNED AUTO_INCREMENT KEY,
    `positionName` LONGTEXT NOT NULL COMMENT '职位名称',
    `salary` VARCHAR(20) NOT NULL COMMENT '薪资范围',
    `address` VARCHAR(500) NOT NULL COMMENT '工作地址',
    `companyName` VARCHAR(100) NOT NULL COMMENT '公司名称',
    `companySize` VARCHAR(20) NOT NULL COMMENT '公司人数',
    `industryField` VARCHAR(50) NOT NULL COMMENT '从事方向',
    `createTime` VARCHAR(20) NOT NULL COMMENT '发布日期',
    `description` LONGTEXT NOT NULL COMMENT '职位描述'
)ENGINE=INNODB CHARSET=UTF8;