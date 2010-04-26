/**
 * This utility object is for the creation, conversion, and phasing of colors.
 * 
 * Copyright 2009 Notice:
 * 	This code may be distributed under the GNU General Public License.
 * 
 * 	Anyone may use, copy, alter, or distribute this code, as long as the original author (Andrew Tuttle) and all other authors who have
 *  made alterations, are visible on the document.
 *  
 *  A copy of the GPL may be viewed at http://www.gnu.org/licenses/gpl.txt or in the root dir of this JS Library called COPYING.txt
 *  
 * @author Andrew Tuttle (Origin Date-01/19/2010)
 * @email business.progcrazy@gmail.com
 */
Groove.Color = {
	/**
	 * Converts a Hex String #xxxxxx to an RGB array [red,green,blue];
	 * 
	 * @param {Object} hexColor
	 */
	convertToRGB : function(hexColor){
		if(hexColor.charAt(0)=="#"){
			hexColor = hexColor.substring(1,7);
		}
		var rgbArray = new Array();
		rgbArray[0] = ((parseInt(hexColor.substring(0,2), 16)*100)/255);
		rgbArray[1] = ((parseInt(hexColor.substring(2,4), 16)*100)/255);
		rgbArray[2] = ((parseInt(hexColor.substring(4,6), 16)*100)/255);
		return rgbArray;
	},
	/**
	 * Takes red green and blue and creates a hex string of these values;
	 * 
	 * @param {Object} red
	 * @param {Object} green
	 * @param {Object} blue
	 */
	convertToHex : function(red, green, blue){
		var percent = true;
		if((parseInt(red)>100) || (parseInt(green)>100) || (parseInt(blue)>100)){
			percent = false;
		}
		if(percent){
			red = Math.floor((parseInt(red)*255)/100).toString(16);
			green = Math.floor((parseInt(green)*255)/100).toString(16);
			blue = Math.floor((parseInt(blue)*255)/100).toString(16);
			
			if(red.length<2){
				red = "0"+red;
			}
			if(green.length<2){
				green = "0"+green;
			}
			if(blue.length<2){
				blue = "0"+blue;
			}
			return "#"+ red+green+blue;
		}
		else{
			return "#"+red.toString(16)+green.toString(16)+blue.toString(16);
		}
	},
	/**
	 * Takes 2 hex values and a int to fade from the first hex string to the second hex string in the ammount of steps
	 * that are passed. Returns an array of hex values.
	 * 
	 * @param {Object} fromHex
	 * @param {Object} toHex
	 * @param {Object} totalSteps
	 * @return {Array} hexvalues
	 */
	fade : function(fromHex, toHex, totalSteps){
		var rgbFrom = this.convertToRGB(fromHex);
		var rgbTo = this.convertToRGB(toHex);
		var st = new Array();

		//determine the range of values that need to be broken up and also which way the fade needs to step
		var red = Math.abs(rgbFrom[0] - rgbTo[0]);
		var fromBiggerRed = (rgbFrom[0] > rgbTo[0]);
		//determine the range of values that need to be broken up and also which way the fade needs to step
		var green = Math.abs(rgbFrom[1] - rgbTo[1]);
		var fromBiggerGreen = (rgbFrom[1] > rgbTo[1]);
		//determine the range of values that need to be broken up and also which way the fade needs to step
		var blue = Math.abs(rgbFrom[2] - rgbTo[2]);
		var fromBiggerBlue = (rgbFrom[2] > rgbTo[2]);
		
		for(var i=1;i<(totalSteps+1);i++){
			//break the total fade size into separate steps
			var redStep = red/totalSteps;
			//determine if your fading up or down
			var fromToRed = (fromBiggerRed) ? Math.floor(rgbFrom[0] - (redStep*i)) : Math.floor(rgbFrom[0] + (redStep*i));
			
			//rinse and repeat
			var greenStep = green/totalSteps;
			var fromToGreen = (fromBiggerGreen) ? Math.floor(rgbFrom[1] - (greenStep*i)) : Math.floor(rgbFrom[1] + (greenStep*i));
			
			//rinse and repeat
			var blueStep = blue/totalSteps;
			var fromToBlue = (fromBiggerBlue) ? Math.floor(rgbFrom[2] - (blueStep*i)) : Math.floor(rgbFrom[2] + (blueStep*i));
			
			
			st[i-1] = this.convertToHex(fromToRed, fromToGreen, fromToBlue);
		
		}
		return st;
	}
}
