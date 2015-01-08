function initialize3()
{

	var mapProp= {
		center:new google.maps.LatLng(centre_lat,centre_lng),
		zoom:11, 
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	var map=new google.maps.Map(document.getElementById("gMap3"),mapProp);
	map1=map;
	
	var mark=[],marker;
	
	var icons=["","marker_img/number_1.png","marker_img/number_2.png","marker_img/number_3.png","marker_img/number_4.png","marker_img/number_5.png","marker_img/number_6.png","marker_img/number_7.png","marker_img/number_8.png","marker_img/number_9.png"];
	
	var drawingManager = new google.maps.drawing.DrawingManager({
		//drawingMode: google.maps.drawing.OverlayType.MARKER,
		drawingControl: true,
		drawingControlOptions: {
		  position: google.maps.ControlPosition.TOP_CENTER,
		  drawingModes: [
			//google.maps.drawing.OverlayType.MARKER,
			google.maps.drawing.OverlayType.CIRCLE,
			google.maps.drawing.OverlayType.POLYGON,
			google.maps.drawing.OverlayType.POLYLINE,
			google.maps.drawing.OverlayType.RECTANGLE
		  ]
		},
		
		polygonOptions:{
			//editable:true,
			fillOpacity: .6,
				strokeColor: '#313131',
				strokeOpacity: 1,
				strokeWeight: 1
		}
		
	});
	drawingManager.setMap(map);
	
	for(var i=0;i<Lat.length;i++)
	{
		marker=new google.maps.Marker({
			position:new google.maps.LatLng(Lat[i],Lng[i]),
			id:getid(Lat[i].toFixed(6),Lng[i].toFixed(6)),
			lat:Lat[i],
			lng:Lng[i],
			grp:-1,
			fse_id:0,
			day:"Sun",
			typ:0,
			poly:0,
			icon:icons[0]
		});
		mark.push(marker);
		mark[i].setMap(map);
		
		/*google.maps.event.addListener(mark[i] ,'click', function(event){
			var eid=getid(event.latLng.lat().toFixed(6),event.latLng.lng().toFixed(6));
			for(var j=0;j<Lat.length;j++)
			{
				if(mark[j].id==eid)
				{
					document.getElementById("LatLng").innerHTML="Lat : " + markers[j].lat + "   Lng : " + markers[j].lng ;
				}
			}
		});*/
	}
	
	google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
		var poly=polygon;
		var num=0;
		for(var i=0;i<Lat.length;i++)
		{
			if(google.maps.geometry.poly.containsLocation(mark[i].getPosition(), poly))
			{
				num++;
				mark[i].grp=0;
				markers.push(mark[i]);
			}
		}
		//document.getElementById("selected").innerHTML="marker_img/number of selected outlets = " + num;
	});
	
}// initialise end

function opt3()
{
	document.getElementById("gMap").style.visibility="hidden";
	document.getElementById("sel_option").style.visibility="hidden";
	document.getElementById("gMap3").style.visibility="visible";
	initialize3();
	document.getElementById("form3").style.visibility="visible";
}