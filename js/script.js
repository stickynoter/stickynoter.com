$(document).ready(function(){
	//syncs events with facebook...
	$.get('./FBConnect/FacebookEvents.php', function() {});

	var tmp;
	
	$('.note').each(function(){
		tmp = $(this).css('z-index');
		if(tmp>zIndex) zIndex = tmp;
	})

	make_draggable($('.note'));
	
	refreshNav();
	
		
	
	// begin user creation
	
	$('#user-create-submit').live('click',function(e){
		
		if($('.create-username').val().length<3)
		{
			alert("Username must be 3 characters or more!")
			return false;
		}
		
		if($('.create-password').val().length<3)
		{
			alert("Password must be 3 characters or more!")
			return false;
		}
		
		$(this).append('<img src="img/ajax_load.gif" style="margin:30px auto;display:block;border:0" id="loader" />');
		
		var data = {
			'username'		: $('.create-username').val(),
			'password'		: $('.create-password').val()
		};
		
		$.post('ajax/create_username.php',data,function(msg){
			if (msg != "no") {
				document.location = 'http://www.stickynoter.com/';
			} else {
				$('#loader').remove();
				alert("The username you tried to use has already been taken.  Please try again.");
				return false;
			}
			
			$("#createUser").fancybox.close();
		});
		
		e.preventDefault();
	})
	
	// end user creation
	
	// begin user login
	
	$('#user-login-submit').live('click',function(e){
												  
		if($('.login-username').val().length<3)
		{
			alert("Username must be 3 characters or more.")
			return false;
		}
		
		if($('.login-password').val().length<3)
		{
			alert("Password must be 3 characters or more.")
			return false;
		}
		
		$(this).append('<img src="img/ajax_load.gif" style="margin:30px auto;display:block;border:0" id="loader" />');
		
		var data = {
			'username'		: $('.login-username').val(),
			'password'		: $('.login-password').val()
		};
		
			
		$.post('ajax/user_login.php',data,function(msg){
			if (msg == "no") {
				$('#loader').remove();
				alert("Login failed.  Please try again.");
				return false;
			} else {
				
			$("#userLogin").fancybox.close();
				
				document.location = 'http://www.stickynoter.com/';
				
				/*
				refreshNotes();
				
				
				$.get('menu.user.php', function(data) {
						$('#menu ul').html(data);
						refreshNav();
						console.log("menu updated");
				});
				$.get('footer.user.php',function(data){
						$('#dock').html(data);
						refreshFooter();
						console.log("footer updated");
				});
				*/
				/*
				//Math random will fix the cache issue considering the url will be unique everytime the user logges in... otherwise we have to use straight js for redisplaying the content
				window.location = "http://www.stickynoter.com";*/
				/* 
				$('#loader').remove();
				$('#beforeLogin').hide();
				$('#afterLogin').show();*/
				return false;
			}
			
			
		});
		e.preventDefault();
	})
	
	
	
	// end user creation
	
	// delete note
	$('.closeNote').click(function() {
		var id =  $(this).attr('title');
		var sure = confirm("Are you sure you would like to delete this note?");
		
		if (sure == false) {
			return false;
		}
		
		var data = {
			'id' : id
		};
		
		$.post('board.php?action=delete', data, function(msg) {
				if (msg == 1) {
					$('#' + id).hide("puff");
				} else {
					alert("An error has occured.");
					return false;
				}
		});
	});
	
});

var zIndex = 0;

function refreshNotes() {
	$.get('board.php', function(data) {
			$('#main').html(data);
			make_draggable($('.note'));
			// delete note
			$('.closeNote').click(function() {
				var id =  $(this).attr('title');
				var sure = confirm("Are you sure you would like to delete this note?");
				
				if (sure == false) {
					return false;
				}
				
				var data = {
					'id' : id
				};
				
				$.post('board.php?action=delete', data, function(msg) {
						if (msg == 1) {
							$('#' + id).hide("puff");
						} else {
							alert("An error has occured.");
							return false;
						}
				});
			});
		});
}

