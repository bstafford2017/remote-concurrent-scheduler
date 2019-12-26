<?php
    class Event {
        public $id;
        public $title;
        public $room;
        public $building;
        public $time;
        public $date;
        public $projector;
        public $username;
        private $database;

        public getEvent(){
            $args = func_num_args();
            $query = "SELECT * FROM event WHERE ";
            for($i = 1; $i <= $args; $i++){
                $query += func_get_arg(i);
            }
            
        }

        public getAllEvents(){
            $query = "SELECT * FROM event WHERE ";
            for($i = 1; $i <= $args; $i++){
                $query += func_get_arg(i);
            }
        }

        public createEvent(){
            // 1 - Name, 2 - Title, 3 - Room, 4 - Building, 5 - User, 6 - Projector, 7 - Seats
            $list_of_inserts = array();
            $create_event = "INSERT INTO event VALUES (NULL, NULL, )"
            for($i = 1; $i <= $args; $i++){
                $i_arg = func_get_arg(i);
                
                if($i == 1){
                    array_push($list_of_inserts, "INSERT INTO ");
                }
            }
        }

        public deleteEvent(){

        }

        // Update for each attribute
        public updateEvent(){

        }
    }
?>