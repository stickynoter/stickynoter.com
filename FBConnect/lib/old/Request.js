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
 * @author Andrew Tuttle (11/25/2008);
 */
function Request(objects){
	this.savedObjects = function(obj){return obj;}(objects);
	objects = null;
	this.savedObjects.init();
	this.xhr = null;
	this.json_obj = null;
	this.working = true;
	//lo = null;
	//query = null;
	if(window.XMLHttpRequest){
		this.xhr = new XMLHttpRequest();
		if(this.xhr.overrideMimeType){
			//this.xhr.overrideMimeType("text/xml");
		}
	}
	else {
		try {
            this.xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
               this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
	}
	
	
	this.assignobj = function(scope){
		//window.debug.push(scope.xhr.readyState+":"+scope.xhr.status);
		try{
			if(scope.xhr.readyState == 4){
				if (scope.xhr.status == 200) {
					//try {				
					//	scope.json_obj = eval('(' + scope.xhr.responseText + ')');
					//}catch(e){
					//	try{
					//		scope.json_obj = eval(scope.xhr.responseText);
					//	}catch(ee){
							scope.json_obj = scope.xhr.responseText;
					//	}						
					//}
					//setTimeout(function(){
						scope.savedObjects.object = scope.json_obj;
						scope.savedObjects.exec();
					//}, 5000);
					
				}else{
					if (scope.savedObjects.working) {
						scope.savedObjects.working();
					}
				}
			}else{
				if (scope.savedObjects.working) {
					scope.savedObjects.working();
				}
			}
			
		}
		catch(ex){
			Base.Error.handle(ex);
			try{
				scope.savedObjects.error();
			}catch(eee){}
		}
	}
	
	if(this.xhr){
		this.xhr.onreadystatechange = function(scope){
			return function(){
				scope.assignobj(scope);
			}
		}(this)
		try{
		this.xhr.open('GET', this.savedObjects.location, true);
		this.xhr.send(null);
		}catch(nothing){
			Base.Error.handle(nothing);
		}
	}
	
	
}
function Post(objects){
		this.savedObjects = function(obj){return obj;}(objects);
	objects = null;
	this.savedObjects.init();
	this.xhr = null;
	this.json_obj = null;
	this.working = true;
	//lo = null;
	//query = null;
	if(window.XMLHttpRequest){
		this.xhr = new XMLHttpRequest();
		if(this.xhr.overrideMimeType){
			//this.xhr.overrideMimeType("text/xml");
		}
	}
	else {
		try {
            this.xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
               this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
	}
	
	
	this.assignobj = function(scope){
		window.debug.push(scope.xhr.readyState+":"+scope.xhr.status);
		try{
			if(scope.xhr.readyState == 4){
				if (scope.xhr.status == 200) {
					//try {				
					//	scope.json_obj = eval('(' + scope.xhr.responseText + ')');
					//}catch(e){
					//	try{
					//		scope.json_obj = eval(scope.xhr.responseText);
					//	}catch(ee){
							scope.json_obj = scope.xhr.responseText;
					//	}						
					//}
					//setTimeout(function(){
						scope.savedObjects.object = scope.json_obj;
						scope.savedObjects.exec();
					//}, 5000);
					
				}else{
					if (scope.savedObjects.working) {
						scope.savedObjects.working();
					}
				}
			}else{
				if (scope.savedObjects.working) {
					scope.savedObjects.working();
				}
			}
			
		}
		catch(ex){
			Base.Error.handle(ex);
			try{
				scope.savedObjects.error();
			}catch(eee){}
		}
	}
	
	if(this.xhr){
		this.xhr.onreadystatechange = function(scope){
			return function(){
				scope.assignobj(scope);
			}
		}(this)
		
		
		
		this.xhr.open('POST', this.savedObjects.location, true);
		this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		this.xhr.send(this.savedObjects.params);
	}
}
