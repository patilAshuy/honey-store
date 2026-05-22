<?php

include 'config.php';

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$payment_id = $_POST['payment_id'];

$product = "Organic Honey";

$amount = 499;

$sql = "INSERT INTO orders
(customer_name,email,phone,product_name,amount,payment_id)

VALUES

('$name','$email','$phone','$product','$amount','$payment_id')";

if($conn->query($sql) === TRUE){

    echo "success";

}else{

    echo "failed";
}

?>
