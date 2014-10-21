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
    $('.removeUser').on('click', function(){removeUser(userID)})
});


function removeUser(userID){
    $.ajax({
        type: 'DELETE',
        url: '/admin/users/' + userID,
        success: function(data){
            if(data === 'ok') {
                $('a').attr('data-id', userID).closest('tr').remove();
            }
        },
        error: function(data){
            console.log(data)
        }
    })
}