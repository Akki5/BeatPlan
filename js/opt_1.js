
var fse1="",day1="";
function initialize1()
{

	var mapProp= {
		center:new google.maps.LatLng(centre_lat,centre_lng),
		zoom:11, 
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	var map=new google.maps.Map(document.getElementById("gMap1"),mapProp);
	
	var icons1=["","marker_img/number_1.png","marker_img/number_2.png","marker_img/number_3.png","marker_img/number_4.png","marker_img/number_5.png","marker_img/number_6.png","marker_img/number_7.png","marker_img/number_8.png","marker_img/number_9.png"];
	var icons1_2=[["","","",],
			["","marker_img/number_11.png","marker_img/number_12.png","marker_img/number_13.png","marker_img/number_14.png","marker_img/number_15.png","marker_img/number_15.png"],
			["","marker_img/number_21.png","marker_img/number_22.png","marker_img/number_23.png","marker_img/number_24.png","marker_img/number_25.png","marker_img/number_26.png"],
			["","marker_img/number_31.png","marker_img/number_32.png","marker_img/number_33.png","marker_img/number_34.png","marker_img/number_35.png","marker_img/number_36.png"],
			["","marker_img/number_41.png","marker_img/number_42.png","marker_img/number_43.png","marker_img/number_44.png","marker_img/number_45.png","marker_img/number_46.png"],
			["","marker_img/number_51.png","marker_img/number_52.png","marker_img/number_53.png","marker_img/number_54.png","marker_img/number_55.png","marker_img/number_56.png"],
			["","marker_img/number_61.png","marker_img/number_62.png","marker_img/number_63.png","marker_img/number_64.png","marker_img/number_65.png","marker_img/number_66.png"]];
			
	var latlng1=new Array(100);
	var dist1=new Array(100);
	for(var i=1;i<100;i++)
	{
		latlng1[i]=new Array(15);
		dist1[i]=new Array(15);
		for(var j=1;j<15;j++)
		{
			latlng1[i][j]=0;
			dist1[i][j]=0;
		}
	}
	
	for(var i=0;i<markers.length;i++)
	{
		markers[i].setMap(map);
		google.maps.event.addListener(markers[i] ,'click', function(event){
			var eid=getid(event.latLng.lat().toFixed(6),event.latLng.lng().toFixed(6));
			for(var j=0;j<markers.length;j++)
			{
				if(markers[j].id==eid)
				{
					markers[j].setMap(null);
					if(markers[j].tick==0&&fse1!=""&&day1!="")
					{
						markers[j].icon=icons1_2[fse1][day1];
						markers[j].tick=1;
						if(latlng1[fse1][day1]==0)
						{
							latlng1[fse1][day1]=new google.maps.LatLng(markers[j].lat,markers[j].lng);
							document.getElementById("dist1_1").innerHTML="";
						}
						else
						{
							dist1[fse1][day1]+=google.maps.geometry.spherical.computeDistanceBetween(latlng1[fse1][day1],new google.maps.LatLng(markers[j].lat,markers[j].lng));
							latlng1[fse1][day1]=new google.maps.LatLng(markers[j].lat,markers[j].lng);
							document.getElementById("dist1_1").innerHTML="Total distance of FSE: " + fse1 + " for DAY: " + day1 + " is = " + dist1[fse1][day1];
						}
					}
					else
					{
						if(fse1=="" || day1=="")
						{
							break;
						}
						
						markers[j].icon=icons1[0];
						markers[j].tick=0;
						/*if(latlng1[fse1][day1]==0)
						{
						}*/
					}
					markers[j].setMap(map);
					break;
				}
			}		
		});
	}
	
}// initialise end

function getid(lat,lng)
{
	return lat+" "+lng;
}

function done1_1()
{
	fse1=(document.getElementById("form1_1")).elements[0].value;
	day1=(document.getElementById("form1_1")).elements[1].value;
}

function opt1()
{
	document.getElementById("gMap").style.visibility="hidden";
	document.getElementById("sel_option").style.visibility="hidden";
	document.getElementById("gMap1").style.visibility="visible";
	initialize1();
	document.getElementById("form1").style.visibility="visible";
}