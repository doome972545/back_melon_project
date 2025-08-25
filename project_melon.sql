

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2025 at 09:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_melon`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `activity_id` int(11) NOT NULL,
  `activity_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`activity_id`, `activity_name`) VALUES
(1, 'การเตรียมดิน'),
(2, 'การเตรียมโรงเรือน'),
(3, 'การเพาะกล้า'),
(4, 'การย้ายต้นกล้า'),
(5, 'การดูแลรักษา'),
(6, 'การเก็บเกี่ยว'),
(7, 'การคัดแยกและบรรจุหีบห่อ');

-- --------------------------------------------------------

--
-- Table structure for table `activities_costs`
--

CREATE TABLE `activities_costs` (
  `activities_costs_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `activities_id` int(11) DEFAULT NULL,
  `house_id` int(11) DEFAULT NULL,
  `cost_all` decimal(10,2) DEFAULT 0.00,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chart`
--

CREATE TABLE `chart` (
  `chart_id` int(11) NOT NULL,
  `cost_id` int(11) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `month` varchar(10) NOT NULL,
  `year` varchar(10) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `costs`
--

CREATE TABLE `costs` (
  `cost_id` int(11) NOT NULL,
  `activities_id` int(11) DEFAULT NULL,
  `list_id` int(11) DEFAULT NULL,
  `cost_sand` decimal(10,2) DEFAULT NULL,
  `cost_clay` decimal(10,2) DEFAULT NULL,
  `cost_pots` decimal(10,2) DEFAULT NULL,
  `cost_bags` decimal(10,2) DEFAULT NULL,
  `canShow` enum('true','false','','') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `costs`
--

INSERT INTO `costs` (`cost_id`, `activities_id`, `list_id`, `cost_sand`, `cost_clay`, `cost_pots`, `cost_bags`, `canShow`) VALUES
(1, 1, 1, 200.00, 180.00, 150.00, 170.00, 'true'),
(2, 1, 2, 45.00, 45.00, 60.00, NULL, 'true'),
(3, 1, 3, 40.00, 40.00, 40.00, NULL, 'true'),
(4, 1, 4, NULL, 800.00, 1000.00, 900.00, 'true'),
(5, 1, 5, NULL, 0.00, 0.00, NULL, 'true'),
(6, 1, 6, NULL, 250.00, 500.00, 300.00, 'true'),
(7, 1, 7, NULL, NULL, 0.00, NULL, 'true'),
(8, 1, 8, NULL, NULL, 0.00, NULL, 'true'),
(9, 1, 9, NULL, NULL, 300.00, NULL, 'true'),
(10, 1, 10, 300.00, 300.00, NULL, NULL, 'true'),
(11, 1, 11, NULL, NULL, 300.00, NULL, 'true'),
(12, 1, 12, NULL, NULL, 720.00, NULL, 'true'),
(13, 1, 13, 300.00, 300.00, 300.00, 300.00, 'true'),
(14, 2, 14, 750.00, 750.00, 750.00, 750.00, 'true'),
(15, 2, 15, 280.00, 280.00, NULL, NULL, 'true'),
(16, 2, 16, 170.00, 170.00, 170.00, 170.00, 'true'),
(17, 2, 17, 300.00, 300.00, 300.00, 300.00, 'true'),
(18, 3, 18, 650.00, 650.00, 650.00, 650.00, 'true'),
(19, 3, 19, 54.00, 54.00, 54.00, 54.00, 'true'),
(20, 3, 20, 53.00, 53.00, 53.00, 53.00, 'true'),
(21, 3, 21, 300.00, 300.00, 300.00, 300.00, 'true'),
(22, 4, 22, 10.00, 10.00, 10.00, 10.00, 'true'),
(23, 4, 23, 100.00, 100.00, 100.00, 100.00, 'true'),
(24, 4, 24, 300.00, 300.00, 300.00, 300.00, 'true'),
(25, 5, 25, 180.00, 180.00, 180.00, 180.00, 'true'),
(26, 5, 26, 214.00, NULL, NULL, NULL, 'true'),
(27, 5, 27, NULL, 173.00, 250.00, 250.00, 'true'),
(28, 5, 28, NULL, NULL, 300.00, 300.00, 'true'),
(29, 5, 29, 725.00, 725.00, 725.00, 725.00, 'true'),
(30, 5, 30, 63.00, 63.00, NULL, NULL, 'true'),
(31, 5, 31, 63.00, 63.00, NULL, NULL, 'true'),
(32, 5, 32, 170.00, 170.00, 80.00, 80.00, 'true'),
(33, 5, 33, 55.00, NULL, 205.00, 300.00, 'true'),
(34, 5, 34, NULL, 140.00, NULL, NULL, 'true'),
(35, 5, 35, 320.00, 320.00, 138.00, 100.00, 'true'),
(36, 5, 36, NULL, NULL, 160.00, NULL, 'true'),
(37, 5, 37, 182.00, 182.00, 182.00, 182.00, 'true'),
(38, 5, 38, 80.00, 80.00, 80.00, 80.00, 'true'),
(39, 5, 39, 2813.00, 2813.00, 2813.00, 2813.00, 'true'),
(40, 6, 40, 20.00, 20.00, 20.00, 20.00, 'true'),
(41, 6, 41, 110.00, 110.00, 110.00, 110.00, 'true'),
(42, 6, 42, 600.00, 600.00, 600.00, 600.00, 'true'),
(43, 7, 43, 17.00, 17.00, 17.00, 17.00, 'true'),
(44, 7, 44, 350.00, 350.00, 350.00, 350.00, 'true'),
(45, 7, 45, 660.00, 660.00, 660.00, 660.00, 'true'),
(46, 7, 46, 600.00, 600.00, 600.00, 600.00, 'true');

-- --------------------------------------------------------

--
-- Table structure for table `list`
--

CREATE TABLE `list` (
  `list_id` int(11) NOT NULL,
  `list_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list`
--

INSERT INTO `list` (`list_id`, `list_name`) VALUES
(1, 'ปุ๋ยคอก'),
(2, 'ปูนขาว\r\n'),
(3, 'แกลบสด'),
(4, 'กาบมะพร้าวสับ'),
(5, 'กาบมะพร้าวละเอียด'),
(6, 'แกลบดำ'),
(7, 'กากน้ำตาล'),
(8, 'น้ำหมัก'),
(9, 'กากตะกอน'),
(10, 'ตีแปลง ยกร่อง'),
(11, 'กระถาง (4,500 บาท / 15 รอบ)'),
(12, 'ค่าถุง'),
(13, 'ค่าแรงงาน'),
(14, 'ค่าเช่าโรงเรือน (150 บาท * 3 เดือน)'),
(15, 'พลาสติกคลุมแปลง (560 บาท / 2 รอบ)'),
(16, 'ระบบน้ำหยด (2,552 บาท / 15 รอบ)'),
(17, 'ค่าแรงงาน'),
(18, 'เมล็ดพันธุ์'),
(19, 'ถาดหลุมต้นกล้า'),
(20, 'ดินเพาะต้นกล้า'),
(21, 'ค่าแรงงาน'),
(22, 'เสียม (150 บาท / 15 รอบ)'),
(23, 'ค่ารถเข็น (1500 บาท / 15 รอบ)'),
(24, 'ค่าแรงงาน'),
(25, 'ค่าน้ำ'),
(26, 'ปุ๋ย (15-15-15)'),
(27, 'ปุ๋ย (9-3-3)'),
(28, 'ปุ๋ย (3-6-6)'),
(29, 'เชือกฝ้ายพยุง'),
(30, 'ปุ๋ย (6-30-30)'),
(31, 'ปุ๋ย (13-0-46)'),
(32, 'ปุ๋ย (0-0-50)'),
(33, 'ฮอร์โมน'),
(34, 'ฮอร์โมนไข่'),
(35, 'แคลเซียมโบรอน'),
(36, 'ไม้ไผ่'),
(37, 'โรงเรือนเก็บอุปกรณ์ (5,460 บาท / 30 รอบ)'),
(38, 'ค่าไฟ'),
(39, 'ค่าแรงงาน (37.5 บาท x 75 ชม.)'),
(40, 'กรรไกร (1 ปี)'),
(41, 'ตะกร้า (330 บาท / 3 รอบ)'),
(42, 'ค่าแรงงาน'),
(43, 'ตาชั่ง (500 บาท / 30 รอบ)'),
(44, 'โฟมกันกระแทก'),
(45, 'สติ๊กเกอร์ตราวิสาหกิจ'),
(46, 'ค่าแรงงาน');

-- --------------------------------------------------------

--
-- Table structure for table `melon_costs_fv`
--

CREATE TABLE `melon_costs_fv` (
  `mc_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `house_id` int(11) DEFAULT NULL,
  `activities_id` int(11) DEFAULT NULL,
  `list_id` int(11) DEFAULT NULL,
  `planting_type_id` int(11) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `cost_type` enum('cost_sand','cost_clay','cost_pots','cost_bags') DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `melon_greenhouse`
--

CREATE TABLE `melon_greenhouse` (
  `house_id` int(11) NOT NULL,
  `house_name` varchar(100) DEFAULT NULL,
  `house_desc` text DEFAULT NULL,
  `planting_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT 0.00,
  `status` enum('start','end') DEFAULT 'start',
  `create_at` datetime DEFAULT current_timestamp(),
  `update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `planting_type`
--

CREATE TABLE `planting_type` (
  `planting_id` int(11) NOT NULL,
  `planting_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `planting_type`
--

INSERT INTO `planting_type` (`planting_id`, `planting_name`) VALUES
(1, 'ดินทราย'),
(2, 'ดินเหนียว'),
(3, 'กระถาง'),
(4, 'ถุง\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `fullName` varchar(200) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `profile_info` text DEFAULT NULL,
  `status` enum('admin','farmer','user') DEFAULT 'user',
  `update_data` datetime DEFAULT NULL,
  `create_At` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `firstName`, `lastName`, `fullName`, `phone`, `profile_info`, `status`, `update_data`, `create_At`) VALUES
(1, 'doome972545', '$2a$10$eRtFxxg2edd//Cp3X0Cmjuj0D4REnq3Otrvj/N7YnED2mmwkPOZZK', 'ชญานนท์', 'อุตราชา', 'ชญานนท์ อุตราชา', '0820124830', 'https://res.cloudinary.com/dzvx53cac/image/upload/v1755753389/profile_images/1755753387069.png', 'farmer', '2025-08-25 14:41:45', '2025-08-21 12:16:29'),
(2, 'admin', '$2a$10$K7JFTy8OmvyMgM1qKWKUA.06S0YQm487n40ukL3YOv26i2ceUoVF6', 'admin', 'admin', 'admin admin', '0820124830', NULL, 'admin', NULL, '2025-08-21 12:18:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`activity_id`);

--
-- Indexes for table `activities_costs`
--
ALTER TABLE `activities_costs`
  ADD PRIMARY KEY (`activities_costs_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `activities_id` (`activities_id`),
  ADD KEY `house_id` (`house_id`);

--
-- Indexes for table `chart`
--
ALTER TABLE `chart`
  ADD PRIMARY KEY (`chart_id`),
  ADD KEY `cost_id` (`cost_id`);

--
-- Indexes for table `costs`
--
ALTER TABLE `costs`
  ADD PRIMARY KEY (`cost_id`),
  ADD KEY `activities_id` (`activities_id`),
  ADD KEY `list_id` (`list_id`);

--
-- Indexes for table `list`
--
ALTER TABLE `list`
  ADD PRIMARY KEY (`list_id`);

--
-- Indexes for table `melon_costs_fv`
--
ALTER TABLE `melon_costs_fv`
  ADD PRIMARY KEY (`mc_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `house_id` (`house_id`),
  ADD KEY `activities_id` (`activities_id`),
  ADD KEY `list_id` (`list_id`),
  ADD KEY `planting_type_id` (`planting_type_id`);

--
-- Indexes for table `melon_greenhouse`
--
ALTER TABLE `melon_greenhouse`
  ADD PRIMARY KEY (`house_id`),
  ADD KEY `planting_type_id` (`planting_type_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `planting_type`
--
ALTER TABLE `planting_type`
  ADD PRIMARY KEY (`planting_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `activities_costs`
--
ALTER TABLE `activities_costs`
  MODIFY `activities_costs_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `chart`
--
ALTER TABLE `chart`
  MODIFY `chart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `costs`
--
ALTER TABLE `costs`
  MODIFY `cost_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `list`
--
ALTER TABLE `list`
  MODIFY `list_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `melon_costs_fv`
--
ALTER TABLE `melon_costs_fv`
  MODIFY `mc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `melon_greenhouse`
--
ALTER TABLE `melon_greenhouse`
  MODIFY `house_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `planting_type`
--
ALTER TABLE `planting_type`
  MODIFY `planting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activities_costs`
--
ALTER TABLE `activities_costs`
  ADD CONSTRAINT `activities_costs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `activities_costs_ibfk_2` FOREIGN KEY (`activities_id`) REFERENCES `activities` (`activity_id`),
  ADD CONSTRAINT `activities_costs_ibfk_3` FOREIGN KEY (`house_id`) REFERENCES `melon_greenhouse` (`house_id`);

--
-- Constraints for table `chart`
--
ALTER TABLE `chart`
  ADD CONSTRAINT `chart_ibfk_1` FOREIGN KEY (`cost_id`) REFERENCES `costs` (`cost_id`);

--
-- Constraints for table `costs`
--
ALTER TABLE `costs`
  ADD CONSTRAINT `costs_ibfk_1` FOREIGN KEY (`activities_id`) REFERENCES `activities` (`activity_id`),
  ADD CONSTRAINT `costs_ibfk_2` FOREIGN KEY (`list_id`) REFERENCES `list` (`list_id`);

--
-- Constraints for table `melon_costs_fv`
--
ALTER TABLE `melon_costs_fv`
  ADD CONSTRAINT `melon_costs_fv_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `melon_costs_fv_ibfk_2` FOREIGN KEY (`house_id`) REFERENCES `melon_greenhouse` (`house_id`),
  ADD CONSTRAINT `melon_costs_fv_ibfk_3` FOREIGN KEY (`activities_id`) REFERENCES `activities` (`activity_id`),
  ADD CONSTRAINT `melon_costs_fv_ibfk_4` FOREIGN KEY (`list_id`) REFERENCES `list` (`list_id`),
  ADD CONSTRAINT `melon_costs_fv_ibfk_5` FOREIGN KEY (`planting_type_id`) REFERENCES `planting_type` (`planting_id`);

--
-- Constraints for table `melon_greenhouse`
--
ALTER TABLE `melon_greenhouse`
  ADD CONSTRAINT `melon_greenhouse_ibfk_1` FOREIGN KEY (`planting_type_id`) REFERENCES `planting_type` (`planting_id`),
  ADD CONSTRAINT `melon_greenhouse_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
ALTER USER 'melon'@'%' IDENTIFIED WITH mysql_native_password BY 'doome972545';
FLUSH PRIVILEGES;