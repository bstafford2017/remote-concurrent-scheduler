<?php
    start_session();
    $data = json_decode(file_get_contents("php://input"));
    $_SESSION['username'] = $data->username;
    $_SESSION['admin'] = $data->admin;
    $_SESSION['expire'] = time() * 30 * 60;
?>