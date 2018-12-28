function generateCode(background, homebutton) {
  let font = document.getElementById('customFont').value;

  let params = {
      bgimage: background,
      hbimage: homebutton,
      brightness: document.getElementById('brightness').value,
      font: font.trim(),
      pcolor1: document.getElementById('colorPrimary1').value,
      pcolor1t: document.getElementById('colorPrimary1').value,
      pcolor2: document.getElementById('colorPrimary2').value,
      danger: document.getElementById('colorDanger1').value,
      warning: document.getElementById('colorWarning1').value,
      success: document.getElementById('colorSucces1').value,
      info: document.getElementById('colorInfo1').value,
      danger2: document.getElementById('colorDanger2').value,
      warning2: document.getElementById('colorWarning2').value,
      success2: document.getElementById('colorSucces2').value,
      info2: document.getElementById('colorInfo2').value,
      links: document.getElementById('colorLinks').value,
      chat: document.getElementById('chatTextColor').value,
      playing: document.getElementById('userPlayingColor').value,
      role: document.getElementById('roleTitleColor').value,
      selected: document.getElementById('channelSelectedColor').value,
      defaultchat: document.getElementById('channelDefaultColor').value,
      dark: document.getElementById('channelDarkColor').value,
      bg1: document.getElementById('NTBackgroundColor01').value,
      bg2: document.getElementById('NTBackgroundColor02').value,
      bg3: document.getElementById('NTBackgroundColor03').value,
      bg4: document.getElementById('NTBackgroundColor04').value,
  }

  var code = "";

  if(!(params.font == "" || params.font == null)){
    let importFont = params.font.replace(/ /gi, '+');
    code += `@import url('https://fonts.googleapis.com/css?family=${importFont}');\n`;
  }

  code += ":root {\n";

  if(!(params.bgimage == "" || params.bgimage == null)) {
    code += `--bgImage: url('${params.bgimage}');\n`;
  }
  if(!(params.hbimage == "" || params.hbimage == null)) {
    code += `--HomeButtonImg: url('${params.hbimage}');\n`;
  }
  if(!(params.brightness == "" || params.brightness == null)) {
    code += `--brightness: ${params.brightness};\n`;
  }
  if(!(params.font == "" || params.font == null)) {
    code += `--customFont: '${params.font}';\n`;
  }
  if(!(params.pcolor1 == "" || params.pcolor1 == null)) {
    code += `--PrimaryColor01: ${params.pcolor1};\n`;
  }
  if(!(params.pcolor1t == "" || params.pcolor1t == null)) {
    if(params.pcolor1t.substring(0,1) == "#"){
      params.pcolor1t = hexToRgbA(params.pcolor1t);
    } else if(params.pcolor1t.substring(0,4) == "rgb(") {
      params.pcolor1t = params.pcolor1t.replace(")",",.15)");
      params.pcolor1t = params.pcolor1t.replace("rgb(","rgba(");
    }
    code += `--PrimaryColorRGBA: ${params.pcolor1t};\n`;
  }
  if(!(params.pcolor2 == "" || params.pcolor2 == null)) {
    code += `--PrimaryColor02: ${params.pcolor2};\n`;
  }
  if(!(params.danger == "" || params.danger == null)) {
    code += `--DangerColor: ${params.danger};\n`;
  }
  if(!(params.warning == "" || params.warning == null)) {
    code += `--WarningColor: ${params.warning};\n`;
  }
  if(!(params.success == "" || params.success == null)) {
    code += `--SuccesColor: ${params.success};\n`;
  }
  if(!(params.info == "" || params.info == null)) {
    code += `--InfoColor: ${params.info};\n`;
  }
  if(!(params.danger2 == "" || params.danger2 == null)) {
    code += `--DangerColor02: ${params.danger2};\n`;
  }
  if(!(params.warning2 == "" || params.warning2 == null)) {
    code += `--WarningColor02: ${params.warning2};\n`;
  }
  if(!(params.success2 == "" || params.success2 == null)) {
    code += `--SuccesColor02: ${params.success2};\n`;
  }
  if(!(params.info2 == "" || params.info2 == null)) {
    code += `--InfoColor02: ${params.info2};\n`;
  }
  if(!(params.links == "" || params.links == null)) {
    code += `--links: ${params.links};\n`;
  }
  if(!(params.chat == "" || params.chat == null)) {
    code += `--ChatTextColor: ${params.chat};\n`;
  }
  if(!(params.role == "" || params.role == null)) {
    code += `--RoleTitleColor: ${params.role};\n`;
  }
  if(!(params.playing == "" || params.playing == null)) {
    code += `--UserPlayingTextColor: ${params.playing};\n`;
  }
  if(!(params.selected == "" || params.selected == null)) {
    code += `--ChannelsSelectedTextColor: ${params.selected};\n`;
  }
  if(!(params.defaultchat == "" || params.defaultchat == null)) {
    code += `--ChannelsDefaultTextColor: ${params.defaultchat};\n`;
  }
  if(!(params.dark == "" || params.dark == null)) {
    code += `--ChannelsDarkTextColor: ${params.dark};\n`;
  }
  if(!(params.bg1 == "" || params.bg1 == null)) {
    code += `--NTBackgroundColor01: ${params.bg1};\n`;
  }
  if(!(params.bg2 == "" || params.bg2 == null)) {
    code += `--NTBackgroundColor02: ${params.bg2};\n`;
  }
  if(!(params.bg3 == "" || params.bg3 == null)) {
    code += `--NTBackgroundColor03: ${params.bg3};\n`;
  }
  if(!(params.bg4 == "" || params.bg4 == null)) {
    code += `--NTBackgroundColor04: ${params.bg4};\n`;
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

async function updatePreview() {
  let background;
  if (document.getElementById('selectBImage').value == "file") {
      background = await getBase64(document.getElementById('bFile').files[0]);
  } else {background = document.getElementById('bURL').value;}

  let hbBackground;
  if (document.getElementById('selectHbImage').value == "file") {
      hbBackground = await getBase64(document.getElementById('hbFile').files[0]);
  } else {hbBackground = document.getElementById('hbURL').value;}

  document.getElementById("preview").innerHTML = generateCode(background, hbBackground);
}

function changeValue(inputID, value) {
  document.getElementById(inputID).value = value;

  updatePreview();
}

function changePresetName() {
  document.getElementById('presetTitle').innerHTML = document.getElementById('presetName').value;
}

async function download() {
  var presetName = document.getElementById('presetName').value;

  if(presetName == "" || presetName == null){
    alert('Your theme is missing a name');
    return;
  } else {
    presetName = presetName.trim().replace(/ /gi, "_");
  }

  let code = `//META{"name":"${presetName}","description":"Generated by Spectra's Theme generator - Based on the Neutron X Theme","author":"Spectra","version":"6.0"}*//\n`;
  code += '@import url("https://raw.githack.com/codedotspectra/themes/master/neutron/importCSS/xcore.css");\n';
  code += generateMiniThemes();

  let background;
  if (document.getElementById('selectBImage').value == "file") {
      background = await getBase64(document.getElementById('bFile').files[0]);
  } else {background = document.getElementById('bURL').value;}

  let hbBackground;
  if (document.getElementById('selectHbImage').value == "file") {
      hbBackground = await getBase64(document.getElementById('hbFile').files[0]);
  } else {hbBackground = document.getElementById('hbURL').value;}

  code += generateCode(background, hbBackground);

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

  if(document.getElementById('dstb').checked){
    mt += "@import url('https://raw.githack.com/codedotspectra/themes/master/mini-themes/normalSizeTopBar.css');\n";
  }

  if(document.getElementById('dss').checked){
    mt += "@import url('https://raw.githack.com/codedotspectra/themes/master/mini-themes/normalSizeGuildIcons.css');\n";
    if(document.getElementById('radioGrid2').checked){
      mt += "@import url('https://raw.githack.com/codedotspectra/themes/master/mini-themes/serverGrid2ColumnsNormal.css');\n";
    } else if(document.getElementById('radioGrid3').checked) {
      mt += "@import url('https://raw.githack.com/codedotspectra/themes/master/mini-themes/serverGrid3ColumnsNormal.css');\n";
    }
  } else {
    if(document.getElementById('radioGrid2').checked){
      mt += "@import url('https://raw.githack.com/codedotspectra/themes/master/mini-themes/serverGrid2Columns.css');\n";
    } else if(document.getElementById('radioGrid3').checked) {
      mt += "@import url('https://raw.githack.com/codedotspectra/themes/master/mini-themes/serverGrid3Columns.css');\n";
    }
  }

  if(document.getElementById('ccl').checked){
    mt += "@import url('https://raw.githack.com/codedotspectra/themes/master/mini-themes/compactChannelsList.css');\n";
  }
  if(document.getElementById('cml').checked) {
    mt += "@import url('https://raw.githack.com/codedotspectra/themes/master/mini-themes/compactMemberList.css');\n";
  }

  if(document.getElementById('stb').checked) {
    mt += "@import url('https://raw.githack.com/codedotspectra/themes/master/mini-themes/seeThroughBackground.css');\n";
  }

  if(document.getElementById('statusStyles').value == "rounded"){
    mt += "@import url('https://raw.githack.com/codedotspectra/themes/master/mini-themes/statusRounded.css');\n";
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
