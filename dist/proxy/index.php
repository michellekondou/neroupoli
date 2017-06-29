<?php

$outfile= 'data.json';
$url='http://water-polis.gr/admin/index.php/wp-json/wp/v2/posts/';
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
 