<?php
$conn = mysqli_connect("localhost","root","","cc105",3307,"C:/xampp/mysql/mysql.sock");
$database = mysqli_select_db($conn,'cc105');

    /** $EncodedData variable stores the data that is taken from the front end.*/
    $EndodedData= file_get_contents('php://input');

/**The 1st parameter of the $decodedData variable, 
	 * specifies the value to be decoded. The second parameter is a boolean in which the returned object will be converted into an associative array. 
	 * Default is false. */
	$DecodeData=json_decode($EndodedData, true);

    $ID = $DecodeData['ID'];

    // Creating SQL query and deleting the current record into MySQL database table.
    $sql = "DELETE FROM registeredusers WHERE ID ='$ID'";

    if(mysqli_query($conn, $sql)){
        $Message= 'Record deleted successfully.';
        $JSON_msg = json_encode($Message);
        echo $JSON_msg;
    }else{
        $Message= 'Please, try again.';
        $JSON_msg = json_encode($Message);
        echo $JSON_msg;
    }

mysqli_close($conn);
?>