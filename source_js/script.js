// Write any custom javascript functions here

$(document).ready(function(){
    $('.single-item').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        cssEase: 'linear'
});
});

function resizeNavBar(){
    $(document).on("scroll", function(){
        if($(document).scrollTop() > 50){
            $(".top-bar").addClass("shrink");
        }
        else
        {
            $(".top-bar").removeClass("shrink");
        }
    });
}

window.addEventListener('load', resizeNavBar);

