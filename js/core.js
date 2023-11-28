// ready() 대체방법
$(document).ready(function(){
    NProgress.start();
    scrollSlider();
    searchToggle();
    loginTab();
    passwordToggle();
    addYears();
    addDays();
    justToggle('.myAskedContainer > ul li:not(:first-of-type)');
    justToggle(".mypaymentContainer form > div:first-of-type h3");
    justToggle("[class*='my'] .myPageNav ul > li span");
    quantityComponent(".numberComponent #quantity",".countMinus",".countPlus","#totalPrice");
    quantityComponent(".myshoppingBagContainer #quantity",".shoppingbagMin",".shoppingbagPlus",".totalPrice");
    openPanel(".storeInformationContainer > input[type='button']");
    activeStatus(".myAskedContainer div:first-of-type ul li");
    activeStatus(".myInquiryContainer > div:first-of-type input");
    activeStatus(".myInquiryOrderContainer > div:first-of-type input");
    activeStatus(".myInquiryOrderCancelContainer > div:first-of-type input");
    activeStatus("header > nav > ul li");
    opnePopup(' [class*=myManagement] div:first-of-type .openBtn',"#pwChangePopup .closeBtn");
    opnePopup('[class*=myAddress] .openBtn','#addAddressPopup .closeBtn');
    orderPopup();
    ManagementPopup();
    mobileMenu();
    mobileRside();
    payImgSwap();
    addBookMark();
    checkboxAllCK();
    NProgress.done();
});

function checkboxAllCK() {

    $("#basketAllChk").click(function(){
        var isChecked = $("#basketAllChk").is(':checked');

        $(".myshoppingBagContainer form ul li span .basketChk").prop("checked", isChecked);
    });

    $(".myshoppingBagContainer form ul li span .basketChk").click(function(){
        var classChkbox = document.getElementsByClassName("basketChk");
        var selectedCount = 0;

        for(var i = 0; i < classChkbox.length; i++){
            var chkboxCount = classChkbox[i];

            if(chkboxCount.checked){
                selectedCount++;
            }
        }
        if(selectedCount === classChkbox.length){
            $("#basketAllChk").prop("checked", true);
        }else{
            $("#basketAllChk").prop("checked", false);
        }
    });
}

function scrollSlider(){
    var slideDish,
        $slider = $('.mainSlider').eq(0);

        slideDish = $slider.bxSlider({
        mode: 'vertical',
        controls: false,
        preventDefaultSwipeY: true,
        preventDefaultSwipeX: false,
        onSlideBefore: function(){
          $slider.addClass('dontMove');
        },
        onSlideAfter: function(){
          setTimeout(function(){
            $slider.removeClass('dontMove');
          }, 10);
        }
    });
    $slider.on('mousewheel', function(e){
        e.preventDefault();
        if(!$slider.hasClass('dontMove')){
            var deltaY = e.originalEvent.deltaY;
            if(deltaY > 0){
                slideDish.goToNextSlide();
            }else if(deltaY < 0){
                slideDish.goToPrevSlide();
            }
        }
    });
    $('aside > a').click(function(e){
        e.preventDefault();
        if($(this).attr("data-pageName") == "main"){
            $slider.goToSlide(0);
        }else{
            $("html, body").animate({scrollTop : 0},250);
        }
    });
}

function addBookMark(){
    $('#addBookMark').click(function(){
        alert("To bookmark the current page, press Ctrl + D (or Command + D on Mac). :)");

        // var url = window.location.href;
        // var title = document.title;

        // if(window.sidebar && window.sidebar.addPanel){
        //     window.sidebar.addPanel(title, url, "");
        // } else if (window.external && ("AddFavorite" in window.external)) {
        //     window.external.AddFavorite(url, title);
        // }else if (window.opera && window.print){
        //     var elem = document.createElement('a');
        //     elem.setAttribute('href', url);
        //     elem.setAttribute('title', title);
        //     elem.setAttribute('rel', 'sidebar');
        //     elem.click();
        // }else{
        //     alert("To bookmark the current page, press Ctrl+D (or Command+D on Mac). :)");
        // }

    })
}


function mobileRside(){
    $('header aside > input:last-of-type').click(function(){
        $('header aside > input:last-of-type').toggleClass('active');
        $('header aside > ul').toggleClass('active');
    })
}

function mobileMenu(){
    $('header .muiBtn').click(function(){
        $('header .muiBtn').toggleClass('active');
        if($('header .muiBtn').hasClass('active')){
            $('header').css({"background-color" : "var(--gs9)","transition" : "all 0.45s ease-out"});
            $('header > nav').addClass('active');
        }else{
            $('header').css("background-color" , "rgba(0,0,0,0.8)");
            $('header > nav').removeClass('active');
        }
    });
}

