/**
 * OLD - DEPRICATED
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
 * @author Andrew Tuttle
 */
Base.include("./lib/Groove.js");
//Base.include("./lib/Media/Picture.js");
Base.include("./lib/old/LoadingBar.js");
function PictureViewer(fullSize){
	//create objects used for the picture viewer
	this.container = document.createElement("div");
	this.container.main = document.createElement("div");
	this.container.debug = document.createElement("div");
	
	//Tether Elements to dynamic stylesheet
	this.container.css = Groove.Stylesheet.teatherElement(this.container);
	this.container.main.css = Groove.Stylesheet.teatherElement(this.container.main);
	this.container.debug.css = Groove.Stylesheet.teatherElement(this.container.debug);
	
	//assign variables to be used in the container
	this.container.fullSize = 100;
	if(fullSize){
		this.container.fullSize = fullSize;
	}
	this.container.pics = new Array();
	this.container.loaded = new Array();
	this.container.load = new Array();
	this.container.fullPicView = true;
	
	//Assign CSS values for the elements
	this.container.css.style.width = this.container.fullSize+"px";
	this.container.css.style.padding = "0px";
	this.container.css.style.marginTop = "0px";
	this.container.css.style.marginBottom = "0px";
	this.container.css.style.marginLeft = "auto";
	this.container.css.style.marginRight = "auto";
	this.container.css.style.height = this.container.fullSize+20+"px";
	
	this.container.main.css.style.width = this.container.fullSize+"px";
	this.container.main.css.style.padding = "0px";
	this.container.main.css.style.margin = "0px";
	this.container.main.css.style.height = this.container.fullSize+"px";
	this.container.main.css.style.backgroundColor = "#ffffff";
	
	this.container.debug.css.style.width = this.container.fullSize+"px";
	this.container.debug.css.style.padding = "0px";
	this.container.debug.css.style.margin = "0px";
	
	this.container.debug.loadingBar = new LoadingBar("#8A8A8A");
	
	
	
	
	this.container.appendChild(this.container.main);
	this.container.appendChild(this.container.debug);
	
	
	//Methods used for application.
	this.container.arrangePictures = function(work){
		if(work){
			var picturesToBeViewed = this.pics.length/1.5;
			var intervals = new Array();
			for(var i=0;i<this.pics.length;i++){
				var size = parseInt(this.pics[i].css.style.height.substr(0,this.pics[i].css.style.height.indexOf("px")));
				var newSize = (size - (this.fullSize*(picturesToBeViewed*.07)));
				var speed = 50;
				var footstep = 3;
				this.pics[i].inverval = setInterval(function(picture, newsize,foot, numofPics){
						return function(){
							
							var size = parseInt(picture.css.style.height.substr(0,picture.css.style.height.indexOf("px")));
							var xindex = parseInt(picture.css.style.zIndex);
							var top = parseInt(picture.css.style.top.substr(0,picture.css.style.top.indexOf("px")));
							if (!picture.cond1) {
								picture.cond1 = (((picture.container.fullSize - newsize) / 2) + picture.offsetLeft);
								picture.increaseinTopOffset = (((picture.container.fullSize)*((100-xindex)-1)/100));						
							}							
							var differenceInSize = size-newsize;
							var differenceInOffSet = picture.cond1-picture.offsetLeft;
							if (!picture.firstRun) {
								if (differenceInSize > differenceInOffSet) {
									picture.sizeDecrease = ((differenceInSize / differenceInOffSet)*foot);
									picture.offsetIncrease = 1*foot;
								}
								else {
									picture.offsetIncrease = ((differenceInOffSet / differenceInSize)*foot);
									picture.sizeDecrease = 1*foot;
								}
							}
							picture.firstRun = true;							
							
							if (size > newsize) {
								picture.css.style.height = Math.floor(size-picture.sizeDecrease) + "px";
								picture.css.style.width = Math.floor(size-picture.sizeDecrease) + "px";
							}							
							if(picture.offsetLeft < picture.cond1){
								picture.css.style.left = picture.offsetLeft+picture.offsetIncrease+"px";
							}
							if((!(picture.offsetLeft < picture.cond1))||(!(size > newsize))){
								picture.cond1 = null;
									picture.foldInterval = setInterval(function(pic){
										return function(){
											var top = parseInt(pic.css.style.top.substr(0,pic.css.style.top.indexOf("px")));
											if (pic.increaseinTopOffset > top) {
												pic.css.style.top = top + 1 + "px";
											}else{
												clearInterval(pic.foldInterval);
												pic.container.fullPicView = false;
												pic.onclick = pic.click;
											}
										}
									}(picture),15);								
								//picture.onclick = picture.click;
								clearInterval(picture.inverval);
							}				
						}					
				}(this.pics[i],newSize,footstep,this.pics.length),speed);
			}
		}else{
			var picturesToBeViewed = this.pics.length;
			for (var i = 0; i < picturesToBeViewed; i++) {
				this.pics[i].css.style.height = this.fullSize-8+"px";
				this.pics[i].css.style.width = this.fullSize-8+"px";
				this.pics[i].css.style.left = this.offsetLeft+1+"px";	
			}
			for (var i = 0; i < picturesToBeViewed; i++) {
				this.pics[i].onclick = this.pics[i].click;
			}
			this.fullPicView = true;
		}
		
	}
	this.addPicture = function(src){
		this.container.debug.loadingBar.append(this.container.debug);
		var newPic = document.createElement("img");
		var newPicContainer = document.createElement("div");
		
		newPic.css = Groove.Stylesheet.teatherElement(newPic);
		newPicContainer.css = Groove.Stylesheet.teatherElement(newPicContainer);
		newPicContainer.css.style.width = this.container.fullSize-8+"px";//"50px";//
		newPicContainer.css.style.height = this.container.fullSize-8+"px";//"50px";//
		newPicContainer.css.style.border = "1px solid #A9A9A9";
		newPicContainer.css.style.margin = "1px";
		newPicContainer.css.style.padding = "2px";
		newPicContainer.css.style.position = "relative";
		newPicContainer.css.style.backgroundColor = "#ffffff";
		newPicContainer.css.style.marginLeft = "auto";
		newPicContainer.css.style.marginRight = "auto";
		newPicContainer.css.style.textAlign = "center";
		newPicContainer.css.style.top = "0px";
		
		//newPicContainer.appendChild(newPic);
		
		this.container.load.push(newPic);
		
		newPicContainer.css.style.zIndex = 100-this.container.load.length;
		
		var loadingGif = document.createElement("img");
		loadingGif.style.vertialAlign = "middle";
		loadingGif.src = "./lib/images/loader.gif";
		
		newPicContainer.appendChild(loadingGif);
				
		//newPic.container = this.container;		
		newPicContainer.container = this.container;
		newPic.container = newPicContainer;
		
		newPic.onload = function(){
			this.container.container.loaded.push(this);
			this.container.container.debug.loadingBar.changeState(Math.ceil((this.container.container.loaded.length/this.container.container.load.length)*100));
			if(this.width > this.height){
				this.css.style.width = "100%";				
				this.css.style.marginTop = (100*Math.floor(Math.floor(this.container.container.fullSize-((this.container.container.fullSize/this.width) * this.height))/2)/this.container.container.fullSize)+"%";//yeah heh sorry quicker to do it one line
				this.css.style.marginBottom = (100*Math.floor(Math.floor(this.container.container.fullSize-((this.container.container.fullSize/this.width) * this.height))/2)/this.container.container.fullSize)+"%";//yeah heh sorry quicker to do it one line
			}else{
				this.css.style.height = "100%";
				this.css.style.marginLeft = "auto";
				this.css.style.marginRight = "auto";
			}
			this.container.removeChild(this.container.firstChild);
			this.container.appendChild(this);
			if(this.container.container.debug.loadingBar.done){
				this.container.container.debug.removeChild(this.container.container.debug.firstChild);
				this.container.onclick = this.container.click;
			}
		}
		newPic.onstatechange = function(){
			if ((this.readyState == 'complete')||(this.readyState == 'loaded')) {	
				//window.debug.push(this.onload);		
					this.onload();
				}
			}
		newPic.src = src;
		this.container.pics.push(newPicContainer);//LOVE YOU ANDREW STUART TUTTLE!
		this.container.main.appendChild(newPicContainer);
		
		
		//Functions for the container of the picture
		newPicContainer.click = function(){			
			this.onclick = null;			
			if(this.container.fullPicView){				
				this.onclick = function(){};
				this.container.arrangePictures(true);
			}else{
				this.container.arrangePictures(false);
			}
		}
		//newPicContainer.click = newPicContainer.onclick;
		newPicContainer.onmouseover = function(){
			if(!this.container.fullPicView){
				this.container.debug.innerHTML = "ELEMEnt"+this.id;
			}
		}
		newPicContainer.onmouseout = function(){
			if(!this.container.fullPicView){
			}
		}
		
		this.container.arrangePictures();
	}
	this.removePicture = function(){
		//TODO:Create logic
	}
	this.append = function(ele){
		if(ele.appendChild){
			ele.appendChild(this.container);
		}
		else{
			document.getElementById(ele).appendChild(this.container);
		}
	}
}