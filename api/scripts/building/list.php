<?php
    include_once '../../objects/database.php';
    include_once '../../objects/building.php';

    $database = new Database();
    $connection = $database->getConnection();

    $building = new Building($connection);
    $query = building->getBuildings();


?>