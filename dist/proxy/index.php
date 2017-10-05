<?php

$outfile = 'data.json';
$url='https://water-polis.gr/admin/wp-json/wp/v2/posts?per_page=20';
$json = file_get_contents($url);
$data = json_decode($json); 
$newdata = json_encode($data);
$writable = ( is_writable($outfile) ) ? TRUE : chmod($outfile, 0755);
if($writable) { 
    if(file_put_contents($outfile, $newdata)) {
      echo "Saved JSON fetched from “{$url}” as “{$outfile}”.";
    }
    else {
      echo "Unable to save JSON to “{$outfile}”.";
    }
}
else {
   echo "Unable to fetch JSON from “{$url}”.";
}

?>
 