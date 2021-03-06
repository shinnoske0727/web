var bg_width = 2560;
var bg_height = 1600;
var contentHeight = 10000;
var currentHeight = 0;
var naviFrag = false;
var loadflag = false;

$(function(){
    var timer = false;
    
    
    $.when(
        setResize()
    ).done(function(){
        naviFrag = true;
    });
    button_animation();
    $(window).on('resize', function(){
        if (timer !== false){
            clearTimeout(timer);
        }
        timer = setTimeout(setResize, 100);
    }).on('scroll', glNavi_animation);;
    
    $('.js_link').each(function(){
        $(this).on('click', link_translate);
    });
    
    $(".p-nav__child__link.js_link").each(glNavi_hover);
});
//----------resize--------------------------
function setResize(){
    var contentWidth = $(this).width();
    contentHeight = bg_height / bg_width * contentWidth;
    $('section').animate({
        "min-height" : contentHeight
    }, 200);
    $('.p-title').animate({
        'margin-top' : contentHeight/3
    } ,200);
    
};

//----------navigation_animation------------
function glNavi_animation(){
    if(naviFrag){
        currentHeight = $(this).scrollTop();
        var header = $("header");
        if(currentHeight > contentHeight/2){
            $(header).slideDown(200);
        }else{
            $(header).slideUp(200);
        }
    }
};

function glNavi_hover(){
    $(this).hover(function(){
        $(this).css({
            'color': '#ffcc00'
        }).parent().css({
            'background-image' : 'url(../images/icon_top.png)',
            'background-position' : 'center 7px',
            'background-repeat' : 'no-repeat',
            'background-size' : '16px'
        });
    },
                  function(){
        $(this).css({
            'color': '#ffcc00'
        }).parent().css({
            'background-image' : "none"
        });

    });
}
//----------button_animation----------------
function button_animation(){
    $(".c-btn--top").hover(
        function(){
            $(this).css({
                'background-color':'rgba(0, 0, 0, 0.3)',
                'border-color':'#000000',
                'color': '#130f30'
            });
        },
        function(){
            $(this).css({
                'background-color': 'rgba(255, 255, 255, 0.3)',
                'border-color':'#000000',
                'color': '#130f30'
            });
        });                 
}
//----------link_animation------------------
function link_translate(){
    var toLink = $(this).attr("href");
    var linkPostion = $(toLink).offset().top;
    $('html,body').animate({ scrollTop: linkPostion }, 300);
    return false;
};


