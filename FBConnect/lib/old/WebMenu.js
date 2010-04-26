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
function WebMenu(dynamicStyleSheet){
	
	
	//--------Object Refrence Variables
	this.menuContainer = document.createElement("div");
	this.menuContainer.id = "WebMenu" + Math.floor(Math.random()  * 11251986);
	this.menuContainer.dcss = dynamicStyleSheet;
	this.menuContainer.genericStyles = this.menuContainer.dcss.addRule("#WebMenu"+this.menuContainer.id.slice(7,this.menuContainer.id.length));
	this.menuUL = document.createElement("ul");
	this.menuUL.id ="WebMenuUL" + Math.floor(Math.random() * 11251986);
	this.menuUL.dcss = this.menuContainer.dcss.addRule("#WebMenuUL"+this.menuUL.id.slice(9, this.menuUL.id.length));
	this.menuItems = new Array();
	this.menuItems.functionContainer;
	//---------END---------------
	
	//-----General Stylesheet Styling
	this.menuContainer.genericStyles.style.fontFamily = "sans-serif";
	
	
	
	this.menuUL.dcss.style.padding = "0px";
	
	
	
	this.classes = new Array();
	this.classes[0] = this.menuContainer.dcss.addRule(".noPad");
	this.classes[0].style.paddingLeft = "0px";
	this.classes[0].style.listStyleType = "none";
	//----------END----------	
	/**
	 * Creates a Menu Item. And appends it to the
	 * 
	 *  and adds it to the menu
	 * @param {object} blocktext
	 * @param {object} link
	 */
	this.addItem = function(liElement, parentMenuItem){
		if(parentMenuItem){
				parentMenuItem.ul.appendChild(liElement);
		}else{
			this.menuUL.appendChild(liElement);
		}
	}
	this.append = function(elem){
		this.menuContainer.appendChild(this.menuUL);
		document.getElementById(elem).appendChild(this.menuContainer);
	}
}

function HorizontalWebMenu(dynamicStyleSheet){
	this.menu = new WebMenu(dynamicStyleSheet);
	//---Styles so that this WebMenu displays as a vertical menu.
	this.menu.menuUL.dcss.style.textDecoration = "none";
	this.menu.menuUL.dcss.style.listStyleType = "none";
	this.center = function(){
		this.menu.menuUL.style.textAlign = "center";
		this.menu.menuUL.style.marginLeft = "auto";
		this.menu.menuUL.style.marginRight = "auto";
	}
	
	//---End Styling
	/**
	 * Adds an item to the WebMenu if there is no master element then it is considered a master element and has no children.
	 * @param {Object} blockText
	 * @param {Object} link
	 * @param {Object} master JSON object containing master item as parent,  the mouse hovering as enter, the mouse leaving hover as leave, and the mouse click as  click  Ex. { parent: parentElement,init enter : function(){}, leave : function(){}, click : function(){} }
	 */	
	this.addItem = function(blockText, link, master){
		var a = document.createElement("a");
		var li = document.createElement("li");
		li.id = "li" + Math.floor(Math.random() * 11251986);
		li.dcss = this.menu.menuContainer.dcss.addRule("#li"+li.id.slice(2, li.id.length));
		li.dcss.style.marginLeft = "1px";
		li.dcss.style.marginRight = "1px";
		
		li.onmouseover = function(ma){return ma.enter;}(master)
		li.onmouseout =function(ma){return ma.leave;}(master)
		li.onclick = function(ma){return ma.click;}(master)
		
		a.appendChild(document.createTextNode(blockText));
		a.href = link;
		li.appendChild(a);
		li.className = "floatLeft";
				li.ul  = document.createElement("ul");
				li.appendChild(li.ul);
				li.ul.className = "noPad";
				li.ul.id = "sub" + Math.floor(Math.random() * 11251986);
				li.ul.dcss = this.menu.menuContainer.dcss.addRule("#sub" + li.ul.id.slice(3,li.ul.id.length));
				
		this.menu.addItem(li, master.parent);		
		if(master.init){
			li.f = master.init;
			li.f();
		}
			var size = 0;
			for(var i = 0; i< this.menu.menuUL.childNodes.length; i++){
				size += this.menu.menuUL.childNodes[i].clientWidth + 4;
			}
			this.menu.menuUL.dcss.style.width = size + "px";
		return li;
	}
	/**
	 * Appends the WebMenu to the element provided using document.getElementById().
	 * @param {Object} elem
	 */
	this.append = function(elem){
		this.menu.append(elem);
	}
}

function VerticalWebMenu(dynamicStyleSheet){
	this.menu = new WebMenu(dynamicStyleSheet);
	//---Styles so that this WebMenu displays as a vertical menu.
	this.menu.menuUL.dcss.style.textDecoration = "none";
	this.menu.menuUL.dcss.style.listStyleType = "none";
	
	//---End Styling
	/**
	 * Adds an item to the WebMenu if there is no master element then it is considered a master element and has no children.
	 * @param {Object} blockText
	 * @param {Object} link
	 * @param {Object} master JSON object containing master item as parent,  the mouse hovering as enter, the mouse leaving hover as leave, and the mouse click as  click  Ex. { parent: parentElement,init enter : function(){}, leave : function(){}, click : function(){} }
	 */	
	this.addItem = function(blockText, link, master){
		var a = document.createElement("a");
		var li = document.createElement("li");
		li.id = "li" + Math.floor(Math.random() * 11251986);
		li.dcss = this.menu.menuContainer.dcss.addRule("#li"+li.id.slice(2, li.id.length));
		li.dcss.style.marginLeft = "1px";
		li.dcss.style.marginRight = "1px";
		
		li.onmouseover = function(ma){return ma.enter;}(master)
		li.onmouseout =function(ma){return ma.leave;}(master)
		li.onclick = function(ma){return ma.click;}(master)
		
		a.appendChild(document.createTextNode(blockText));
		a.href = link;
		li.appendChild(a);
				li.ul  = document.createElement("ul");
				li.appendChild(li.ul);
				li.ul.className = "noPad";
				li.ul.id = "sub" + Math.floor(Math.random() * 11251986);
				li.ul.dcss = this.menu.menuContainer.dcss.addRule("#sub" + li.ul.id.slice(3,li.ul.id.length));
				
		this.menu.addItem(li, master.parent);		
		if(master.init){
			li.f = master.init;
			li.f();
		}
			var size = 0;
			for(var i = 0; i< this.menu.menuUL.childNodes.length; i++){
				size += this.menu.menuUL.childNodes[i].clientWidth + 4;
			}
			this.menu.menuUL.dcss.style.width = size + "px";
		return li;
	}
	/**
	 * Appends the WebMenu to the element provided using document.getElementById().
	 * @param {Object} elem
	 */
	this.append = function(elem){
		this.menu.append(elem);
	}
}
