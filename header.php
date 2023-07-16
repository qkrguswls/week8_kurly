<?
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-header: *');

    $db_server = 'localhost';
    $db_user_name = 'qkrguswls309';
    $db_user_pw = 'guswls309^^';
    $db_name = 'qkrguswls309';

    $conn = mysqli_connect($db_server, $db_user_name, $db_user_pw, $db_name);
    mysqli_set_charset($conn, 'utf8');
?>