-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Client: 127.0.0.1
-- Généré le: Mar 05 Mars 2024 à 00:31
-- Version du serveur: 5.5.27-log
-- Version de PHP: 5.4.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `etms_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `attendance_info`
--

CREATE TABLE IF NOT EXISTS `attendance_info` (
  `aten_id` int(20) NOT NULL AUTO_INCREMENT,
  `atn_user_id` int(20) NOT NULL,
  `in_time` datetime DEFAULT NULL,
  `out_time` datetime DEFAULT NULL,
  `total_duration` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`aten_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Contenu de la table `attendance_info`
--

INSERT INTO `attendance_info` (`aten_id`, `atn_user_id`, `in_time`, `out_time`, `total_duration`) VALUES
(17, 32, '2023-09-08 03:42:00', '2023-09-08 03:42:35', '00:00:35'),
(16, 34, '2023-08-12 18:28:19', '2023-08-12 18:28:33', '00:00:14');

-- --------------------------------------------------------

--
-- Structure de la table `task_info`
--

CREATE TABLE IF NOT EXISTS `task_info` (
  `task_id` int(50) NOT NULL AUTO_INCREMENT,
  `t_title` varchar(120) NOT NULL,
  `t_description` text,
  `t_start_time` datetime DEFAULT NULL,
  `t_end_time` datetime DEFAULT NULL,
  `t_user_id` int(20) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0 = incomplete, 1 = In progress, 2 = complete',
  PRIMARY KEY (`task_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Contenu de la table `task_info`
--

INSERT INTO `task_info` (`task_id`, `t_title`, `t_description`, `t_start_time`, `t_end_time`, `t_user_id`, `status`) VALUES
(4, 'DEV BACK', '', '2023-03-08 12:00:00', '2023-03-09 12:00:00', 30, 2),
(2, 'Conception uml', '', '2023-03-08 12:00:00', '2023-03-09 12:00:00', 29, 2),
(3, 'Dev', '', '2023-03-07 12:00:00', '2023-03-07 12:00:00', 29, 2),
(6, 'prÃ©parer .....', '', '2023-03-08 12:00:00', '2023-03-12 12:00:00', 31, 1),
(7, 'conception uml', 'il faut prÃ©parer la conception pour la partie du developpement', '2023-08-15 12:00:00', '2023-08-17 12:00:00', 32, 1),
(8, 'developpement back', '', '2023-08-14 12:00:00', '2023-08-21 12:00:00', 34, 2);

-- --------------------------------------------------------

--
-- Structure de la table `tbl_admin`
--

CREATE TABLE IF NOT EXISTS `tbl_admin` (
  `id_admin` int(20) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(120) NOT NULL,
  `email` varchar(100) NOT NULL,
  `temp_password` varchar(100) DEFAULT NULL,
  `id_user` varchar(100) NOT NULL,
  PRIMARY KEY (`id_admin`),
  KEY `id_user` (`id_user`),
  KEY `id_user_2` (`id_user`),
  KEY `id_user_3` (`id_user`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='2' AUTO_INCREMENT=35 ;

--
-- Contenu de la table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id_admin`, `fullname`, `email`, `temp_password`, `id_user`) VALUES
(1, 'Responsable de stage', 'admin@gmail.com', NULL, ''),
(33, 'salma ben amor', 'salma@gmail.com', '1478963', ''),
(34, 'asma 2', 'asma2@gmail.com', '', ''),
(32, 'Asma Mraida', 'asma@gmail.com', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id_user` varchar(8) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `tele` varchar(100) NOT NULL,
  `date_d` datetime NOT NULL,
  `date_f` datetime NOT NULL,
  `task_user` int(11) NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `task_user` (`task_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
