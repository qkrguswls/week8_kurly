<?
    include_once('./header.php');

    $email = $_POST['email'];

    // 이메일 중복 조회
    $sql = "select * from week8_kurly_table where email='$email'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) >= 1) {
        echo 1;
    } else {
        echo -1;
    }
?>