function make_draggable(elements)
{
	
	elements.draggable({
		containment:'parent',
		start:function(e,ui){ ui.helper.css('z-index',++zIndex); },
		stop:function(e,ui){

			$.get('ajax/update_position.php',{
				  x		: ui.position.left,
				  y		: ui.position.top,
				  z		: zIndex,
				  id	: parseInt(ui.helper.find('span.data').html())
			});
		}
	});
}
function refreshNav(){
	$("#addNote").fancybox({
		'zoomSpeedIn'		: 600,
		'zoomSpeedOut'		: 500,
		'easingIn'			: 'easeOutBack',
		'easingOut'			: 'easeInBack',
		'hideOnContentClick': false,
		'padding'			: 15
	});
	$("#addMark").fancybox({
		'zoomSpeedIn'		: 600,
		'zoomSpeedOut'		: 500,
		'easingIn'			: 'easeOutBack',
		'easingOut'			: 'easeInBack',
		'hideOnContentClick': false,
		'padding'			: 15
	});
	
	$("#createUser").fancybox({
		'zoomSpeedIn'		: 600,
		'zoomSpeedOut'		: 500,
		'easingIn'			: 'easeOutBack',
		'easingOut'			: 'easeInBack',
		'hideOnContentClick': false,
		'padding'			: 15
	});
	
	$("#userLogin").fancybox({
		'zoomSpeedIn'		: 600,
		'zoomSpeedOut'		: 500,
		'easingIn'			: 'easeOutBack',
		'easingOut'			: 'easeInBack',
		'hideOnContentClick': false,
		'padding'			: 15
	});
	
	$("#stats").fancybox({
		'zoomSpeedIn'		: 600,
		'zoomSpeedOut'		: 500,
		'easingIn'			: 'easeOutBack',
		'easingOut'			: 'easeInBack',
		'hideOnContentClick': false,
		'padding'			: 15
	});
	
	$("#share").fancybox({
		'zoomSpeedIn'		: 600,
		'zoomSpeedOut'		: 500,
		'easingIn'			: 'easeOutBack',
		'easingOut'			: 'easeInBack',
		'hideOnContentClick': false,
		'padding'			: 15
	});
	
		$('.pr-body,.pr-author').live('keyup',function(e){
			if(!this.preview)
				this.preview=$('#fancy_ajax .note');
			
			this.preview.find($(this).attr('class').replace('pr-','.')).html($(this).val().replace(/<[^>]+>/ig,''));
		});
		
		$('.color').live('click',function(){
			$('#fancy_ajax .note').removeClass('yellow green blue pink').addClass($(this).attr('class').replace('color',''));
		});
	
	$('#note-submit').live('click',function(e){
		
		if($('.pr-body').val().length<4)
		{
			alert("The note text is too short!")
			return false;
		}
		
		$(this).replaceWith('<img src="img/ajax_load.gif" style="margin:30px auto;display:block" />');
		
		var data = {
			'zindex'	: ++zIndex,
			'body'		: $('.pr-body').val(),
			'color'		: $.trim($('#fancy_ajax .note').attr('class').replace('note',''))
		};
		
		
		$.post('ajax/post.php',data,function(msg){
						 
			if(parseInt(msg))
			{
				/*
				var tmp = $('#fancy_ajax .note').clone();
				
				tmp.find('span.data').text(msg).end().css({'z-index':zIndex,top:0,left:0});
				tmp.appendTo($('#main'));
				
				make_draggable(tmp)
				*/
				/* window.location = 'http://www.stickynoter.com'; */
				refreshNotes();
				
			} else if (msg == "Did not work") {
				alert("An error occured.");
				return false;
			} else {
				alert("Something went wrong.");
				return false;
			}
			
			$("#addButton").fancybox.close();
		});
		
		e.preventDefault();
		return false;
	});
	$('#mark-submit').live('click',function(e){
		
		if($('.pr-body').val().length<6)
		{
			alert("The url is too short!")
			return false;
		}
		
		$(this).replaceWith('<img src="img/ajax_load.gif" style="margin:30px auto;display:block" />');
		
		var data = {
			'body'		: $('.pr-body').val(),
		};
		
		
		$.post('ajax/mark.php',data,function(msg){
						 
				var sURL = unescape(window.location.pathname);
				window.location.href = sURL;
				
			
			
			
		});
		
		e.preventDefault();
		return false;
	});
}
function refreshFooter(){
	$('#dock').Fisheye(
		{
			maxWidth: 30,
			items: 'a',
			itemsText: 'span',
			container: '.dock-container',
			itemWidth: 50,
			proximity: 60,
			alignment : 'left',
			valign: 'bottom',
			halign : 'center'
		}
	);
}
