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
 * 
 * @author Andrew Tuttle (Origin Date-08/20/2009)
 */
function LoadingBar(size,height,progresColor, retrogresColor){
	
	//Create variables
	if(size){
		this.length = size;
	}else{
		this.length = 300;
	}
	if(height){
		this.height = height;
	}else{
		this.height = 12;
	}


	
	this.percent = 0;
	this.progress = document.createElement("div");
	this.retrogress = document.createElement("div");
	this.bar = document.createElement("div");
	this.progress.size = 0;
	this.retrogress.size = this.length;
	this.done = false;
	this.timeouts = new Array();
	
	
	//setup initalize
	this.bar.css = Groove.Stylesheet.teatherElement(this.bar);
	this.progress.css = Groove.Stylesheet.teatherElement(this.progress);
	this.retrogress.css = Groove.Stylesheet.teatherElement(this.retrogress);

	this.bar.appendChild(this.progress);
	this.bar.appendChild(this.retrogress);

	this.bar.css.style.height = this.height+"px";
	this.bar.css.style.padding = "0px";
	this.bar.css.style.marginTop = "2px";
	this.bar.css.style.marginBottom = "2px";
	this.bar.css.style.width = this.length+"px";
	this.bar.css.style.marginLeft = "auto";
	this.bar.css.style.marginRight = "auto";
	this.bar.css.style.border = "1px solid #000000";
	this.bar.css.style.backgroundColor = "#FFFFFF";
	if(retrogresColor){
		this.bar.css.style.backgroundColor = retrogresColor;
	}
	
	this.progress.css.style.height = this.height+"px";
	this.progress.css.style.padding = "0px";
	this.progress.css.style.margin = "0px";//"0px -1px 0px 0px"; //"-1px 0px -1px -1px";
	this.progress.className = "floatLeft";
	this.progress.css.style.backgroundColor = "#000000";
	if(progresColor){
		this.progress.css.style.backgroundColor = progresColor;
	}
	
	
	this.retrogress.css.style.height = this.height+"px";
	this.retrogress.css.style.padding = "0px";
	this.retrogress.css.style.margin = "0px";//"0px 0px 0px -1px"; //"-1px -1px -1px 0px";
	this.retrogress.className = "floatLeft";
	
	this.retrogress.css.style.backgroundColor = "#ffffff";
	if(retrogresColor){
		this.retrogress.css.style.backgroundColor = retrogresColor;
	}
	
	
	//Methods
	this.changeState = function(percentage){
		if(!(this.timeouts.length == 0)){
			for(var i=this.timeouts.length; i == this.timeouts.length; i--){
				try{
					clearTimeout(this.timeouts.pop());
				}catch(e){}
			}
		}
		this.percentWas = this.percent;
		this.percentNeedstobe = percentage;
		var footprint = (this.percentNeedstobe - this.percentWas);
		
		for(var j=0;j<=footprint; j++){
			var h = setTimeout(function(refObj, step){
				return function(){
					refObj.percent = (refObj.percentWas + step);
					refObj.progress.size = refObj.length * (refObj.percent/100);
					refObj.retrogress.size = refObj.length * ((100-refObj.percent)/100);
					if(!(refObj.percent == 100)){
						refObj.done = false;
					}else{
						refObj.done = true;
					}
					refObj.progress.css.style.width = refObj.percent+"%"; //refObj.progress.size+"px";
					refObj.retrogress.css.style.width = Math.abs(100 - refObj.percent)+"%";//refObj.retrogress.size+"px";
				}
			}(this, j),((1000/footprint)*j));
			this.timeouts.push(h);
		}
	}
	this.updateState = function(){
		this.progress.css.style.width = this.progress.size+"px";
		this.retrogress.css.style.width = this.retrogress.size+"px";
	}
	this.changeSize = function(newSize){
		this.length = newSize;
		this.changeState(this.percent);
	}
	this.append = function(elem){
		if(elem.appendChild){
			elem.appendChild(this.bar);
		}else{
			document.getElementById(elem).appendChild(this.bar);
		}
	}
	this.remove = function(){
		this.bar.parentNode.removeChild(this.bar);
	}
}
