<?php
namespace frontend\widgets\banner;

use Yii;
use yii\bootstrap\Widget;

class BannerWidget extends Widget
{
    public $items=[];
    public function init()
    {
        if(empty($this->items))
        {
            $this->items=[
                [
                    'label'=>'demo11',
                    'img_url'=>'@web/statics/images/banner/b1.png',
                    'url'=>['site/index'],
                    'html'=>'',
                    'active'=>'active',
                    
                ],
                [
                    'label'=>'demo22',
                    'img_url'=>'@web/statics/images/banner/b2.png',
                    'url'=>['site/index'],
                    'html'=>'',
                ],
                [
                    'label'=>'demo33',
                    'img_url'=>'@web/statics/images/banner/b3.png',
                    'url'=>['site/index'],
                    'html'=>'',
                ]
            ];
        }
       
    }
    public function run()
    {
        $data['items']=$this->items;
        return $this->render('index',['data'=>$data]);
    }
}