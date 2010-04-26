/**
 * This Application is used for changing a table, unobtrusivly, to a table that can loosly sort large data sets.
 * 
 * Copyright 2009 Notice:
 * 	This code may be distributed under the GNU General Public License.
 * 
 * 	Anyone may use, copy, alter, or distribute this code, as long as the original author (Andrew Tuttle) and all other authors who have
 *  made alterations, are visible on the document.
 *  
 *  A copy of the GPL may be viewed at http://www.gnu.org/licenses/gpl.txt or in the root dir of this JS Library called COPYING.txt
 * 
 * @author Andrew Tuttle (Origin Date-08/27/2009)
 */

function SortableTable(table){
	
	this.sort = function(){
		var tablesorting = this.parentNode.parentNode.parentNode;
		var table = tablesorting.getElementsByTagName("tbody")[0];
		var sortRows = new Array();

				var debugArray = new Array();
				for(var i=0; i<tablesorting.sortingRules.length; i++){
					for(var j=0; j<table.childNodes.length; j++){
						if(tablesorting.sortingRules[i].test(table.childNodes[j].childNodes[this.sortID].firstChild.nodeValue)){
							debugArray.push(table.childNodes[j]);
							
						}
					}
				}
				for(var i=0;i<debugArray.length;i++){
					table.appendChild(debugArray[i]);	
				}
				tablesorting.sortingRules.reverse();
			 table.asc = (table.asc)? false : true;
	}	
	
	
	this.tableRows = new Array();
	this.tableContainer = document.createElement("div");
	
	if(table){
		this.table = table;
		var thead = this.table.getElementsByTagName("thead")[0];
		var theadItems = thead.rows[0].getElementsByTagName("td");
		for(var i=0; i<theadItems.length; i++){
			theadItems[i].sortID = i;
			theadItems[i].className = (theadItems[i].className) ? theadItems[i].className + " clickable" : "clickable";
			theadItems[i].onclick = this.sort;
		}
	}
	else{
		this.table = document.createElement("table");
	}
	
	this.table.sortingRules = new Array(/^(A|a).*$/, /^(B|b).*$/, /^(C|c).*$/,
		   							/^(D|d).*$/, /^(E|e).*$/, /^(F|f).*$/,
		      						/^(G|g).*$/, /^(H|h).*$/, /^(I|i).*$/,
		         					/^(J|j).*$/, /^(K|k).*$/, /^(L|l).*$/,
		            				/^(M|m).*$/, /^(N|n).*$/, /^(O|o).*$/,
		               				/^(P|p).*$/, /^(Q|q).*$/, /^(R|r).*$/,
		                  			/^(S|s).*$/, /^(T|t).*$/, /^(U|u).*$/,
		                    		/^(V|v).*$/, /^(W|w).*$/, /^(X|x).*$/,
		                        	/^(Y|y).*$/, /^(Z|z).*$/);
	this.table.asc = true;
	this.table.locked = false;
	//this.table.dcss = dcss;
	this.table.clickable = Groove.Stylesheet.addRule(".clickable");
	this.table.clickable.style.cursor = "pointer";
	this.table.clickable.style.fontWeight = "bold";
	
	this.tableContainer.appendChild(this.table);	
	
	this.append = function(element){
		document.getElementById(element).appendChild(this.tableContainer);
	}	
	
	this.addRow = function(arrayOfData){
		var tr;
		var head = (!this.table.getElementsByTagName("thead"))? true : false;
		if(head){
			this.table.appendChild(document.createElement("thead"));
			tr = this.table.firstChild.insertRow(0);
			this.table.appendChild(document.createElement("tbody"));//create tbody if there is none
			this.table.appendChild(document.createElement("tfoot"));//create footer also
			var tmpTR = this.table.childNodes[2].insertRow(0);
			var tmpTD = tmpTR.insertCell(0);
			tmpTD.setAttribute("colspan", arrayOfData.length);
			var pagesp = document.createElement("p");
			pagesp.className = "floatLeft tableFoot";
			pagesp.innerHTML = "Pages: 1";
			tmpTD.appendChild(pagesp);
			
		}else{
			tr = this.table.getElementsByTagName("tbody")[0].insertRow(0);
		}
		
		
		for(var i=arrayOfData.length-1;i>=0;i--){
			if(head){
				var td = tr.insertCell(0);
				td.appendChild(document.createTextNode(arrayOfData[i]));
				td.sortID = i;
				td.onclick = this.sort;
				td.className = (td.className) ? td.className + " clickable" : "clickable";
			}
			else{
				var td = tr.insertCell(0);
				td.appendChild(document.createTextNode(arrayOfData[i]));
			}
			
		}
		
	}
}
