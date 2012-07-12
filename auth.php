<?
$username = $_POST['username'];
$password = $_POST['password'];
$data = file_get_contents("/home/mdeckert/candidates/profiles.json");
$data = json_decode($data,1);

if($data['Experts'][$username]['password'] == $password)
{
	$json['success'] = "login is successful";
	$json['userid'] = $username;
        session_start();
	$_SESSION['username'] = $username;    
	$json['name'] = $data['Experts'][$username]['name'];
	$_SESSION['name'] = $json['name'];
	echo json_encode($json);
} else  {
    $json['error'] = "username or password is wrong.";
    echo json_encode($json);
} 

?>
