<?php


use frontend\widgets\banner\BannerWidget;
use yii\base\Widget;
use frontend\widgets\chat\ChatWidget;
use yii\helpers\Url;
/* @var $this yii\web\View */

$this->title = '博客首页';
?>

<div class="row">
<div class="col-lg-1">

</div>
    <div class="col-lg-10">
    <!-- 图片轮播 -->
    <div class="jumbotron">
        <h1>&nbsp;&nbsp;&nbsp;&nbsp;Welcome to my blog*✧⁺˚⁺</h1>

       
    </div>
        <?=BannerWidget::widget()?>
       
    </div>

    
    <div class="col-lg-1">

    </div>
</div>