import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import '../App.css';
var L = window.L;
var d3 = window.d3;
var google = window.google;

const styles = theme => ({
	map: {
		width: '100%',
		height: '100%',
	},
	red: {
		backgroundColor: 'red',
	},
	green: {
		backgroundColor: 'green',
	},
	orange: {
		backgroundColor: 'orange',
	}
});

var data = {};

class PollutionToday extends Component {
  state = { mapObj: null, latitude: null, longitude: null };

  generateHexLayer = () => {
  	var center = [28.4880472, 77.0653845];
  	var options = {
    	opacity: 0.5,
	};
  	var hexLayer = L.hexbinLayer(options).addTo(this.state.mapObj);
	hexLayer.colorScale().range(['white', 'red']);

	hexLayer
  		.radiusRange([12, 12])
		.lng(function(d) { return d[0]; })
  		.lat(function(d) { return d[1]; })
  		.colorValue(function(d) { data[`${d[0].o[0] + d[0].o[0]}`] = d.length;return d.length; })
  		.radiusValue(function(d) { return d.length; });
  	console.log(data);

	var latFn = d3.randomNormal(center[0], 0.01);
	var longFn = d3.randomNormal(center[1], 0.01);

	var generateData = function(){
    	var data1 = [];
    	for(let i=0; i<2000; i++){
        	data1.push([longFn(),  latFn()]);
    	}
    	hexLayer.data(data1);
  	}
  	generateData()
  }

  renderMap = () => {
  	const { classes } = this.props;
  	var mymap = L.map('mapid').setView([28.4880472, 77.0653845], 14);
  	mymap.options.maxZoom = 15;
  	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(mymap);
  	this.setState({ mapObj: mymap }, () => {
	  	this.generateHexLayer();
	  	mymap.locate({ setView: true }).on('locationfound', (e) => {
			this.setState({mapObj: mymap, latitude: e.latitude, longitude: e.longitude});
		});
	});	

	var control = L.Routing.control({
        waypoints: [
    		L.latLng(28.491103, 77.074064),
      		L.latLng(28.509287, 77.041536)
    	],
    	routeWhileDragging: false,
        reverseWaypoints: false,
        useZoomParameter: false,
        showAlternatives: true, 
        fitSelectedRoutes : false,
        addWaypoints: false,
		lineOptions: {
      		styles:[{color: 'black', opacity: 0.15, weight: 9}, {color: 'white', opacity: 0.8, weight: 6}, {color: 'black', opacity: 1, weight: 2}]
   		},
  		router: new L.Routing.openrouteservice('5b3ce3597851110001cf6248743d80055d31444d9775c6497f715bc8',
  			{showAlternativeRoutes: true}),
	})
	.on('routesfound', function(e) {
        var routes = e.routes;
        var elems = document.getElementsByClassName('leaflet-popup-close-button')
        for (let i = 0; i < elems.length; i++) {
        	elems[i].click();
        }
        let p = [];
        for (let i = 20; i < 100; i += ([1, 3, 5][Math.floor(Math.random() * 3)]))
        	p.push(i);
        routes.forEach(route => {
        	let n = 0, t = 0;
        	route.coordinates.forEach(coord => {
        		t += p[Math.floor(Math.random() * p.length)];
        		n += 1;
        	});
        	let perc = parseInt(t / n, 10);
        	perc += [10, -10][Math.floor(Math.random() * 2)]
        	let classn = null;
        	if (perc < 26) {
        		classn = classes.red;
        	}
        	else if (perc < 61) {
        		classn = classes.orange;
        	}
        	else {
        		classn = classes.green;
        	}
			var popup = L.popup({ closeButton: true, closeOnClick: false, autoClose: false, className: classn })
			    .setLatLng(route.coordinates[parseInt(route.coordinates.length / 2, 10)])
			    .setContent(`${perc}%`)
			    .openOn(mymap);
        });
    })
	.addTo(mymap);

	function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

	mymap.on('click', function(e) {
	    var container = L.DomUtil.create('div'),
	        startBtn = createButton('Start from this location', container),
	        destBtn = createButton('Go to this location', container);

	    L.popup()
	        .setContent(container)
	        .setLatLng(e.latlng)
	        .openOn(mymap);

		L.DomEvent.on(startBtn, 'click', function() {
	        control.spliceWaypoints(0, 1, e.latlng);
	        mymap.closePopup();
	    });
	    L.DomEvent.on(destBtn, 'click', function() {
	        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
	        mymap.closePopup();
	    });
	});


  }

  componentDidMount() {
  	this.renderMap();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.map}>
      	<div id="mapid" className={classes.map}></div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PollutionToday);
