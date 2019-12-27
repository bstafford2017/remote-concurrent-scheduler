<?php
    // Loops through to sanitize arguments
    function validate($connection){
        $validItems = array();
        $items = func_num_args();
        for($i = 1; $i <= $items; $i++){
            $item = func_get_arg(i);
            $item = mysqli_real_escape_string($connection, $item);
            array_push($validItems, $item);
        }
        return $validItems;
    }
?>