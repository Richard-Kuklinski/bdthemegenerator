function generateCode() {
  let params = {
      pcolor1: document.getElementById('colorPrimary1').value,
      pcolor1t: document.getElementById('colorPrimary1').value,
      textColor: document.getElementById('textColor').value,
      bgColor: document.getElementById('bgColor').value,
      links: document.getElementById('colorLinks').value,
      columns: document.getElementById('scmtNb').value,
      serverSize: document.getElementById('scmtSS').value
  }

  var code = "";

  code += ":root {\n";

  if(!params.pcolor1 == "" || params.pcolor1 == null) {
    code += `--colorBrand: ${params.pcolor1};\n`;
    if(params.pcolor1t.substring(0,1) == "#"){
      params.pcolor1t = hexToRgbA(params.pcolor1t);
    } else if(params.pcolor1t.substring(0,4) == "rgb(") {
      params.pcolor1t = params.pcolor1t.replace(")",",.15)");
      params.pcolor1t = params.pcolor1t.replace("rgb(","rgba(");
    }
    code += `--colorBrandTransparent: `+hexToRgbA(params.pcolor1)+`;\n`;
  }
  if(!params.bgColor == "" || params.bgColor == null) {
    code += `--bgColor05: `+ColorLuminance(params.bgColor, -0.35)+`;\n`;
    code += `--bgColor04: `+ColorLuminance(params.bgColor, -0.15)+`;\n`;
    code += `--bgColor03: ${params.bgColor};\n`;
    code += `--bgColor01: `+ColorLuminance(params.bgColor, 0.3)+`;\n`;
  }
  if(!params.textColor == "" || params.textColor == null) {
    code += `--ChatTextColor: `+ColorLuminance(params.textColor, 0.2)+`;\n`;
    code += `--ChannelsSelectedTextColor: `+ColorLuminance(params.textColor, 0.3)+`;\n`;
    code += `--ChannelsDefaultTextColor: ${params.textColor};\n`;
    code += `--ChannelsDarkTextColor: `+ColorLuminance(params.textColor, -0.3)+`;\n`;
    code += `--membersListTextsColor: `+ColorLuminance(params.textColor, -0.2)+`;\n`;
  }
  if(!(params.links == "" || params.links == null)) {
    code += `--links: ${params.links};\n`;
  }
  if(document.getElementById('scmt').checked) {
    if(!(params.columns == "" || params.columns == null)) {
      if(params.columns > 6) {params.columns = 6;}
      code += `--columns: ${params.columns};\n`;
    }
    if(!(params.serverSize == "" || params.serverSize == null)) {
      code += `--guildsize: ${params.serverSize};\n`;
    }
  }
  code += "}";

  return code;
}

function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',.15)';
    }
}
function ColorLuminance(hex, lum) {
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  lum = lum || 0;
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }

  return rgb;
}
async function updatePreview() {
  document.getElementById("preview").innerHTML = generateCode();
}

function changeValue(inputID, value) {
  document.getElementById(inputID).value = value;

  updatePreview();
}

function changePresetName() {
  document.getElementById('presetTitle').innerHTML = document.getElementById('presetName').value;
}

async function download() {
  var presetName = document.getElementById('themeName').value;

  if(presetName == "" || presetName == null){
    alert('Your theme is missing a name');
    return;
  } else {
    presetName = presetName.trim().replace(/ /gi, "_");
  }

  let code = `//META{"name":"${presetName}","description":"Generated by Spectra's Theme generator - Based on the Colorize Reborn Theme","author":"Spectra","version":"Auto Update"}*//\n`;
  code += '@import url("https://raw.githack.com/codedotspectra/themes/master/colorize/importCSS/colorize.css");\n';
  code += generateMiniThemes();

  code += generateCode();

  dlFile('text/css', code, `${presetName}.theme.css`);
}

function dlFile(mime, text, name) {
    const blob = new Blob([new Uint8Array(text.split('').map(b => b.charCodeAt(0)))], {type: mime});
    if(navigator.msSaveBlob) return navigator.msSaveBlob(blob);

    const a = Object.assign(document.createElement('a'), {
        download: name,
        href: URL.createObjectURL(blob),
        style: { display: 'none' }
    });

    document.body.appendChild(a).click();
    a.remove();
    URL.revokeObjectURL(a.href);
}

async function updateMiniThemes() {
  document.getElementById('miniThemes').innerHTML = generateMiniThemes();
}

function generateMiniThemes() {
  let mt = "";

  if(document.getElementById('scmt').checked) {
    mt += "@import url(https://mwittrien.github.io/BetterDiscordAddons/Themes/ServerColumns/ServerColumns.css);\n";
  }

  if(document.getElementById('ccl').checked){
    mt += "@import url('https://raw.githack.com/codedotspectra/themes/master/mini-themes/compactChannelsList.css');\n";
  }
  if(document.getElementById('cml').checked) {
    mt += "@import url('https://raw.githack.com/codedotspectra/themes/master/mini-themes/compactMemberList.css');\n";
  }

  if(document.getElementById('statusStyles').value == "rounded"){
    mt += "@import url('https://raw.githack.com/codedotspectra/themes/master/mini-themes/statusRounded.css');\n";
  } else if (document.getElementById('statusStyles').value == "squared") {
    mt += "@import url('https://raw.githack.com/codedotspectra/themes/master/mini-themes/statusSquared.css');\n";
  }

  return mt;
}

async function getBase64(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function mime(b64) {
    return b64.split(';')[0].split(':')[1];
}

async function verifyUrl(id) {
    let URL = document.getElementById(id).value;
    if(!(URL == "" || URL == null)){
      let urlEnd = URL.substring(URL.length-4, URL.length);
      if(!(urlEnd == ".jpg" || urlEnd == ".png" || urlEnd == ".gif" || urlEnd == "jpeg")){
        alert('-- invalid url --');
      } else {
        updatePreview();
      }
    }
}
async function verifyFile(id) {
    let file = await getBase64(document.getElementById(id).files[0]);
    if (mime(file).split('/')[0] != 'image') {
        alert('-- File is invalid --');
    } else {
        updatePreview();
    }
}


function selectImageMethod(id) {
  if(id == 'selectBImage') {
    if(document.getElementById(id).value == "url"){
      document.getElementById('bImageUrlInput').style.display = "block";
      document.getElementById('bImageFileInput').style.display = "none";
    } else {
      document.getElementById('bImageFileInput').style.display = "block";
      document.getElementById('bImageUrlInput').style.display = "none";
    }
  } else {
    if(document.getElementById(id).value == "url"){
      document.getElementById('hbImageUrlInput').style.display = "block";
      document.getElementById('hbImageFileInput').style.display = "none";
    } else {
      document.getElementById('hbImageFileInput').style.display = "block";
      document.getElementById('hbImageUrlInput').style.display = "none";
    }
  }
}