function payImgSwap(){
    var target = $(".mypaymentContainer form div:nth-of-type(6) ul li");
    var targetData = [];

    for(var i = 0; i < $(target).length; i++){
        var targetSrc = $(target).eq(i).children("img").attr("src");
        targetData.push(targetSrc);
    };

    $(target).click(function(){

        var currentSrc = $(this).children("img").attr("src");
        for(var i = 0; i < $(target).length; i++){
            var recoverSrc = targetData[i];
            $(target).eq(i).children("img").attr("src",recoverSrc);
        };
        var strResult = currentSrc.search("_active");
        if(strResult == -1){
            currentSrc = currentSrc.replace(".jpg","_active.jpg");
            $(this).children("img").attr("src",currentSrc);
        }else{
            currentSrc = currentSrc.replace("_active.jpg","_active.jpg");
            $(this).children("img").attr("src",currentSrc);
        }
    });
    
}
/*
function payImgSwap(){
    var target = $(".mypaymentContainer form div:nth-of-type(6) ul li");
    var targetData = [];

    for(var i = 0; i < $(target).length; i++){
        var targetSrc = $(target).eq(i).children("img").attr("src");
        targetData.push(targetSrc);
    };

    $(target).click(function(){

        var currentSrc = $(this).children("img").attr("src");

            for(var i = 0; i < $(target).length; i++){
                var recoverSrc = targetData[i];
                $(target).eq(i).children("img").attr("src",recoverSrc);
            };

        $(this).children("img").attr("src",currentSrc.replace(".jpg","_active.jpg"));
    });
}
*/

function ManagementPopup(){
    $('.myManagementContainer div:last-of-type .openBtn').click(function(){
        var thisName = $(this).attr('data-popname');
        $("#" + thisName).addClass('active');
    });

    $('#delAddress .openBtn').click(function(){
        var thisName = $(this).attr('data-popname');
        $("#delAddress").removeClass("active");
        $("#" + thisName).addClass('active');
    });

    $('#delAddress .closeBtn').click(function(){
        $("#delAddress").removeClass("active");
    });
}

function opnePopup(target,closeBtn){
    $(target).click(function(){
        var thisName = $(this).attr('data-popname');
        $("#" + thisName).addClass("active");
        
        $(closeBtn).click(function(){
            $("[id*='Popup']").removeClass("active");
        });
    })

};

function orderPopup(){
    $(".myInquiryOrderContainer ul li span:last-of-type .openBtn").click(function(){
        var thisName = $(this).attr('data-popname');
        $("#" + thisName).addClass("active");
        $("#" + thisName + ' div:first-of-type').addClass("active");
        $("input[data-popname='cancelPopup']").attr("disabled",true).css("cursor" , "default");
    });
    
    $("#cancelPopup div:first-of-type input.openBtn").click(function(){
        var thisName = $(this).attr('data-popname');
        $("#" + thisName).addClass("active");
        $("#cancelPopup div:first-of-type").removeClass("active");
    });

    $("#cancelPopup .closeBtn").click(function(){
        $("[id*='Popup']").removeClass("active");
        $("input[data-popname='cancelPopup']").attr("disabled",false).css("cursor" , "default");
    });
}

function activeStatus(target){
    $(target).click(function(){
        $(target).removeClass('active');
        $(this).addClass('active');
    });
}

function quantityComponent(target, minus, plus, price){
    var orderField = $(target);
    var orderCount = parseInt($(orderField).val());
    var productPrice = parseFloat($(price).val());
    var formattedPrice = productPrice.toFixed(2);
    var totalPriceField = $(price);
    // var totalPriceField = $(totalPrice);
    $(minus).click(function(){
        orderCount--;
        if(orderCount < 1){
            orderCount = 1;
        }
        orderField.val(orderCount);
        totalPriceField.val((formattedPrice * orderCount).toFixed(2));
    });

    $(plus).click(function(){
        orderCount++;
        if(orderCount > 99){
            orderCount = 99;
        }
        orderField.val(orderCount);
        totalPriceField.val((formattedPrice * orderCount).toFixed(2));
    });
}



function loginTab(){
    var activeTab = null;
    $(".loginContainer .loginTab input").click(function(){
        activeTab= "#" + $(this).attr("data-tapname");
        
        $(".loginContainer fieldset").removeClass("active");
        $(".loginContainer .loginTab input").removeClass("active");
        $(this).addClass("active");
        $(activeTab).addClass("active");
    });
}

function addYears(){
    for(var i = 2022; i > 1999; i--){
        $('#years').append('<option value="' + i + '">' + i + '</option>');
    }
}

function addDays(){
    for(var i= 1; i < 32; i++){
        $('#days').append('<option value="' + i + ' + days">' + i + ' days</option>')
    }
}

function searchToggle(){
    $('#searchFieldToggle').click(function(){
        $('#searchPanel').toggleClass("active");
    });
}

function justToggle(target){
    $(target).click(function(){
        $(this).toggleClass("active");
    });
}

function openPanel(panelBtn){
    var panelTab= null; 
    $(panelBtn).click(function(){ 
        panelTab = $(this).attr('data-panel'); 
        $("#" + panelTab).addClass("active"); 
    });
    $(".closeBtn").click(function(){ 
        $("[id*='Panel']").removeClass("active"); 
    });
}

function passwordToggle(){
    var toggleStatus = false;
    var $tarGetClick=$(".userPW input[type='button']");
    $tarGetClick.click(function(){
        toggleStatus =!toggleStatus;

        if(toggleStatus == true){
            $(this).val("visibility");
            $(this).siblings().attr("type","text");
        }else{
            $(this).val("visibility_off");
            $(this).siblings().attr("type","password");
        }
    });


    
}
    



