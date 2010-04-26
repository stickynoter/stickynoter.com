/**
 * OLD - DEPRICATED
 * 
 * Copyright 2009 Notice:
 * 	This code may be distributed under the GNU General Public License.
 * 
 * 	Anyone may use, copy, alter, or distribute this code, as long as the original author (Andrew Tuttle) and all other authors who have
 *  made alterations, are visible on the document.
 *  
 *  A copy of the GPL may be viewed at http://www.gnu.org/licenses/gpl.txt or in the root dir of this JS Library called COPYING.txt
 * 
 * 
 * @author Andrew Tuttle
 */
Base.include("./lib/Groove.js");
function Textbox(height, width, color){	
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
	
	//tethering elements to the dynamic stylesheet so that css is not embedded in the html
	this.textbox.css = Groove.Stylesheet.tetherElement(this.textbox);
	this.textbox.left.css = Groove.Stylesheet.tetherElement(this.textbox.left);
	this.textbox.right.css = Groove.Stylesheet.tetherElement(this.textbox.right);
	this.center.css = Groove.Stylesheet.tetherElement(this.center);
	
	//classname classification
	this.textbox.left.className = "floatLeft";
	this.center.className = "floatLeft";
	this.textbox.right.className = "floatLeft";
	
	this.textbox.className += " center";
	
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
	this.center.css.style.height = (this.textbox.sizeHeight-2)+"px";
	this.center.css.style.borderTop = "1px solid "+this.textbox.color;
	this.center.css.style.borderBottom = "1px solid "+this.textbox.color;
	this.center.css.style.width = width +"px";
	this.center.css.style.fontSize = (Math.abs(this.textbox.sizeHeight - 6))+"px";
	this.center.css.style.outline = "none";
	//this.textbox.css.style.border = "1px solid black";
	
	//textbox appending
	this.textbox.appendChild(this.textbox.left);
	this.textbox.appendChild(this.center);
	this.textbox.appendChild(this.textbox.right);
	this.center.type = "text";
	
	
	//Create the slides that the textbox will expand with
	for(var i=0;i<this.textbox.sizeHeight;i++){
		var divLeftTextBoxTemp = document.createElement("div");
		divLeftTextBoxTemp.style.padding = "0px";
		divLeftTextBoxTemp.style.margin = "0px";
		divLeftTextBoxTemp.style.height = "1px";
		divLeftTextBoxTemp.style.width = "100%";
		var divRightTextBoxTemp = document.createElement("div");
		divRightTextBoxTemp.style.padding = "0px";
		divRightTextBoxTemp.style.margin = "0px";
		divRightTextBoxTemp.style.height = "1px";
		divRightTextBoxTemp.style.width = "100%";
		var divRightDot = document.createElement("div");
		divRightDot.style.padding = "0px";
		divRightDot.style.margin = "0px";
		divRightDot.style.height = "1px";
		divRightDot.style.width = "1px";
		divRightDot.className = "floatLeft";
		divRightDot.style.backgroundColor = this.textbox.color;
		var divLeftDot = document.createElement("div");
		divLeftDot.style.padding = "0px";
		divLeftDot.style.margin = "0px";
		divLeftDot.style.height = "1px";
		divLeftDot.style.width = "1px";
		divLeftDot.className = "floatRight";
		divLeftDot.style.backgroundColor = this.textbox.color;
		
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
					blob1.className = "floatRight";
					var blob2 = document.createElement("div");
					blob2.style.padding = "0px";
					blob2.style.margin = "0px";
					blob2.style.height = "1px";
					blob2.style.width = "1px";
					blob2.className = "floatLeft";
				if(items > (Math.floor(papa.sizeHeight/3))){
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
					if (((papa.counter % Math.floor(papa.sizeHeight/2)) == 2)) {//honestly i dont even know what im doing here! just tried messing with different values and this displays nicely.
						if ((g > papa.counter) && ((g) < (papa.sizeHeight - papa.counter))) {
							if((g == (papa.sizeHeight-1))||(g==0)){
								blob1.style.backgroundColor = papa.color;
								blob2.style.backgroundColor = papa.color;
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
	//convience method so that when the enter button is pressed the onsubmit event fires
	this.center.onkeydown = function(event){
		if (event.keyCode == 13) {
			this.onsubmit();//enter key was pressed!
		}
	}	
	//convience method so a string or an element could be passed and it appends it to that element.
	this.append = function(ele){
		if(ele.appendChild){
			ele.appendChild(this.textbox);
		}
		else{
			document.getElementById(ele).appendChild(this.textbox);
		}
		this.textbox.css.style.width = this.center.clientWidth + (this.textbox.sizeHeight*2)+"px";
		this.textbox.css.style.height = this.center.clientHeight+"px";
	}
}
