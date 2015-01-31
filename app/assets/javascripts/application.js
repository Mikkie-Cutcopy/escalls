/*
 This is a manifest file that'll be compiled into application.js, which will include all the files
 listed below.

 Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
 or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.

 It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
 compiled file.

 Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
 about supported directives.

 = require jquery
 = require jquery_ujs
 = require turbolinks
 = require jquery-fileupload
 = require bootstrap-sprockets
 = require_tree .
 */
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require asoundmanager/soundmanager2.js
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require turbolinks
//= require jquery-fileupload
//= require mediaelement_rails
//= require bootstrap
//= require bar-ui

//= require formValidation
//= require validation/bootstrap
//= require validation/en_US
//= require validation/ru_RU


//= require_tree .


$(document).ready(function() {
    var audioSection = $('section#audio');
    $('a.html5').click(function() {

        var audio = $('<audio>', {
            controls : 'controls'
        });

        var url = $(this).attr('href');
        $('<source>').attr('src', url).appendTo(audio);
        audioSection.html(audio);
        return false;
    });

    $('[checked]').each(function() {$(this).parent('label').addClass('active')})



});

$(document).on('click', 'div.escalls-datetimepicker', function(){
    $('#datetimepicker').datetimepicker('show');
});


function PopUpShow(){
    $("#popup").show();
}
function PopUpHide(){
    $("#popup").hide();
}

$(document).on('click', 'a.popup-show', function(){
    PopUpShow();
    var userID = $(this).attr('data-id');
    var a = this;
    $('.removeUser').on('click', function(){removeUser(userID, a)})
});

$(function showComment(){
     $('a#comment-btn').bind('click', function() {
         $('div.comment').toggle('blind', 400);
         $('a#comment-btn').toggleClass('active')
         })
});

$(function showEstimateComment(){
    $('a#estimate-btn').bind('click', function() {
        var selectTd = $(this).parents('td')[0];
        $('> div.textarea', selectTd).toggle('blind', 300);
        $('a#estimate-btn').toggleClass('active')
    })
});

$(function showCriterionForm(){
    $('.criterion-btn').bind('click', function() {
        $(this).next().toggle('drop', 300);
    })
});


function removeUser(userID, a){
    var parent_tr = $(a).parents('tr')[0];
    $.ajax({
        type: 'POST',
        data: { _method: 'DELETE'},
        url: '/admin/users/' + userID,
        success: function(data){
            console.log(parent_tr)
            if(data['success'] === true) {
                $(parent_tr).fadeOut(150);
                PopUpHide();
            }
        },
        error: function(data){
            console.log(data)
        }
    })
}

$(function(){
    $('td.estimate').bind('mouseenter mouseleave', function(event) {
        $("> a#estimate-btn", this).toggleClass("invisible");
    })
});



$(document).on('mouseenter mouseleave', '.call-panel', function(){
    $("> div.dropdown", this).toggleClass("invisible");
    $("> div.dropdown", this).removeClass("open");
    $(this).toggleClass("call-active");
});



$(document).ready(function() {
    $('.new_call, .edit_call').formValidation({
        // I am validating Bootstrap form
        framework: 'bootstrap',

        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            call_subject: {
                validators: {
                    notEmpty: {
                        message: 'Поле не может быть пустым'
                    }
                }
            },

            call_date: {
                validators: {
                    notEmpty: {
                        message: 'Поле не может быть пустым'
                    },
                    regexp: {
                        regexp: /^[1-3]\d-[0-1]\d-20\d\d [0-2]\d:[0-5]\d/,
                        message: 'Не соответствует формату даты'
                    }
                }



            }
        }
    })
});
