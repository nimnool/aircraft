"use strict";

// подключение common.js

$(document).ready(function () {

    // для инициализации tooltips
    // $( document ).tooltip({
    //   track: true
    // }); 

    // скролл по ссылке с атрибутом href 
    // $(".header_nav a[href*='#']").on("click", function(e) {
    //     e.preventDefault();
    //     var anchor = $(this);
    //     $('html, body').stop().animate({
    //         scrollTop: $(anchor.attr('href')).offset().top
    //     }, 500);
    //     return false;
    // });

    // Скролл по классу .scroll_to и атрибуту data-scroll у кнопки к примеру (data-scroll="куда скроллим" в элементе куда скроллим ставим id потом впишем в куда скроллим)
    // $(".scroll_to").on("clcik", function(e) {
    //     e.preventDefault();
    //     var anchor = $(this);
    //     $('html, body').stop().animate({
    //         scrollTop: $("#" + anchor.data('scroll')).offset().top
    //     }, 500);
    //     return false;
    // });

    //  Активация слайдера
    // $(".owl-carousel").owlCarousel({
    //     loop: true,
    //     items: 1,
    //     dots: true
    // });

    // Кастомные кнопки управления слайдером
    // var owl = $('.owl-carousel');
    // owl.owlCarousel();
    // // Go to the next item
    // $('.customNextBtn').click(function() {
    //     owl.trigger('next.owl.carousel', [700]);
    // });
    // // Go to the previous item
    // $('.customPrevBtn').click(function() {
    //     // With optional speed parameter
    //     // Parameters has to be in square bracket '[]'
    //     owl.trigger('prev.owl.carousel', [700]);
    // });  


});

$(window).resize(function () {});

$(window).scroll(function () {});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// подключение animate.js


var Animation = function () {
    function Animation() {
        _classCallCheck(this, Animation);

        this.tl1 = new TimelineMax();
        this.tl1.pause();
    }

    _createClass(Animation, [{
        key: 'description',
        value: function description() {
            this.tl1.from('.header_title', 0.7, {
                y: -100,
                opacity: 0,
                ease: Power4.easeOut
            }, '+=0.3');
        }
    }, {
        key: 'activeSection',
        value: function activeSection(section) {
            var startTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var startBotton = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            section = '.' + section;
            if ($(section).offset() !== undefined) {
                var topPosition = $(section).offset().top - startTop,
                    bottomPosition = $(section).offset().top + $(section).height() - startBotton;
                if ($(window).scrollTop() >= topPosition && $(window).scrollTop() <= bottomPosition) {
                    return true;
                }
            }
        }
    }, {
        key: 'play',
        value: function play() {
            if (this.activeSection('header', 0, 500)) {
                this.tl1.resume();
            }
        }
    }]);

    return Animation;
}();

var anim = new Animation();

$(window).scroll(function () {
    if (document.documentElement.clientWidth >= 1200) {
        anim.play();
    }
});

$(window).ready(function () {

    if (document.documentElement.clientWidth >= 1200) {
        anim.description();
        anim.play();
    }
});
'use strict';

// подключение functions.js

