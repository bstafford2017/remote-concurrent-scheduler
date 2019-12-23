<?php
    session_start();
        
    // Check if signed in via $_SESSION
    if(!isset($_SESSION['username'])){
        header("Location: index.php");
    }

    // If time is expired, redirect; else, reset time due to active session
    if(time() > $_SESSION['expire']){
        alert("You have been automatically signed out!");
        header("Location: index.php");
    } else {
        $_SESSION['expire'] = time() * 30 * 60;
    }
?>