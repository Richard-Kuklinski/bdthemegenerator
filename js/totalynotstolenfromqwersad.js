function generateTheme(opts) {
    return `//META{"name":"${opts.name}","description":"Generated Automatically using https://0x71.cc/bd/theme | Original theme [BasicBackground] made by DevilBro","author":"0x71, DevilBro","version":"1.0.4"}*//

@import url(https://mwittrien.github.io/BetterDiscordAddons/Themes/BasicBackground/BasicBackground.css);

:root {
    --transparencycolor: ${opts.transparency};		/* default: 0,0,0 */
    --transparencyalpha: ${opts.transparencyAlpha};		/* default: 0.15 */
    --messagetransparency: ${opts.messageTransparency};		/* default: 0.5 */
    --guildchanneltransparency: ${opts.guildChannelTransparency};	/* default: 0.15 (additional darkness for guild/channel list can be changed in case a bright background makes the list hard to read) */
    --memberlistransparency: ${opts.memberListTransparency};		/* default: 0 (additional darkness for member list can be changed in case a bright background makes the list hard to read)*/
    --accentcolor: ${opts.accent}; 		/* default: 190,78,180 discord: 114,137,218 bd-blue: 58,113,193*/
    --background: url("${opts.background}"); /* replace the link in url() with your own direct image link to change the background */
    --backdrop: rgba(0,0,0,0.4);	/* default: rgba(0,0,0,0.4) can also be changed to an image like --background */
    --backgroundblur: 0px;				/* default: 0px only works when --background is set to an image */
	--popoutblur: 0px;					/* default: 0px only works when --background is set to an image */
	--backdropblur: 0px;				/* default: 0px only works when --backdrop is set to an image */
}
`;
}

function dlEdge(mime, text, name) {
    navigator.msSaveBlob(
        new Blob(
            [new Uint8Array(text.split('').map(b => b.charCodeAt(0)))],
            {type: mime}
        ),
        name
    );
}

function dlFile(mime, text, name) {
    if (navigator.msSaveBlob) {
        dlEdge(mime, text, name);
        return;
    }
    let a = document.createElement('a');

    a.download = name;
    a.href = URL.createObjectURL(
        new Blob(
            [new Uint8Array(text.split('').map(b => b.charCodeAt(0)))],
            {type: mime}
        )
    );
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}

function hexToRGB(color) {
    let c = color.split('#').pop().match(/.{2}/g);
    return parseInt(c[0], 16) + ',' + parseInt(c[1], 16) + ',' + parseInt(c[2], 16);
}

