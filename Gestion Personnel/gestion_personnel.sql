-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Client: 127.0.0.1
-- Généré le : Mar 08 Novembre 2022 à 09:57
-- Version du serveur: 5.5.20
-- Version de PHP: 5.3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `gestion_personnel`
--

-- --------------------------------------------------------

--
-- Structure de la table `employe`
--

CREATE TABLE IF NOT EXISTS `employe` (
  `codemp` varchar(5) NOT NULL DEFAULT '',
  `nomemp` varchar(20) NOT NULL DEFAULT '',
  `prenemp` varchar(15) NOT NULL DEFAULT '',
  `adremp` varchar(50) DEFAULT NULL,
  `dnemp` date DEFAULT NULL,
  `salaire` float DEFAULT '0',
  PRIMARY KEY (`codemp`),
  KEY `codemp` (`codemp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `employe`
--

INSERT INTO `employe` (`codemp`, `nomemp`, `prenemp`, `adremp`, `dnemp`, `salaire`) VALUES
('E0010', 'ZOUARI', 'AHMED', 'RUE 18 JANVIER ARIANA', '1965-11-13', 1800),
('E0011', 'BEN SALAH', 'ALI', 'ROUTE DE BIZERTE', '1963-04-12', 1950),
('E0012', 'TURKI', 'SAMIA', 'RUE DAG HAMARCHOLD', '1979-10-03', 459.9),
('E0013', 'TOUNSI', 'SAMI', 'MEGRINE BEN AROUS', '1975-10-05', 870),
('E0014', 'AMMAR', 'ALI', 'RADES SALINE', '1969-10-13', 980),
('E0015', 'SALHI', 'MOUNIR', 'RUE HABIB BOURGUIBA BEN AROUS', '1966-11-13', 2005.5),
('E0016', 'TURKI', 'SAFA', 'RUE KHALED IBN ELWALID', '1969-11-13', 850),
('E0017', 'KALLEL', 'FATHI', 'OUED ELLIL MANOUBA', '1969-10-13', 877),
('E0018', 'AMDOUNI', 'NIHEL', 'BAB SAADOUN TUNIS', '1981-08-10', 935.5),
('E0019', 'ZOUARI', 'MANEL', 'BORJ LOUZIR RUE JIBRAN KHALIL JIBRAN', '1985-06-09', 899.5),
('E0020', 'TOUNSI', 'SLIM', 'LE BARDO RUE DE DUNKERQUE', '1970-03-08', 900),
('E0021', 'MAHMOUDI', 'MOHAMED', 'MEDINA JADIDA TUNIS', '1968-03-11', 490),
('E0022', 'MOURALI', 'FIRAS', 'EL MOUROUJ', '1966-02-12', 580),
('E0023', 'SAADAOUI', 'HAIFA', 'RUE EL KAMEL', '1980-03-03', 590),
('E0024', 'ABDELLATIF', 'NIZAR', 'RUE BAYREM TOUNSI', '1977-10-12', 582),
('E0025', 'MAHJOUB', 'FARID', 'KHAZNADAR', '1960-01-19', 560),
('E0026', 'BALTI', 'AMEL', 'RUE DE LA LIBERTE', '1976-12-12', 400),
('E0027', 'ZITOUNI', 'AMAL', 'LA MARSA RUE DE FALAISE', '1964-04-10', 410),
('E0028', 'JAMMELI', 'MUSTAFA', 'RUE MAHDIA', '1971-09-06', 411),
('E0029', 'NOURI', 'MONCEF', 'RUE IBN CHABAT KSAR SAID', '1974-05-04', 412),
('E0030', 'JAOUADI', 'KHALED', 'ROUTE DE BIZERT KM 4 CITE ENNASER ELMNIHLA', '1969-10-14', 412.5),
('E0031', 'ABID', 'HAMED', 'RUE IBN CHABAT KSAR SAID', '1962-11-11', 400),
('E0032', 'AYADI', 'SOUAD', 'RUE EL KAMEL', '1974-03-22', 450);

-- --------------------------------------------------------

--
-- Structure de la table `enfant`
--

CREATE TABLE IF NOT EXISTS `enfant` (
  `codenf` varchar(5) NOT NULL DEFAULT '',
  `nomenf` varchar(20) DEFAULT NULL,
  `prenenf` varchar(15) DEFAULT NULL,
  `sexenf` char(1) DEFAULT NULL,
  `dnenf` date NOT NULL DEFAULT '0000-00-00',
  `codpere` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`codenf`),
  KEY `codpere` (`codpere`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `enfant`
--

INSERT INTO `enfant` (`codenf`, `nomenf`, `prenenf`, `sexenf`, `dnenf`, `codpere`) VALUES
('F0101', 'ZOUARI', 'WISSAL', 'F', '1988-10-12', 'E0016'),
('F0111', 'BEN SALAH', 'AMIRA', 'F', '1979-01-22', 'E0011'),
('F0112', 'BEN SALAH', 'FETEN', 'F', '1983-01-07', 'E0011'),
('F0113', 'BEN SALAH', 'AHMED', 'G', '1990-01-03', 'E0011'),
('F0121', 'TURKI', 'SAMIRA', 'F', '2000-10-10', 'E0012'),
('F0131', 'TOUNSI', 'RAMY', 'G', '2000-01-19', 'E0013'),
('F0132', 'TOUNSI', 'SALMA', 'F', '2004-01-14', 'E0013'),
('F0141', 'AMMAR', 'SAMY', 'G', '2001-09-12', 'E0014'),
('F0142', 'AMMAR', 'KARIMA', 'F', '2006-07-09', 'E0014'),
('F0151', 'SALHI', 'SALMA', 'F', '2007-01-12', 'E0015'),
('F0152', 'SALHI', 'SOULAIMA', 'F', '2007-01-12', 'E0015'),
('F0181', 'AMDOUNI', 'HAMADI', 'G', '2003-10-09', 'E0018'),
('F0191', 'ZOUARI', 'RAMZI', 'G', '2006-09-11', 'E0019'),
('F0211', 'MAHMOUDI', 'AMIN', 'G', '1978-09-08', 'E0021'),
('F0221', 'MOURALI', 'YOUSSEF', 'G', '1996-02-11', 'E0022'),
('F0251', 'MAHJOUB', 'MAJED', 'G', '1990-07-01', 'E0025'),
('F0252', 'MAHJOUB', 'MEJDA', 'F', '1990-07-01', 'E0025'),
('F0253', 'MAHJOUB', 'MOURAD', 'G', '1995-05-01', 'E0025'),
('F0254', 'MAHJOUB', 'BEYA', 'F', '2008-03-09', 'E0025'),
('F0271', 'ZITOUNI', 'ZEINAB', 'F', '2001-03-11', 'E0027'),
('F0301', 'JAOUADI', 'WALID', 'F', '1992-04-20', 'E0030'),
('F0311', 'ABID', 'MOUNA', 'F', '1990-05-22', 'E0031'),
('F0312', 'ABID', 'MOUSSA', 'G', '1990-05-22', 'E0031'),
('F0313', 'ABID', 'YOUSSEF', 'G', '2002-01-19', 'E0031');

-- --------------------------------------------------------

--
-- Structure de la table `fonction`
--

CREATE TABLE IF NOT EXISTS `fonction` (
  `codfct` varchar(5) NOT NULL DEFAULT '',
  `intfct` varchar(20) DEFAULT NULL,
  `primfct` float DEFAULT '0',
  PRIMARY KEY (`codfct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `fonction`
--

INSERT INTO `fonction` (`codfct`, `intfct`, `primfct`) VALUES
('FCT01', 'GERANT', 350),
('FCT02', 'SECRETAIRE', 100),
('FCT03', 'COMPTABLE', 200),
('FCT04', 'FINANCIER', 180),
('FCT05', 'AGENT COMMERCIAL', 150),
('FCT06', 'STANDARD', 90),
('FCT07', 'TECHNICIEN', 100),
('FCT08', 'OUVRIER', 100),
('FCT09', 'GARDIEN', 90),
('FCT10', 'AGENT ADMINISTRATIF', 0);

-- --------------------------------------------------------

--
-- Structure de la table `occuper`
--

CREATE TABLE IF NOT EXISTS `occuper` (
  `codfct` varchar(5) NOT NULL DEFAULT '',
  `codemp` varchar(5) NOT NULL DEFAULT '',
  `ddaff` date NOT NULL DEFAULT '0000-00-00',
  `dfaff` date DEFAULT NULL,
  PRIMARY KEY (`codfct`,`codemp`,`ddaff`),
  KEY `codemp` (`codemp`),
  KEY `codfct` (`codfct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `occuper`
--

INSERT INTO `occuper` (`codfct`, `codemp`, `ddaff`, `dfaff`) VALUES
('FCT01', 'E0010', '2000-01-01', '2004-12-31'),
('FCT01', 'E0010', '2015-01-16', '2016-07-16'),
('FCT01', 'E0011', '2005-01-01', '2007-12-31'),
('FCT01', 'E0015', '2008-01-01', NULL),
('FCT01', 'E0032', '2017-03-01', '2017-09-01'),
('FCT02', 'E0012', '2003-01-01', NULL),
('FCT03', 'E0011', '2000-01-01', '2004-12-31'),
('FCT03', 'E0013', '2000-01-01', NULL),
('FCT03', 'E0016', '2000-01-01', NULL),
('FCT03', 'E0017', '2003-01-01', NULL),
('FCT04', 'E0014', '2000-01-01', NULL),
('FCT04', 'E0018', '2000-09-07', NULL),
('FCT04', 'E0019', '2004-01-11', NULL),
('FCT04', 'e0032', '2017-01-01', '2020-01-01'),
('FCT05', 'E0015', '2000-01-01', '2007-12-31'),
('FCT05', 'E0020', '2001-07-18', NULL),
('FCT06', 'E0012', '2000-01-01', '2002-12-31'),
('FCT06', 'E0021', '2003-01-01', NULL),
('FCT07', 'E0022', '2000-01-01', NULL),
('FCT07', 'E0023', '2001-09-10', NULL),
('FCT07', 'E0024', '2002-01-01', NULL),
('FCT07', 'E0025', '2002-01-01', NULL),
('FCT08', 'E0026', '2000-01-01', NULL),
('FCT08', 'E0027', '2000-01-10', NULL),
('FCT08', 'E0028', '2005-01-01', NULL),
('FCT08', 'E0029', '2004-08-05', NULL),
('FCT08', 'E0030', '2005-01-10', NULL),
('FCT09', 'E0031', '2000-01-01', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `telephone`
--

CREATE TABLE IF NOT EXISTS `telephone` (
  `codemp` varchar(5) NOT NULL DEFAULT '',
  `numtel` int(8) NOT NULL DEFAULT '0',
  `typetel` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`numtel`),
  KEY `codemp` (`codemp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `enfant`
--
ALTER TABLE `enfant`
  ADD CONSTRAINT `enfant_ibfk_1` FOREIGN KEY (`codpere`) REFERENCES `employe` (`codemp`);

--
-- Contraintes pour la table `occuper`
--
ALTER TABLE `occuper`
  ADD CONSTRAINT `occuper_ibfk_1` FOREIGN KEY (`codfct`) REFERENCES `fonction` (`codfct`),
  ADD CONSTRAINT `occuper_ibfk_2` FOREIGN KEY (`codemp`) REFERENCES `employe` (`codemp`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
