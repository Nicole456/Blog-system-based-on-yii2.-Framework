<?php
use yii\helpers\Url; 
/* @var $this yii\web\View */

$this->title = 'My Yii Application';
?>
<div class="site-index">

    <div class="jumbotron">
        <h1>Welcome to blog backend manage system!</h1>

       
    </div>

    <div class="body-content">
	
        <div class="row">
        <img alt="" src="<?php echo Url::to('@web/statics/images/index2.jpeg'); ?>" class="index-img"><br>
            <!-- <div class="col-lg-4">
                
           
            </div>
            <div class="col-lg-4">
               
            <img alt="" src="<?php echo Url::to('@web/statics/images/index2.jpg'); ?>" class="img-class"><br>
               
            </div>
            <div class="col-lg-4">
              
            <img alt="" src="<?php echo Url::to('@web/statics/images/index3.jpg'); ?>" class="img-class"><br>
               
            </div> -->
        </div>

    </div>
</div>
