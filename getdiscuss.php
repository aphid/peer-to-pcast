<?
include("simple_html_dom.php");
$json = file_get_contents("redditpcasts.json");

$streams = json_decode($json,1);

$stream = $_GET['stream'];

foreach ($streams as $s) {

	if ($s['stream'] == $stream){
		
	$url = $s['reddit'];
	$url = $url .".json";
	}


}

$json = file_get_html($url);
$data = json_decode($json, 1);
$messages = array();
foreach ($data as $item) {
	    foreach($item['data']['children'] as $child) {
            $msg = array();
            $body = $child['data']['body'];
            $slimbody = explode("Refers", $body);
            $slimbody = "\"" .$slimbody[0] ."\" by: " .$child['data']['author'];
		$proctime = explode("t=", $body);
            $proctime = intval($proctime[1]);
            if ($proctime) {
                $msg['time']=$proctime;
                $msg['body']=$slimbody;
                array_push($messages, $msg);
            }       
	}
}
$json = json_encode($messages, TRUE);
echo $json;

$outputfile = "data/comments/$stream.comments.json";
    $fp = fopen($outputfile, 'w');
    fwrite($fp, $json);
    fclose($fp);
?>
