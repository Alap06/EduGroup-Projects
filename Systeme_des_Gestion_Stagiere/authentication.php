<?php 
/* 
  Createur:Ala Amara
  Date:2012-02-24
  ccontact : amara.ala404@gmail.com
*/
ob_start();
session_start();
require 'classes/admin_class.php';
$obj_admin = new Admin_Class();

if(isset($_GET['logout'])){
	$obj_admin->admin_logout();
}