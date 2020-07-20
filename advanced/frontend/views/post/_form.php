<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\Post */
/* @var $form yii\widgets\ActiveForm */
//    <?= $form->field($model, 'cat_id')->dropDownList(['1'=>'分类1','2'=>'分类2']) ?>

<div class="post-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'title')->textInput(['maxlength' => true]) ?>



    <?= $form->field($model, 'content')->widget('common\widgets\ueditor\Ueditor',[
        'options'=>[
            'initialFrameWidth' => 700,
            'initialFrameHeigh' => 500,
        ]
    ]) ?>



    <?= $form->field($model, 'tags')->textarea(['rows' => 6]) ?>


    <div class="form-group">
        <?= Html::submitButton('发布', ['class' => 'btn btn-success' ]) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
