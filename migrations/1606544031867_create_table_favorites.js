module.exports = {
    "up": "CREATE TABLE IF NOT EXISTS `favorites` (`id` int(9) unsigned NOT NULL AUTO_INCREMENT, `imageUrl` varchar(255) NOT NULL, `keyword` varchar(255) NOT NULL, `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
    "down": "DROP TABLE favorites"
}