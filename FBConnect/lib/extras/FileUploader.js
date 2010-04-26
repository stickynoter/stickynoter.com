/**
 * This application is used for uploading a file and having real-time feedback as to the progress of that upload.
 * 
 * Example:
 * 
 * <code>
 * 	var uploader = new FileUploader();
 * 	uploader.append(elementToAppendTo);
 * </code>
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
 * @author Andrew Tuttle (Origin Date-01/18/2010)
 * @email business.progcrazy@gmail.com
 */
Groove.include("./lib/utils/LoadingBar.js");
Groove.include("./lib/utils/Color.js");
function FileUploader(){
	
	//create the original form.
	this.uploadForm = document.createElement("form");
	this.uploadForm.setAttribute("action","./cgi-bin/upload.cgi");
	this.uploadForm.setAttribute("method", "post");
	this.uploadForm.setAttribute("enctype", "multipart/form-data");
	this.uploadForm.style.position = "relative";
	
	//create the iframe it gets forwarded to so that the system is not stuck in posting the file to the server.
	this.uploadIForm = document.createElement("iframe");
	this.uploadIForm.name = "upload_target";
	this.uploadIForm.id = "upload_target";
	this.uploadIForm.style.visibility = "hidden";
	this.uploadIForm.style.height = "0px";
	this.uploadIForm.style.width = "0px";
	this.uploadIForm.style.position = "absolute";
	
	
	//create file upload
	this.file = document.createElement("input");
	this.file.name = "uploadedfile";
	this.file.setAttribute("type", "file");
	
	//create submit button
	this.buttonSubmit = document.createElement("input");
	this.buttonSubmit.name = "action";
	this.buttonSubmit.setAttribute("type", "submit");
	this.buttonSubmit.value = "Upload";
	
	
	
	//Setup Params to be POST-ed to the upload script
	this.paramUpload = document.createElement("input");
	this.paramUpload.setAttribute("type", "hidden");
	this.paramUpload.name = "upload";
	this.paramUpload.value = "1";
	
	this.paramRandom = document.createElement("input");
	this.paramRandom.setAttribute("type", "hidden");
	this.paramRandom.name = "rand_string";
	this.paramRandom.value = Math.floor(Math.random()*29334857);
	
	
	//Append the Elements
	this.uploadForm.file = this.file;
	this.uploadForm.submit = this.buttonSubmit;
	this.uploadForm.status = this.paramRandom.value;
	this.uploadForm.appendChild(this.uploadIForm);
	this.uploadForm.appendChild(this.file);
	this.uploadForm.appendChild(this.buttonSubmit);
	this.uploadForm.appendChild(this.paramUpload);
	this.uploadForm.appendChild(this.paramRandom);
	
	
	//setsup the onsubmit event to forward the uploading to the 
	this.uploadForm.onsubmit = function(){
		//redirects it to the iframe so javascript can execute and it does not hang on the posting of the file.
		this.setAttribute("target", "upload_target");
		//creates the loading bar which has its dependancy in the top of the fileuploader.js file
		var lding = new LoadingBar(300, 14, "#FF0000", "#FFFFFF");
		lding.bar.css.style.position = "absolute";
		lding.bar.css.style.margin = "10px 5px 5px 5px";
		lding.bar.css.style.top = "0px";
		lding.bar.css.style.left = "0px";
		
		
		
		//gets the actual filename.
		
		var splitFilename = this.file.value.split('\/');//childNodes[1] is the file node.			
		var trueFilename = splitFilename[splitFilename.length - 1];
		splitFilename = this.file.value.split('\\');
		trueFilename = splitFilename[splitFilename.length - 1];
		
		//encodes the filename so that if it includes certain chars we can locate it
		trueFilename = encodeURIComponent(trueFilename);
		var status = this.status;
		var file = this.file;
		var submit = this.submit;
		
		//set the interval that checks the file progress....
		if ((!(this.file.value == ""))||(this.value)) {
			this.file.style.visibility = "hidden";
			this.submit.style.visibility = "hidden";
			lding.append(this);
			var interInt = setInterval(function(){
			
				//creates the objects needed to make a request.
				var repeat = {
					init: function(){
					
					},
					exec: function(){
						this.loading.changeState(this.object);
						if (this.object == "100") {
							this.loading.changeState("100");
							clearInterval(this.intervalInt);
							var color = Groove.Color.fade("#990000", "#33FF00", 100);
							//Creates the Fading from red to green to show its Complete.
							for(var i=0;i<color.length;i++){
								setTimeout(function(loadingBar, hexColor){
									return function(){
										loadingBar.progress.css.style.backgroundColor = hexColor;
									}
								}(this.loading, color[i]),20*i);
							}
						}
					},
					working: function(){
					
					},
					error: function(){
					
					},
					location: "./cgi-bin/upload.cgi?filename=" + trueFilename + "&check=1&s="+status
				}
				//adds objects to the collection of objects 
				
				
				repeat.file = file;
				repeat.submit = submit;
				
				
				repeat.loading = lding;//adds loading bar for easy execution of methods
				repeat.intervalInt = interInt;//sets interval for self destruction
				//Makes the request using the builtin request object with Groove.
				Groove.Request.Get(repeat);
			}, 800);
			//return false;
		}
	}
	
	this.append = function(ele){
		if(ele.appendChild){
			ele.appendChild(this.uploadForm);
		}
		else{
			document.getElementById(ele).appendChild(this.uploadForm);
		}
	}
	
	
}
