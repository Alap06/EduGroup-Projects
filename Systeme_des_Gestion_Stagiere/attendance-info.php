<?php
/* 
  Createur:Ala Amara
  Date:2012-02-24
  ccontact : amara.ala404@gmail.com
*/

require 'authentication.php'; // admin authentication check

// auth check
$user_id = $_SESSION['admin_id'];
$user_name = $_SESSION['name'];
$security_key = $_SESSION['security_key'];
$user_role = $_SESSION['user_role'];
if ($user_id == NULL || $security_key == NULL) {
    header('Location: index.php');
}

if (isset($_GET['delete_attendance'])) {
    $action_id = $_GET['aten_id'];
    $sql = "DELETE FROM attendance_info WHERE aten_id = :id";
    $sent_po = "attendance-info.php";
    $obj_admin->delete_data_by_this_method($sql, ['id' => $action_id], $sent_po);
}

if (isset($_POST['add_punch_in'])) {
    $info = $obj_admin->add_punch_in($_POST);
}

if (isset($_POST['add_punch_out'])) {
    $obj_admin->add_punch_out($_POST);
}

$page_name = "Attendance";
include("include/sidebar.php");
?>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

<div class="row">
  <div class="col-md-12">
    <div class="well well-custom">
      <div class="row">
        <div class="col-md-8 ">
          <div class="btn-group">
            <?php
            $sql = "SELECT * FROM attendance_info WHERE atn_user_id = :user_id AND out_time IS NULL";
            $params = ['user_id' => $user_id];
            $info = $obj_admin->manage_all_info($sql, $params);
            $num_row = $info->rowCount();
            if ($num_row == 0) {
            ?>
              <div class="btn-group">
                <form method="post" role="form" action="">
                  <input type="hidden" name="user_id" value="<?php echo $user_id; ?>">
                  <button type="submit" name="add_punch_in" class="btn btn-primary btn-lg rounded" >Entrée</button>
                </form>
              </div>
            <?php } ?>
          </div>
        </div>
      </div>

      <center>
        <h3>Gestion des présences</h3>
      </center>
      <div class="gap"></div>

      <div class="gap"></div>

      <div class="table-responsive">
        <table class="table table-codensed table-custom">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Entrée</th>
              <th>Sortie</th>
              <th>Total</th>
              <th>Etat</th>
              <?php if ($user_role == 1) { ?>
                <th>Action</th>
              <?php } ?>
            </tr>
          </thead>
          <tbody>
            <?php
              if ($user_role == 1) {
                $sql = "SELECT a.*, b.fullname 
                FROM attendance_info a
                LEFT JOIN tbl_admin b ON a.atn_user_id = b.id_admin
                ORDER BY a.aten_id DESC";
              } else {
                $sql = "SELECT a.*, b.fullname 
                FROM attendance_info a
                LEFT JOIN tbl_admin b ON a.atn_user_id = b.id_admin
                WHERE atn_user_id = :user_id AND out_time IS NOT NULL
                ORDER BY a.aten_id DESC";
                $params = ['user_id' => $user_id];
              }

                  $info = $obj_admin->