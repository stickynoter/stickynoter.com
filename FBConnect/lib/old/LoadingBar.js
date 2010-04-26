/**
 * OLD - Depricated
 * 
 * Copyright 2009 Notice:
 * 	This code may be distributed under the GNU General Public License.
 * 
 * 	Anyone may use, copy, alter, or distribute this code, as long as the original author (Andrew Tuttle) and all other authors who have
 *  made alterations, are visible on the document.
 *  
 *  A copy of the GPL may be viewed at http://www.gnu.org/licenses/gpl.txt or in the root dir of this JS Library called COPYING.txt
 * 
 * @author Andrew Tuttle 
 */
Base.include("./lib/Groove.js");
function LoadingBar(progresColor){
	//Create variables
	this.length = 300;
	this.height = 12;
	this.percent = 0;
	this.progress = document.createElement("div");
	this.retrogress = document.createElement("div");
	this.bar = document.createElement("div");
	this.progress.size = 0;
	this.retrogress.size = this.length;
	this.done = false;
	
	//setup initalize
	this.bar.css = Groove.Stylesheet.tetherElement(this.bar);
	this.progress.css = Groove.Stylesheet.tetherElement(this.progress);
	this.retrogress.css = Groove.Stylesheet.tetherElement(this.retrogress);
	
	this.bar.appendChild(this.progress);
	this.bar.appendChild(this.retrogress);

	this.bar.css.style.height = this.height+"px";
	this.bar.css.style.padding = "0px";
	this.bar.css.style.marginTop = "0px";
	this.bar.css.style.marginBottom = "0px";
	this.bar.css.style.width = this.length+"px";
	this.bar.css.style.marginLeft = "auto";
	this.bar.css.style.marginRight = "auto";
	this.bar.css.style.border = "1px solid #000000";
	if(progresColor){
		this.bar.css.style.backgroundColor = "1px solid "+progresColor;
	}
	
	this.progress.css.style.height = this.height+"px";
	this.progress.css.style.padding = "0px";
	this.progress.css.style.margin = "0px";
	this.progress.className = "floatLeft";
	this.progress.css.style.backgroundColor = "#000000";
	if(progresColor){
		this.progress.css.style.backgroundColor = progresColor;
	}
	
	
	this.retrogress.css.style.height = this.height+"px";
	this.retrogress.css.style.padding = "0px";
	this.retrogress.css.style.margin = "0px";
	this.retrogress.className = "floatLeft";
	//this.retrogress.css.style.backgroundColor = "#ffffff";
	
	
	
	//Methods
	this.changeState = function(percentage){
		this.percent = percentage;
		this.progress.size = this.length * (percentage/100);
		this.retrogress.size = this.length * ((100 - percentage)/100);
		if(!(this.percent == 100)){
			this.done = false;
			this.updateState();
		}else{
			this.done = true;
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
}
