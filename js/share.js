$(function() {
	
	$('#addFriend').click(function() {
		$('#addedResults').text("Adding...");
		var friend = $('#addedFriend').val();
		$.get('profileAjax.php?action=add&friend=' + friend, function(data) {
			$('#addedFriend').val("");
			
			var return2 = data;
			
			if (return2 == "itDidNotWorkThisIsNotAUsername") {
				$('#addedResults').html("That user does not exist.  Please try again.");
			} else {
				$('#noFriends').remove();
				$('<li>' + return2 + '</li>').appendTo('#friendList');
				$('#addedResults').html(return2 + " added!");
			}
		});
	});
	
	$('#friendList a').click(function() {
		var friend = $(this).attr('title');	
		$.get('profileAjax.php?action=delete&friend=' + friend, function(data) {													 
			alert(data);													  
		});
		$(this).parent().remove();	
		return false;
	});
	$('#docklist a').click(function() {
		var dockitem = $(this).attr('title');	
		$.get('profileAjax.php?action=deletedockitem&dockitem=' + dockitem, function(data) {													 
			alert(data);													  
		});
		$(this).parent().remove();	
		return false;
	});
	
});