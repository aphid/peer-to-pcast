$(document).ready(function(){
  $("form#loginForm").submit(function() { // loginForm is submitted
    var username = $('#username').attr('value'); // get username
    var password = $('#password').attr('value'); // get password

    if (username && password) { // values are not empty
      $.ajax({
        type: "POST",
        //url: "/cgi-bin/login.pl", // URL of the Perl script
        url: "auth.php",
	    //contentType: "application/json; charset=utf-8",
        dataType: "json",
        // send username and password as parameters to the Perl script
        data: {"username": username, "password": password},
        // script call was *not* successful
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
          $('div#loginResult').text("responseText: " + XMLHttpRequest.responseText 
            + ", textStatus: " + textStatus 
            + ", errorThrown: " + errorThrown);
          $('div#loginResult').addClass("error");
        }, // error 
        // script call was successful 
        // data contains the JSON values returned by the Perl script 
        success: function(data){
          if (data.error) { // script returned error
            $('div#loginResult').text(data.error);
            $('div#loginResult').addClass("error");
          } // if
          else { // login was successful
            //$('form#loginForm').hide();
            //$('div#loginResult').text("data.success: " + data.success + ", data.userid: " + data.userid);
            //$('div#loginResult').addClass("success");
            $('#loginbig').toggle();
            $('#loggedin').toggle();
            $('#uname').text(data.userid);
	    $.cookie('username', data.userid, { expires: 7, path: "/" });
	    $.cookie('name', data.name, { expires: 7, path: "/" });
          } //else
        } // success
      }); // ajax
    } // if
    else {
      $('div#loginResult').text("enter username and password");
      $('div#loginResult').addClass("error");
    } // else
    $('div#loginResult').fadeIn();
    return false;
  });

$('.module').each(function(i, module) {
var mod = $(this).attr('id');

if ($.cookie(mod + 'pos')){
	var lt = $.cookie(mod + 'pos').split('x');
	$('#' + mod).offset({ left: lt[0], top: lt[1]});

	}
});





});
function resetPositioning(){

$('.module').each(function(i, module) {
        var mod = $(this).attr('id');
        $.cookie(mod + 'pos', 'null');
	$(this).offset({left: $(this).attr('data-defaultleft'), top: $(this).attr('data-defaulttop')});
});

}

