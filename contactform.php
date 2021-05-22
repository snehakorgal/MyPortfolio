<?php 
  //creating connection to database
$con=mysqli_connect("localhost","root","","contact") or die(mysqli_error());
  //check whether submit button is pressed or not
if((isset($_POST['submit'])))
{
  //fetching and storing the form data in variables
$Uname = $con->real_escape_string($_POST['Uname']);
$Email = $con->real_escape_string($_POST['Email']);
$Subject = $con->real_escape_string($_POST['Subject']);
$Message = $con->real_escape_string($_POST['Message']);
  //query to insert the variable data into the database
$sql="INSERT INTO contactdetails (Uname,Email,Subject,Message) VALUES ('".$Uname."','".$Email."', '".$Subject."', '".$Message."')";
  //Execute the query and returning a message
if(!$result = $con->query($sql)){
die('Error occured [' . $conn->error . ']');
}
else
   echo "Thank you! We will get in touch with you soon";
}
?>