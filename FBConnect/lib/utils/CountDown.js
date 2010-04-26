/**
 * This sudo-application is a countdown timer and counts down to a specific time in the week.
 * 
 * Typical use of this application is
 * <code>
 * 					//This creates the countdown and assigns it to the countdown var
 * 					var countdown1 = CountdownMachine.CreateCountdown("5:23:15");
 * 
 * 					//This appends the countdown element to the element with the id of debug
 *					countdown1.appendTo("debug");//appends it to the element with the id of "debug
 *					
 *					//This actually starts the countdown.
 *					countdown1.start();
 * </code>
 * display function: //fires every 1/2 second to ensure that it displays correct time
 * Any other user would most likely be intrested in changing the display function to suit their displaying needs. This function can be edited via this file or by overriding the function before running the .start() function
 * countdown1.display = function(){
 * //code goes here
 * }
 * //then
 * countdown1.start();
 * 
 * destroy function: //only fires once (at end of countdown)
 * I added this in there so that if there was something that you wanted to do when the countdown was complete you may add it in the code... either by way of editing this file or
 * countdown1.destroy = function()
 * {
 * 	//code goes here 
 * }
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
 * @author Andrew Tuttle (Origin Date-09/10/2009)
 * @email business.progcrazy@gmail.com
 */
			//Global Var CountdownMachine!!!!
				Groove.CountdownMachine = {
					//Countdowns : new Array(), //not needed for this application
					CreateCountdown : function(doomsday){
						var b = "";
						var chunks = doomsday.split(":");
						var date = new Date();
						date.setHours
						var countdown = {
							time:doomsday,//string format of the countdown in format DayofWeek:HH:MM
							dayofweek:parseInt(chunks[0]),//day of the week indexed at sunday = 0
							hour:parseInt(chunks[1]),//hour in military time
							min:parseInt(chunks[2]),//min in standard time
							hoursLeft:0,
							minsLeft:0,
							daysLeft:0,
							containerElement:document.createElement("div"),
							start:function(){
								//this function starts the countdown on the screen
								//This function is of no concern to the average user
								this.intval = setInterval(function(countdownObj){return function(){
									var currentTime = new Date();
									//checks to see if this countdown time is a previous day if so then it will destroy itself
									if(!(currentTime.getDay() > countdownObj.dayofweek)){
										
											var currentMillasec = (currentTime.getDay() * 24 * 60 * 60)+(currentTime.getHours() * 60 * 60)+(currentTime.getMinutes()*60);//turns the hours and min left into seconds
											var countdownMillasec = (countdownObj.dayofweek * 24 * 60 * 60)+(countdownObj.hour * 60 * 60)+(countdownObj.min * 60);//turns the hours and min to countdown to into seconds
											
											var timeleft = countdownMillasec - currentMillasec;//subtracts the ammount of seconds
											
											//checks to see if there is still time left
											if (timeleft > 0){
												timeleft = timeleft/60;//timeleft was in seconds and now its in min
												countdownObj.minsLeft = Math.floor(timeleft%60);//takes the modulus of the time left in min to build the mins left
												timeleft = timeleft/60;//divides the time left by 60 because there are 60 min in an hour, therefor timeleft is now in minutes
												countdownObj.hoursLeft = Math.floor(timeleft%24);//takes the modulus of the time left by 24 because there are 24 hours in a day in hours to build the hours left
												timeleft = timeleft/24;//divides the time by 24 because there are 24 hours in a day.
												countdownObj.daysLeft = Math.floor(timeleft%24);//take the modulus of the time left in days to get the actual days left
											}else{
												clearInterval(countdownObj.intval);//this removes the interval from executing ever again during the life of the web page
												countdownObj.destroy();//this is so that the end user may enter in their own code to fire once there is no more time left... like  alert("Its time for a meeting!"); or alert("Times up!");
											}
										
										countdownObj.display();//run the display function to update the screen!
										
									}
									else{
										countdownObj.destroy();
									}
									
								}}(this), 500);
								//this.Countdowns.push(this.intval);//not needed for this application
							},
							display:function(){
								
								//this function is what fires every 1/2 a second and is what displays the text
								//the hours left can be accessed by typing this.hoursLeft days left can be accessed by this.daysLeft and minuts left can be accessed by this.minsLeft
								//this way you can do something like document.getElementById("debug").innerHTML = "There are "+this.daysLeft+" day(s) "+this.hoursLeft+" hour(s) and "+this.minsLeft+" mins left till the next appointment";
								
								
								
								///NOTE: This is what you want to edit to change the displayof your data... here is where the hours left mins left and days left will show up in the 
								this.containerElement.innerHTML = "There are "+this.daysLeft+" day(s) "+this.hoursLeft+" hour(s) and "+this.minsLeft+" min(s) left till the next appointment";
							},
							destroy:function(){
								//this function fires code before the removal this particular countdown from the countdown array.
							},
							appendTo:function(id){
								document.getElementById(id).appendChild(this.containerElement);
							}
						}
						return countdown;
					}
				}