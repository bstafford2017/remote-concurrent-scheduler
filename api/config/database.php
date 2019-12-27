<?php
    class Database {
        private $connection;
        private $servername "localhost";
        private $username = "username";
        private $password = "password";
        private $db = "database1";

        public getConnection(){
            $conn = mysqli_connect($servername, $username, $password, $db);
            if(!$conn){
                die("Connection failed: " . mysqli_connect_error());
            }
            mysqli_set_charset($conn, "utf8");
            return $conn;
        }

        public closeConnection(){
            mysqli_close($connection);
        }
    }
?>