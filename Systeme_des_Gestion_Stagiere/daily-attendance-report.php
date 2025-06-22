<?php

/* 
  Createur:Ala Amara
  Date:2012-02-24
  ccontact : amara.ala404@gmail.com
*/
if(isset($_SERVER['HTTPS'])){
    $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
}
else{
    $protocol = 'http';
}
$base_url = $protocol . "://".$_SERVER['SERVER_NAME'].'/' .(explode('/',$_SERVER['PHP_SELF'])[1]).'/';
?>

<?php
require 'authentication.php'; // admin authentication check 

// auth check
$user_id = $_SESSION['admin_id'];
$user_name = $_SESSION['name'];
$security_key = $_SESSION['security_key'];
if ($user_id == NULL || $security_key == NULL) {
    header('Location: index.php');
}

// check admin
$user_role = $_SESSION['user_role'];


if(isset($_GET['delete_task'])){
  $action_id = $_GET['task_id'];
  
  $sql = "DELETE FROM task_info WHERE task_id = :id";
  $sent_po = "task-info.php";
  $obj_admin->delete_data_by_this_method($sql,$action_id,$sent_po);
}

if(isset($_POST['add_task_post'])){
    $obj_admin->add_new_task($_POST);
}

$page_name="Task_Info";
include("include/sidebar.php");
// include('ems_header.php');


?>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

    <div class="row">
      <div class="col-md-12">
        <div class="well well-custom rounded-0">
          <div class="gap"></div>
          <div class="row">
            <div class="col-md-4">
                <input type="date" id="date" value="<?= isset($_GET['date']) ? $_GET['date'] : date('Y-m-d') ?>" class="form-control rounded-0">
            </div>
            <div class="col-md-4">
                  <button class="btn btn-primary btn-sm btn-menu" type="button" id="filter"><i class="glyphicon glyphicon-filter"></i> Filter</button>
                  <button class="btn btn-success btn-sm btn-menu" type="button" id="print"><i class="glyphicon glyphicon-print"></i> Imprimer</button>
            </div>

            
          </div>
          <center ><h3>Rapport des présences /jour</h3></center>
          <div class="gap"></div>

          <div class="gap"></div>
          <div class="table-responsive" id="printout">
          <table class="table table-codensed table-custom">
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Nom</th>
                  <th>Début</th>
                  <th>Fin</th>
                  <th>Total de la durée</th>
                </tr>
              </thead>
              <tbody>

              <?php 
                  $sql = "SELECT a.*, b.fullname 
                  FROM attendance_info a
                  LEFT JOIN tbl_admin b ON(a.atn_user_id = b.user_id) where (? BETWEEN date(a.in_time) and date(a.out_time))
                  ORDER BY a.aten_id DESC";
                  $info = $obj_admin->manage_all_info($sql, [$_GET['date'] ?? date('Y-m-d')]);
                  $serial  = 1;
                  $num_row = $info->rowCount();
                  if($num_row==0){
                    echo '<tr><td colspan="7">No Data found</td></tr>';
                  }
                      while( $row = $info