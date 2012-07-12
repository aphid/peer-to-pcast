<?

$name = trim(stripslashes($_POST['name']));

//if (!$name) { $name = "R Paarlberg"; }
$file = "data/graphs/" .str_replace(" ", "_", $name) .".graph.json";
if (file_exists($file)) {
    $json = file_get_contents($file);
} else {
    $path = '/home/mdeckert/candidates/graphData "';
    $path .= "$name";
    $path .= '"';
    $json = shell_exec("$path");
    $fp = fopen($file, 'w');
    fwrite($fp, $json);
    fclose($fp);
}
echo $json;
?>
