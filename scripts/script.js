var xBigW =0;
var xMediumW =0;
var xSmallW =0;
var xMiddleW =0;
var xBigH =0;
var xSmallH =0;

var canAnimate = true;
var lastHovered = new Object();
var lastClass;
var gThis;
var timerIsOn= 0;
var t=new Object();

function xAnimateChange_SplitSlide(xA,xB,xC,xD,xE,xF){
    canAnimate = false;
    var xADone = false;
    var xBDone = false;
    var xCDone = false;
    var xDDone = false;
    var xEDone = false;
    var xFDone = false;
    var xTime = 300;
    MRA=0;
    MRB=0;
    MRC=0;
    MRD=0;
    MRE=0;
    MRF=0;
    if(xA=="xA"){
        MRA=0;
        MRB=xBigW;
        MRC=xBigW+xMediumW;
        MRD=0;
        MRE=xSmallW+1;
        MRF=xMiddleW+xSmallW+2;
        //
        MTA=0;
        MTB=0;
        MTC=0;
        MTD=xBigH+1;
        MTE=xBigH+1;
        MTF=xBigH+1;

    }
    if(xA=="xB"){
        MRA=xMediumW+1;
        MRB=0;
        MRC=xBigW+MRA;
        MRD=0;
        MRE=xSmallW+1;
        MRF=xMiddleW+xSmallW+2;
        //
        MTA=0;
        MTB=0;
        MTC=0;
        MTD=xBigH+1;
        MTE=xBigH+1;
        MTF=xBigH+1;
    }
    if(xA=="xC"){
        MRA=xMediumW+1;
        MRB=0;
        MRC=0;
        MRD=0;
        MRE=xSmallW+1;
        MRF=xMiddleW+xSmallW+2;
        //
        MTA=0;
        MTB=0;
        MTC=0;
        MTD=xBigH+1;
        MTE=xBigH+1;
        MTF=xBigH+1;
    }
    if(xA=="xD"){
        MRA=0;
        MRB=xBigW;
        MRC=MRB+xMediumW;
        MRD=0;
        MRE=xSmallW+1;
        MRF=xMiddleW+xSmallW+2;
        //
        MTA=xSmallH+1;
        MTB=xSmallH+1;
        MTC=xSmallH+1;
        MTD=0;
        MTE=0;
        MTF=0;
    }
    if(xA=="xE"){
        MRA=xMediumW+1;
        MRB=0;
        MRC=MRA+xBigW+1;
        MRD=0;
        MRE=xSmallW+1;
        MRF=xMiddleW+xSmallW+2;
        //
        MTA=xSmallH+1;
        MTB=xSmallH+1;
        MTC=xSmallH+1;
        MTD=0;
        MTE=0;
        MTF=0;
    }
    if(xA=="xF"){
        MRA=xMediumW+1;
        MRB=0;
        MRC=0;
        MRD=0;
        MRE=xSmallW+1;
        MRF=xMiddleW+xSmallW+2;
        //
        MTA=xSmallH+1;
        MTB=xSmallH+1;
        MTC=xSmallH+1;
        MTD=0;
        MTE=0;
        MTF=0;
    }
    jQuery('.xSSSlideshow .'+xA).animate({
        width:xBigW-1+'px',
        height : xBigH+'px',
        marginLeft : MRA+'px',
        marginTop: MTA+'px'
    },{
        duration: xTime,
        queue: false
    });
    jQuery('.xSSSlideshow .'+xA+' a').animate({
        width:xBigW*0.9+'px',
        marginLeft :'0px',
        marginTop: xBigH-xBigH*0.95+'px',
        fontSize: '24px'
    },{
        duration: xTime,
        queue: false
    });
    jQuery('.xSSSlideshow .'+xB).animate({
        width : xMediumW+'px',
        height : xBigH+'px',
        marginLeft : MRB+'px',
        marginTop: MTB+'px'
    },{
        duration: xTime,
        queue: false
    });
    jQuery('.xSSSlideshow .'+xB+' a').animate({
        width:xMediumW*0.9+'px',
        marginLeft : '0px',
        marginTop: xBigH-xBigH*0.95+'px',
        fontSize: '18px'
    },{
        duration: xTime,
        queue: false
    });
    jQuery('.xSSSlideshow .'+xC).animate({
        width : '0px',
        height : xBigH+'px',
        marginLeft : MRC+'px',
        marginTop: MTC+'px'
    },{
        duration: xTime,
        queue: false,
        complete: function(){
            if(lastClass=='.xSSSlideshow .'+xC+' img'){
                jQuery('.xSSSlideshow .'+xC+' img').attr('src','');
                lastClass='';
            }
        }
    });
    jQuery('.xSSSlideshow .'+xD).animate({
        width : xSmallW+'px',
        height : xSmallH+'px',
        marginLeft : MRD+'px',
        marginTop: MTD+'px'
    },{
        duration: xTime,
        queue: false
    });
    jQuery('.xSSSlideshow .'+xD+' a').animate({
        width:xSmallW*0.9+'px',
        marginLeft : '0px',
        marginTop: xSmallH-xSmallH*0.95+'px',
        fontSize: '14px'
    },{
        duration: xTime,
        queue: false
    });
    jQuery('.xSSSlideshow .'+xE).animate({
        width : xMiddleW+'px',
        height : xSmallH+'px',
        marginLeft : MRE+'px',
        marginTop: MTE+'px'
    }, {
        duration: xTime,
        queue: false
    });
    jQuery('.xSSSlideshow .'+xE+' a').animate({
        width:xMiddleW*0.9+'px',
        marginLeft : '0px',
        marginTop: xSmallH-xSmallH*0.95+'px',
        fontSize: '14px'
    },{
        duration: xTime,
        queue: false
    });
    jQuery('.xSSSlideshow .'+xF).animate({
        width : xSmallW+'px',
        height : xSmallH+'px',
        marginLeft : MRF+'px',
        marginTop: MTF+'px'
    }, {
        duration: xTime,
        queue: false
    });
    jQuery('.xSSSlideshow .'+xF+' a').animate({
        width:xSmallW*0.9+'px',
        marginLeft : '0px',
        marginTop: xSmallH-xSmallH*0.95+'px',
        fontSize: '14px'
    },{
        duration: xTime,
        queue: false
    });
}
function xAnimateSlideshowA(xThis){
    var xFrom ='';
    lastHovered = xThis;
    if(jQuery(xThis).css('width')!=xBigW){
        if(jQuery(xThis).hasClass('xA')){
            xFrom = '.xSSSlideshow .xC img';
            xFromB = '.xSSSlideshow .xC a';
            lastClass = xFrom;
            if(jQuery('.xSSSlideshow .xF img').attr('src')==""){
                jQuery('.xSSSlideshow .xF img').attr('src',jQuery(xFrom).attr('src'));
                jQuery('.xSSSlideshow .xF a').attr('href',jQuery(xFromB).attr('href'));
                jQuery('.xSSSlideshow .xF a').html(jQuery(xFromB).html());
            }else if(jQuery('.xSSSlideshow .xD img').attr('src')==""){
                jQuery('.xSSSlideshow .xD img').attr('src',jQuery(xFrom).attr('src'));
                jQuery('.xSSSlideshow .xD a').attr('href',jQuery(xFromB).attr('href'));
                jQuery('.xSSSlideshow .xD a').html(jQuery(xFromB).html());
            }

            xAnimateChange_SplitSlide('xA','xB','xC','xD','xE','xF');
        }
        if(jQuery(xThis).hasClass('xB')){
            xFrom = '.xSSSlideshow .xC img';
            xFromB = '.xSSSlideshow .xC a';
            lastClass = xFrom;
            if(jQuery('.xSSSlideshow .xA img').attr('src')==""){
                jQuery('.xSSSlideshow .xA img').attr('src',jQuery(xFrom).attr('src'));
                jQuery('.xSSSlideshow .xA a').attr('href',jQuery(xFromB).attr('href'));
                jQuery('.xSSSlideshow .xA a').html(jQuery(xFromB).html());
            }else if(jQuery('.xSSSlideshow .xF img').attr('src')==""){
                jQuery('.xSSSlideshow .xF img').attr('src',jQuery(xFrom).attr('src'));
                jQuery('.xSSSlideshow .xF a').attr('href',jQuery(xFromB).attr('href'));
                jQuery('.xSSSlideshow .xF a').html(jQuery(xFromB).html());
            }else if(jQuery('.xSSSlideshow .xD img').attr('src')==""){
                jQuery('.xSSSlideshow .xD img').attr('src',jQuery(xFrom).attr('src'));
                jQuery('.xSSSlideshow .xD a').attr('href',jQuery(xFromB).attr('href'));
                jQuery('.xSSSlideshow .xD a').html(jQuery(xFromB).html());
            }

            xAnimateChange_SplitSlide('xB','xA','xC','xD','xE','xF');
        }
        if(jQuery(xThis).hasClass('xC')){
            xFrom = '.xSSSlideshow .xA img';
            xFromB = '.xSSSlideshow .xA a';
            lastClass = xFrom;
            if(jQuery('.xSSSlideshow .xF img').attr('src')==""){
                jQuery('.xSSSlideshow .xF img').attr('src',jQuery(xFrom).attr('src'));
                jQuery('.xSSSlideshow .xF a').attr('href',jQuery(xFromB).attr('href'));
                jQuery('.xSSSlideshow .xF a').html(jQuery(xFromB).html());
            }else if(jQuery('.xSSSlideshow .xD img').attr('src')==""){
                jQuery('.xSSSlideshow .xD img').attr('src',jQuery(xFrom).attr('src'));
                jQuery('.xSSSlideshow .xD a').attr('href',jQuery(xFromB).attr('href'));
                jQuery('.xSSSlideshow .xD a').html(jQuery(xFromB).html());
            }

            xAnimateChange_SplitSlide('xC','xB','xA','xD','xE','xF');
        }
        if(jQuery(xThis).hasClass('xD')){
            xFrom = '.xSSSlideshow .xF img';
            xFromB = '.xSSSlideshow .xF a';
            lastClass = xFrom;
            if(jQuery('.xSSSlideshow .xA img').attr('src')==""){
                jQuery('.xSSSlideshow .xA img').attr('src',jQuery(xFrom).attr('src'));
                jQuery('.xSSSlideshow .xA a').attr('href',jQuery(xFromB).attr('href'));
                jQuery('.xSSSlideshow .xA a').html(jQuery(xFromB).html());
            }else if(jQuery('.xSSSlideshow .xC img').attr('src')==""){
                jQuery('.xSSSlideshow .xC img').attr('src',jQuery(xFrom).attr('src'));
                jQuery('.xSSSlideshow .xC a').attr('href',jQuery(xFromB).attr('href'));
                jQuery('.xSSSlideshow .xC a').html(jQuery(xFromB).html());
            }

            xAnimateChange_SplitSlide('xD','xE','xF','xA','xB','xC');
        }
        if(jQuery(xThis).hasClass('xE')){
            xFrom = '.xSSSlideshow .xF img';
            xFromB = '.xSSSlideshow .xF a';
            lastClass = xFrom;
            if(jQuery('.xSSSlideshow .xD img').attr('src')==""){
                jQuery('.xSSSlideshow .xD img').attr('src',jQuery(xFrom).attr('src'));
                jQuery('.xSSSlideshow .xD a').attr('href',jQuery(xFromB).attr('href'));
                jQuery('.xSSSlideshow .xD a').html(jQuery(xFromB).html());
            }else if(jQuery('.xSSSlideshow .xA img').attr('src')==""){
                jQuery('.xSSSlideshow .xA img').attr('src',jQuery(xFrom).attr('src'));
                jQuery('.xSSSlideshow .xA a').attr('href',jQuery(xFromB).attr('href'));
                jQuery('.xSSSlideshow .xA a').html(jQuery(xFromB).html());
            }else if(jQuery('.xSSSlideshow .xC img').attr('src')==""){
                jQuery('.xSSSlideshow .xC img').attr('src',jQuery(xFrom).attr('src'));
                jQuery('.xSSSlideshow .xC a').attr('href',jQuery(xFromB).attr('href'));
                jQuery('.xSSSlideshow .xC a').html(jQuery(xFromB).html());
            }
            xAnimateChange_SplitSlide('xE','xD','xF','xA','xB','xC');
        }
        if(jQuery(xThis).hasClass('xF')){
            xFrom = '.xSSSlideshow .xD img';
            xFromB = '.xSSSlideshow .xD a';
            lastClass = xFrom;
            if(jQuery('.xSSSlideshow .xA img').attr('src')==""){
                jQuery('.xSSSlideshow .xA img').attr('src',jQuery(xFrom).attr('src'));
                jQuery('.xSSSlideshow .xA a').attr('href',jQuery(xFromB).attr('href'));
                jQuery('.xSSSlideshow .xA a').html(jQuery(xFromB).html());
            }else if(jQuery('.xSSSlideshow .xC img').attr('src')==""){
                jQuery('.xSSSlideshow .xC img').attr('src',jQuery(xFrom).attr('src'));
                jQuery('.xSSSlideshow .xC a').attr('href',jQuery(xFromB).attr('href'));
                jQuery('.xSSSlideshow .xC a').html(jQuery(xFromB).html());
            }

            xAnimateChange_SplitSlide('xF','xE','xD','xA','xB','xC');
        }

    }
}
function xSSTimerStartSlideA(){
    clearTimeout(t);
    timerIsOn = 0;
    if(jQuery('img',gThis).attr('src')!=""){
        xAnimateSlideshowA(gThis);
    }

}
function xSSSplitSlide(xWidth,xHeight){

    xBigW = Math.floor(xWidth*(60/100));//big box width
    xMediumW = xWidth - xBigW ;//medium  box width
    xSmallW = Math.floor(xWidth*(33/100));//small box width
    xMiddleW = xWidth-(xSmallW*2)-2;// middle small box width
    xBigH = Math.floor(xHeight*(55/100));//big and medium boxes height
    xSmallH = Math.floor(xHeight*(45/100));//rest of boxes height
    //animate to new Width and Height
    xAnimateChange_SplitSlide('xD','xE','xF','xA','xB','xC');
   
    jQuery(".xSSSlideshow li").mouseenter(function(){
        gThis = this;
        if(timerIsOn==0){
            timerIsOn = 1;
            t = setTimeout("xSSTimerStartSlideA();",310);
        }
    });
}
jQuery(document).ready(function($){
    $('.xSSSlideshow li:nth-child(1)').addClass('xA');
    $('.xSSSlideshow li:nth-child(2)').addClass('xB');
    $('.xSSSlideshow li:nth-child(3)').addClass('xC');
    $('.xSSSlideshow li:nth-child(4)').addClass('xD');
    $('.xSSSlideshow li:nth-child(5)').addClass('xE');
    $('.xSSSlideshow li:nth-child(6)').addClass('xF');
    
    xSSSplitSlide(xSSWidth,xSSHeight);
});