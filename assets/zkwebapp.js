/*
zkwebapp.js version 1.0.0 (April 17th 2018)

zk.platform = 0 for Android, 1 for iOS, 2 for web
zk.isAndroid = check is Android interface is ready
zk.shareText = Text to share on social media
zk.iShare = iOS link to share
zk.aShare = Android link to share
zk.wShare = Web link to share
zk.shareLink() = returning appropriate share link
zk.showAd() = showing interstitial ad
zk.vibrate() = vibrate
zk.blankIt() = show no net notification and restart the app
*/

var zk = {
	platform : 0,
	shareText : "نهج البلاغة",
	iShare : "https://itunes.apple.com/us/app/nahjul-balaghah/id1332446820",
	aShare : "https://play.google.com/store/apps/details?id=com.applulbayt.nahjulbalaghaarabic",
	wShare : "http://applulbayt.blogspot.com",
	adWait : 15,
};

zk.shareLink = function(){
	switch (zk.platform){
		case 0 :
			return zk.aShare;
			break;
		case 1 :
			return zk.aShare;
			break;
		case 2 :
			return zk.wShare;
			break;
	}
};

var Android;
var adAllowed = false;
var adTimer;
adTimer = setInterval(function(){
	adAllowed = true;
}, zk.adWait * 1000 );

zk.isAndroid = function(){
	if(Android != undefined){
		return true;
	}else{
		return false;
	}
};

zk.showAd = function(){
	if(zk.platform == 0){
		if(zk.isAndroid()){
			if(adAllowed){
				Android.showAd();
				adAllowed = false;
			}
		}
	}else if(zk.platform == 1){
		if(adAllowed){
			window.location = "showad://true";
			adAllowed = false;
		}
	}
};

zk.vibrate = function(){
	if(zk.platform == 0){
		if(zk.isAndroid()){
			if(adAllowed){
				Android.vibrate();
			}
		}
	}
};

zk.showBanner = function(){
	if(zk.platform == 0){
		if(zk.isAndroid()){
			Android.showBanner();
		}
    }else if(zk.platform == 1){
        window.location = "showbanner://true";
    }
};

zk.hideBanner = function(){
	if(zk.platform == 0){
		if(zk.isAndroid()){
			Android.hideBanner();
		}
    }else if(zk.platform == 1){
        window.location = "hidebanner://true";
    }
};

zk.blankIt = function(){
	document.getElementsByTagName("body")[0].innerHTML = "<div style='text-align: center; background-color: white; border-radius: 10px; padding: 10px; margin: 20px;'><h1>No internet!</h1><p>Connection needed.</p><button onclick='window.location = \"index.html\"' style='background-color: white; border: 1px solid black; border-radius: 10px; padding: 10px;'>Refresh</button></div>";
}
