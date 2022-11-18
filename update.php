<?php

/**Connecting to MySQL DB */
$conn = mysqli_connect("localhost","root","","cc105",3307,"C:/xampp/mysql/mysql.sock");
$database = mysqli_select_db($conn,'cc105');

/** $EncodedData variable stores the data that is taken from the front end.*/
$EndodedData= file_get_contents('php://input');

/**The 1st parameter of the $decodedData variable, 
	 * specifies the value to be decoded. The second parameter is a boolean in which the returned object will be converted into an associative array. 
	 * Default is false. */
	$DecodeData=json_decode($EndodedData, true);

    $ID = $DecodeData['ID'];
    /**Populating New user data from FRONT END and storing into another variables */
    $new_Fname = $DecodeData['FirstName'];
    $new_Lname=$DecodeData['LastName'];
	$new_Uname=$DecodeData['Username'];
	$new_Pword=$DecodeData['Password'];

    /**Creating query and insert into DB */
    $sql = "UPDATE registeredusers SET FirstName='$new_Fname', LastName='$new_Lname', Username='$new_Uname', Password='$new_Pword' WHERE ID='$ID'";

    if(mysqli_query($conn, $sql)){
        $Message = 'Record Successfully Updated.';
        $JSONMessage = json_encode($Message);
		echo $JSONMessage;
    }else{
        $Message = 'Update Error';
        $JSONMessage = json_encode($Message);
		echo $JSONMessage;
    }
   

?>