/*
*** Please do not remove this notes. ***
Simple Dictionary by Zofia Kreasi
June 9 2018
Created by Habibie (Zofia Kreasi)
habibieamrullah@gmail.com
http://zofiakreasi.com/
Support me by becoming my Patreon supporter: https://patreon.com/habibieamrullah
*/

//Credit note (Unless you are my supporter on Patreon, please do not modify this variable)
var credit = "PERHATIAN : Mungkin konten kamus ini tidak akurat. Gunakan aplikasi ini dengan risiko yang Anda tanggung sendiri.";

//Info notes to be displayed to users
var info = "<h2>Kamus Sederhana Indonesia-Inggris</h2><p>This dictionary app contains more than 3000 vocabularies. Please note that may be some definitons are not correct. Please use this app at your own risk.</p><p>Aplikasi kamus ini mencakup kurang lebih 3000 kosa kata Inggris Indonesia.</p><p>PERHATIAN : Mungkin konten kamus ini tidak akurat. Gunakan aplikasi ini dengan risiko yang Anda tanggung sendiri.</p>";

//General app info
var title = "K.S. Indonesia-Inggris";

//Share link
var shareLink = function(){
	return "https://play.google.com/store/apps/details?id=com.zofiakreasi.kamuskilatinggrisindonesia";
}

//Share text 
var shareText = function(){
	return "Kamus Kilat Inggris-Indonesia";
}

//When document is ready...
$(document).ready(function(){
	//Rename app's title
	$("title").html(title);
	$("#apptitle").html(title);
	
	resizeEl();
	putCredit();
	listWords('en', 'a');
	zk.showBanner();
});

//When user's window is resized...
$(window).resize(function() {
	resizeEl();
});

//FUNCTIONS

//listing words grouped based on its first letter. Replace "id" and "en" to anything you wish, in my case "id" = Indonesian and "en" = English.


function showDef(isen, idx){
	var transContent;
	if(isen){
		transContent = "<div style='border-radius: 0.5em; display: inline-block; background-color: white; padding: 1em;'><h5><img src='english.png' style='height: 24px; vertical-align: middle;'> English:</h5><h1>"+definitions[idx].en+"</h1><br><br><h5><img src='indonesian.png' style='height: 24px; vertical-align: middle;'> Bahasa Indonesia:</h5><h1>"+definitions[idx].id+"</h1></div>";
	}else{
		transContent = "<div style='border-radius: 0.5em; display: inline-block; background-color: white; padding: 1em;'><h5><img src='indonesian.png' style='height: 24px; vertical-align: middle;'> Bahasa Indonesia:</h5><h1>"+definitions[idx].id+"</h1><br><br><h5><img src='english.png' style='height: 24px; vertical-align: middle;'> English:</h5><h1>"+definitions[idx].en+"</h1></div>";
	}
	
	$("body").append("<div id='sdf' onclick='closeSdf();' style='position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.75); padding: 5em;'><div style='display: table; width: 100%; height: 100%;'><div style='display: table-cell; vertical-align: middle; text-align: center;'>"+transContent+"</div></div></div>");
}

function closeSdf(){
	$("#sdf").remove();
}


function listWords(lang, letter){
	$("#main").hide().html("<h2>Letter/Huruf \""+letter.toUpperCase()+"\"</h2>");
	
	//Loop based on current defined first letter
	var hasresult = false;
	for(var i = 0; i < definitions.length; i++){
		var curdef;
		if(lang === "en")
			curdef = definitions[i].en[0].toLowerCase();
		else
			curdef = definitions[i].id[0].toLowerCase();
		if(curdef === letter){
			if(lang === "en"){
				hasresult = true;
				$("#main").append("<div class='wlist' onclick='showDef(true, "+i+")'><b>" + definitions[i].en + "</b> : " + definitions[i].id + "</div>");
			}else{
				hasresult = true;
				$("#main").append("<div class='wlist' onclick='showDef(false, "+i+")'><b>" + definitions[i].id + "</b> : " + definitions[i].en + "</div>");
			}
		}
	}
	if(!hasresult){
		$("#main").append("<p style='color: #afafaf;'>Nothing found/Tidak ditemukan apapun.</p>");
	}else{
		sortWordList("main");
	}
	
	//Populate alphabet buttons
	$("#main").append("<div id='ll' style='text-align: center; margin: 10px;'></div>");
	for(var i = 65; i <= 90; i++){
		$("#ll").append("<div class='letterlist' onclick='listWords(\""+lang+"\", \""+String.fromCharCode(i).toLowerCase()+"\");'>" + String.fromCharCode(i) + "</div>");
	}
	
	$("#main").fadeIn().scrollTop(0);
	//if list is too long, show scroll to bottom button
	showScrollBottom();
	zk.showAd();
}

//Resizing elements to fit current screen
function resizeEl(){
	$("#drawer").css({ "top" : ($("#appbar").outerHeight()) + "px" });
	$("#main").css({ "height" : (innerHeight - 80 - 1 - $("#appbar").outerHeight()) + "px" });
}

//Toggling visibility of Navigation Drawer
function toggleDrawer(){
	$("#drawer").fadeToggle();
}

//Showing Quick Find page
function showQf(){
	var qf = "<h2>Quick Find/Cari Cepat</h2><input id='qf' onkeyup='qf()' placeholder='Type a word'><div id='sresult'></div>";
	$("#main").hide().html(qf).show();
	showScrollBottom();
}

//Showing info notes
function showInfo(){
	$("#main").hide().html(info).fadeIn();
	showScrollBottom();
}

//Puting credits note on this app
function putCredit(){
	$("#credits").html(credit);
}

//Quick find function
var qftimeout;
function qf(){
	var kwrd = $("#qf").val().toLowerCase();
	if(kwrd.length > 2){
		clearTimeout(qftimeout);
		$("#sresult").html("Searching...");
		qftimeout = setTimeout(function(){
			var sresult = "";
			for(var i = 0; i < definitions.length; i++){
				if(definitions[i].en.toLowerCase().indexOf(kwrd) > -1 || definitions[i].id.toLowerCase().indexOf(kwrd) > -1){
					sresult += "<div class='wlist'><b>" + definitions[i].en + "</b> : " + definitions[i].id + "</div>";
				}
			}
			$("#sresult").html(sresult);
			sortWordList("sresult");
			$("#qf").val("");
			zk.showAd();
		}, 1500);
	}
}

//Sorting word lists
function sortWordList(id){
	$(".wlist").sort(function(a, b) {
		if (a.textContent < b.textContent) {
			return -1;
		} else {
			return 1;
		}
	}).appendTo("#" + id);
}

//Showing scroll to bottom button
function showScrollBottom(){
	if($("#main")[0].scrollHeight > innerHeight)
		$("#scrollbtm").show();
	else
		$("#scrollbtm").hide();
}

//Scroll to bottom
function scrollToBottom(){
	$("#main").scrollTop($("#main")[0].scrollHeight);
}