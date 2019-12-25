<?php
    class Event {

        public var $id;
        public var $title;
        public var $room;
        public var $building;
        public var $time;
        public var $date;
        public var $projector;
        public var $username;

        private var $database;

        public getEvent(){
            var $args = func_num_args();
            var $query = "SELECT * FROM event WHERE ";
            for($i = 1; $i <= $args; $i++){
                $query += func_get_arg(i);
            }
            
        }

        public getAllEvents(){
            var $query = "SELECT * FROM event WHERE ";
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
    }
?>