// ==UserScript==
//去除广告代码来自https://greasyfork.org/zh-CN/scripts/24192-百度广告-首尾推广及右侧广告-清理
// ==/UserScript==
setInterval(function(){
    //日历
       //  if(location.href.split("wd=")[1].split("&")[0].indexOf("%E6%97%A5%E5%8E%86")!=-1)return;
        // if(location.href.split("wd=")[1].split("&")[0].indexOf("-baijiahao")==-1){
          //   location.href=location.href.replace(/((&|\?)wd=.*?)(&|$)/,'$1+-baijiahao&');
            //    }
         // if(location.href.split("wd=")[1].split("&")[0].indexOf("-baijiahao")!==-1){
       clearAD();       
       //         }
	},1000);
    function clearAD(){
        var mAds=document.querySelectorAll(".first-card-container,.page-banner,.ec_wise_ad,#rs,#content_right,.tab-wrap,#navs,.blank-frame,#menu-container,.wa-recommend-list,.sfc-image-content-psrs,.sfc-image-content-looprs,.baiduapp-ad-body,#page-tips"),i;
        for(i=0;i<mAds.length;i++){
            var mAd=mAds[i];
            mAd.remove();
        }
        var list=document.body.querySelectorAll("#content_left>div,#content_left>table,.sfc-image-content-waterfall-item");
        for(i=0;i<list.length;i++){
            let item = list[i];
            let s = item.getAttribute("style");
            if (s && /display:(table|block)\s!important/.test(s)) {
                item.remove();
            }else{
                var span=item.querySelector("div>span");
                if(span && span.innerHTML=="广告"){
                    item.remove();
                }
                [].forEach.call(item.querySelectorAll("a>span"),function(span){
                    if(span && (span.innerHTML=="广告" || span.getAttribute("data-tuiguang"))){
                        item.remove();
                    }
                });
               [].forEach.call(item.querySelectorAll("p>span"),function(span){
                    if(span && (span.innerHTML=="广告" || span.getAttribute("class"))){
                        item.remove();
                    }

                });
            }
        }

        var eb = document.querySelectorAll("#content_right>table>tbody>tr>td>div");
        for(i=0;i<eb.length;i++){
            let d = eb[i];
            if (d.id!="con-ar") {
                d.remove();
            }
        }
    }
