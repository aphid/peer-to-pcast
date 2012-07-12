<?php

include("simple_html_dom.php");

ini_set('user_agent', 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)');

$meetings = getMeetings();
$pcasts = Array();
foreach ($meetings as $meeting) {
    $meeting = str_replace(" ", "", $meeting);
    $date = explode("pcast/", $meeting);
    $date = $date[1];
    $date = str_replace("/", "", $date);
    if (!$date) { $date = "090806"; }
    //echo "Running PCAST scraper for meeting on $date.\n\n"; 
            array_push($pcasts,getPcasts($meeting, $date));
}

foreach ($pcasts as $pcast) {

    foreach($pcast as $session){
        echo "Processing " .$session['description'] ."(" . $session['url'] .")\n\n";
        if ($session['type'] == "slide") {
            $vars = filterSlide($session);
            }
        else {
            $vars = filterNonSlide($session);   
        }
    processStream($vars);
    }
}


function processStream($ses){
    $date = $ses['date'];
    $dir = "/var/www/pcasts/$date";
    if (!is_dir("$dir"))	{
        echo "Creating directory $dir...";
        mkdir($dir);
    }
    
    $streamname = processStreamname($ses['streamname'], $date);
    echo "Processing $streamname...\n\n\n";
    $dir = "/var/www/pcasts/$date/" .$streamname;
    $capfile = $dir ."/" .$streamname .".xml";
    $jsonfile = $dir ."/" .$streamname .".vardump.json";
    $extcap = "";
    if (!is_dir($dir))	{
        echo "Creating directory $dir...\n";
        mkdir($dir);
        }
    
    echo "Checking captions: " .$ses["captionsurl1"] ."\n"; 
    if ($ses["captionsurl1"]) {
        if (testCaptions($ses["captionsurl1"])) {
            $extcap = $ses["captionsurl1"]; 
        }
	}
    if ($ses["captionsurl2"]){
        if (testCaptions($ses["captionsurl2"])) {
            $extcap = $ses["captionsurl2"]; 
        }
	}
    if (!$extcap) { 
	   echo "no captions for stream" .$streamname ."\n";
    } else {
        $captions = file_get_contents($extcap);
        $fp = fopen($capfile, 'w');
        echo "Writing $capfile...\n";
        fwrite($fp, $captions);
        fclose($fp);
    }
    $fp = fopen($jsonfile, 'w');
    echo "Writing JSON\n\n";
    fwrite($fp, json_encode($ses));
    fclose($fp);
    $slidenum = 1;
    if (isset($ses["images"])){
        echo "Processing images (" .count($ses['images']) ."): ";
        foreach($ses["images"] as $img) {
            $imgpath = $dir ."/" ."slide" .$slidenum .".jpg";
            if (!file_exists($imgpath)) {
                $image = "http://www.tvworldwide.com/events/pcast/" .$ses["datecode"] ."/globe_show/slides/" .$ses['gsid'] ."/Slide" .$slidenum .".jpg";
                $image = str_replace("globe_show/globe_show", "globe_show", $image);
                $getimg = file_get_contents($image);
                $fp = fopen($imgpath, 'w');
                fwrite($fp, $getimg);
                echo $slidenum ." ";
                fclose($fp);
            }
            $slidenum++;
        }
	echo " ... done with images\n\n";
    } else { 
        echo "no images for current stream.\n\n"; 
    }
    $flvfile = $dir ."/" .$streamname .".flv";
    if (!file_exists($flvfile) && $ses["file"])	{
        $exec = "flvstreamer -r " .$ses["streamer"] ." -y " .$ses["file"] ." -o " .$flvfile;
        $exec .= " 2>&1";
        echo "Running: $exec \n\n";
        passthru($exec);
    } else { 
        echo "FLV file already exists.\n"; 
    }
}

