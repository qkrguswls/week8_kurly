<?
    include_once('./header.php');
    
    // header('Access-Control-Allow-Origin: *');
    // header('Access-Control-Allow-header: *');

    // $db_server = 'localhost';
    // $db_user_name = 'qkrguswls309';
    // $db_user_pw = 'guswls309^^';
    // $db_name = 'qkrguswls309';

    // $conn = mysqli_connect($db_server, $db_user_name, $db_user_pw, $db_name);
    // mysqli_set_charset($conn, 'utf8');

    // 처음 세팅 확인 시
    // if (!$conn) {
    //     echo "접속 실패";
    // } else {
    //     echo "접속 성공";
    // }

    // ajax혹은 axios로 전송할땐 아래와 같이 이름 지정
    // 반면 API없이 jsx의 form action="http://qkrguswls309.dothome.co.kr/week8_kurly/signup.php"으로 전송할땐 input name과 일치하게 해야한다
    $id = $_POST['id'];
    $pw = $_POST['pw'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $hp = $_POST['hp'];
    $addr = $_POST['addr'];
    $gender = $_POST['gender'];
    $birth = $_POST['birth'];
    $chooga = $_POST['chooga'];
    $service = $_POST['service'];

    $sql = "insert into week8_kurly_table(id, pw, name, email, hp, addr, gender, birth, chooga, service) 
    values('$id', '$pw', '$name', '$email', '$hp', '$addr', '$gender', '$birth', '$chooga', '$service')";
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        echo "데이터 저장 실패";
    } else {
        echo "데이터 저장 성공";
    }
?>