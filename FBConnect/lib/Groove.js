window.debug = new Array();

var stylesheet = document.createElement("link");
stylesheet.href = "./lib/dynamic.css";
stylesheet.type = "text/css";
stylesheet.rel = "stylesheet";
window.onload = function(){
	main();
}
/**
 * GrooveJS ©
 * 
 * While using this javascript dependancy framework additional JS files are added using Groove.include(pathtojs);
 * 
 * Once all of the included files have loaded it fire the main method called main().
 * 
 * Typical use of this script would be adding this js file into the webpage and then a different js file would 
 * consist of a function main(){} that would be the entry point into the main program.
 * 
 * Copyright 2009 Notice:
 * 	This code may be distributed under the GNU General Public License.
 * 
 * 	Anyone may use, copy, alter, or distribute this code, as long as the original author (Andrew Tuttle) and all other authors who have
 *  made alterations, are visible on the document.
 *  
 *  A copy of the GPL may be viewed at http://www.gnu.org/licenses/gpl.txt or in the root dir of this JS Library called COPYING.txt
 *  
 * @author Andrew Tuttle (Origin Date-11/25/2008);
 */
var Groove = {
	/**@ignore*/
	incl : new Array(),
	/**@ignore*/
	loaded : new Array(),
	load : function(script){
		this.loaded.push(script);
	},
	/**
	 * Returns if the total files included is the same as the total files actually loaded.
	 * @return bool 
	 */
	isLoaded : function(){
		return (this.loaded.length == this.incl.length);
	},
	/**
	 * Returns the percent of total files included that have been loaded.
	 */
	percentComplete: function(){
		return Math.floor((((this.loaded.length + 1) / (this.incl.length + 1)) * 100));
	},
	/**
	 * Includes a javascript file into the program before entering into the main method.
	 * @param {Object} The path to the Js File.
	 */
	include : function(path){
		window.onload = null;
		var _done = false;
		var item = document.createElement("script");
		item.type = "text/javascript";
		item.language = "JavaScript";
		item.src = path;		
		for(var i=0;i<this.loaded.length;i++){
			if(this.loaded[i] == item.src){
				_done = true;
			}
		}
		if(!_done){			
			item.Base = this;
			this.incl.push(item.src);
			item.onload = function(){
				    this.Base.load(this.src);
					if(this.Base.isLoaded()){
						try{
							if(document.readyState == "complete"){
								main();
							}else{
								window.onload = main;
							}							
						}catch(e){
							Groove.Error(e);
						}						
					}
					
			}
			item.onreadystatechange = function(){
				if ((this.readyState == 'complete')||(this.readyState == 'loaded')) {
					this.onload();
				}
			}			
			document.getElementsByTagName("head")[0].appendChild(item);
			item = null;
		}
	},
	/**
	 * Displays an error that occured on the webpage.
	 * @param {Object} Error Message.
	 */
	Error : function(err){
			this.messageBox = document.createElement("div"),
			this.p = document.createElement("p");
			var img = document.createElement("img");
			img.onload = function(){
			}
			img.width = 20;
			img.length = 20;
			img.src = "./lib/err.png";
			this.p.appendChild(img);
			this.p.appendChild(document.createTextNode(err));
	
			this.messageBox.setAttribute("style","padding:3px;text-align:center;border:solid 1px #66CCFF;position: absolute;top:"+(outerHeight / 2)+"px;left:"+((outerWidth / 2)-((outerWidth*.3)/2))+"px;"+"width:"+(outerWidth*.3)+"px;");
			
			this.messageBox.appendChild(this.p);
			document.getElementsByTagName("body")[0].appendChild(this.messageBox);		
	},
	/**
	 * Request object used to make a get or post request by AJAX.
	 */
	Request: {
		count:0,
		/**
		 * Get Request.
		 * @param {Object} Functions and objects used in the request (init,exec,working,error,location).
		 */
		Get: function(objects){
			this.count++
			var contain = document.createElement("div");
			contain.xhr = null;
			if (window.XMLHttpRequest) {
				contain.xhr = new XMLHttpRequest();
				if (contain.xhr.overrideMimeType) {
				}
			}
			else {
				try {
					contain.xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} 
				catch (e) {
					try {
						contain.xhr = new ActiveXObject("Microsoft.XMLHTTP");
					} 
					catch (e) {
					}
				}
			}
			//window.debug.push(contain);
			contain.savedObjects = function(obj){
				return obj;
			}(objects);
			objects = null;
			contain.savedObjects.init();
			//contain.xhr.json_obj = null;
			//contain.xhr.working = true;
			
			contain.assignobj = function(scope){
				try {
					if (this.savedObjects.working) {
						this.savedObjects.working(100/(4/scope.readyState));
					}
					if (scope.readyState == 4) {
						if (scope.status == 200) {
							this.savedObjects.object =  scope.responseText;
							this.savedObjects.exec();
							Groove.Request.count--;
							if(Groove.Request.count < 1){
								if(Groove.Request.onComplete){
									Groove.Request.onComplete();
								}
							}
						}
						else {
							//if (this.savedObjects.working) {
							//	this.savedObjects.working(scope.readyState);
							//}
						}
					}
					else {
						
					}
					
				} 
				catch (ex) {
					Groove.Error(ex);
					try {
						this.savedObjects.error();
					} 
					catch (eee) {
					}
				}
			}
			
			if (contain.xhr) {
				contain.xhr.onreadystatechange = function(scope){
					return function(){
						scope.assignobj(scope.xhr);
					}
				}(contain)
				try {
					contain.xhr.open('GET', contain.savedObjects.location, true);
					contain.xhr.send(null);
				} 
				catch (nothing) {
					Groove.Error(nothing);
				}
			}
			//return xhr;
		},
		/**
		 * Post Request.
		 * @param {Object} Functions and objects used in the request (init,exec,working,error,location,params).
		 */
		Post:function(objects){
			this.count++;
			var contain = document.createElement("div");
			contain.xhr = null;
			if (window.XMLHttpRequest) {
				contain.xhr = new XMLHttpRequest();
				if (contain.xhr.overrideMimeType) {
				}
			}
			else {
				try {
					contain.xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} 
				catch (e) {
					try {
						contain.xhr = new ActiveXObject("Microsoft.XMLHTTP");
					} 
					catch (e) {
					}
				}
			}			
			contain.savedObjects = function(obj){
				return obj;
			}(objects);
			objects = null;
			contain.savedObjects.init();
			//xhr.json_obj = null;
			//xhr.working = true;
			
			contain.assignobj = function(scope){
				try {
					if (scope.readyState == 4) {
						if (scope.status == 200) {
							this.savedObjects.object = scope.responseText;
							this.savedObjects.exec();
							Groove.Request.count--;
							if(Groove.Request.count < 1){
								if(Groove.Request.onComplete){
									Groove.Request.onComplete();
								}
							}
						
						}
						else {
							if (this.savedObjects.working) {
								this.savedObjects.working();
							}
						}
					}
					else {
						if (this.savedObjects.working) {
							this.savedObjects.working();
						}
					}
					
				} 
				catch (ex) {
					Groove.Error(ex);
					try {
						this.savedObjects.error();
					} 
					catch (eee) {
					}
				}
			}
			
			if (contain.xhr) {
				contain.xhr.onreadystatechange = function(scope){
					return function(){
						scope.assignobj(scope.xhr);
					}
				}(contain)
				try {
					contain.xhr.open('POST', contain.savedObjects.location, true);
					contain.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					contain.xhr.send(contain.savedObjects.params);
				} 
				catch (nothing) {
					Groove.Error(nothing);
				}
			}
			//return xhr;
		}
	},
	/**
	 * Stylesheet used to access an existing .css stylesheet and change attributes in .css with JS.
	 */
	Stylesheet : {
			/**@ignore*/
			styleObject : document.styleSheets[0],
			/**@ignore*/
			getRule : function(rule, flag){
						 		 this.indx=0;                                     
						         this.cssRule=false;                           
						         do {                                           
						            if (this.styleObject.rules) {  
										this.cssRule = this.styleObject.rules[this.indx];
						            } else {                                     
						                this.cssRule = this.styleObject.cssRules[this.indx];
						            }                                           
						            if (this.cssRule) {                              
						               if (this.cssRule.selectorText==rule){ 
						                  if (flag) {            
						                     if (this.styleObject.cssRules){          
						                        this.styleObject.deleteRule(this.indx);      
						                     } else {
						                        this.styleObject.removeRule(this.indx);   
						                     }                                   
						                     return true;                    
						                  } else {                                
						                   		return this.cssRule;                
						                  }                                    
						               }                                         
						            }                                            
						            this.indx++;                                        
						         } while (this.cssRule)
					return false; 
			},
			/**@ignore*/
			expungeRule : function(rule){
				return this.getRule(rule,true);  
			},
			/**@ignore*/	
			addRule : function(rule){
				if(!this.getRule(rule)){
						if (this.styleObject.addRule) {          
				        	this.styleObject.addRule(rule, null,0);     
				        } else {                            
				           this.styleObject.insertRule(rule+' { }', 0); 
				        }
				 }
				 return this.getRule(rule);
			},
			/**
			 * Method Used to teather an element to the .css file.
			 * @param {Object} Element To Teather
			 * @return {HTMLStyleObject} CSS Object Teathered
			 */
			teatherElement : function(elm){
				var teatherid = Math.ceil(Math.random()*86534379);
				elm.id = "elm"+teatherid;
				return this.addRule("#elm"+teatherid);
				
			}
	},
	/**
	 * Access the querystring in regular .html files.
	 * @param {Object} Parameter in the QueryString
	 * @return {Array} Values found with the parameter value.
	 */
	QueryString : function(par){
		var parsArray = new Array();
		var queryString = window.location.search.substring(1).toLowerCase();
			  parameters = queryString.split('&');
			  for(var i = 0; i < parameters.length; i++) {
						if(parameters[i].indexOf(par) === 0){
						      var parameterValue = new Array();
						      parameterValue = parameters[i].split('=');
						      parsArray.push(parameterValue[1]);
						}
			  }
		return parsArray;			
	}
}
