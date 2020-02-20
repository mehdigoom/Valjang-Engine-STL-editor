-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Mar 18 Février 2020 à 10:10
-- Version du serveur :  5.7.29-0ubuntu0.18.04.1
-- Version de PHP :  7.2.24-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `stleditor`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `name` text NOT NULL,
  `clientid` text NOT NULL,
  `modelid` text NOT NULL,
  `userid` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `name` text NOT NULL,
  `id` int(11) NOT NULL,
  `adminname` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `client`
--

INSERT INTO `client` (`name`, `id`, `adminname`) VALUES
('Dood Studio', 1, 'miro'),
('Valjang', 2, 'toto');

-- --------------------------------------------------------

--
-- Structure de la table `model`
--

CREATE TABLE `model` (
  `name` text NOT NULL,
  `description` text NOT NULL,
  `link` text NOT NULL,
  `type` text NOT NULL,
  `image` text NOT NULL,
  `price` text NOT NULL,
  `size` text NOT NULL,
  `tag` text NOT NULL,
  `statut` tinyint(1) NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `model`
--

INSERT INTO `model` (`name`, `description`, `link`, `type`, `image`, `price`, `size`, `tag`, `statut`, `created_at`, `updated_at`) VALUES
('chat-articule', '<p>SIMON DEPREZ&nbsp;</p>\\r\\n\\r\\n<p>&ldquo;Quand le digital permet aux enfants de travailler la mati&egrave;re de fa&ccedil;on ludique et p&eacute;dagogique je trouve cela tr&egrave;s int&eacute;ressant&nbsp;! C&#39;est pour cela que j&#39;ai cr&eacute;e pour DOOD cette collection d&#39;animaux articul&eacute;s, m&ecirc;lant esprit enfantin et rigueur g&eacute;om&eacute;trique.&rdquo;</p>\\r\\n\\r\\n<p>Simon DEPREZ est Designer Produit. Il &eacute;volue entre cr&eacute;ation, conception 3D et fabrication. Il d&eacute;veloppe aussi bien des produit innovants (<a href=\\\"http://www.laboiteconcept.com/la-boite-concept/\\\" target=\\\"_blank\\\">R et D la boite concept</a>, par exemple) que des projets d&#39;architecture d&#39;int&eacute;rieur (<a href=\\\"http://www.bro-agence.com\\\" target=\\\"_blank\\\">Bro global cr&eacute;ation</a>) ou des &eacute;v&eacute;nements (<a href=\\\"https://www.mediagora.co\\\" target=\\\"_blank\\\">Mediagora</a>,&nbsp;<a href=\\\"https://www.trafic2prod.fr\\\" target=\\\"_blank\\\">Traffic de prod</a>). Il con&ccedil;oit et fabrique aussi des meubles aux sein de son propre atelier.&nbsp;</p>\"', 'DOOD_SIMONDEPREZ_CHAT.stl', 'T', 'https://dood3d.com/uploads/templates/image1525716114.png', '5.70', '24.00 x 84.8 x 18.20 mm', 'CAT, CHAT', 1, '2018-05-07 18:01:54', '2018-11-14 18:54:33'),
('chien-articule', '<p>SIMON DEPREZ&nbsp;</p>\\r\\n\\r\\n<p>&ldquo;Quand le digital permet aux enfants de travailler la mati&egrave;re de fa&ccedil;on ludique et p&eacute;dagogique je trouve cela tr&egrave;s int&eacute;ressant&nbsp;! C&#39;est pour cela que j&#39;ai cr&eacute;e pour DOOD cette collection d&#39;animaux articul&eacute;s, m&ecirc;lant esprit enfantin et rigueur g&eacute;om&eacute;trique.&rdquo;</p>\\r\\n\\r\\n<p>Simon DEPREZ est Designer Produit. Il &eacute;volue entre cr&eacute;ation, conception 3D et fabrication. Il d&eacute;veloppe aussi bien des produit innovants (<a href=\\\"http://www.laboiteconcept.com/la-boite-concept/\\\" target=\\\"_blank\\\">R et D la boite concept</a>, par exemple) que des projets d&#39;architecture d&#39;int&eacute;rieur (<a href=\\\"http://www.bro-agence.com\\\" target=\\\"_blank\\\">Bro global cr&eacute;ation</a>) ou des &eacute;v&eacute;nements (<a href=\\\"https://www.mediagora.co\\\" target=\\\"_blank\\\">Mediagora</a>,&nbsp;<a href=\\\"https://www.trafic2prod.fr\\\" target=\\\"_blank\\\">Traffic de prod</a>). Il con&ccedil;oit et fabrique aussi des meubles aux sein de son propre atelier.&nbsp;</p>', 'DOOD_SIMONDEPREZ_CHIEN.stl', 'G', 'https://dood3d.com/uploads/templates/image1525716174.png', '9.28', '30.00 x 129.2 x 23.90 mm', 'DOG, CHIEN', 1, '2018-05-07 18:02:54', '2018-11-14 19:06:31'),
('crocodile-articule', '<p>SIMON DEPREZ&nbsp;</p>\\r\\n\\r\\n<p>&ldquo;Quand le digital permet aux enfants de travailler la mati&egrave;re de fa&ccedil;on ludique et p&eacute;dagogique je trouve cela tr&egrave;s int&eacute;ressant&nbsp;! C&#39;est pour cela que j&#39;ai cr&eacute;e pour DOOD cette collection d&#39;animaux articul&eacute;s, m&ecirc;lant esprit enfantin et rigueur g&eacute;om&eacute;trique.&rdquo;</p>\\r\\n\\r\\n<p>Simon DEPREZ est Designer Produit. Il &eacute;volue entre cr&eacute;ation, conception 3D et fabrication. Il d&eacute;veloppe aussi bien des produit innovants (<a href=\\\"http://www.laboiteconcept.com/la-boite-concept/\\\" target=\\\"_blank\\\">R et D la boite concept</a>, par exemple) que des projets d&#39;architecture d&#39;int&eacute;rieur (<a href=\\\"http://www.bro-agence.com\\\" target=\\\"_blank\\\">Bro global cr&eacute;ation</a>) ou des &eacute;v&eacute;nements (<a href=\\\"https://www.mediagora.co\\\" target=\\\"_blank\\\">Mediagora</a>,&nbsp;<a href=\\\"https://www.trafic2prod.fr\\\" target=\\\"_blank\\\">Traffic de prod</a>). Il con&ccedil;oit et fabrique aussi des meubles aux sein de son propre atelier.&nbsp;</p>\"', 'DOOD_SIMONDEPREZ_CROQUO.stl', 'G', 'https://dood3d.com/uploads/templates/image1525716388.png', '17.60', '68.875 x 177.125  x  55.25 mm', 'CROCODILE', 2, '2018-05-07 18:06:28', '2018-11-14 19:00:30');

-- --------------------------------------------------------

--
-- Structure de la table `older`
--

CREATE TABLE `older` (
  `id` int(11) NOT NULL,
  `idclient` text NOT NULL,
  `adresse` text NOT NULL,
  `city` text NOT NULL,
  `Postalcode` text NOT NULL,
  `idbaket` text NOT NULL,
  `tel` text NOT NULL,
  `aniversary` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Son`
--

CREATE TABLE `Son` (
  `titre` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `son` text NOT NULL,
  `description` text NOT NULL,
  `Categerie` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Sponsor`
--

CREATE TABLE `Sponsor` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `ifactivate` tinyint(1) NOT NULL,
  `page` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(50) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `basket_id` int(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `basket_id`) VALUES
(1, 'Cindy', 'Saint Fleurant', 'cindy-sf@hotmail.com', 'cindy', 0),
(2, 'Mehdi', 'Gay', 'mehdi@hotmail.fr', 'mehdi', 0),
(3, 'Aminata', 'Sy', 'aminata@gmail.com', 'aminata', 0),
(9, 'm', 'm', 'm', 'm', 99),
(10, '1', '1', '1', '1', 1),
(11, '1', '1', '1', '1', 1);

-- --------------------------------------------------------

--
-- Structure de la table `Video`
--

CREATE TABLE `Video` (
  `Titre` text NOT NULL,
  `Id` int(11) NOT NULL,
  `Video` text NOT NULL,
  `Description` text NOT NULL,
  `Resumer` text NOT NULL,
  `Materieau` text NOT NULL,
  `Fichedimpression` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `model`
--
ALTER TABLE `model`
  ADD UNIQUE KEY `name` (`name`(10));

--
-- Index pour la table `older`
--
ALTER TABLE `older`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Son`
--
ALTER TABLE `Son`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Sponsor`
--
ALTER TABLE `Sponsor`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`basket_id`),
  ADD KEY `fk_users_basket1_idx` (`basket_id`);

--
-- Index pour la table `Video`
--
ALTER TABLE `Video`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `older`
--
ALTER TABLE `older`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `Son`
--
ALTER TABLE `Son`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `Sponsor`
--
ALTER TABLE `Sponsor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT pour la table `Video`
--
ALTER TABLE `Video`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
