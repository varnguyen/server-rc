-- -------------------------------------------------------------
-- TablePlus 3.1.2(296)
--
-- https://tableplus.com/
--
-- Database: db_node_api
-- Generation Time: 2020-03-08 22:27:55.8530
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `emal` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE `rc_companys` (
  `address` varchar(255) DEFAULT NULL,
  `company_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `member_total` int(11) NOT NULL DEFAULT '0',
  `date_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_upd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `job_id` int(11) DEFAULT '-1',
  `province_id` int(11) DEFAULT '-1',
  `short_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

CREATE TABLE `rc_jobs` (
  `job_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `job_name` varchar(255) NOT NULL,
  `date_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_upd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`job_id`),
  UNIQUE KEY `job_id` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE `rc_provinces` (
  `province_id` bigint(20) unsigned NOT NULL,
  `province_name` varchar(255) NOT NULL,
  `date_add` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_upd` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`province_id`),
  UNIQUE KEY `province_id` (`province_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `rc_users` (
  `user_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `gender` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '0: female 1: male',
  `nick_name` varchar(100) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(64) DEFAULT NULL,
  `password` varchar(512) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `birthday` date DEFAULT NULL,
  `active` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `date_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_upd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  KEY `customer_email` (`email`) USING BTREE,
  KEY `customer_login` (`email`,`password`(255)) USING BTREE,
  KEY `id_customer_passwd` (`user_id`,`password`(255)) USING BTREE,
  KEY `id_gender` (`gender`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

INSERT INTO `products` (`id`, `name`, `color`, `price`, `emal`) VALUES
('1', 'Iphone X', 'Black', '1000000', NULL),
('2', 'Samsung S9', 'White', '1240000', NULL),
('3', 'Oppo F5', 'Red', '7000000', NULL),
('4', 'Vertu', 'Green', '80000000', NULL),
('5', 'Vertu 222', 'Green 2222', '80000000', NULL);

INSERT INTO `rc_companys` (`address`, `company_id`, `full_name`, `member_total`, `date_add`, `date_upd`, `job_id`, `province_id`, `short_name`) VALUES
('200 Cầu Giấy, Nghĩa Đô, Hoàng Quốc Việt, Hà Nội', '1', 'Công ty Cổ phẩn công nghệ GVN Technology', '100', '2020-03-06 10:36:41', '2020-03-06 10:36:41', NULL, NULL, 'xxx'),
('201 Cầu Giấy, Nghĩa Đô, Hoàng Quốc Việt, Hà Nội', '2', 'Công ty TNHH Thiên ngọc Minh Uy', '20', '2020-03-06 10:36:41', '2020-03-06 10:36:41', NULL, NULL, 'ccc'),
('202 Cầu Giấy, Nghĩa Đô, Hoàng Quốc Việt, Hà Nội', '3', 'Công ty Cổ phần đầu tư và phát triển', '250', '2020-03-06 10:36:41', '2020-03-06 10:36:41', NULL, NULL, 'ddd'),
('203 Cầu Giấy, Nghĩa Đô, Hoàng Quốc Việt, Hà Nội', '4', 'Công ty Công nghệ VNext', '70', '2020-03-06 10:36:41', '2020-03-06 10:36:41', NULL, NULL, 'aaa'),
('204 Cầu Giấy, Nghĩa Đô, Hoàng Quốc Việt, Hà Nội', '5', 'Công ty Xây dựng', '30', '2020-03-06 10:36:41', '2020-03-06 10:36:41', NULL, NULL, 'ddd'),
('205 Cầu Giấy, Nghĩa Đô, Hoàng Quốc Việt, Hà Nội', '6', 'Công ty Bất động sản HQV', '40', '2020-03-06 10:36:41', '2020-03-06 10:36:41', NULL, NULL, 'sss'),
('206 Cầu Giấy, Nghĩa Đô, Hoàng Quốc Việt, Hà Nội', '7', 'Binh đoàn 789 HQV', '35', '2020-03-06 10:36:41', '2020-03-06 10:36:41', NULL, NULL, 'zzz'),
('207 Cầu Giấy, Nghĩa Đô, Hoàng Quốc Việt, Hà Nội', '8', 'NavaTech tầng 8 Hoàng Quốc Việt', '42', '2020-03-06 10:36:41', '2020-03-06 10:36:41', NULL, NULL, 'nnn'),
('208 Cầu Giấy, Nghĩa Đô, Hoàng Quốc Việt, Hà Nội', '9', 'Công ty VietIS Technology', '15', '2020-03-06 10:36:41', '2020-03-06 10:36:41', NULL, NULL, 'mmm');

INSERT INTO `rc_jobs` (`job_id`, `job_name`, `date_add`, `date_upd`) VALUES
('1', 'Công nghệ thông tin', '2020-03-08 21:06:20', '2020-03-08 21:06:20'),
('2', 'Y tế', '2020-03-08 21:07:03', '2020-03-08 21:07:03'),
('3', 'Viễn thông', '2020-03-08 21:07:03', '2020-03-08 21:07:03'),
('4', 'Giáo dục', '2020-03-08 21:07:03', '2020-03-08 21:07:03');

INSERT INTO `rc_provinces` (`province_id`, `province_name`, `date_add`, `date_upd`, `type`) VALUES
('1', 'Hà Nội', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Thành Phố'),
('2', 'Hà Giang', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('4', 'Cao Bằng', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('6', 'Bắc Kạn', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('8', 'Tuyên Quang', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('10', 'Lào Cai', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('11', 'Điện Biên', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('12', 'Lai Châu', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('14', 'Sơn La', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('15', 'Yên Bái', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('17', 'Hòa Bình', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('19', 'Thái Nguyên', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('20', 'Lạng Sơn', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('22', 'Quảng Ninh', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('24', 'Bắc Giang', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('25', 'Phú Thọ', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('26', 'Vĩnh Phúc', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('27', 'Bắc Ninh', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('30', 'Hải Dương', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('31', 'Hải Phòng', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Thành Phố'),
('33', 'Hưng Yên', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('34', 'Thái Bình', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('35', 'Hà Nam', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('36', 'Nam Định', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('37', 'Ninh Bình', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('38', 'Thanh Hóa', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('40', 'Nghệ An', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('42', 'Hà Tĩnh', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('44', 'Quảng Bình', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('45', 'Quảng Trị', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('46', 'Thừa Thiên Huế', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('48', 'Đà Nẵng', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Thành Phố'),
('49', 'Quảng Nam', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('51', 'Quảng Ngãi', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('52', 'Bình Định', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('54', 'Phú Yên', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('56', 'Khánh Hòa', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('58', 'Ninh Thuận', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('60', 'Bình Thuận', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('62', 'Kon Tum', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('64', 'Gia Lai', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('66', 'Đắk Lắk', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('67', 'Đắk Nông', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('68', 'Lâm Đồng', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('70', 'Bình Phước', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('72', 'Tây Ninh', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('74', 'Bình Dương', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('75', 'Đồng Nai', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('77', 'Bà Rịa - Vũng Tàu', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('79', 'Hồ Chí Minh', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Thành Phố'),
('80', 'Long An', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('82', 'Tiền Giang', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('83', 'Bến Tre', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('84', 'Trà Vinh', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('86', 'Vĩnh Long', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('87', 'Đồng Tháp', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('89', 'An Giang', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('91', 'Kiên Giang', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('92', 'Cần Thơ', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Thành Phố'),
('93', 'Hậu Giang', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('94', 'Sóc Trăng', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('95', 'Bạc Liêu', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh'),
('96', 'Cà Mau', '2020-03-07 21:40:20', '2020-03-07 21:40:20', 'Tỉnh');

INSERT INTO `rc_users` (`user_id`, `gender`, `nick_name`, `first_name`, `last_name`, `email`, `phone`, `password`, `description`, `birthday`, `active`, `deleted`, `date_add`, `date_upd`) VALUES
('34', '1', 'Duy DVC', '', '', 'updatetest@gmail.com', '0987456123', '$2a$10$EhSqxndxV0f78akTfG9xY.o5Qtng6h6vIGmRCR3duh/XrDYxHx57C', '', '1996-12-09', '0', '0', '2020-03-05 14:17:22', '2020-03-05 14:17:22'),
('35', '1', ' Sơn Tùng MTP', 'Sơn Tùng', 'MTP', 'minh1@gmail.com', '0362615487', '$2a$10$V/eF.TfB6Wlx23DLQBcNfeliQL8AKt5GDwD3bX2nnogjKmY8Ay/Gy', 'vv', '1997-12-09', '1', '0', '2019-12-09 03:45:38', '2020-03-02 15:39:32'),
('36', '1', 'Kimochi', 'Aizono', 'Tsutomu', 'wow@gmail.com', '0987654213', '$2a$10$RXIh6fGW53c/9V0t/9RfQOHLfjvAvmKJHTQVPaf6kCHnQdla6UqxS', 'Mô tả', '1960-07-12', '1', '0', '2019-12-09 04:12:30', '2020-02-27 09:42:46'),
('37', '1', 'dragon@gmail.com', NULL, NULL, 'dragon@gmail.com', '0967166818', '$2a$10$es/XHSFrY7nfWKF3DFLELecKKdRFCGgqhsOCf0L8.FxNlCumT3/sG', NULL, '1995-12-09', '1', '0', '2019-12-09 06:37:17', '2019-12-09 06:37:17'),
('38', '1', 'Hua Linh', 'Linh', 'Hua', 'hualinh1012_1@gmail.com', '0354988696', '$2a$10$Q/SWEcIFthIqS6tYDOMkG.L/GNhMPFlUdeV9tY44/sbpjGGApyCeK', 'hjhj', '1996-12-10', '1', '0', '2019-12-09 06:41:41', '2020-02-21 07:14:09'),
('39', '1', 'Annie', 'effef', 't', 'annie@gmail.com', '0136538696', '$2a$10$/MmCacP.yfnD4U7guQGPBO0dTIUAnj7c5QI89GilL9yKOkMEgO2E6', 'Đọc truyện', '1996-09-06', '1', '0', '2019-12-09 06:49:47', '2019-12-10 02:52:41'),
('40', '1', 'Hải Nam', 'goij', 'gai', 'vn.apnic@gmail.com', '0963190925', '$2a$10$UYIAgGSrKO5LsreiKBiPNOdsfwVYmIz6oZIWla02QoZM5K2qtU59O', 'Bác sỹnndndndmmdndmdmdmdknubybybybyby y ybybybu yubbynubynunuutjkfrjjrjrjrjfjdjfjfkfjfkdkdkdmcmxmxmxmmxxmmxmxmcmcmcmxkcndmfmfnfjfkfmfnfjfjfjfjfnfjjfkfjfkfjfjfjfkfjdjdjdmdndnfjfjnfmfncjcjckcmcnfjfkfmfjfmfjfnfjmfnfmfnfmfnfmfnf', '1992-09-25', '1', '0', '2019-12-09 07:21:33', '2020-02-28 16:43:54'),
('41', '1', 'Đen Vâu', 'a', 'b', 'minh2@gmail.com', '0906393582', '$2a$10$pRbdEkQSHpRA6OaRHv29m.eLb60o0AUzxgIEsCK09zCeG6TLLZmcC', 'Ca sỹ', '1996-12-09', '1', '0', '2019-12-09 09:10:44', '2019-12-09 09:49:49'),
('42', '1', 'Tú', 'y', 'y', 'tu@gmail.com', '0395351723', 'e10adc3949ba59abbe56e057f20f883e', 'Bán hàng online', '1995-01-10', '1', '0', '2019-12-10 01:00:02', '2019-12-10 03:16:03'),
('43', '1', 'Bùi Hải Nam', 'Nam', 'Hải', 'hainam@gmail.com', '0963190925', '$2a$10$SOVmov882l4ctsgc.hxw.uiGBBYFplHgfb1AWm5nJMrG8QOki2vlm', 'Tôi chuyên bán CI Game', '1992-09-25', '1', '0', '2019-12-10 02:32:06', '2019-12-10 02:55:33'),
('44', '1', 'Chim Sẻ Đi Nắng', 'ghj', 'hhhhh', 'minh3@gmail.com', '0963852741', '$2a$10$XLg/gZpEAOrsIzpjL/uVku7MxoOyD3AGIulq41hbyVfRRYgG5P9Mu', 'Gamer', '1996-03-10', '1', '0', '2019-12-10 02:45:24', '2019-12-16 14:59:40'),
('45', '1', 'Tu Ido', 'adoan', 'ngoc', 't@gmail.com', '0395351723', '$2a$10$VcEbc85xw3BZ3rC1wR4xr.vg7LTRH00YD79kbtC3RlrDmzzzRunQi', 'hihi', '2019-11-08', '1', '0', '2019-12-10 04:07:03', '2019-12-18 08:46:58'),
('46', '1', 'Quang Tú', NULL, NULL, 'quangtu2208@gmail.com', '0979663310', '$2a$10$XsmI3A9RMnpUbbgZ.dSr/O3xww6wCpmMKBn1EgnQnHk.v34FUp/9e', '123', '1996-08-22', '1', '0', '2019-12-10 09:03:41', '2019-12-10 09:03:41'),
('47', '1', 'Trấn Thành', ' Thành', 'Trấn', 'minh4@gmail.com', '0963963963', '$2a$10$dDPgi42kSrkZ/5IVfB3Er.WCSF8i7WoyR/w3irqqOedvOqgg3htZi', 'Diễn viên ', '1982-12-16', '1', '0', '2019-12-16 06:24:19', '2019-12-16 15:03:03'),
('48', '2', 'Hariwon', 'Hariwon', 'Hari', 'minh5@gmail.com', '0963852852', '$2a$10$WxK8W.JAmejypG8xlFTXPOu8tioe2hEDUFL5bPFMpKUh/kov8LHnq', 'Ca sỹ', '1994-12-16', '1', '0', '2019-12-16 07:43:27', '2019-12-16 07:48:56'),
('49', '2', 'Misthy', 'Misthy', 'Misthy', 'minh6@gmail.com', '0963963963', '$2a$10$6ukOQ1NAMzl3uLj/8s5PE./DRfOCdjyB2RfqLk1cQN7NXNfLZT.0m', 'Streamer', '1993-12-16', '1', '1', '2019-12-16 08:54:42', '2019-12-16 09:00:18'),
('51', '2', 'Chu Duyên Bún', 'Bún', 'Chu Duyên', 'minh8@gmail.com', '0985285296', '$2a$10$5Fs02vXC28ehew89JT3QMeDobSWSRokK4M.b0LswNAPczv3DxE7j6', 'Ca sỹ', '1993-12-16', '1', '0', '2019-12-16 09:30:26', '2019-12-16 17:07:43'),
('52', '2', 'Jun Vũ', 'Vũ', 'Jun', 'minh9@gmail.com', '0985285285', '$2a$10$iLT1knJ3k1cS3zIhOtevqeBFlhMX6VByEJGY2NlqsgGfu2QW.gGnC', 'Diễn viên', '1995-12-16', '1', '0', '2019-12-16 09:39:55', '2019-12-16 09:43:36'),
('53', '2', 'Linh Zuto', 'Linh', 'Zuto', 'minh10@gmail.com', '0963963963', '$2a$10$0qwiGyMCqgGP4HJLFgwg2.QPovlmjO7wms4W4zX6Wo9XKrYOjC3Fa', 'Streamer', '2004-12-16', '1', '0', '2019-12-16 09:48:10', '2019-12-17 08:56:00'),
('56', '2', 'An Ngụy', 'An', 'Ngụy', 'minh13@gmail.com', '0963963963', '$2a$10$OIn/9BqIXw36VLycFFIUKefoRqpvCABz7l8qJ1Af6cVysH45R7/Sq', 'Diễn viên', '1991-12-17', '1', '0', '2019-12-17 07:59:45', '2019-12-17 08:06:23'),
('57', '2', 'Nhã Phương', 'Phương', 'Nhã', 'minh14@gmail.com', '0963963963', '$2a$10$ZIRr6UcV5URKpJUpGf7mDuJsMyFNOVfm/wRF6QRFdcvsChyCK84zW', 'Diễn viên', '1995-12-17', '1', '0', '2019-12-17 08:14:45', '2019-12-17 08:21:25'),
('58', '2', '', '', '', 'minh15@gmail.com', '0996363636', '$2a$10$7j543HG3VliL73DBnD2AeuH3W4GFwjhZfjUcNIVLbORI2.KKmFICm', '', '1988-12-17', '1', '0', '2019-12-17 08:47:55', '2020-01-09 06:30:34'),
('62', '1', 'sonata12', NULL, NULL, 'sonata12@gmail.com', '0928393118', '$2a$10$klS7fsroiRVGRtcGCZhnGeKbQlgkKOIff6dtoleh9xoVZFvqy6t5u', NULL, '1983-12-12', '1', '0', '2020-01-16 02:05:20', '2020-01-16 02:05:20'),
('63', '1', 'abcabc', NULL, NULL, 'abcabc@gmail.com', '0123456789', '$2a$10$QjfpjrFNp7ZkVJoDsMxUJOs4ZZeSuAxddUn22wCcQicIhZGXeUG3m', NULL, '2004-01-01', '1', '0', '2020-01-16 02:33:32', '2020-01-16 02:33:32'),
('64', '1', '123123', NULL, NULL, 'bbb@gmail.com', '0123456789', '$2a$10$P0oVYGQLuW6vTnMyqbt5Te2slpNUgBnmNmzW3PvdkJJ7HOyIcvbQS', NULL, '2004-01-01', '0', '0', '2020-01-16 03:09:52', '2020-01-16 03:09:52'),
('65', '1', '123123123', NULL, NULL, 'wow1@gmail.com', '0123456789', '$2a$10$usI2fzQp4SiS8ZrEY.QetO.At/4HfV7Z5r.3Nv4Eytcx1mcOZZODe', NULL, '2004-01-01', '1', '0', '2020-01-16 04:03:36', '2020-01-16 04:03:36'),
('66', '2', 'chibi', NULL, NULL, 'chibi@gmail.com', '0123456785', '$2a$10$NmL7n/bwO86fObSfiYMSH.JRoI1WNF4BybwUNX.EbyCNJOJoRdr6O', NULL, '2020-01-16', '1', '0', '2020-01-16 07:04:37', '2020-01-16 07:04:37'),
('67', '1', 'tuad', NULL, NULL, 'tu1@gmail.com', '0395351723', '$2a$10$.zNqRnfLjfvlEh5Mg3GYluQf86dRwD7ZlhOTzEf3HmT4ck5tElWby', NULL, '1995-01-15', '1', '0', '2020-01-16 08:33:39', '2020-01-16 08:33:39'),
('69', '1', 'shine4ever', NULL, NULL, 'hungdt27988@gmail.com', '0985985886', '$2a$10$Cjp0Tqx0MLh6qdDFyhQqH.tquuqO6KalDTcgcpExcT6KLIhT7Etb6', NULL, '1988-09-27', '1', '0', '2020-01-16 10:24:23', '2020-01-16 10:24:23'),
('70', '1', 'duyvp', NULL, NULL, 'duy123@gmail.com', '0979589412', '$2a$10$Au5nMEGx27Cfe4/aPP55lePScBboK/Ed9A/D5feTeM6/h4Dx2kCdi', NULL, '2004-01-01', '1', '0', '2020-02-06 01:37:43', '2020-02-06 01:37:43'),
('71', '1', 'kendo', NULL, NULL, 'kendo@gmail.com', '1234567890', '$2a$10$zO9pFRcwRanVhfwUdjeG.eR5XmB8zD992HDA0sD9V2TGy//RpT3km', NULL, '1999-01-06', '1', '0', '2020-02-06 07:02:01', '2020-02-06 07:02:01'),
('72', '1', 'minh', NULL, NULL, 'minh21@gmail.com', '0963963963', '$2a$10$UXCsEZFmZ1i9XxeQ2Z.dM.l17.TL5eUocB/SGEi2d2CJjZ4xnNZ1u', NULL, '2020-02-06', '1', '0', '2020-02-06 07:18:48', '2020-02-06 07:18:48'),
('73', '1', 'jnnnm', NULL, NULL, 'minh100@gmail.com', '0988999999', '$2a$10$NHMb8I1V3fPsHJek2frTw.qGDMYNYOjkdydBiPhT34p0oqIk.bwsG', NULL, '2020-02-06', '1', '0', '2020-02-06 09:05:23', '2020-02-06 09:05:23'),
('74', '1', 'enqtran', NULL, NULL, 'enqtran@gmail.com', '0123456789', '$2a$10$fsDFXOAmg5hFVSK5oVu7d.EYBKjGPCIK.xK8i607NjbH4D85Q2DTy', NULL, '2000-01-01', '1', '0', '2020-02-13 07:28:56', '2020-02-13 07:28:56'),
('75', '1', 'b', NULL, NULL, 'mit@gmail.com', '0963258369', '$2a$10$xujFjQHkgW60Sjdn53W4/.I.pdkM5Z9/hMC/b3j7cJpBDTDiS7Fna', NULL, '2009-02-27', '1', '0', '2020-02-27 09:35:37', '2020-02-27 09:35:37'),
('76', '1', 'Đức Thụt', 'Nguyễn', 'Minh', 'enqminh@gmail.com', '0979456789', '123456', 'If you are looking for a solution for how to get javascript unique array then your solution is the Javascript array filter() method. Primitive values in JavaScript are immutable values except for objects. Types of primitive values include Null, Undefined, Boolean, Number, Symbol and String. This tutorial also gives you the answer to the How can I get a list of unique values in array.If you are looking for a solution for how to get javascript unique array then your solution is the Java', '1995-08-29', '1', '0', '2020-02-27 11:21:19', '2020-03-02 17:53:37'),
('77', '1', 'anhpt', NULL, NULL, 'anhptse03395@gmail.com', '0982803436', '$2a$10$Y0wUa/pppfxlSpKcH.N97.UKGF3EbxeptCPgRRrQKEWQXIyZM9JTC', NULL, '1993-01-07', '1', '0', '2020-02-27 16:32:16', '2020-02-27 16:32:16'),
('78', '1', 'toantroll', NULL, NULL, 'vuongvantoan2305@gmail.com', '0393240523', '$2a$10$5.3xM7gx4hP5yzbntag2H.tZFNkg5Rd44s4BmjBZZ2lnEZWHh/bsi', NULL, '1995-05-23', '1', '0', '2020-02-28 18:13:29', '2020-02-28 18:13:29'),
('80', '1', 'Huấn Hoa Hồng', NULL, NULL, 'minhtest@gmail.com', NULL, '123456', NULL, NULL, '0', '0', '2020-03-05 14:18:33', '2020-03-05 14:18:33');




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;