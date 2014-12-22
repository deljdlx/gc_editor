<?php




$uploadPath=__DIR__.'/../public/media/upload';
$uploadURI='media/upload';

$data=array();
foreach ($_FILES as $fileName=>$file) {
	move_uploaded_file($file['tmp_name'], $uploadPath.'/'.$fileName);

	$status='succes';

	$data[]=array(
		'uri'=>$uploadURI.'/'.$fileName,
		'status'=>$status,
	);
	break;
}


header('Content-type: application/json');
echo json_encode($data);