$(function () {
    //SVG Fallback
    // if(!Modernizr.svg) {
    //  $("img[src*='svg']").attr("src", function() {
    //      return $(this).attr("src").replace(".svg", ".png");
    //  });
    // };
});
//изменяется - для плавной обратной анимации animate.css*/
$(window).scroll(function () {
    // для правильной рабоы надо прописать в блок которому присваивается анимация атрибут data-anim="fadeInLeft" с названием анимации
    $('.animated').each(function () {
        var imagePos = $(this).offset().top;
        var imageHght = $(this).outerHeight();
        var topOfWindow = $(window).scrollTop() + 40;
        var heightOfWindow = $(window).height();
        var animName = $(this).data('anim');
        if (!$(this).data('atop')) {
            var animTop = 0.9;
        } else {
            var animTop = $(this).data('atop');
        }
        if (imagePos < topOfWindow + heightOfWindow * animTop && imagePos + imageHght > topOfWindow) {
            $(this).css('visibility', 'visible').addClass(animName);
        } else if (imagePos + imageHght < topOfWindow || imagePos > topOfWindow + heightOfWindow) {
            $(this).css('visibility', 'hidden').removeClass(animName);
        }
    });
});
/**
 * FastClick
 */

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
// Initialize Slidebars
(function ($) {
    // Initialize Slidebars
    var controller = new slidebars();
    controller.init();

    // Toggle Slidebars
    $('#nav-button-label').on('click', function (event) {
        // Stop default action and bubbling
        event.stopPropagation();
        event.preventDefault();
        // Toggle the Slidebar with id 'id-1'
        controller.toggle('id-1');
        $("html,body").toggleClass("slidebars");
    });

    // Close Slidebar links
    $('[off-canvas] a').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        var url = $(this).attr('href'),
            target = $(this).attr('target') ? $(this).attr('target') : '_self';

        $("#nav-button-label").removeClass("nav-on");
        $("#nav-button-label .nav-line").removeClass("active");
        $("html,body").removeClass("slidebars");
        controller.close(function () {
            window.open(url, target);
        });
    });

    // Add close class to canvas container when Slidebar is opened
    $(controller.events).on('opening', function (event) {
        $('[canvas]').addClass('js-close-any');
    });
    // Add close class to canvas container when Slidebar is opened
    $(controller.events).on('closing', function (event) {
        $('[canvas]').removeClass('js-close-any');
    });
    // Close any
    $(document).on('click', '.js-close-any', function (event) {
        if (controller.getActiveSlidebar()) {
            event.preventDefault();
            event.stopPropagation();
            $("#nav-button-label").removeClass("nav-on");
            $("#nav-button-label .nav-line").removeClass("active");
            $("html,body").removeClass("slidebars");
            controller.close();
        }
    });
})($);

