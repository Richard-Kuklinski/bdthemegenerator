function checkBrowser() {
  let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  let isFirefox = typeof InstallTrigger !== 'undefined';
  let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
  let isIE = /*@cc_on!@*/false || !!document.documentMode;
  let isEdge = !isIE && !!window.StyleMedia;
  let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  let isBlink = (isChrome || isOpera) && !!window.CSS;

  if(isEdge) {
    alert("Your browser does not support this tool correctly, however, if you realy want to user this browser, you'll have to rename the downloaded file to : name.theme.css");
    return;
  }
  if(isIE) {
    alert("Your browser does not support this tool correctly, please use another browser like : Chrome, Firefox, Brave, Safari, Opera, etc..");
    return;
  }
  if(!isFirefox && !isChrome && !isSafari && !isOpera && !isBlink) {
    alert('Your browser may not support this tool correctly, if you have problems downloading the file, please use another browser like : Chrome, Firefox, Brave, Safari, Opera, etc..');
    return;
  }
}

function loadThemeVars(vars) {

}

function getThemeVars (css) {
  let vars = css.split(":root");
  if (vars.length > 1) {
    vars = vars[1].replace(/\t| {2,}/g,"").replace(/\n\/\*.*?\*\//g,"").replace(/[\n\r]/g,"");
    vars = vars.split("{");
    vars.shift();
    vars = vars.join("{").replace(/\s*(:|;|--|\*)\s*/g,"$1");
    vars = vars.split("}")[0];
    return console.log(vars.slice(2).split(/;--|\*\/--/));
  }
  return [];
}

function readFile(value) {
  if (value) {
      var reader = new FileReader();
      reader.readAsText(value, "UTF-8");
      reader.onload = function (evt) {
        let vars = getThemeVars(evt.target.result);
        for(var i = 0;i<vars.length;i++) {
          console.log(vars[i].split(":"));
        }
      }
      reader.onerror = function (evt) {return;}
  }
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

// Name input verification
function testName() {
  let btn = document.getElementById("downloadBtn");
  let input = document.getElementById("themeName");
  let inputError = document.getElementById("themeNameError");
  if(input.value != "") {
    if(/^[a-zA-Z0-9\s]+$/.test(input.value)) {
      inputError.innerHTML = "";
      btn.removeAttribute("disabled");
    } else {
      inputError.innerHTML = "Name can only contain letters & numbers";
      btn.setAttribute("disabled", "true");
    }
  } else {
    inputError.innerHTML = "You must enter a name";
    btn.setAttribute("disabled", "true");
  }
}

// Menu tab switch
var currentTab = "main";

function switchTab(newTab) {
  document.getElementById(currentTab).style.transform = "translateX(-100%)";
  document.getElementById(newTab).style.transform = "translateX(0)";
  currentTab = newTab;
}
