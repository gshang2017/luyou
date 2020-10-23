setInterval(function(){
    //日历
       //   if(location.href.split("word=")[1].split("&")[0].indexOf("%E6%97%A5%E5%8E%86")!=-1)return;
       //   if(location.href.split("word=")[1].split("&")[0].indexOf("-baijiahao")==-1){
        //     location.href=location.href.replace(/((&|\?)word=.*?)(&|$)/,'$1+-baijiahao&');

        //  }
        //   if(location.href.split("word=")[1].split("&")[0].indexOf("-baijiahao")!==-1){
       clearAD();
        //         }
	},1000);

    function clearAD(){

          var mAds=document.querySelectorAll("#relativewords,#page-pre > div,.first-card-container,.page-banner,.ec_wise_ad,.tab-wrap,#navs,.blank-frame,#menu-container,.wa-recommend-list,.sfc-image-content-psrs,.sfc-image-content-looprs,.baiduapp-ad-body,#page-tips"),i;

      //        var mAds=document.querySelectorAll("div.result.c-result:nth-of-type(5),div.result.c-result:nth-of-type(6),#relativewords,#page-pre > div,.c-line-clamp1.c-title,.c-container > section > div.c-row"),i;
        for(i=0;i<mAds.length;i++){
            var mAd=mAds[i];
            mAd.remove();
        }
   }
