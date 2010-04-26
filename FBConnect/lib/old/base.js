window.debug = new Array();
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
 * @author Andrew Tuttle (11/25/2008);
 */
var Groove = {
	/**@ignore*/
	incl : new Array(),
	/**@ignore*/
	loaded : new Array(),
	load : function(script){
		this.loaded.push(script);
	},
	isLoaded : (this.loaded.length == this.incl.length),
	percentComplete : Math.floor((((this.loaded.length+1)/(this.incl.length+1))*100)),
	include : function(path){
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
					if(this.Base.isLoaded){
						try{
							if(document.readyState == "complete"){
								main();
							}else{
								window.onload = main;
							}							
						}catch(e){
							Base.Error(e);
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
3	},
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
	Request: {
		/**
		 * 
		 * @param {Object} objects The objects that may be included in JSON format would be <code> init : function(){}, exec:function(){}, working:function(){}, error:function(){}</code>
		 */
		Get: function(objects){
			var xhr = null;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
				if (xhr.overrideMimeType) {
				}
			}
			else {
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} 
				catch (e) {
					try {
						xhr = new ActiveXObject("Microsoft.XMLHTTP");
					} 
					catch (e) {
					}
				}
			}
			
			xhr.savedObjects = function(obj){
				return obj;
			}(objects);
			objects = null;
			xhr.savedObjects.init();
			xhr.json_obj = null;
			xhr.working = true;
			
			xhr.assignobj = function(scope){
				try {
					if (scope.readyState == 4) {
						if (scope.status == 200) {
							scope.savedObjects.object = scope.xhr.responseText;
							scope.savedObjects.exec();
						
						}
						else {
							if (scope.savedObjects.working) {
								scope.savedObjects.working();
							}
						}
					}
					else {
						if (scope.savedObjects.working) {
							scope.savedObjects.working();
						}
					}
					
				} 
				catch (ex) {
					Base.Error.handle(ex);
					try {
						scope.savedObjects.error();
					} 
					catch (eee) {
					}
				}
			}
			
			if (xhr) {
				xhr.onreadystatechange = function(scope){
					return function(){
						scope.assignobj(scope);
					}
				}(xhr)
				try {
					xhr.open('GET', savedObjects.location, true);
					xhr.send(null);
				} 
				catch (nothing) {
					Base.Error.handle(nothing);
				}
			}
			//return xhr;
		},
		/**
		 * 
		 * @param {Object} objects The objects that may be included in JSON format would be <code>params: (these must be urlencoded) init : function(){}, exec:function(){}, working:function(){}, error:function(){}</code>
		 */
		Post:function(objects){
			var xhr = null;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
				if (xhr.overrideMimeType) {
				}
			}
			else {
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} 
				catch (e) {
					try {
						xhr = new ActiveXObject("Microsoft.XMLHTTP");
					} 
					catch (e) {
					}
				}
			}			
			xhr.savedObjects = function(obj){
				return obj;
			}(objects);
			objects = null;
			xhr.savedObjects.init();
			xhr.json_obj = null;
			xhr.working = true;
			
			xhr.assignobj = function(scope){
				try {
					if (scope.readyState == 4) {
						if (scope.status == 200) {
							scope.savedObjects.object = scope.xhr.responseText;
							scope.savedObjects.exec();
						
						}
						else {
							if (scope.savedObjects.working) {
								scope.savedObjects.working();
							}
						}
					}
					else {
						if (scope.savedObjects.working) {
							scope.savedObjects.working();
						}
					}
					
				} 
				catch (ex) {
					Base.Error.handle(ex);
					try {
						scope.savedObjects.error();
					} 
					catch (eee) {
					}
				}
			}
			
			if (xhr) {
				xhr.onreadystatechange = function(scope){
					return function(){
						scope.assignobj(scope);
					}
				}(xhr)
				try {
					xhr.open('POST', savedObjects.location, true);
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send(objects.params);
				} 
				catch (nothing) {
					Base.Error.handle(nothing);
				}
			}
			//return xhr;
		}
	},
	Stylesheet : {
			styleObject : document.styleSheets[0],
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
						                  if (flag=='delete') {            
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
			expungeRule : function(rule){
				return this.getRule(rule,'delete');  
			},		
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
			teatherElement : function(elm){
				var teatherid = Math.ceil(Math.random()*86534379);
				elm.id = "elm"+teatherid;
				return this.addRule("#elm"+teatherid);
				
			}
	},
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
