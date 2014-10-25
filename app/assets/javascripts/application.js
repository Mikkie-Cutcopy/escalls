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
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require jquery-fileupload
//= require bootstrap
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
    var userID = $(this).attr('data-id')
    var a = this
    $('.removeUser').on('click', function(){removeUser(userID, a)})
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