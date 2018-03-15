

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `bs_index_carousel`
-- ----------------------------
DROP TABLE IF EXISTS `bs_index_carousel`; 
CREATE TABLE `bs_index_carousel` (
  `cid` int(11) NOT NULL auto_increment,
  `img` varchar(128) default NULL,
  `title` varchar(64) default NULL,
  `href` varchar(128) default NULL,
  PRIMARY KEY  (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bs_index_carousel
-- ----------------------------
INSERT INTO `bs_index_carousel` VALUES ('1', 'img/index/banner1.jpg', '轮播广告商品1', 'product_details.html?lid=1');
INSERT INTO `bs_index_carousel` VALUES ('2', 'img/index/banner2.jpg', '轮播广告商品2', 'product_details.html?lid=2');
INSERT INTO `bs_index_carousel` VALUES ('3', 'img/index/banner3.jpg', '轮播广告商品3', 'product_details.html?lid=3');
INSERT INTO `bs_index_carousel` VALUES ('4', 'img/index/banner4.jpg', '轮播广告商品4', 'product_details.html?lid=4');
INSERT INTO `bs_index_carousel` VALUES ('5', 'img/index/banner5.jpg', '轮播广告商品5', 'product_details.html?lid=5');
INSERT INTO `bs_index_carousel` VALUES ('6', 'img/index/banner6.jpg', '轮播广告商品6', 'product_details.html?lid=6');

-- ----------------------------
-- Table structure for `bs_index_product`
-- ----------------------------
DROP TABLE IF EXISTS `bs_index_product`;
CREATE TABLE `bs_index_product` (
  `pid` int(11) NOT NULL auto_increment,
  `title` varchar(64) default NULL,
  `author` varchar(64) default NULL,
  `pic` varchar(128) default NULL,
  `price` decimal(10,2) default NULL,
  `href` varchar(128) default NULL,
  `seq_recommended` tinyint(4) default NULL,
  `seq_new_arrival` tinyint(4) default NULL,
  `seq_top_sale` tinyint(4) default NULL,
  PRIMARY KEY  (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bs_index_product
-- ----------------------------
INSERT INTO `bs_index_product` VALUES ('1', '让孩子像孩子那样长大', '钱儿妈', 'img/index/b1 (1).png', '47.00', 'product_details.html?lid=1', '1', '1', '1');
INSERT INTO `bs_index_product` VALUES ('2', '是思考还是想太多', '冀剑制', 'img/index/b1 (2).png', '27.00', 'product_details.html?lid=2', '2', '2', '2');
INSERT INTO `bs_index_product` VALUES ('3', '我这一辈子', '老舍', 'img/index/b1 (4).png', '21.00', 'product_details.html?lid=3', '3', '3', '3');
INSERT INTO `bs_index_product` VALUES ('4', '活出生命的意义', '（美）弗兰克尔', 'img/index/b1 (5).png', '20.00', 'product_details.html?lid=4', '4', '4', '4');
INSERT INTO `bs_index_product` VALUES ('5', '爱如繁星', '匪我思存', 'img/index/b1 (6).png', '22.90', 'product_details.html?lid=5', '5', '5', '5');
INSERT INTO `bs_index_product` VALUES ('6', '当时明月在', '匪我思存', 'img/index/20853971-1_b_0.jpg', '15.10', 'product_details.html?lid=6', '6', '6', '6');
INSERT INTO `bs_index_product` VALUES ('7', '流放者归来', '（美）马尔科姆·考利', 'img/index/21081095-1_b_2.jpg', '9.30', 'product_details.html?lid=7', '7', '7', '7');
INSERT INTO `bs_index_product` VALUES ('8', '沈从文和他的湘西', '卓雅', 'img/index/8910441-1_b.jpg', '52.20', 'product_details.html?lid=8', '8', '8', '8');
INSERT INTO `bs_index_product` VALUES ('9', '老舍的平民生活', '舒乙', 'img/index/22502056-1_b_1.jpg', '7.50', 'product_details.html?lid=9', '9', '9', '9');
INSERT INTO `bs_index_product` VALUES ('10', '你自以为的极限，只是别人的起点', '特立独行的猫', 'img/index/1900700676-1_b_7.jpg', '15.55', 'product_details.html?lid=10', '10', '10', '10');

-- ----------------------------
-- Table structure for `bs_book`
-- ----------------------------
DROP TABLE IF EXISTS `bs_book`;
CREATE TABLE `bs_book` (
  `bid` int(11) NOT NULL auto_increment,
  `family_id` int(11) default NULL,
  `md` varchar(128) default NULL,
  `lg` varchar(128) default NULL,
  `title` varchar(128) default NULL,
  `subtitle` varchar(128) default NULL,
  `price` decimal(10,2) default NULL,
  `discount` varchar(32) default NULL,
  `fixprice` decimal(10,2) default NULL,
  `author` varchar(32) default NULL,
  `publish` varchar(32) default NULL,		
  `publish_time` varchar(64) default NULL,
  `word_count` varchar(32) default NULL,
  `classification` varchar(32) default NULL,
  PRIMARY KEY  (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bs_book
-- ----------------------------
INSERT INTO `bs_book` VALUES ('1', '1', 'img/product/md/25138892-1_w_8.jpg','img/product/lg/25138892-1_u_8.jpg','让孩子像孩子那样长大', 'Michael钱儿频道 主笔钱儿妈人气好文首度结集，一部让父母们不再迷惘焦虑的安心之书，一位国际视野妈妈的育儿心经。全网阅读量超过6000万次，知名教育专家刘称莲、粲然、蔡朝阳鼎力推荐。', '49.5','3折以下', '49.5', '钱儿妈（白雁飞）', '中信出版社', '2017年08月 ', '97万', '生活');
INSERT INTO `bs_book` VALUES ('2', '5', 'img/product/md/25146672-1_w_2.jpg','img/product/lg/25146672-1_u_2.jpg','是思考还是想太多', '写给年轻人的36堂思考课。诚品书店2015年度畅销好书，获得中国台湾社会各界一致认可的思考书。思考是什么？怎样想才是好的思考？怎样学习？每个人都有思考能力，只是好坏不同！', '27.0','3-5折', '27.0', '冀剑制', '民主与建设出版社', '2017年08月', '97万', '人文社科');
INSERT INTO `bs_book` VALUES ('3', '2', 'img/product/md/24572470-1_w_6.jpg','img/product/lg/24572470-1_u_6.jpg','我这一辈子', '人民艺术家老舍诙谐幽默的中短篇小说 ， 人人有可笑之处，自己也非例外， 人寿百年，而企图无限，根本矛盾可笑。', '21.0', '5-7折','21.0', '老舍', '北京联合出版公司', '2015年06月', '97万', '文艺');
INSERT INTO `bs_book` VALUES ('4', '5', 'img/product/md/20943949-1_w_2.jpg','img/product/lg/20943949-1_u_2.jpg','活出生命的意义', '一名在战役中失去双腿的年轻士兵，他陷入抑郁而企图自杀。有一天，他的朋友注意到他变了，他的面容从沮丧变得庄严而神气。士兵就是因为阅读了《活出生命的意义》一书才发生如此巨大的转变。', '20.00','7折以上', '20.00', '（美）弗兰克尔', '华夏出版社', '2010年06月', '97万', '人文社科');
INSERT INTO `bs_book` VALUES ('5', '2', 'img/product/md/25102118-1_w_5.jpg','img/product/lg/25102118-1_u_5.jpg','爱如繁星', '★匪我思存高甜新作重磅来袭，甜到少女心炸裂！★随书附赠唯美明信片+超萌Q版人设贴纸★(记忆坊)）', '22.9', '7折以上', '22.9', '匪我思存', '江苏凤凰文艺出版社', '2017年07月', '97万', '文艺');
INSERT INTO `bs_book` VALUES ('6', '2', 'img/product/md/20853971-1_w_2.jpg','img/product/lg/20853971-1_u_2.jpg','当时明月在', '我们在故事里，看到的人情世故。那些以不同的方式爱着的人们。无论他们的爱情是什么样子，永远都是美的。', '15.1','7折以上',  '15.1', '匪我思存', '新世界出版社', '2010年06月', '97万', '文艺');
INSERT INTO `bs_book` VALUES ('7', '2', 'img/product/md/21081095-1_w_2.jpg','img/product/lg/21081095-1_u_2.jpg','流放者归来', '《流放者归来》讲述在“迷惘的一代”最重要的成员之一的笔下，这一群体的冒险历程，以及他们对人生、对文学的态度，生动鲜活地再现在我们眼前。', '19.3', '7折以上', '19.3', '（美）马尔科姆·考利', '重庆出版社', '2006年10月', '97万', '文艺');
INSERT INTO `bs_book` VALUES ('8', '5', 'img/product/md/8910441-1_w.jpg','img/product/lg/8910441-1_u.jpg','沈从文和他的湘西', '中国首届青年摄影力体对抗赛银牌奖，英国剑桥国际名人中心“国际妇女”的称号。曾参加捷克及斯伐克国际摄影艺术展，亚太地区摄影艺术', '52.20', '7折以上', '52.20', '卓雅', '上海文艺出版社', '2001年03月', '97万', '人文社科');
INSERT INTO `bs_book` VALUES ('9', '2', 'img/product/md/22502056-1_w_1.jpg','img/product/lg/22502056-1_u_1.jpg','老舍的平民生活', '曾因创作优秀话剧《龙须沟》而被授予“人民艺术家”称号。“文化大革命”初期因被迫害而弃世。本书用图片与文字相结合的方式向读者介绍了老舍的平民生活。', '25.8','7折以上',  '25.8', '舒乙', '华文出版社', '2011年12月', '97万', '文艺');
INSERT INTO `bs_book` VALUES ('10', '5','img/product/md/25065335-1_w_15.jpg','img/product/lg/25065335-1_u_15.jpg','你自以为的极限，只是别人的起点','百万级畅销书作家特立独行的猫重磅新作，写给渴望突破瓶颈、实现快速跨越的你。', '33.3','7折以上',  '33.3', '特立独行的猫', '武汉出版社', '2017年05月', '97万', '人文社科');
INSERT INTO `bs_book` VALUES ('11', '1', 'img/product/md/25138892-1_w_8.jpg','img/product/lg/25138892-1_u_8.jpg','让孩子像孩子那样长大', 'Michael钱儿频道 主笔钱儿妈人气好文首度结集，一部让父母们不再迷惘焦虑的安心之书，一位国际视野妈妈的育儿心经。全网阅读量超过6000万次，知名教育专家刘称莲、粲然、蔡朝阳鼎力推荐。', '49.5','3折以下', '49.5', '钱儿妈（白雁飞）', '中信出版社', '2017年08月 ', '97万', '生活');
INSERT INTO `bs_book` VALUES ('12', '5', 'img/product/md/25146672-1_w_2.jpg','img/product/lg/25146672-1_u_2.jpg','是思考还是想太多', '写给年轻人的36堂思考课。诚品书店2015年度畅销好书，获得中国台湾社会各界一致认可的思考书。思考是什么？怎样想才是好的思考？怎样学习？每个人都有思考能力，只是好坏不同！', '27.0','3-5折', '27.0', '冀剑制', '民主与建设出版社', '2017年08月', '97万', '人文社科');
INSERT INTO `bs_book` VALUES ('13', '2', 'img/product/md/24572470-1_w_6.jpg','img/product/lg/24572470-1_u_6.jpg','我这一辈子', '人民艺术家老舍诙谐幽默的中短篇小说 ， 人人有可笑之处，自己也非例外， 人寿百年，而企图无限，根本矛盾可笑。', '21.0', '5-7折','21.0', '老舍', '北京联合出版公司', '2015年06月', '97万', '文艺');
INSERT INTO `bs_book` VALUES ('14', '5', 'img/product/md/20943949-1_w_2.jpg','img/product/lg/20943949-1_u_2.jpg','活出生命的意义', '一名在战役中失去双腿的年轻士兵，他陷入抑郁而企图自杀。有一天，他的朋友注意到他变了，他的面容从沮丧变得庄严而神气。士兵就是因为阅读了《活出生命的意义》一书才发生如此巨大的转变。', '20.00','7折以上', '20.00', '（美）弗兰克尔', '华夏出版社', '2010年06月', '97万', '人文社科');
INSERT INTO `bs_book` VALUES ('15', '2', 'img/product/md/25102118-1_w_5.jpg','img/product/lg/25102118-1_u_5.jpg','爱如繁星', '★匪我思存高甜新作重磅来袭，甜到少女心炸裂！★随书附赠唯美明信片+超萌Q版人设贴纸★(记忆坊)）', '22.9', '7折以上', '22.9', '匪我思存', '江苏凤凰文艺出版社', '2017年07月', '97万', '文艺');
INSERT INTO `bs_book` VALUES ('16', '2', 'img/product/md/20853971-1_w_2.jpg','img/product/lg/20853971-1_u_2.jpg','当时明月在', '我们在故事里，看到的人情世故。那些以不同的方式爱着的人们。无论他们的爱情是什么样子，永远都是美的。', '15.1','7折以上',  '15.1', '匪我思存', '新世界出版社', '2010年06月', '97万', '文艺');
INSERT INTO `bs_book` VALUES ('17', '2', 'img/product/md/21081095-1_w_2.jpg','img/product/lg/21081095-1_u_2.jpg','流放者归来', '《流放者归来》讲述在“迷惘的一代”最重要的成员之一的笔下，这一群体的冒险历程，以及他们对人生、对文学的态度，生动鲜活地再现在我们眼前。', '19.3', '7折以上', '19.3', '（美）马尔科姆·考利', '重庆出版社', '2006年10月', '97万', '文艺');
INSERT INTO `bs_book` VALUES ('18', '5', 'img/product/md/8910441-1_w.jpg','img/product/lg/8910441-1_u.jpg','沈从文和他的湘西', '中国首届青年摄影力体对抗赛银牌奖，英国剑桥国际名人中心“国际妇女”的称号。曾参加捷克及斯伐克国际摄影艺术展，亚太地区摄影艺术', '52.20', '7折以上', '52.20', '卓雅', '上海文艺出版社', '2001年03月', '97万', '人文社科');
INSERT INTO `bs_book` VALUES ('19', '2', 'img/product/md/22502056-1_w_1.jpg','img/product/lg/22502056-1_u_1.jpg','老舍的平民生活', '曾因创作优秀话剧《龙须沟》而被授予“人民艺术家”称号。“文化大革命”初期因被迫害而弃世。本书用图片与文字相结合的方式向读者介绍了老舍的平民生活。', '25.8','7折以上',  '25.8', '舒乙', '华文出版社', '2011年12月', '97万', '文艺');
INSERT INTO `bs_book` VALUES ('20', '5','img/product/md/25065335-1_w_15.jpg','img/product/lg/25065335-1_u_15.jpg','你自以为的极限，只是别人的起点','百万级畅销书作家特立独行的猫重磅新作，写给渴望突破瓶颈、实现快速跨越的你。', '33.3','7折以上',  '33.3', '特立独行的猫', '武汉出版社', '2017年05月', '97万', '人文社科');
INSERT INTO `bs_book` VALUES ('21', '7','img/product/md/25065335-1_w_15.jpg','img/product/lg/25065335-1_u_15.jpg','你自以为的极限，只是别人的起点','百万级畅销书作家特立独行的猫重磅新作，写给渴望突破瓶颈、实现快速跨越的你。', '33.3','7折以上',  '33.3', '特立独行的猫', '武汉出版社', '2017年05月', '97万', '童书');
INSERT INTO `bs_book` VALUES ('22', '7','img/product/md/25065335-1_w_15.jpg','img/product/lg/25065335-1_u_15.jpg','你自以为的极限，只是别人的起点','百万级畅销书作家特立独行的猫重磅新作，写给渴望突破瓶颈、实现快速跨越的你。', '33.3','7折以上',  '33.3', '特立独行的猫', '武汉出版社', '2017年05月', '97万', '童书');
INSERT INTO `bs_book` VALUES ('23', '7','img/product/md/25065335-1_w_15.jpg','img/product/lg/25065335-1_u_15.jpg','你自以为的极限，只是别人的起点','百万级畅销书作家特立独行的猫重磅新作，写给渴望突破瓶颈、实现快速跨越的你。', '33.3','7折以上',  '33.3', '特立独行的猫', '武汉出版社', '2017年05月', '97万', '童书');
INSERT INTO `bs_book` VALUES ('24', '6','img/product/md/25065335-1_w_15.jpg','img/product/lg/25065335-1_u_15.jpg','你自以为的极限，只是别人的起点','百万级畅销书作家特立独行的猫重磅新作，写给渴望突破瓶颈、实现快速跨越的你。', '33.3','7折以上',  '33.3', '特立独行的猫', '武汉出版社', '2017年05月', '97万', '生活');
INSERT INTO `bs_book` VALUES ('25', '6','img/product/md/25065335-1_w_15.jpg','img/product/lg/25065335-1_u_15.jpg','你自以为的极限，只是别人的起点','百万级畅销书作家特立独行的猫重磅新作，写给渴望突破瓶颈、实现快速跨越的你。', '33.3','7折以上',  '33.3', '特立独行的猫', '武汉出版社', '2017年05月', '97万', '生活');
INSERT INTO `bs_book` VALUES ('26', '6','img/product/md/25065335-1_w_15.jpg','img/product/lg/25065335-1_u_15.jpg','你自以为的极限，只是别人的起点','百万级畅销书作家特立独行的猫重磅新作，写给渴望突破瓶颈、实现快速跨越的你。', '33.3','7折以上',  '33.3', '特立独行的猫', '武汉出版社', '2017年05月', '97万', '生活');
INSERT INTO `bs_book` VALUES ('27', '4','img/product/md/25065335-1_w_15.jpg','img/product/lg/25065335-1_u_15.jpg','你自以为的极限，只是别人的起点','百万级畅销书作家特立独行的猫重磅新作，写给渴望突破瓶颈、实现快速跨越的你。', '33.3','7折以上',  '33.3', '特立独行的猫', '武汉出版社', '2017年05月', '97万', '经营');
INSERT INTO `bs_book` VALUES ('28', '4','img/product/md/25065335-1_w_15.jpg','img/product/lg/25065335-1_u_15.jpg','你自以为的极限，只是别人的起点','百万级畅销书作家特立独行的猫重磅新作，写给渴望突破瓶颈、实现快速跨越的你。', '33.3','7折以上',  '33.3', '特立独行的猫', '武汉出版社', '2017年05月', '97万', '经营');
INSERT INTO `bs_book` VALUES ('29', '4','img/product/md/25065335-1_w_15.jpg','img/product/lg/25065335-1_u_15.jpg','你自以为的极限，只是别人的起点','百万级畅销书作家特立独行的猫重磅新作，写给渴望突破瓶颈、实现快速跨越的你。', '33.3','7折以上',  '33.3', '特立独行的猫', '武汉出版社', '2017年05月', '97万', '经营');
INSERT INTO `bs_book` VALUES ('30', '3','img/product/md/25065335-1_w_15.jpg','img/product/lg/25065335-1_u_15.jpg','你自以为的极限，只是别人的起点','百万级畅销书作家特立独行的猫重磅新作，写给渴望突破瓶颈、实现快速跨越的你。', '33.3','7折以上',  '33.3', '特立独行的猫', '武汉出版社', '2017年05月', '97万', '科技');
INSERT INTO `bs_book` VALUES ('31', '3','img/product/md/25065335-1_w_15.jpg','img/product/lg/25065335-1_u_15.jpg','你自以为的极限，只是别人的起点','百万级畅销书作家特立独行的猫重磅新作，写给渴望突破瓶颈、实现快速跨越的你。', '33.3','7折以上',  '33.3', '特立独行的猫', '武汉出版社', '2017年05月', '97万', '科技');
INSERT INTO `bs_book` VALUES ('32', '3','img/product/md/25065335-1_w_15.jpg','img/product/lg/25065335-1_u_15.jpg','你自以为的极限，只是别人的起点','百万级畅销书作家特立独行的猫重磅新作，写给渴望突破瓶颈、实现快速跨越的你。', '33.3','7折以上',  '33.3', '特立独行的猫', '武汉出版社', '2017年05月', '97万', '科技');

-- ----------------------------
-- Table structure for `bs_book_family`
-- ----------------------------
DROP TABLE IF EXISTS `bs_book_family`;
CREATE TABLE `bs_book_family` (
  `fid` int(11) NOT NULL auto_increment,
  `fname` varchar(32) default NULL,
  `fnames` varchar(128) default NULL,
  `class` varchar(128) default NULL,
  PRIMARY KEY  (`fid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bs_book_family
-- ----------------------------
INSERT INTO `bs_book_family` VALUES ('1', '教育','教材|外语|考试|中小学教辅|工具书','history');
INSERT INTO `bs_book_family` VALUES ('2', '文艺','文学|传记|艺术|摄影','literature');
INSERT INTO `bs_book_family` VALUES ('3', '童书','科普/百科|绘本|文学|英语','juvenile');
INSERT INTO `bs_book_family` VALUES ('4', '生活','两性|孕期|育儿|亲子/家教|保健|运动|美妆|家居|美食|旅游|休闲|手工|风水','social');
INSERT INTO `bs_book_family` VALUES ('5', '人文社科','历史|古籍|哲学/宗教|文化政治/军事|法律|社会|科学|心理学','novel');
INSERT INTO `bs_book_family` VALUES ('6', '经营','经济|管理|投资|理财','enconomy');
INSERT INTO `bs_book_family` VALUES ('7', '科技','科普|建筑|医学|计算机|农林|自然|科学|工业','enconomy');


-- ----------------------------
-- Table structure for `bs_order`
-- ----------------------------
DROP TABLE IF EXISTS `bs_order`;
CREATE TABLE `bs_order` (
  `aid` int(11) NOT NULL auto_increment,
  `user_id` int(11) default NULL,
  `address_id` int(11) default NULL,
  `status` int(11) default NULL,
  `order_time` bigint(20) default NULL,
  `pay_time` bigint(20) default NULL,
  `deliver_time` bigint(20) default NULL,
  `received_time` bigint(20) default NULL,
  PRIMARY KEY  (`aid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bs_order
-- ----------------------------
INSERT INTO `bs_order` VALUES ('1', '1','1','1','1508427131','','','');
INSERT INTO `bs_order` VALUES ('2', '1','2','2','1508427131','1508427131','','');
INSERT INTO `bs_order` VALUES ('3', '1','1','3','1508427131','1508427131','1508427131','');
INSERT INTO `bs_order` VALUES ('4', '1','2','4','1508427131','1508427131','1508427131','1508427131');
INSERT INTO `bs_order` VALUES ('5', '1','1','5','','','','');
-- ----------------------------
-- Table structure for `bs_order_detail`
-- ----------------------------
DROP TABLE IF EXISTS `bs_order_detail`;
CREATE TABLE `bs_order_detail` (
  `did` int(11) NOT NULL auto_increment,
  `order_id` int(11) default NULL,
  `product_id` int(11) default NULL,
  `count` int(11) default NULL,
  PRIMARY KEY  (`did`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bs_order_detail
-- ----------------------------
INSERT INTO `bs_order_detail` VALUES ('1', '1','1','5');
INSERT INTO `bs_order_detail` VALUES ('2', '1','2','5');
INSERT INTO `bs_order_detail` VALUES ('3', '2','3','5');
INSERT INTO `bs_order_detail` VALUES ('4', '2','4','5');
INSERT INTO `bs_order_detail` VALUES ('5', '3','5','5');
INSERT INTO `bs_order_detail` VALUES ('6', '3','6','5');
INSERT INTO `bs_order_detail` VALUES ('7', '4','7','5');
INSERT INTO `bs_order_detail` VALUES ('8', '4','8','5');
INSERT INTO `bs_order_detail` VALUES ('9', '5','9','5');
INSERT INTO `bs_order_detail` VALUES ('10', '5','10','5');
-- ----------------------------
-- Table structure for `bs_receiver_address`
-- ----------------------------
DROP TABLE IF EXISTS `bs_receiver_address`;
CREATE TABLE `bs_receiver_address` (
  `aid` int(11) NOT NULL auto_increment,
  `user_id` int(11) default NULL,
  `receiver` varchar(16) default NULL,
  `province` varchar(16) default NULL,
  `city` varchar(16) default NULL,
  `county` varchar(16) default NULL,
  `address` varchar(128) default NULL,
  `cellphone` varchar(16) default NULL,
  `fixedphone` varchar(16) default NULL,
  `postcode` char(6) default NULL,
  `tag` varchar(16) default NULL,
  `is_default` tinyint(1) default NULL,
  PRIMARY KEY  (`aid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bs_receiver_address
-- ----------------------------
INSERT INTO `bs_receiver_address` VALUES ('1', '1','小明','广东','广州','天河','大众路99号','13637789098','','510000','','1');
INSERT INTO `bs_receiver_address` VALUES ('2', '1','小华','福建','厦门','波兰谷','里斯岛1号','13637000098','','510333','','0');
-- ----------------------------
-- Table structure for `bs_shopping_cart`
-- ----------------------------
DROP TABLE IF EXISTS `bs_shopping_cart`;
CREATE TABLE `bs_shopping_cart` (
  `cid` int(11) NOT NULL auto_increment,
  `user_id` int(11) default NULL,
  `product_id` int(11) default NULL,
  `count` int(11) default NULL,
  PRIMARY KEY  (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bs_shopping_cart
-- ----------------------------
INSERT INTO `bs_shopping_cart` VALUES ('1', '1', '1', '1');
INSERT INTO `bs_shopping_cart` VALUES ('2', '2', '1', '1');
INSERT INTO `bs_shopping_cart` VALUES ('3', '3', '1', '1');
INSERT INTO `bs_shopping_cart` VALUES ('4', '4', '1', '1');
INSERT INTO `bs_shopping_cart` VALUES ('5', '5', '1', '1');
INSERT INTO `bs_shopping_cart` VALUES ('6', '6', '1', '1');
INSERT INTO `bs_shopping_cart` VALUES ('7', '7', '7', '1');
INSERT INTO `bs_shopping_cart` VALUES ('8', '8', '8', '1');
INSERT INTO `bs_shopping_cart` VALUES ('9', '9', '9', '1');
INSERT INTO `bs_shopping_cart` VALUES ('10', '10', '10', '1');

-- ----------------------------
-- Table structure for `bs_user`
-- ----------------------------
DROP TABLE IF EXISTS `bs_user`;
CREATE TABLE `bs_user` (
  `uid` int(11) NOT NULL auto_increment,
  `uname` varchar(32) default NULL,
  `upwd` varchar(32) default NULL,
  `email` varchar(64) default NULL,
  `phone` varchar(16) default NULL,
  `avatar` varchar(128) default NULL,
  `user_name` varchar(32) default NULL,
  `gender` int(11) default NULL,
  PRIMARY KEY  (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bs_user
-- ----------------------------
INSERT INTO `bs_user` VALUES ('1', 'dingding', '123456', 'ding@qq.com', '13511011000', 'img/avatar/default.png', '丁春秋', '0');
INSERT INTO `bs_user` VALUES ('2', 'dangdang', '123456', 'dang@qq.com', '13501234568', 'img/avatar/default.png', '当当喵', '1');
INSERT INTO `bs_user` VALUES ('3', 'doudou', '123456', 'dou@qq.com', '13501234569', 'img/avatar/default.png', '窦志强', '1');
INSERT INTO `bs_user` VALUES ('4', 'yaya', '123456', 'ya@qq.com', '13501234560', 'img/avatar/default.png', '秦小雅', '0');
INSERT INTO `bs_user` VALUES ('5', 'money', '111111', '441977193@qq.com', '18357100796', 'img/avatar/default.png', '洛索洛芬', 1);
INSERT INTO `bs_user` VALUES ('6', 'fengfeng', '123456', '123@qq.com', '13538894495', 'img/avatar/default.png', '吴艺璇', 0);
INSERT INTO `bs_user` VALUES ('7', 'panda', '123456', '11@qq.com', '13512312312', 'img/avatar/default.png', '李明轩', 0);
INSERT INTO `bs_user` VALUES ('8', 'Aremy', '123456', '491000888@qq.com', '13213389258', 'img/avatar/default.png', '兰小明', 1);
INSERT INTO `bs_user` VALUES ('9', 'liwe', '123456', 'ding@qq.com', '13511011000', 'img/avatar/default.png', '丁春秋', '0');
INSERT INTO `bs_user` VALUES ('10', 'dd', '123456', 'dang@qq.com', '13501234568', 'img/avatar/default.png', '当当喵', '1');
INSERT INTO `bs_user` VALUES ('11', 'shishi', '123456', 'dou@qq.com', '13501234569', 'img/avatar/default.png', '窦志强', '1');
INSERT INTO `bs_user` VALUES ('12', 'koukou', '123456', 'ya@qq.com', '13501234560', 'img/avatar/default.png', '秦小雅', '0');
INSERT INTO `bs_user` VALUES ('13', 'keke', '111111', '441977193@qq.com', '18357100796', 'img/avatar/default.png', '洛索洛芬', 1);
INSERT INTO `bs_user` VALUES ('14', 'suxinmei', '123456', '123@qq.com', '13538894495', 'img/avatar/default.png', '吴艺璇', 0);
INSERT INTO `bs_user` VALUES ('15', 'sumeina', '123456', '11@qq.com', '13512312312', 'img/avatar/default.png', '李明轩', 0);
INSERT INTO `bs_user` VALUES ('16', 'suweimei', '123456', '491000888@qq.com', '13213389258', 'img/avatar/default.png', '兰小明', 1);
INSERT INTO `bs_user` VALUES ('17', 'libei', '123456', 'ding@qq.com', '13511011000', 'img/avatar/default.png', '丁春秋', '0');
INSERT INTO `bs_user` VALUES ('18', 'susu', '123456', 'dang@qq.com', '13501234568', 'img/avatar/default.png', '当当喵', '1');
INSERT INTO `bs_user` VALUES ('19', 'kiki', '123456', 'dou@qq.com', '13501234569', 'img/avatar/default.png', '窦志强', '1');
INSERT INTO `bs_user` VALUES ('20', 'lala', '123456', 'ya@qq.com', '13501234560', 'img/avatar/default.png', '秦小雅', '0');
INSERT INTO `bs_user` VALUES ('21', 'popo', '111111', '441977193@qq.com', '18357100796', 'img/avatar/default.png', '洛索洛芬', 1);
INSERT INTO `bs_user` VALUES ('22', 'gugu', '123456', '123@qq.com', '13538894495', 'img/avatar/default.png', '吴艺璇', 0);
INSERT INTO `bs_user` VALUES ('23', 'yinyin', '123456', '11@qq.com', '13512312312', 'img/avatar/default.png', '李明轩', 0);
INSERT INTO `bs_user` VALUES ('24', 'mywo', '123456', '491000888@qq.com', '13213389258', 'img/avatar/default.png', '兰小明', 1);
INSERT INTO `bs_user` VALUES ('25', 'weara', '123456', 'ding@qq.com', '13511011000', 'img/avatar/default.png', '丁春秋', '0');
INSERT INTO `bs_user` VALUES ('26', 'yous', '123456', 'dang@qq.com', '13501234568', 'img/avatar/default.png', '当当喵', '1');
INSERT INTO `bs_user` VALUES ('27', 'hei', '123456', 'dou@qq.com', '13501234569', 'img/avatar/default.png', '窦志强', '1');
INSERT INTO `bs_user` VALUES ('28', 'sheu', '123456', 'ya@qq.com', '13501234560', 'img/avatar/default.png', '秦小雅', '0');
INSERT INTO `bs_user` VALUES ('29', 'shea', '111111', '441977193@qq.com', '18357100796', 'img/avatar/default.png', '洛索洛芬', 1);
INSERT INTO `bs_user` VALUES ('30', 'shere', '123456', '123@qq.com', '13538894495', 'img/avatar/default.png', '吴艺璇', 0);
INSERT INTO `bs_user` VALUES ('31', 'pink', '123456', '11@qq.com', '13512312312', 'img/avatar/default.png', '李明轩', 0);
INSERT INTO `bs_user` VALUES ('32', 'pig', '123456', '491000888@qq.com', '13213389258', 'img/avatar/default.png', '兰小明', 1);


-- ----------------------------
-- Table structure for `bs_comment`
-- ----------------------------
DROP TABLE IF EXISTS `bs_comment`;
CREATE TABLE `bs_comment` (
  `cid` int(11) NOT NULL auto_increment,
  `user_id` int(11) default NULL,
  `product_id` int(11) default NULL,
  `comment` varchar(128) default NULL,
  PRIMARY KEY  (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bs_comment
-- ----------------------------
INSERT INTO `bs_comment` VALUES ('1', '1','1', '怒赞');
INSERT INTO `bs_comment` VALUES ('2', '2','2', '很好');
INSERT INTO `bs_comment` VALUES ('3', '3','3', '满意');
INSERT INTO `bs_comment` VALUES ('4', '4','4', '一般');
INSERT INTO `bs_comment` VALUES ('5', '5','5', '差评');
INSERT INTO `bs_comment` VALUES ('6', '6','6', '满意');
INSERT INTO `bs_comment` VALUES ('7', '7','7', '满意');
INSERT INTO `bs_comment` VALUES ('8', '8','8', '满意');
INSERT INTO `bs_comment` VALUES ('9', '9','9', '满意');
INSERT INTO `bs_comment` VALUES ('10', '10','10', '满意');
-- ----------------------------
-- Table structure for `bs_book`
-- ----------------------------
DROP TABLE IF EXISTS `bs_collection`;
CREATE TABLE `bs_collection` (
  `lid` int(11) NOT NULL auto_increment,
  `user_id` int(11) default NULL,
  `product_id` int(11) default NULL,
  `md` varchar(128) default NULL,
  `subtitle` varchar(128) default NULL,
  `price` decimal(10,2) default NULL,
  `fixprice` decimal(10,2) default NULL,
  PRIMARY KEY  (`lid`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bs_book
-- ----------------------------
INSERT INTO `bs_collection` VALUES ('1', '1','1', 'img/product/md/25138892-1_w_8.jpg', 'Michael钱儿频道 主笔钱儿妈人气好文首度结集，一部让父母们不再迷惘焦虑的安心之书，一位国际视野妈妈的育儿心经。全网阅读量超过6000万次，知名教育专家刘称莲、粲然、蔡朝阳鼎力推荐。', '49.5', '49.5');
INSERT INTO `bs_collection` VALUES ('2', '2','2', 'img/product/md/25138892-1_w_8.jpg', 'Michael钱儿频道 主笔钱儿妈人气好文首度结集，一部让父母们不再迷惘焦虑的安心之书，一位国际视野妈妈的育儿心经。全网阅读量超过6000万次，知名教育专家刘称莲、粲然、蔡朝阳鼎力推荐。', '49.5', '49.5');
INSERT INTO `bs_collection` VALUES ('3', '3','3', 'img/product/md/25138892-1_w_8.jpg', 'Michael钱儿频道 主笔钱儿妈人气好文首度结集，一部让父母们不再迷惘焦虑的安心之书，一位国际视野妈妈的育儿心经。全网阅读量超过6000万次，知名教育专家刘称莲、粲然、蔡朝阳鼎力推荐。', '49.5', '49.5');