async function isImage(url) {
    return new Promise((resolve) => {
        const imageFormats = [
            'png',
            'jpg',
            'jpe',
            'jpeg',
            'gif',
            'bm',
            'bmp'
        ];
        const parsed = new URL(url);
        if (parsed.host === 'cdn.discordapp.com') {
            if (imageFormats.includes(parsed.pathname.split('.').pop())) {
                return resolve(true);
            }
        }
        const xhttp = new XMLHttpRequest();
        xhttp.open('HEAD', url);
        xhttp.onreadystatechange = function () {
            if (this.readyState == this.DONE) {
                if (this.status != 200) {
                    resolve(false);
                } else {
                    resolve(this.getResponseHeader('Content-Type').split('/')[0] == 'image');
                }
            }
        };
        xhttp.send();
    });
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

function validateInputs() {
    if (document.querySelector('input[invalid]')) {
        return false;
    } else {
        return true;
    }
}

async function download() {
    const name = document.getElementById('name').value;
    const transparency = hexToRGB(document.getElementById('transparency').value);
    const transparencyAlpha = document.getElementById('t-alpha').value/2;
    const messageTransparency = document.getElementById('message-transparency').value;
    const guildChannelTransparency = document.getElementById('guild-channel-transparency').value;
    const memberListTransparency = document.getElementById('member-list-transparency').value;
    const accent = hexToRGB(document.getElementById('accent').value);
    let background;
    let backgroundValid = false;
    if (document.getElementById('bg-file-radio').checked) {
        background = await getBase64(document.getElementById('background-file').files[0]);
        if (mime(background).split('/')[0] == 'image') {
            backgroundValid = true;
        }
    } else {
        background = document.getElementById('background-url').value;
        if (await isImage(background)) {
            backgroundValid = true;
        }
    }

    const allInputsFilled = validateInputs();

    if(allInputsFilled && backgroundValid) {
        document.getElementById('dl-warning').classList = 'warning';

        const opts = {
            name: name,
            transparency: transparency,
            transparencyAlpha: transparencyAlpha,
            messageTransparency: messageTransparency,
            guildChannelTransparency: guildChannelTransparency,
            memberListTransparency: memberListTransparency,
            accent: accent,
            background: background
        };


        dlFile('text/css', generateTheme(opts), `${name}.theme.css`);
    } else {
        document.getElementById('dl-warning').classList = 'warning true';
    }
}

async function verifyUrl() {
    let URL = document.getElementById('background-url').value;
    isImage(URL).then(is => {
        if (!is) {
            document.getElementById('url-warning').classList = 'warning true';
        } else {
            document.getElementById('url-warning').classList = 'warning';
        }
    });
}

async function verifyFile() {
    let file = await getBase64(document.getElementById('background-file').files[0]);
    if (mime(file).split('/')[0] != 'image') {
        document.getElementById('file-warning').classList = 'warning true';
    } else {
        document.getElementById('file-warning').classList = 'warning';
    }
}

async function updatePreview() {
    const name = document.getElementById('name').value;
    const transparency = hexToRGB(document.getElementById('transparency').value);
    const transparencyAlpha = document.getElementById('t-alpha').value/2;
    const messageTransparency = document.getElementById('message-transparency').value;
    const guildChannelTransparency = document.getElementById('guild-channel-transparency').value;
    const memberListTransparency = document.getElementById('member-list-transparency').value;
    const accent = hexToRGB(document.getElementById('accent').value);
    let background;
    let backgroundValid = false;
    if (document.getElementById('bg-file-radio').checked) {
        background = await getBase64(document.getElementById('background-file').files[0]);
        if (mime(background).split('/')[0] == 'image') {
            backgroundValid = true;
        }
    } else {
        background = document.getElementById('background-url').value;
        if (await isImage(background)) {
            backgroundValid = true;
        }
    }

    const allInputsFilled = validateInputs();

    if(allInputsFilled && backgroundValid) {
        document.getElementById('dl-warning').classList = 'warning';
        let preview = frames['preview'].contentDocument.body;
        preview.style.setProperty('--vtransparencyalpha', transparencyAlpha);
        preview.style.setProperty('--vtransparencycolor', transparency);
        preview.style.setProperty('--vmessagetransparency', messageTransparency);
        preview.style.setProperty('--vguildchanneltransparency', guildChannelTransparency);
        preview.style.setProperty('--vmemberlistransparency', memberListTransparency);
        preview.style.setProperty('--vaccentcolor', accent);
        preview.style.setProperty('--vbackground', `url(${background})`);
    } else {
        document.getElementById('dl-warning').classList = 'warning true';
    }
}

document.getElementById('preview').onload = updatePreview;
updatePreview();

document.getElementById('preview-btn').addEventListener('click', updatePreview);



document.getElementById('background-url').addEventListener('input', verifyUrl);

document.getElementById('background-file').addEventListener('change', verifyFile);

document.getElementById('download').addEventListener('click', download);

document.querySelectorAll('input[required]').forEach(i => {
    i.addEventListener('input', e => {
        e.target.value == '' || e.target.value == null ?
            e.target.setAttribute('invalid', '')
            :
            e.target.removeAttribute('invalid');
    })
});