function filterSlide($session) {

    $vars["description"] = $session["description"];
    $ssessionurl = $session["url"];
    $ssessionurl = str_replace("default_go.cfm", "default_go_archive.cfm", $ssessionurl); 
    $image = array();
    $ssessionurl = str_replace('&amp;', '&', $ssessionurl);
    $split = explode("',", $ssessionurl);
    $ssessionurl = $split[0];
    echo "Opening $ssessionurl\n\n";
    $ssessionurl = str_replace("&type=flv", "", $ssessionurl);
    $html = file_get_contents($ssessionurl ."&type=flv", false, $context);
    echo $html;
    preg_match_all("/flashvars','(.*?)'\)/s", $html, $swfvars, PREG_PATTERN_ORDER);
    $swfvars = $swfvars[1][0];	
    $swfvars = explode("&", $swfvars);
    foreach($swfvars as $var){
        $split = explode("=", $var);
        if($split[0] && $split[1]){
            $vars["$split[0]"] = $split[1];	
        }
        
    }    
    preg_match_all('/timeString \= \"(.*?)\"\;/s', $html, $images, PREG_PATTERN_ORDER);
    $images = explode(",", $images[1][0]);
    for($i = 0; $i < count($images); $i++) {
        $split = explode(";",$images[$i]);
        if($split[1]) { $image[] = intval($split[1]); }
        }
    $vars["images"] = $image;
    $pat[] = "pcast/";
    $pat[] = "PCAST/";
    $pat[] = ".flv";
    $rep = "";
    $urlsplt = explode("globe_show", $ssessionurl);
    $vars["urlbase"] = $urlsplt[0];
    $vars["date"] = $session['date'];
    $vars["captionsurl1"] = $urlsplt[0] .$vars["captions.file"];
    $vars["captionsurl2"] = $urlsplt[0] ."globe_show/" .$vars["captions.file"];
    $vars["streamname"] = str_replace($pat, $rep, $vars["file"]);
    $gsid = explode("?", $ssessionurl);
    $gsid = str_replace("&type=flv&test=0&live=0", "", $gsid[1]);
    $vars["gsid"] = str_replace("gsid=", "", $gsid); 
    $datecode = explode("/", $ssessionurl);
    $vars["datecode"] = $datecode[5];
    return $vars;

}

function filterNonSlide($session){
    $url = str_replace('&amp;', '&', $session['url']);
	$html = file_get_html($url);
    foreach($html->find('embed') as $flvobject) {
        $swfvars = $flvobject->flashvars;
        $swfvars = explode("&", $swfvars);
        foreach($swfvars as $var){
            $split = explode("=", $var);
            if($split[0] && $split[1]) {
                $vars["$split[0]"] = $split[1];
            }
        }
    }
    //$vars["captionsurl"] = $urlsplt[0] .$vars["captions.file"];
    $pat[] = "pcast/";
    $pat[] = "PCAST/";
    $pat[] = ".flv";
    $rep = "";
    $vars["streamname"] = str_replace($pat, $rep, $vars["file"]);
    unset($pat);
    $urlchop = explode("default.cf", $url);
    $vars["captionsurl1"] = $urlchop[0] .$vars["captions.file"];
    //$vars["description"] = strip_tags($html->find('span[class=style50]', 0)->innertext);
    $vars["description"] = $session['description'];
    $vars["date"] = $session["date"];
    //echo $vars['description'] ."\n";
    return $vars;
    //return $session;	
    
}
    



function getMeetings(){
    $urls = Array();
    $html = file_get_html("http://www.whitehouse.gov/administration/eop/ostp/pcast/meetings/past");
    foreach ($html->find('a') as $link ) {
        if ($link->innertext == "Webcast") {
            $urls[]= $link->href;
            }
        }
    return $urls;
    }


function getPcasts($url, $date){
    $dateurl = $url ."/videos.cfm";
    $dateurl = str_replace("//vid", "/vid", $dateurl);
    //echo "<h3><a href='$dateurl'>Working on $dateurl</a></h3> \n";
    $html = file_get_html($dateurl);
    
    $slidesessionurls = Array();
    $shtml = $html;
    $splithtml = explode("<hr />", $shtml);
    unset($splithtml[count($splithtml)]);
    $streams = Array();
    foreach ($splithtml as $session)   {
        $description = str_get_html($session)->find('strong',0)->innertext;
        //echo $description ."\n";
        if (!$description) {
            //echo "No description.\n";
        }
        $link['description'] = $description;
        $link['date'] = $date;
        $url = str_get_html($session)->find('a',0);
        if ($url->onclick) {
            $longurl = $url->onclick;
            $pat[] = "MM_openBrWindow('";
            $rep[] = "";
            $pat[] = "')";
            $rep[] = "";
            $link['url'] = str_replace($pat, $rep, $longurl);
            $link['type'] = "slide";
        } else {
            $link['url'] = str_replace("videos.cfm", $url->href, $dateurl);
            $link['type'] = "nonslide";
        }
        
        if ($description && $url) {
        
        array_push($streams,$link);
        
        } else {
        //echo "Malformed stream";         
        }
        
    }
    return $streams;
}
 
 


function testCaptions($url) {
	$html = file_get_html($url);
	//echo $html ."<hr/>";
	$title = $html->find("title", 0)->innertext;
	if ($title == "Bad request" or !file_exists($url)){
		echo "$url returned a 404\n";
		return 0;
	} else {
		echo "$url is probably captions.  downloading it\n!";
		return 1;
	}
}
  
function processStreamname($streamname, $date){
	$sn = array();
	$streamarray = preg_split('/[_-]/', $streamname);
	var_dump($streamarray);
	foreach($streamarray as $unit){
		if (strlen($unit) == 4 && is_numeric($unit)) { $sn['time'] = $unit; }
		if (strlen($unit) == 6 && is_numeric($unit)) { $sn['date'] = $unit; }
	
	}
	return $date ."_" ."pcast_" .$sn['time'];
}


?> 
