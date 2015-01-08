var map2;

var fse,kro;
var kro_lat=[],kro_lng=[];
var ref_lat=[],ref_lng=[];
var mar=[],mar_kro=[];

var days,frq_kro,frq_oth;
var Days=["Sun","1st Mon","1st Tue","1st Wed","1st Thu","1st Fri","1st Sat","2nd Mon","2nd Tue","2nd Wed","2nd Thu","2nd Fri","2nd Sat"];

var icons2_1=["","marker_img/number_1.png","marker_img/number_2.png","marker_img/number_3.png","marker_img/number_4.png","marker_img/number_5.png","marker_img/number_6.png","marker_img/number_7.png","marker_img/number_8.png","marker_img/number_9.png"];

var icons2_2=[["","","",],
			["","marker_img/number_11.png","marker_img/number_12.png","marker_img/number_13.png","marker_img/number_14.png","marker_img/number_15.png","marker_img/number_15.png"],
			["","marker_img/number_21.png","marker_img/number_22.png","marker_img/number_23.png","marker_img/number_24.png","marker_img/number_25.png","marker_img/number_26.png"],
			["","marker_img/number_31.png","marker_img/number_32.png","marker_img/number_33.png","marker_img/number_34.png","marker_img/number_35.png","marker_img/number_36.png"],
			["","marker_img/number_41.png","marker_img/number_42.png","marker_img/number_43.png","marker_img/number_44.png","marker_img/number_45.png","marker_img/number_46.png"],
			["","marker_img/number_51.png","marker_img/number_52.png","marker_img/number_53.png","marker_img/number_54.png","marker_img/number_55.png","marker_img/number_56.png"],
			["","marker_img/number_61.png","marker_img/number_62.png","marker_img/number_63.png","marker_img/number_64.png","marker_img/number_65.png","marker_img/number_66.png"],
			["","marker_img/number_71.png","marker_img/number_72.png","marker_img/number_73.png","marker_img/number_74.png","marker_img/number_75.png","marker_img/number_76.png"],
			["","marker_img/number_81.png","marker_img/number_82.png","marker_img/number_83.png","marker_img/number_84.png","marker_img/number_85.png","marker_img/number_86.png"],
			["","marker_img/number_91.png","marker_img/number_92.png","marker_img/number_93.png","marker_img/number_94.png","marker_img/number_95.png","marker_img/number_96.png"]];

