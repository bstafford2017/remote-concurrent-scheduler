<?php
    include_once '../helper/ValidateHelper.php';
    class User {
        public $id;
        public $username;
        public $password
        private $connection;

        public function __construct($connection){
            $this->connection = $connection;
        }

        public function getBuilding(){
            
        }

        public function getAllBuildings(){
            
        }

        public function createBuilding(){
            
        }
    }
?>