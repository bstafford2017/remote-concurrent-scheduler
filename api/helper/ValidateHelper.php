<?php
    function validate(){
        $items = func_num_args();
        for($i = 1; $i <= $items; $i++){
            func_get_arg(i);
        }
    }
?>