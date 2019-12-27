<?php
    include_once '../../objects/database.php';
    include_once '../../objects/building.php';

    $database = new Database();
    $connection = $database->getConnection();

    $building = new Building($connection);
    $query = building->getBuildings();

    $result = mysqli_query($connection, $query);

    // Get each row of query
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_all($result)) {
            echo '<p>' . $row[0] . '</p>';
        }
    }

    database->closeConnection();
?>