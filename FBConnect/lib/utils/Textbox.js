/**
 * 
 * 
 * 
 * Copyright 2009 Notice:
 * 	This code may be distributed under the GNU General Public License.
 * 
 * 	Anyone may use, copy, alter, or distribute this code, as long as the original author (Andrew Tuttle) and all other authors who have
 *  made alterations, are visible on the document.
 *  
 *  A copy of the GPL may be viewed at http://www.gnu.org/licenses/gpl.txt or in the root dir of this JS Library called COPYING.txt
 * 
 * @author Andrew Tuttle (Origin Date-10/08/2008)
 */
function Textbox(height, width, color, textboxColor, passwordProtected, submitFunction){	
	//createtion of elements and objects
	this.textbox = document.createElement("div");
	this.textbox.left = document.createElement("div");
	this.textbox.right = document.createElement("div");
	this.center = document.createElement("input");
	this.textbox.left.slides = new Array();
	this.textbox.right.slides = new Array();
	
	//assigning defaults if none were provided
	if(height){
		this.textbox.sizeHeight = height;
	}else{
		this.textbox.sizeHeight = 19;
	}
	if(color){
		this.textbox.color = color;
	}else{
		this.textbox.color = "#000000";
	}
	if(textboxColor){
		this.textbox.boxColor = textboxColor;
	}else{
		this.textbox.boxColor = "#ffffff";
	}
	if(width){
		this.textbox.sizeWidth = width;
	}else{
		this.textbox.sizeWidth = 100;
	}
	
	
	
	//tethering elements to the dynamic stylesheet so that css is not embedded in the html
	this.textbox.css = Groove.Stylesheet.teatherElement(this.textbox);
	this.textbox.left.css = Groove.Stylesheet.teatherElement(this.textbox.left);
	this.textbox.right.css = Groove.Stylesheet.teatherElement(this.textbox.right);
	this.center.css = Groove.Stylesheet.teatherElement(this.center);
	
	//classname classification
	this.textbox.left.className = "floatLeft";
	this.center.className = "floatLeft";
	this.textbox.right.className = "floatLeft";
	
	this.textbox.className = "floatLeft center";
	
	//left container stylesheet editing
	this.textbox.left.css.style.width = this.textbox.sizeHeight+"px";
	this.textbox.left.css.style.padding = "0px";
	this.textbox.left.css.style.margin = "0px";
	
	//right container stylesheet editing
	this.textbox.right.css.style.padding = "0px";	
	this.textbox.right.css.style.margin = "0px";
	this.textbox.right.css.style.width = this.textbox.sizeHeight+"px";
	//center stylesheet editing
	this.center.css.style.backgroundColor = "#ffffff";
	this.center.css.style.border = 0;
	this.center.css.style.margin = "0px";
	this.center.css.style.padding = "0px";
	//this.center.css.style.fontFamily = "arial";
	
	
	
	
	this.center.css.style.height = (this.textbox.sizeHeight)+"px";
	this.center.css.style.borderTop = "1px solid "+this.textbox.color;
	this.center.css.style.borderBottom = "1px solid "+this.textbox.color;
	this.center.css.style.width = this.textbox.sizeWidth +"px";
	this.center.css.style.fontSize = (Math.abs(this.textbox.sizeHeight - Math.floor(this.textbox.sizeHeight * .4)))+"px";
	this.center.css.style.outline = "none";
	this.center.css.style.backgroundColor = this.textbox.boxColor;
	//this.textbox.css.style.border = "1px solid black";	
	
	
	if(passwordProtected){
		this.center.setAttribute("type", "password");
		//this.center.type = "password";
	}else{
		this.center.setAttribute("type","text");
		this.center.type = "text";
	}
	
	
	//textbox appending
	this.textbox.appendChild(this.textbox.left);
	this.textbox.appendChild(this.center);
	this.textbox.appendChild(this.textbox.right);
	
	
	
	
	
		
	//Create the slides that the textbox will expand with
	for(var i=0;i<this.textbox.sizeHeight;i++){
		var divLeftTextBoxTemp = document.createElement("div");
		divLeftTextBoxTemp.css = Groove.Stylesheet.teatherElement(divLeftTextBoxTemp);
		divLeftTextBoxTemp.css.style.padding = "0px";
		divLeftTextBoxTemp.css.style.margin = "0px";
		divLeftTextBoxTemp.css.style.height = "1px";
		divLeftTextBoxTemp.css.style.width = "100%";
		divLeftTextBoxTemp.innerHTML = "<!-- -->";//.css.style.overflow = "none";
		var divRightTextBoxTemp = document.createElement("div");
		divRightTextBoxTemp.css = Groove.Stylesheet.teatherElement(divRightTextBoxTemp);
		divRightTextBoxTemp.css.style.padding = "0px";
		divRightTextBoxTemp.css.style.margin = "0px";
		divRightTextBoxTemp.css.style.height = "1px";
		divRightTextBoxTemp.css.style.width = "100%";
		divRightTextBoxTemp.innerHTML = "<!-- -->";//.css.style.overflow = "none";
		var divRightDot = document.createElement("div");
		divRightDot.css = Groove.Stylesheet.teatherElement(divRightDot);
		divRightDot.css.style.padding = "0px";
		divRightDot.css.style.margin = "0px";
		divRightDot.css.style.height = "1px";
		divRightDot.css.style.width = "1px";
		divRightDot.className = "floatLeft";
		divRightDot.css.style.backgroundColor = this.textbox.color;
		divRightDot.css.style.overflow = "hidden";
		var divLeftDot = document.createElement("div");
		divLeftDot.css = Groove.Stylesheet.teatherElement(divLeftDot);
		divLeftDot.css.style.padding = "0px";
		divLeftDot.css.style.margin = "0px";
		divLeftDot.css.style.height = "1px";
		divLeftDot.css.style.width = "1px";
		divLeftDot.className = "floatRight";
		divLeftDot.css.style.backgroundColor = this.textbox.color;
		divLeftDot.css.style.overflow = "hidden";
		
		divLeftTextBoxTemp.appendChild(divLeftDot);
		divRightTextBoxTemp.appendChild(divRightDot);
		this.textbox.left.appendChild(divLeftTextBoxTemp);
		this.textbox.left.slides.push(divLeftTextBoxTemp);
		this.textbox.right.appendChild(divRightTextBoxTemp);
		this.textbox.right.slides.push(divRightTextBoxTemp);
	}
	
	//focus method
	this.center.onfocus = function(){
		var papa = this.parentNode;
		papa.counter = null;
		clearInterval(papa.running);
		papa.running = setInterval(function(){
			papa.firstTime = true;
			for(var g=0;g<papa.sizeHeight;g++){
				var items = papa.left.slides[g].childNodes.length;
				var blob1 = document.createElement("div");
					blob1.style.padding = "0px";
					blob1.style.margin = "0px";
					blob1.style.height = "1px";
					blob1.style.width = "1px";
					blob1.style.overflow = "hidden";
					blob1.className = "floatRight";
					var blob2 = document.createElement("div");
					blob2.style.padding = "0px";
					blob2.style.margin = "0px";
					blob2.style.height = "1px";
					blob2.style.width = "1px";
					blob2.style.overflow = "hidden";
					blob2.className = "floatLeft";
				if(items > (Math.floor(papa.sizeHeight/4))){
					if(papa.firstTime){
						if(!papa.counter){
							if(papa.counter == 0){
								papa.counter++;
							}else{
								papa.counter = 0;
							}						
						}else{
							papa.counter++;
						}
						papa.firstTime = false;
						if(papa.counter > papa.sizeHeight){
							clearInterval(papa.running);
						}
					}
					if (((papa.counter % (papa.sizeHeight/2))==0)) {

						if (((g) > (papa.counter)) && ((g) < ((papa.sizeHeight-1) - (papa.counter)))) {
							if((g == (papa.sizeHeight-1))||(g==0)){
								blob1.style.backgroundColor = papa.color;
								blob2.style.backgroundColor = papa.color;
							}else{
								blob1.style.backgroundColor = papa.boxColor;
								blob2.style.backgroundColor = papa.boxColor;
							}
							papa.left.slides[g].insertBefore(blob1, papa.left.slides[g].lastChild);//childNodes[papa.left.slides[g].childNodes.length-1]);
							papa.right.slides[g].insertBefore(blob2, papa.right.slides[g].lastChild);
						}
						else {
						    
						}
					}
				}else{
					if((g == (papa.sizeHeight-1))||(g==0)){
						blob1.style.backgroundColor = papa.color;
						blob2.style.backgroundColor = papa.color;
					}else{
						blob1.style.backgroundColor = papa.boxColor;
						blob2.style.backgroundColor = papa.boxColor;
					}
					papa.left.slides[g].insertBefore(blob1,papa.left.slides[g].lastChild);//childNodes[papa.left.slides[g].childNodes.length-1]);
					papa.right.slides[g].insertBefore(blob2,papa.right.slides[g].lastChild);					
				}
			}
			
		},20);
	}
	
	//blur method
	this.center.onblur = function(){
		var papa = this.parentNode;
		clearInterval(papa.running);
		papa.counter = null;
		papa.running = setInterval(function(){
			papa.firstTime = true;			
			
			for(var j=0;j<papa.sizeHeight;j++){
					if(papa.firstTime){
						if(!papa.counter){
							if(papa.counter == 0){
								papa.counter++;
							}else{
								papa.counter = 0;
							}						
						}else{
							papa.counter++;
						}
						papa.firstTime = false;
					}
				var leftFirst = papa.left.slides[j].firstChild;
				var rightFirst = papa.right.slides[j].firstChild;
				/*if (!((j == 0) || (j == (papa.sizeHeight-1)))) {
					if (!leftFirst.style.backgroundColor == "") {
						papa.left.slides[j].removeChild(leftFirst);
					}
					if (rightFirst.style.backgroundColor == "") {
						papa.right.slides[j].removeChild(rightFirst);
					}
				}else{*/
					if((papa.left.slides[j].childNodes.length > 1)){
						papa.left.slides[j].removeChild(leftFirst);
					}
					if((papa.right.slides[j].childNodes.length > 1)){
						papa.right.slides[j].removeChild(rightFirst);
					}
				//}
			}
			
			if(papa.counter > (papa.sizeHeight*papa.sizeHeight)){
				clearInterval(papa.running);
			}			
		},20);
	}
	if(submitFunction){
		this.center.onsubmit = submitFunction;
	}
	//convience method so that when the enter button is pressed the onsubmit event fires
	this.center.onkeydown = function(e){
		var event = e || window.event;
		var target = event.target || event.srcElement;
		//window.debug.push(event);
		if (event.keyCode == 13) {
			window.debug.push(target);
			target.onsubmit();//enter key was pressed!
		}
		//return false;
	}
	/**
	 * Convience method so a string or an element could be passed and it appends it to that element.
	 * 
	 * @param {Object} ele
	 */
	this.append = function(ele){
		if(ele.appendChild){
			ele.appendChild(this.textbox);
		}
		else{
			document.getElementById(ele).appendChild(this.textbox);
		}
		this.textbox.css.style.width = this.textbox.sizeWidth + (this.textbox.sizeHeight*2)+"px";
		this.textbox.css.style.height = this.textbox.sizeHeight+1+"px";
	}
}
