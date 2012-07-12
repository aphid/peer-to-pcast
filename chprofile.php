<?
session_start();
$username = $_SESSION['username'];

$data = file_get_contents("/home/mdeckert/candidates/profiles.json");
$data = json_decode($data,1);
$profname = $data['Experts'][$username]['name'];

	
if (!$profname) {
    $err['error'] = "Authentication error";
    echo json_encode($err);
    exit;
}

$origtitle = $_POST['origtitle'];
$title = $_POST['title'];
$authors = $_POST['authors'];
$path = "$profname.json";
$json = file_get_contents($path);

$data = json_decode($json, 1);



if (strpos($authors, ';')) {
	 $workingauthors = explode("; ", $authors);
} else { $workingauthors = $authors; }


for ($i = 0; $i < count($workingauthors); $i++){
	$zauthors[$workingauthors[$i]] = 1; 
}

if ($_POST['action'] == "remove"){
    unset($data['Experts'][$profname]['titleAuthors'][$origtitle]);
    $yay['success'] = "Change successful";
    echo json_encode($data);
    updateFile($path, $data);
    exit;
}

if ($_POST['action'] == "new"){

    //make new item for paper
    $data['Experts'][$profname]['titleAuthors'][$title] = $zauthors;
    //$yay['success'] = "Change Successful";
    echo json_encode($data);
    updateFile($path, $data);
    exit;
}

if ($origtitle != $title){
    //new title
    unset($data['Experts'][$profname]['titleAuthors'][$origtitle]); // remove old title entry;
}
$data['Experts'][$profname]['titleAuthors'][$title] = $zauthors; // put authors in new title;

$yay['success'] = "Change successful";
echo json_encode($data);
updateFile($path, $data);

function updateFile($path, $data){

if (!file_exists($path)){

echo "Path issue!";
exit;
}

if (!$data) {
echo "No data!";
exit;
}



$fp = fopen($path, 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

}
?>

