    //<![CDATA[


	 google.load("search", "1");
    var vToggle = false;

   	function OnLoad() {

 // create a search control
      var searchControl = new google.search.SearchControl();
    
      // Set the Search Control to get the most number of results
      searchControl.setResultSetSize("2");
      searchControl.setSearchCompleteCallback(this, searchDone);
	  searchControl.setSearchStartingCallback(this, searchStart);
      
    	var options = new google.search.SearcherOptions();
	  options.setExpandMode(google.search.SearchControl.EXPAND_MODE_OPEN);
	  options.setRoot(document.getElementById("webresults"));
	  
	  
	  
      // Create 2 searchers and add them to the control
      searchControl.addSearcher(new google.search.WebSearch(), options);
     // searchControl.addSearcher(new google.search.LocalSearch());
     // searchControl.addSearcher(new google.search.BlogSearch());
     // searchControl.addSearcher(new google.search.ImageSearch());
    
      // Set the options to draw the control in tabbed mode
      var drawOptions = new google.search.DrawOptions();
      drawOptions.setDrawMode(google.search.SearchControl.DRAW_MODE_Linear);
    
      // Draw the control onto the page
      searchControl.draw(document.getElementById("content"), drawOptions);
    
      // Search!
    }
     google.setOnLoadCallback(OnLoad);
function searchStart(){
	document.getElementById("webresultscontainer").appendChild(document.getElementById('results'));

}
function searchDone(searcher){
	//for(var i=0;i<$(".gsc-cursor")[0].childNodes.length;i++){
		$(".gsc-cursor").children(".gsc-cursor-page").click(function(){document.getElementById("webresultscontainer").appendChild(document.getElementById('results'));});
		//for (var i=0; i < searcher.results.length; i++) {
			//document.write(searcher.toString());
		//}


	//}
	
	//$("#fancy_content").html($("#webresults"));
	$("#LaunchFancyBox").fancybox({
		'zoomSpeedIn'		: 600,
		'zoomSpeedOut'		: 500,
		'frameHeight'		: 440,
		'easingIn'			: 'easeOutBack',
		'easingOut'			: 'easeInBack',
		'hideOnContentClick': false,
		'showCloseButton'		:	false,
		'hideOnOverlayClick' :	false,
		'padding'			: 15,
		'callbackOnShow'	: function(){document.getElementById("fancy_ajax").appendChild(document.getElementById('results'));}
		
	}).trigger('click');
	/*var d = document.createElement("div");
	d.id = "fancy_ajax";
	d.innerHTML = document.getElementById('webresults').innerHTML;
	document.getElementById("fancy_content").appendChild(d);
	document.getElementById("fancy_content").innerHTML = document.getElementById("fancy_content").innerHTML;*/
	
	/*FancyBox Options
	
	
	'callbackOnClose'	: function(){document.getElementById("webresultscontainer").appendChild(document.getElementById("results"));}
	
			padding				:	10,
		imageScale			:	true,
		zoomOpacity			:	true,
		zoomSpeedIn			:	0,
		zoomSpeedOut		:	0,
		zoomSpeedChange		:	300,
		easingIn			:	'swing',
		easingOut			:	'swing',
		easingChange		:	'swing',
		frameWidth			:	560,
		frameHeight			:	340,
		overlayShow			:	true,
		overlayOpacity		:	0.3,
		overlayColor		:	'#666',
		enableEscapeButton	:	true,

		hideOnOverlayClick	:	true,
		hideOnContentClick	:	true,
		centerOnScroll		:	true,
		itemArray			:	[],
		callbackOnStart		:	null,
		callbackOnShow		:	null,
		callbackOnClose		:	null,
		forceImage			:	false,
		hideTitle			:	false
	
	*/
	//alert("Done Searching");
	//document.getElementById('webresults').click();
}
