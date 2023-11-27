function scrollSlider(){
    for(var i = 0; i < $('[data-event = "fullpage"]').length; i++){
        $('.asidePager').append('<li>' + (i + 1) + 'page </li>');
    }

    $('.asidePager li').eq(0).addClass('active');
    //todo mousewheel(사파리, 크롬, 오페라까지 지원) 
    //todo 파이어폭스는 지원되지않기 때문에 파이어폭스 지원가능한 DOMMouseScroll 같이사용
    //todo mousewheel 매체와 DOMMouseScroll 매체를 같이 사용하려면 on 이라는 메소드를 사용해야한다.
    $('[data-event = "fullpage"]').on('mousewheel DOMMouseScroll touchStart',function(e){
        var delta = e.originalEvent.wheelDelta; //? 마우스 스크롤 방향 감지 이벤트
        //! 마우스 휠을 위로
        if(delta > 0){
            if(!($(this).prev().offset() == undefined)){
                $('html').stop().animate({scrollTop : $(this).prev().offset().top},1000);
                $('.asidePager li').removeClass('active');
                $('.asidePager li').eq($(this).prev().index()).addClass('active');
            }
        }else{
            //! 마우스 휠을 아래로
            if(!($(this).next().offset() == undefined)){
                $('html').stop().animate({scrollTop : $(this).next().offset().top},1000);
                $('.asidePager li').removeClass('active');
                $('.asidePager li').eq($(this).next().index()).addClass('active');
            }
        }
    });

    $('.asidePager li').click(function(){
        $('.asidePager li').removeClass('active');
        $(this).addClass('active');
        $('html').stop().animate({scrollTop : $('[data-event = "fullpage"]').eq($(this).index()).offset().top},1000);
    });
    // ? 클릭시 애니메이션 페이저가 클릭위치로 이동하고 스클롤이벤트가 부드럽게해서 클릭위치로 화면이동

    $('.asidePager + a').click(function(e){
        e.preventDefault();
        $("html, body").animate({scrollTop : 0},750);
        $('.asidePager li').removeClass('active');
        $('.asidePager li:first-of-type').addClass('active');
    });
    // ? top으로 가는 버튼을 클릭시 부드럽게 올라가고 페이저가 원위치
}


