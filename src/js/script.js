$(document).ready(function(){

    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        navPosition: "bottom",
        autoHeight: true,
        autoplay: true,
        controls: false
    });

    document.querySelector('.prev').addEventListener('click', function () {
        slider.goTo('prev');
    });

    document.querySelector('.next').addEventListener('click', function () {
        slider.goTo('next');
    });

    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.btn_catalog').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Будь ласка введіть ім'я",
                phone: "Введіть свій телефон",
                email: {
                  required: "Введіть свою електронну пошту",
                  email: "Неправильний формат пошти"
                }
            }
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+380 999-99-99-99")

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
             
            $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $(".up").fadeIn('slow');
        } else {
            $(".up").fadeOut('slow');
        }
    });
    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollnTop: $(_href).offset().top+"px"});
        return false;
    });
});