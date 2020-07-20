

<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
use frontend\assets\AppAsset;

 
AppAsset::register($this);  
//css定义一样  
$this->registerCssFile('@web/css/style.css'); 

/* @var $this yii\web\View */
/* @var $model common\models\Post */

$this->title = '创建文章';
$this->params['breadcrumbs'][] = ['label' => '文章', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>


<?=Html::cssFile('@web/css/create.css')?>
<?php
   $this->beginPage() 
?> 
<?php $this->head() ?>
<?php $this->beginBody() ?> 
<?php $this->endBody() ?>
<?php $this->endPage() ?>


<div class="row">
    <div class="col-lg-9">
        <div class="panel-title box title">
            <span class="page-header">创建文章</span>
            <div class="post-create">
                <?= $this->render('_form', [
                    'model' => $model,
                ]) ?>
             </div>
        </div>
    </div>
    <div class="col-lg-3">
        <div class="panel-title box title">
            <span class="page-header">注意事项</span>
        </div>
        <div class="panel-body">
            <p>1.请不要发表任何反动、不健康、人身攻击性的文章</p>
            <p>2.必须遵守中华人民共和国的一切法律法规</p>
            <p>3.用户发表的文章仅代表个人观点，与本站社区无关</p>
            <p>4.请不要张贴垃圾信息</p>
            <p>5.请不要张贴垃圾广告</p>
            <p> 6.请不要在论坛中发表与版区主题无关的文章</p>
        </div>

    </div>



</div>









