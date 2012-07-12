<?
session_start();
$username = $_SESSION['username'];
$stream = $_POST['stream'];
$comment = $_POST['comment'];
$start = $_POST['timesig'];
$reddit = $_POST['reddit'];
if (!$stream) { echo "NO STREAM"; exit; }

// Mark Edit!
$comment = preg_replace('/"/','\"',$comment);

if (!$comment) { $comment = "No comment on mvsto2 :P"; }
if ($start) { $comment .= "\n\nRefers to [this part of the talk](http://metaviddemo01.ucsc.edu/dev2pcast/index.html?stream=$stream&t=$start)"; }
//$content = urlencode($comment);
$content = $comment;
$path = '/home/mdeckert/candidates/comment.pl ';
$path .= '"' ."$content" .'" ' .$reddit ." " .$username;
echo shell_exec("$path");
echo "\n\nRUnning $path\n";

?>
