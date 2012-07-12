<?

$name = stripslashes($_GET['name']);
//$content = 'Robert_Paarlberg';
$content = str_replace('_', ' ', $name);
$path = '/home/mdeckert/candidates/scholar2json "';
$path .= "$content";
$path .= '"';
$json = shell_exec("$path");
$callback = stripslashes($_GET['jsoncallback']);
echo $callback . '(' . $json . ')';

$writefile = str_replace(' ', '_', "data/citations/$name.json");
if (!file_exists($writefile)) {
        $fp = fopen($writefile, 'w');
    fwrite($fp, $json);
    fclose($fp);

}

?>
