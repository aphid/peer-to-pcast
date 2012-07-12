<?
//var_dump($_SESSION);
session_start();
if ($_SESSION['username'] == $_POST['username'])
{
echo json_encode("success");
}
else echo json_encode("fail");
?>
