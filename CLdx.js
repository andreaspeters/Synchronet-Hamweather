/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


        Author: Andreas Peters
		www:  https://www.andreas-peters.net

*/

load("functions.js");


var CLDX = Class({
	weather: "",
	key: "",

	initialize: function() {
		this.refresh();
		this.update();
		this.main();
	},

	render: function() {
		setBackground("main.ans");

		// Title
		this.putxy(17,2,format("\1Y Current Solar Weather %s", this.weather.solardata.updated));
		// Footer
		this.putxy(2,21,format("\1M [Q]uit [R]efresh "));

		// Weather
		this.putxy(5,4,format("\1GSolarflux Index     \1M: \1C%s",this.weather.solardata.solarflux));
		this.putxy(5,5,format("\1GA Index             \1M: \1C%s",this.weather.solardata.aindex));
		this.putxy(5,6,format("\1GK Index             \1M: \1C%s",this.weather.solardata.kindex));
		this.putxy(5,7,format("\1GX Ray               \1M: \1C%s",this.weather.solardata.xray));
		this.putxy(5,8,format("\1GSunspots            \1M: \1C%s",this.weather.solardata.sunspots));
		this.putxy(5,9,format("\1GHeliumline          \1M: \1C%s",this.weather.solardata.heliumline));
		this.putxy(5,10,format("\1GProtonflux          \1M: \1C%s",this.weather.solardata.protonflux));
		this.putxy(41,4,format("\1GElextronflux        \1M: \1C%s",this.weather.solardata.electonflux));
		this.putxy(41,5,format("\1GAurora              \1M: \1C%s",this.weather.solardata.aurora));
		this.putxy(41,6,format("\1GMagnetic Field      \1M: \1C%s",this.weather.solardata.magneticfield));
		this.putxy(41,7,format("\1GSolarwind           \1M: \1C%s",this.weather.solardata.solarwind));
		this.putxy(41,8,format("\1GGeo Mag. Field      \1M: \1C%s",this.weather.solardata.geomagfield));
		this.putxy(41,9,format("\1GSignalnoise         \1M: \1C%s",this.weather.solardata.signalnoise));
		this.putxy(41,10,format("\1GMUF                 \1M: \1C%s",this.weather.solardata.muffactor));


		// HF Conditions
		this.putxy(8,12,format("\1GHF Conditions"));
		this.putxy(6,14,format("\1WBands    Day   Night"));
		this.putxy(4,16,format("\1G80m - 40m"))
		this.putxy(15,16, this.setcolor(this.weather.solardata.calculatedconditions.band[0]));
		this.putxy(21,16, this.setcolor(this.weather.solardata.calculatedconditions.band[4]));
		this.putxy(4,17,format("\1G30m - 20m"))
		this.putxy(15,17, this.setcolor(this.weather.solardata.calculatedconditions.band[1]));
		this.putxy(21,17, this.setcolor(this.weather.solardata.calculatedconditions.band[5]));
		this.putxy(4,18,format("\1G17m - 15m"))
		this.putxy(15,18, this.setcolor(this.weather.solardata.calculatedconditions.band[2]));
		this.putxy(21,18, this.setcolor(this.weather.solardata.calculatedconditions.band[6]));
		this.putxy(4,19,format("\1G12m - 10m"))
		this.putxy(15,19, this.setcolor(this.weather.solardata.calculatedconditions.band[3]));
		this.putxy(21,19, this.setcolor(this.weather.solardata.calculatedconditions.band[7]));

		// VHF Conditions
		this.putxy(37,12,format("\1GVHF Conditions"));
		this.putxy(31,15,format("\1GAurora        \1M:"))
		this.putxy(31,16,format("\1GEurope        \1M:"))
		this.putxy(31,17,format("\1GNorth Amerika \1M:"))
		this.putxy(31,18,format("\1G6m Europe     \1M:"))
		this.putxy(31,19,format("\1G4m Europe     \1M:"))
		this.putxy(47,15, this.setcolor(this.weather.solardata.calculatedvhfconditions.phenomenon[0]));
		this.putxy(47,16, this.setcolor(this.weather.solardata.calculatedvhfconditions.phenomenon[1]));
		this.putxy(47,17, this.setcolor(this.weather.solardata.calculatedvhfconditions.phenomenon[2]));
		this.putxy(47,18, this.setcolor(this.weather.solardata.calculatedvhfconditions.phenomenon[3]));
		this.putxy(47,19, this.setcolor(this.weather.solardata.calculatedvhfconditions.phenomenon[4]));
	},

	putxy: function(x,y,msg) {
		console.gotoxy(x,y);
		console.putmsg(msg);
	},

	setcolor: function(value) {
		if (value == "Fair") {
			return format("\1Y%s",value);
		}

		if (value == "Good") {
			return format("\1G%s",value);
		}

		if (value == "Poor") {
			return format("\1R%s", value);
		}

		if (value == "Band Closed") {
			return format("\1R%s", value);
		}

		if (value == "Band Open") {
			return format("\1G%s",value);
		}

		if (value == "MID LAT AUR") {
			return format("\1G%s",value);
		}

		return value;
		
	},

	update: function() {
   		switch(this.key) {
       		case "r":
				this.refresh();
				break;
   		}       

	},

	refresh: function() {
		var res = new HTTPRequest().Get("http://www.hamqsl.com/solarxml.php");
		res = res.replace(/<\?.*?\?>[\r\n]*/mg,'');
		if (res) {
			this.weather = new XML(res);
			this.render();
		}
	},

	welcome: function() {
	},

	main: function() {
		while((userInput = console.inkey(K_NOECHO, 5)) != "q") {
			this.key = userInput;
			this.update();
		}
	}
});