$(document).ready(function () {

    var md = new MobileDetect(window.navigator.userAgent);

    if (md.userAgent() == "Safari" && md.mobile() == "iPhone" || md.mobile() == "iPad") {
        $("html,body").css("overflow", "hidden !important");
    }

    // Select в модальном окне
    $(document).click(function () {
        $('.slct').removeClass('active');
        $('.slct_arrow').removeClass('active');
        $('.slct').parent().find('.drop').slideUp("fast");
    });
    $(".reset_lick").click(function () {
        var txtInput = $(this).parents(".select").find("input").text();
        $(this).parents(".select").find(".slct").text(txtInput);
        $(this).hide();
        $(this).parent().parent().find(".slct_arrow").removeClass('reset');
    });

    $.each($(".slct"), function () {
        var thisTxt = $(this).text();
        $(this).parents(".select").find(".slct_arrow").find("input").text(thisTxt);
    });
    $('.slct').click(function () {

        /* Заносим выпадающий список в переменную */
        var dropBlock = $(this).parent().find('.drop');
        //  закрываем все открытые
        $('.slct').removeClass('active').parent().find('.drop').slideUp("fast");

        /* Делаем проверку: Если выпадающий блок скрыт то делаем его видимым*/
        if (dropBlock.is(':hidden')) {
            dropBlock.slideDown();

            /* Выделяем ссылку открывающую select */
            $(this).addClass('active');
            $(this).siblings(".slct_arrow").addClass('active');

            /* Работаем с событием клика по элементам выпадающего списка */
            $('.drop').find('li').off("click").click(function () {

                /* Заносим в переменную HTML код элемента 
                списка по которому кликнули */
                var selectResult = $(this).html();

                /* Находим наш скрытый инпут и передаем в него 
                значение из переменной selectResult */
                $(this).parent().parent().find('input').val(selectResult);
                $(this).parent().parent().find(".slct").addClass('reset');
                $(this).parent().parent().find(".slct_arrow").addClass('reset');
                $(this).parent().parent().find(".reset_lick").show().addClass('reset');
                /* Передаем значение переменной selectResult в ссылку которая 
                открывает наш выпадающий список и удаляем активность */
                $(this).parent().parent().find(".slct").removeClass('active').html(selectResult);
                $(".slct_arrow").removeClass('active');

                /* Скрываем выпадающий блок */
                dropBlock.slideUp();
            });

            /* Продолжаем проверку: Если выпадающий блок не скрыт то скрываем его */
        } else {
            $(this).removeClass('active');
            $(".slct_arrow").removeClass('active');
            dropBlock.slideUp();
        }

        /* Предотвращаем обычное поведение ссылки при клике */
        return false;
    });
    // Открываем модальное окно  
    $(".modal").click(function (e) {
        e.preventDefault();
        var id = $(this).data('modal');
        var txt = $(this).data('info');
        // var title =  $(this).data('title'); // для изменения title в модалке
        $(".popup[data-modal=" + id + "]").toggle("fade", 200).find("form").css('display', 'block');
        $(".popup[data-modal=" + id + "] input[name=form_name]").val(txt);
        // $(".popup[data-modal="+id+"] h2").html(title); // прописать в ссылку data-title="нужный title"

        if (window.matchMedia("(min-width: 992px)").matches) {
            $("body").css({ "overflow": "hidden", "padding-right": "17px" });
        }
        if (window.matchMedia("(max-width: 992px)").matches) {

            $("body").css({ "overflow": "hidden", "padding-right": "0px" });
        }
    });
    // overlay для закрытия
    $(".overlay").click(function () {
        $(this).parent().toggle("drop", { direction: "up" }, 200);
        $("body").css({ "overflow": "inherit", "padding-right": "0" });
        $(".dm-modal .modal_form_input_wrap .modal_input_error").hide();
    });
    // закрываем модальное окно на крестик
    $(".popup .close").click(function (e) {
        e.preventDefault();
        $(this).parents(".popup").hide("drop", { direction: "up" }, 200);
        $("body").css({ "overflow": "inherit", "padding-right": "0" });
        $(".dm-modal .modal_form_input_wrap .modal_input_error").hide();
    });
    //обработчик кнопки на нажатие btn_mnu
    $("#nav-button-label").click(function (e) {
        e.preventDefault();
        $(this).toggleClass('nav-on'); // добавляет класс для анимации самой кнопки
        $(this).next().slideToggle(); // открывает меню main_nav_block, которое было скрыто
        $(this).find('.nav-line').toggleClass('active');
        $(".mnu_dropdown").toggleClass("active");
    });
    // Скрыть элемент при клике за его пределами бутерброд и его выпадающее меню
    $(document).click(function (event) {
        if ($(event.target).closest("#nav-button-label").length) return;
        if ($(event.target).closest("[off-canvas]").length) return;
        $("#nav-button-label").removeClass("nav-on");
        $("#nav-button-label .nav-line").removeClass("active");

        event.stopPropagation();
    });
    //  Отправка форм
    $("form:not('#form-file')").submit(function () {
        // перехватываем все при событии отправки
        var form = $(this); // запишем форму, чтобы потом не было проблем с this
        var error = [];
        form.find('.modal_form_input').each(function () {
            // пробежим по каждому полю в форме

            if ($(this).val() == '') {
                // если находим пустое
                $(this).siblings(".modal_input_error").show("fade", 500);
                $(this).siblings("i").hide("fade", 500);
                error.push(true); // ошибка
                // анимация ошибок в формах
                $(".modal_form_input").animated("swing");
                setTimeout(function () {
                    $('.modal_form_input').removeClass('swing');
                    $('.modal_form_input').removeClass('animated');
                }, 500);
            } else if ($(this).val() !== '') {
                // если находим не пустое
                $(this).siblings(".modal_input_error").hide("fade", 500);
                $(this).siblings("i").show("fade", 500);
                error.push(false); // нет ошибки
            }
            $(this).focus(function () {
                $(this).siblings('.modal_input_error').hide("fade", 500);
            });
        });
        form.find('.modal_form_phone').each(function () {
            // пробежим по каждому полю в форме
            var pattern = /^(\+|d+)*\d[\d\(\)\-]{4,14}\d$/;
            if ($(this).val() == '') {
                // если пустое
                $(this).siblings(".modal_input_error").show("fade", 500);
                $(this).siblings("i").hide("fade", 500);
                error.push(true); // ошибка 
                // анимация ошибок в формах
                $(".modal_form_phone").animated("swing");
                setTimeout(function () {
                    $('.modal_form_phone').removeClass('swing');
                    $('.modal_form_phone').removeClass('animated');
                }, 500);
                if ($(this).siblings().hasClass('input_error_phone')) {
                    $(this).siblings(".modal_input_error").removeClass('input_error_phone').text("").prepend("Заполните поле<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                }
            } else if ($(this).val() !== '') {
                if ($(this).val().match(pattern)) {
                    $(this).siblings(".modal_input_error").hide("fade", 500);
                    $(this).siblings("i").show("fade", 500);
                    error.push(false); // нет ошибок
                } else {
                    $(this).siblings(".modal_input_error").show("fade", 500).addClass('input_error_phone').text("").prepend("Введите правильный телефон<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                    error.push(true); // ошибка
                    // анимация ошибок в формах
                    $(".modal_form_phone").animated("swing");
                    setTimeout(function () {
                        $('.modal_form_phone').removeClass('swing');
                        $('.modal_form_phone').removeClass('animated');
                    }, 500);
                }
            }
            $(this).focus(function () {
                $(this).siblings('.modal_input_error').hide("fade", 500);
            });
        });
        form.find('.modal_form_email').each(function () {
            // пробежим по каждому полю в форме
            var pattern = /^(([a-zA-Z0-9]|[!#$%\*\/\?\|^\{\}`~&'\+=-_])+\.)*([a-zA-Z0-9\-]|[!#$%\*\/\?\|^\{\}`~&'\+=-_])+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+$/;
            if ($(this).val() == '') {
                // если пустое
                $(this).siblings(".modal_input_error").show("fade", 500);
                $(this).siblings("i").hide("fade", 500);
                error.push(true); // ошибка
                // анимация ошибок в формах
                $(".modal_form_email").animated("swing");
                setTimeout(function () {
                    $('.modal_form_email').removeClass('swing');
                    $('.modal_form_email').removeClass('animated');
                }, 500);
                if ($(this).siblings().hasClass('input_error_email')) {
                    $(this).siblings(".modal_input_error").removeClass('input_error_email').text("").prepend("Заполните поле<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                }
            } else if ($(this).val() !== '') {
                if ($(this).val().match(pattern)) {
                    $(this).siblings(".modal_input_error").hide("fade", 500).removeClass('input_error_email');
                    $(this).siblings("i").show("fade", 500);
                    error.push(false); // нет ошибок
                } else {
                    $(this).siblings(".modal_input_error").show("fade", 500).addClass('input_error_email').text("").prepend("Введите правильный Email<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                    error.push(true); // ошибка 
                    // анимация ошибок в формах
                    $(".modal_form_email").animated("swing");
                    setTimeout(function () {
                        $('.modal_form_email').removeClass('swing');
                        $('.modal_form_email').removeClass('animated');
                    }, 500);
                }
            }
            $(this).focus(function () {
                $(this).siblings('.modal_input_error').hide("fade", 500);
            });
        });
        var erorr_finish = 0;
        for (var i = 0; i < error.length; i++) {
            if (error[i] == false) {
                erorr_finish = erorr_finish + 1;
            };
            // console.log(error[i]);
        }
        //console.log(erorr_finish);
        var size = error.length - 1;
        if (erorr_finish > size) {
            // в зависимости от полей которые проверяются (в нашем случае 3 поля)
            var data = form.serialize(); // подготавливаем данные
            $.ajax({ // инициализируем ajax запрос
                type: 'POST', // отправляем в POST формате, можно GET
                url: 'mail.php', // путь до обработчика, у нас он лежит в той же папке
                dataType: 'json', // ответ ждем в json формате
                data: data, // данные для отправки
                beforeSend: function beforeSend(data) {
                    // событие до отправки
                    form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
                },
                success: function success(data) {
                    // событие после удачного обращения к серверу и получения ответа
                    if (data['error']) {
                        // если обработчик вернул ошибку
                        alert(data['error']); // покажем её текст
                    } else {
                        // если все прошло ок

                        if (data['form_type'] == 'modal') {
                            $('.dm-modal form').hide();
                            $('.dm-modal .close').hide();
                            form.trigger('reset');
                            $('.dm-modal .success_mail').addClass('active'); //пишем что всё ок
                            setTimeout(function () {
                                form.parents('.popup').hide("fade", 500);
                                $('.dm-modal .success_mail').removeClass('active');
                                $('.dm-modal .modal_form_input_wrap i').hide();
                                $('.dm-modal .close').show("fade", 2000);
                                //$("body").css({ "overflow": "inherit", "padding-right": "0" });
                            }, 3000);
                        }
                        if (data['form_type'] == 'normal') {
                            //надо писать в обычных формах <input type="hidden" name="form_type" value="normal"> 
                            form.trigger('reset');
                            $('.dm-modal .success_mail').addClass('active');
                            $('.popup[data-modal=modal-res]').toggle("fade", 500);
                            //$("body").css({ "overflow": "hidden", "padding-right": "17px" });
                            setTimeout(function () {
                                $('.popup[data-modal=modal-res]').hide("fade", 500);
                                $('.dm-modal .success_mail').removeClass('active', 500);
                                $('.dm-modal .modal_form_input_wrap i').hide();
                                //$("body").css({ "overflow": "inherit", "padding-right": "0" });
                            }, 3000);
                        }
                    }
                },
                error: function error(xhr, ajaxOptions, thrownError) {
                    // в случае неудачного завершения запроса к серверу
                    alert(xhr.status); // покажем ответ сервера
                    alert(thrownError); // и текст ошибки
                },
                complete: function complete(data) {
                    // событие после любого исхода
                    form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
                }

            });
        }
        return false; // вырубаем стандартную отправку формы
    });

    //  Отправка форм с файлом вносим input[type=file]
    var files;
    $('input[type=file]').change(function () {
        files = this.files;
        //alert(files);
    });

    //  Отправка форм с файлом submit
    $("#form-file").on('submit', function (e) {
        // перехватываем все при событии отправки
        e.preventDefault();
        var $data = new FormData(),
            form = $(this),
            error = [],
            $inputs = $("#form-file").find('input[type=hidden]'),
            $phone = $("#form-file").find('input[name=phone]'),
            $email = $("#form-file").find('input[name=email]'),
            $name = $("#form-file").find('input[name=name]'),
            $textarea = $("#form-file").find('textarea');

        $.each(files, function (key, value) {
            if (!this.name.match(/(.txt)|(.pdf)|(.docx)|(.doc)|(.xlsx)$/i)) {
                alert("Неправильный формат тектового файла.");
                return false;
                error.push(true);
            } else if ((this.size / 1024).toFixed(0) > 1524) {
                alert("Слишком большой размер.");
                return false;
                error.push(true);
            }
            $data.append(key, value);
        });

        $.each($inputs, function (key, value) {
            $data.append($(this).attr('name'), $(this).val());
        });

        //добавление основных тестовых полей вместо serialize
        $data.append($textarea.attr('name'), $textarea.val());
        $data.append($phone.attr('name'), $phone.val());
        $data.append($email.attr('name'), $email.val());
        $data.append($name.attr('name'), $name.val());

        form.find('.modal_form_input').each(function () {
            // пробежим по каждому полю в форме

            if ($(this).val() == '') {
                // если находим пустое
                $(this).siblings(".modal_input_error").show("fade", 500);
                $(this).siblings("i").hide("fade", 500);
                error.push(true); // ошибка
            } else if ($(this).val() !== '') {
                // если находим не пустое
                $(this).siblings().hide("fade", 500);
                $(this).siblings("i").show("fade", 500);
                error.push(false); // нет ошибки
            }
            $(this).focus(function () {
                $(this).siblings(".modal_input_error").hide("fade", 500);
            });
        });
        form.find('.modal_form_phone').each(function () {
            // пробежим по каждому полю в форме
            var pattern = /^(\+|d+)*\d[\d\(\)\-]{4,14}\d$/;
            if ($(this).val() == '') {
                // если пустое
                $(this).siblings(".modal_input_error").show("fade", 500);
                $(this).siblings("i").hide("fade", 500);
                error.push(true); // ошибка 
                if ($(this).siblings().hasClass('input_error_phone')) {
                    $(this).siblings(".modal_input_error").removeClass('input_error_phone').text("").prepend("Заполните поле<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                }
            } else if ($(this).val() !== '') {
                if ($(this).val().match(pattern)) {
                    $(this).siblings(".modal_input_error").hide("fade", 500);
                    $(this).siblings("i").show("fade", 500);
                    error.push(false); // нет ошибок
                } else {
                    $(this).siblings(".modal_input_error").show("fade", 500).addClass('input_error_phone').text("").prepend("Введите правильный телефон<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                    $(this).siblings("i").hide("fade", 500);
                    error.push(true); // ошибка  
                }
            }
            $(this).focus(function () {
                $(this).siblings(".modal_input_error").hide("fade", 500);
            });
        });
        form.find('.modal_form_email').each(function () {
            // пробежим по каждому полю в форме
            var pattern = /^(([a-zA-Z0-9]|[!#$%\*\/\?\|^\{\}`~&'\+=-_])+\.)*([a-zA-Z0-9]|[!#$%\*\/\?\|^\{\}`~&'\+=-_])+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+$/;
            if ($(this).val() == '') {
                // если пустое
                $(this).siblings(".modal_input_error").show("fade", 500);
                $(this).siblings("i").hide("fade", 500);
                error.push(true); // ошибка
                if ($(this).siblings().hasClass('input_error_email')) {
                    $(this).siblings().removeClass('input_error_email').text("").prepend("Заполните поле<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                }
            } else if ($(this).val() !== '') {
                if ($(this).val().match(pattern)) {
                    $(this).siblings(".modal_input_error").hide("fade", 500).removeClass('input_error_email');
                    $(this).siblings("i").show("fade", 500);
                    error.push(false); // нет ошибок
                } else {
                    $(this).siblings(".modal_input_error").show("fade", 500).addClass('input_error_email').text("").prepend("Введите правильный Email<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                    $(this).siblings("i").hide("fade", 500);
                    error.push(true); // ошибка  
                }
            }
            $(this).focus(function () {
                $(this).siblings(".modal_input_error").hide("fade", 500);
            });
        });

        if (files === undefined) {
            $('.fileLoad input').val('Файл не выбран!');
            $('.file-load-block input[type=text]').css('border', '1px solid red');
            error.push(true); // ошибка  
        }

        var erorr_finish = 0;

        for (var i = 0; i < error.length; i++) {
            if (error[i] == false) {
                erorr_finish = erorr_finish + 1;
            }

            //console.log(error[i]);
        }
        //console.log(erorr_finish);
        var size = error.length - 1;
        if (erorr_finish > size) {
            $.ajax({
                url: 'mail.php',
                type: 'POST',
                contentType: false,
                processData: false,
                dataType: 'json',
                data: $data,
                beforeSend: function beforeSend(loading) {
                    $('.fileLoad input').val('Файл загружается');
                },
                success: function success(data) {
                    $('.dm-modal .success_mail').addClass('active');
                    $('.popup2 .close').hide();
                    $('.fileLoad input').val('Файл загружен!');
                    $('.file-load-block input[type=text]').css('color', '#b2d04e');
                    $('.popup[data-modal=modal-res]').show().delay(2000).fadeOut(function () {
                        $('.popup[data-modal=modal-res]').hide("fade", 500);
                        form.trigger('reset');
                        $('.dm-modal .sucess_mail').addClass('active');
                        $("#win2 .close").trigger('click');
                        $('.popup2 .close').show();
                        $('.fileLoad input').val('Выберите файл');
                        files = undefined;
                        $('.file-load-block input[type=text]').css('color', '#fff)');
                        $('.file-load-block input[type=text]').css('border', '1px solid #fff');
                    });
                }
            });
        }
    });
});

$(".loader_inner").fadeOut();
$(".loader").fadeOut("fast");