function initialize2()
{

	var mapProp= {
		center:new google.maps.LatLng(centre_lat,centre_lng),
		zoom:11, 
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	var map=new google.maps.Map(document.getElementById("gMap2"),mapProp);
	map2=map;
	
	for(var i=0;i<markers.length;i++)
	{
		markers[i].setMap(map);
		google.maps.event.addListener(markers[i] ,'click', function(event){
			var eid=getid(event.latLng.lat().toFixed(6),event.latLng.lng().toFixed(6));
			for(var j=0;j<markers.length;j++)
			{
				if(markers[j].id==eid)
				{
					document.getElementById("LatLng").innerHTML="Lat : " + markers[j].lat + "   Lng : " + markers[j].lng ;
					document.getElementById("fse").innerHTML="FSE ID : " + markers[j].grp;
					var btn=document.createElement("BUTTON");
					var t=document.createTextNode("CLICK ME");
					btn.appendChild(t);
					document.body.appendChild(btn);
					document.getElementById("day").innerHTML="Day of visit : " + markers[j].day;
				}
			}		
		});
	}
	
}// initialise end

function getid(lat,lng)
{
	return lat+" "+lng;
}

function without_kro()
{
	var temp=1,cal;
	var a,b,min,pos,count,max=0.001;
	var grps=[];
	
	//creating initial groups
	for(var i=0;i<markers.length;i++)
	{
		if(markers[i].grp==0)
		{
			markers[i].grp=temp;
			mar.push(markers[i]);
			a=markers[i].lat;
			b=markers[i].lng;
			min=1000000;
			count=1;
			pos=-1;
			for(var j=i+1;j<markers.length;j++)
			{
				if(markers[j].grp==0)
				{
					cal=(markers[j].lat-a)*(markers[j].lat-a)+(markers[j].lng-b)*(markers[j].lng-b);
					if(cal<min&&cal<=max)
					{
						pos=j;
						min=cal;
					}
				}
				if(j==markers.length-1)
				{
					if(pos!=-1)
					{
						markers[pos].grp=temp;
						mar.push(markers[pos]);
						a=(a*count)+markers[pos].lat;
						b=(b*count)+markers[pos].lng;
						count++;
						a/=count;
						b/=count;
						j=i;
						pos=-1;
						min=1000000;
					}
				}
			}
			temp++;
			ref_lat.push(a);
			ref_lng.push(b);
			grps.push(1);
		}
	}
	//display();
	//no. of groups is more than no. of fse
	if(fse<ref_lat.length)
	{
		while(ref_lat.length!=fse)
		{
			min=1000000;
			for(var i=0;i<ref_lat.length;i++)
			{
				for(var j=i+1;j<ref_lat.length;j++)
				{
					dist=(ref_lat[i]-ref_lat[j])*(ref_lat[i]-ref_lat[j])+(ref_lng[i]-ref_lng[j])*(ref_lng[i]-ref_lng[j]);
					if(dist<min)
					{
						min=dist;
						a=i;
						b=j;
					}
				}
			}
			
			for(var i=0;i<mar.length;i++)
			{
				
				if(mar[i].grp==(b+1))
				{
					mar[i].grp=a+1;
				}
				if(mar[i].grp>(b+1))
				{
					mar[i].grp--;
				}
			}
			ref_lat[a]=(ref_lat[a]*grps[a]+ref_lat[b]*grps[b])/(grps[a]+grps[b]);
			ref_lng[a]=(ref_lng[a]*grps[a]+ref_lng[b]*grps[b])/(grps[a]+grps[b]);
			grps[a]+=grps[b];
			for(var i=b;i<ref_lat.length;i++)
			{
				ref_lat[i]=ref_lat[i+1];
				ref_lng[i]=ref_lng[i+1];
				grps[i]=grps[i+1];
			}
			ref_lat.length--;
			ref_lng.length--;
			grps.length--;
		}
	}
	//no. of groups is less than no. of fse
	else
	{
	}
	for(var i=0;i<mar.length;i++)
		{
			mar[i].icon=icons2_1[mar[i].grp];
		}
	display();
	
}


function with_kro()
{
	mark_kro();
	var m=new Array(kro_lat.length);
	for(var k=0;k<kro_lat.length;k++)
	{
		ref_lat.push(kro_lat[k]);
		ref_lng.push(kro_lng[k]);
		m[k]=new Array();
	}
	
	var dist,min,pos;
	var grps=[];
	//creating initial groups around KROs
	for(var i=0;i<markers.length;i++)
	{
		min=1000000;
			for(var j=0;j<kro_lat.length;j++)
			{
				dist=(markers[i].lat-kro_lat[j])*(markers[i].lat-kro_lat[j])+(markers[i].lng-kro_lng[j])*(markers[i].lng-kro_lng[j]);
				if(dist<min)
				{
					min=dist;
					pos=j;
				}
			}
			markers[i].grp=(pos+1);
			m[pos].push(markers[i]);
	}
	for(var i=0;i<kro_lat.length;i++)
	{
		for(var j=0;j<m[i].length;j++)
		{
			mar.push(m[i][j]);
		}
	}
	//display();
	var a=0,b=0;
	
	//no. of KROs is more than no. of fse
	if(fse<ref_lat.length)
	{
		while(ref_lat.length!=fse)
		{
			min=1000000;
			for(var i=0;i<ref_lat.length;i++)
			{
				for(var j=i+1;j<ref_lat.length;j++)
				{
					dist=(ref_lat[i]-ref_lat[j])*(ref_lat[i]-ref_lat[j])+(ref_lng[i]-ref_lng[j])*(ref_lng[i]-ref_lng[j]);
					if(dist<min)
					{
						min=dist;
						a=i;
						b=j;
					}
				}
			}
			
			for(var i=0;i<mar.length;i++)
			{
				
				if(mar[i].grp==(b+1))
				{
					mar[i].grp=a+1;
				}
				if(mar[i].grp>(b+1))
				{
					mar[i].grp--;
				}
			}
			ref_lat[a]=(ref_lat[a]*grps[a]+ref_lat[b]*grps[b])/(grps[a]+grps[b]);
			ref_lng[a]=(ref_lng[a]*grps[a]+ref_lng[b]*grps[b])/(grps[a]+grps[b]);
			grps[a]+=grps[b];
			for(var i=b;i<ref_lat.length;i++)
			{
				ref_lat[i]=ref_lat[i+1];
				ref_lng[i]=ref_lng[i+1];
				grps[i]=grps[i+1];
			}
			ref_lat.length--;
			ref_lng.length--;
			grps.length--;
		}
	}
	//no. of KROs is less than no. of fse
	else
	{
	}
	
	for(var i=0;i<mar.length;i++)
		{
			mar[i].icon=icons2_1[mar[i].grp];
		}
	
	display();
}

function display()
{
	
	for(var i=0;i<markers.length;i++)
	{
		markers[i].setMap(null);
	}
	if(kro.checked==true)
	{
		for(var i=0;i<mar_kro.length;i++)
		{
			mar_kro[i].icon=icons2_1[mar_kro[i].grp];
			mar_kro[i].setMap(map1);
			
			google.maps.event.addListener(mar_kro[i] ,'click', function(event){
			var eid=getid(event.latLng.lat().toFixed(6),event.latLng.lng().toFixed(6));
			for(var j=0;j<mar_kro.length;j++)
			{
				if(mar_kro[j].id==eid)
				{
					document.getElementById("LatLng").innerHTML="Lat : " + mar_kro[j].lat + "   Lng : " + mar_kro[j].lng ;
					document.getElementById("fse").innerHTML="FSE ID : " + mar_kro[j].grp;
					document.getElementById("day").innerHTML="Day of visit : " + mar_kro[j].day;
				}
			}
		});
		}
	}
	console.log(mar.length);
	for(var i=0;i<mar.length;i++)
	{
		//mar[i].icon=icons[mar[i].grp];
		mar[i].setMap(map2);
		
		/*google.maps.event.addListener(markers[i] ,'click', function(event){
			var eid=getid(event.latLng.lat().toFixed(6),event.latLng.lng().toFixed(6));
			for(var j=0;j<Lat.length;j++)
			{
				if(markers[j].id==eid)
				{
					document.getElementById("LatLng").innerHTML="Lat : " + markers[j].lat + "   Lng : " + markers[j].lng ;
					document.getElementById("fse").innerHTML="FSE ID : " + markers[j].grp;
					document.getElementById("day").innerHTML="Day of visit : " + markers[j].day;
				}
			}
		});*/
	}
}

//mark the markers representing kros
function mark_kro()
{
	for(var i=0;i<kro_lat.length;i++)
	{
		for(var j=0;j<markers.length;j++)
		{
			if(markers[j].lat==kro_lat[i]&&markers[j].lng==kro_lng[i])
			{
				markers[j].typ=1;
				markers[j].grp=i+1;
				mar_kro.push(markers[j]);
				markers[j].setMap(null);
				markers.splice(j,1);
				break;
			}
		}
	}
}

//assigning days to outlets
function freq_distr()
{
	var fr_kro="",fr_oth="";
	if(kro.checked==true)
	{
		for(var i=1;i<frq_kro;i++)
		{
			fr_kro+=Days[i]+",";
		}
		fr_kro+=Days[frq_kro];
	}
	for(var i=0;i<mar_kro.length;i++)
	{
		mar_kro[i].day=fr_kro;
	}
	
	
	var limit=new Array(fse+1);
	for(var i=1;i<=fse;i++)
	{
		limit[i]=0;
	}
	for(var i=0;i<mar.length;i++)
	{
		if(mar[i].typ==0)
		{
			limit[mar[i].grp]++;
		}
	}
	for(var i=1;i<=fse;i++)
	{
		limit[i]=Math.round(limit[i]/frq_oth)+1;
	}
	
	var count=new Array(fse+1);
	for(var i=1;i<=fse;i++)
	{
		count[i]=0;
	}
	for(var i=0;i<mar.length;i++)
	{
		if(mar[i].typ==0)
		{
			count[mar[i].grp]++;
			mar[i].day=Days[Math.round((count[mar[i].grp]/limit[mar[i].grp])+0.499)];
			mar[i].icon=icons2_2[mar[i].grp][Math.round((count[mar[i].grp]/limit[mar[i].grp])+0.499)];
		}
	}
	display();
}


function reset_form2_1() {

    document.getElementById("form2_1").reset();
	document.getElementById("form2_2").style.visibility="hidden";
	document.getElementById("ent_lat").style.visibility="hidden";
	document.getElementById("ent_lng").style.visibility="hidden";
}

function submit_form2_1() {
    
	 var x = document.getElementById("form2_1");
	 fse=x.elements[0].value;
	 kro=document.getElementById("kro");
	 if(kro.checked==true)
	 {
		document.getElementById("form2_2").style.visibility="visible";
	 }
	 else
	 {
		without_kro();
		document.getElementById("form2_1").style.visibility="hidden";
		document.getElementById("form2_2").style.visibility="hidden";
		document.getElementById("form2_3").style.visibility="visible";
	 }
}

function addMoreKro() {
	
	document.getElementById("ent_lat").style.visibility="hidden";
	document.getElementById("ent_lng").style.visibility="hidden";
    var x = document.getElementById("form2_2");
	if(x.elements[0].value=="")
	{
		document.getElementById("ent_lat").style.visibility="visible";
	}
	else if(x.elements[1].value=="")
	{
		document.getElementById("ent_lng").style.visibility="visible";
	}
	else
	{
		kro_lat.push(x.elements[0].value);
		kro_lng.push(x.elements[1].value);
		document.getElementById("form2_2").reset();
	}
}

function done2_1() {
	document.getElementById("ent_lat").style.visibility="hidden";
	document.getElementById("ent_lng").style.visibility="hidden";
    var x = document.getElementById("form2_2");
	if(x.elements[0].value=="")
	{
		document.getElementById("ent_lat").style.visibility="visible";
	}
	else if(x.elements[1].value=="")
	{
		document.getElementById("ent_lng").style.visibility="visible";
	}
	else
	{
		kro_lat.push(x.elements[0].value);
		kro_lng.push(x.elements[1].value);
		document.getElementById("form2_1").style.visibility="hidden";
		document.getElementById("form2_2").style.visibility="hidden";
		document.getElementById("form2_3").style.visibility="visible";
		document.getElementById("frq").style.visibility="visible";
		with_kro();
	}	
}

function done2_2()
{
	var x = document.getElementById("form2_3");
	days=x.elements[0].value;
	frq_kro=x.elements[2].value;
	frq_oth=x.elements[1].value;
	freq_distr();
}

function opt2()
{
	document.getElementById("gMap").style.visibility="hidden";
	document.getElementById("sel_option").style.visibility="hidden";
	document.getElementById("gMap2").style.visibility="visible";
	initialize2();
	document.getElementById("form2").style.visibility="visible";
	document.getElementById("form2_1").style.visibility="visible";
}