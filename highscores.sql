-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2019 at 10:28 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `highscores`
--

-- --------------------------------------------------------

--
-- Table structure for table `userdata`
--

CREATE TABLE IF NOT EXISTS `userdata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `score` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=32 ;

--
-- Dumping data for table `userdata`
--

INSERT INTO `userdata` (`id`, `username`, `score`, `datetime`, `level`) VALUES
(19, 'JELENA', 10, '2019-04-08 14:47:04', 0),
(26, 'proba', 20, '2019-06-30 10:39:55', 0),
(27, 'USER1', 10, '2019-06-30 16:48:11', 0),
(28, 'USER1', 10, '2019-06-30 16:51:33', 0),
(29, 'test', 100, '2019-07-01 00:17:07', 0),
(30, 'user1', 10, '2019-07-01 00:24:47', 0),
(31, 'asdasd', 0, '2019-07-02 09:50:12', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
