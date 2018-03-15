#根据“心灵驿站”的数据库结构设计说明文档编写必需的SQL语句
SET NAMES UTF8;
DROP DATABASE IF EXISTS bs;
CREATE DATABASE bs CHARSET=UTF8;
USE bs;
#1首页展示产品表，关联到商品表 bs_index_product	
CREATE TABLE bs_index_product (
	pid INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(64),                 #商品标题
	author VARCHAR(64),              #详细描述
	pic VARCHAR(128),                  #图片
	price DECIMAL(10,2),               #价格
	href VARCHAR(128),                 #链接
	seq_recommended TINYINT,           #顺序 被推荐
	seq_new_arrival TINYINT,           #顺序 新到货
	seq_top_sale TINYINT               #顺序 高销量
);
#2首页轮播图表 （bs_index_carousel）
CREATE TABLE bs_index_carousel (
	cid INT PRIMARY KEY AUTO_INCREMENT,
	img VARCHAR(128),        #图片路径
	title VARCHAR(64),       #图片描述
	href VARCHAR(128)        #图片链接
);
#3商品类别表 （bs_book_family）
CREATE TABLE bs_book_family (
	fid INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(32)            #类别名称
);
#4商品表 （bs_book）
CREATE TABLE bs_book(
	bid INT PRIMARY KEY AUTO_INCREMENT,
	family_id INT,             #产品类别编号
	title VARCHAR(128),        #主标题
	subtitle VARCHAR(128),     #副标题
	price DECIMAL(10,2),
	promise VARCHAR(64),       #承诺
	spec VARCHAR(64),          #规格颜色
	name VARCHAR(32),
	category VARCHAR(32),      #所属分类
	details VARCHAR(1024),     #产品详细说明
	shelf_time BIGINT,         #上架时间
	sold_count INT,            #已售出数量
	is_onsale BOOLEAN,         #是否促销中
	FOREIGN KEY(family_id) REFERENCES bs_book_family (fid)
);
#5商品详情图表 （bs_book_pic）
CREATE TABLE bs_book_pic (
	pid INT PRIMARY KEY AUTO_INCREMENT,
	book_id INT,              #笔记本电脑编号
	sm VARCHAR(128),            #小图片
	md VARCHAR(128),            #中图片
	lg VARCHAR(128),            #大图片
	FOREIGN KEY(book_id) REFERENCES bs_book(bid)
);
#6用户信息表（bs_user）
CREATE TABLE bs_user (
	uid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	uname VARCHAR(32),
	upwd VARCHAR(32),
	email VARCHAR(64),
	phone VARCHAR(16) NOT NULL UNIQUE,
	avatar VARCHAR(128),
	user_name VARCHAR(32),
	gender INT
);
#7用户地址表 （bs_receiver_address）
CREATE TABLE bs_receiver_address (
	aid INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	receiver VARCHAR(16),  #接收人
	province VARCHAR(16),  #省
	city VARCHAR(16),      #市
	county VARCHAR(16),    #县
	address VARCHAR(128),
	cellphone VARCHAR(16),
	fixedphone VARCHAR(16),
	postcode CHAR(6),      #邮编
	tag VARCHAR(16),        #标签名
	is_default BOOLEAN,
	FOREIGN KEY(user_id) REFERENCES bs_user(uid)
);
#8用户购物车表（bs_shopping_cart）
CREATE TABLE bs_shopping_cart (
	cid INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	product_id INT,
	count INT,         #购买数量
	FOREIGN KEY(user_id) REFERENCES bs_user(uid),
	FOREIGN KEY(product_id) REFERENCES bs_book(bid)
);
#9用户订单表 （bs_order）
CREATE TABLE bs_order (
	aid INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	address_id INT,
	status INT,                 #1、等待付款2、等待发货3、运输中4、已签收、5已取消
	order_time BIGINT,          #下单时间
	pay_time BIGINT,            #付款时间
	deliver_time BIGINT,        #发货时间
	received_time BIGINT,       #接收时间
	FOREIGN KEY(user_id) REFERENCES bs_user(uid),
	FOREIGN KEY(address_id) REFERENCES bs_receiver_address(aid)
);
#10用户订单详情表 （bs_order_detail）
CREATE TABLE bs_order_detail (
	did INT PRIMARY KEY AUTO_INCREMENT,
	order_id INT,             #订单编号
	product_id INT,           #产品编号
	count INT,                #购买数量
	FOREIGN KEY(order_id) REFERENCES bs_order(aid),
	FOREIGN KEY(product_id) REFERENCES bs_book(bid)
);
#10用户收藏表 （bs_collection）
CREATE TABLE bs_collection (
	lid INT PRIMARY KEY AUTO_INCREMENT,
	product_id INT,           #产品编号
	md varchar(128) default NULL, #产品图片
    subtitle VARCHAR(128),     #副标题
    price DECIMAL(10,2),        #售价
    fixprice DECIMAL(10,2),        #定价
	FOREIGN KEY(product_id) REFERENCES bs_book(bid)
);