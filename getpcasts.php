<?
$cwd = explode("/", getcwd());
$subreddit = $cwd[count($cwd) -1];
$subreddit = "PCAST_Demo";
$url = "http://www.reddit.com/r/$subreddit/.json";
$streams = array();
$streamtot = 25;
$redditstreams = getPcasts($url);
while ($streamtot > 0) {
	$streamtot = count($redditstreams);
	if ($streamtot) {
		echo "Found $streamtot streams, merging...";
		foreach ($redditstreams as $rdstream) {
		array_push($streams, $rdstream);
		}
	}
	$lastid = $redditstreams[$streamtot - 1]['id'];
	$url = "http://www.reddit.com/r/$subreddit/.json?after=t3_$lastid";
	$redditstreams = array();
	$redditstreams = getPcasts($url);
}
$goodstreams = array();
foreach($streams as $stream){
		
	$spliturl = explode("/", $stream['url']);
	$filename = $spliturl[count($spliturl) - 1];
	$fnsplit = explode("?stream=", $filename);
	if ($fnsplit[0] == "index.html") {
		$goodstreams[]= $stream;
	}
}
$json = json_encode($goodstreams);
echo $json;
$fp = fopen("redditpcasts.json", 'w');
fwrite($fp, $json);
fclose($fp);

function getPcasts($url){
    $contents = file_get_contents($url);
    $contents = utf8_encode($contents);
    $results = json_decode($contents, 1);
    $streams = array();
    echo "<pre>";
    foreach($results['data']['children'] as $listing) {
        $stream = array();
        $stream['reddit'] = "http://reddit.com" .$listing['data']['permalink'];
        $stream['url'] = $listing['data']['url'];
        $stream['title'] = trim($listing['data']['title']);
        $stream['id'] = $listing['data']['id'];
        $urlsplit = explode("?stream=", $stream['url']);
        $urlsplit = explode("&", $urlsplit[1]);
        $stream['stream'] = $urlsplit[0];
        //$stream['url'] = str_replace("dev2","peer2", $stream['url']);
        $streams[]= $stream;
    }   
return $streams;
} 

echo "</pre>";
?>
