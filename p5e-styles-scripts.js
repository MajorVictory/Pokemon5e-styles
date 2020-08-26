// Hex to RGB function
function convertHex(color){
	let hex = color.replace('#','');
	let r = parseInt(hex.substring(0,2), 16);
	let g = parseInt(hex.substring(2,4), 16);
	let b = parseInt(hex.substring(4,6), 16);

	return r+','+g+','+b;
}

function p5eGetBGData(num) {
	let slice = '';
	switch(num) {
		case "01": slice = '16 round'; break;
		default: slice = '16 round';
	}
	return 'url(\'/modules/Pokemon5e-styles/images/chatborders/'+num+'.png\') '+slice;
}

Hooks.once('ready', () => {

	let borderChoices = {
		"01": "# 01",
        "02": "# 02",
        "03": "# 03",
        "04": "# 04",
        "05": "# 05",
        "06": "# 06",
        "07": "# 07" 
	};
	let ColorSettingsLib = true;
	try {window.Ardittristan.ColorSetting.tester} catch {
        ui.notifications.notify('Please make sure you have the "lib - ColorSettings" module installed and enabled.', "error");
        ColorSettingsLib = false;
    }

    if (ColorSettingsLib) {
	    new window.Ardittristan.ColorSetting("Pokemon5e-styles", "primaryBackgroundColor", {
		    name: "Sheet Background Color",      // The name of the setting in the settings menu
		    hint: "Default: #FFFBCEFF",   // A description of the registered setting and its behavior
		    label: "Set Color",         // The text label used in the button
		    restricted: false,             // Restrict this setting to gamemaster only?
		    defaultColor: "#FFFBCEff",     // The default color of the setting
		    scope: "client",               // The scope of the setting
		    onChange: (data) => {
				console.log('Pokemon5e-styles | primaryBackgroundColor: ', data);
				document.documentElement.style.setProperty('--p5e-primary-background-color', data);
			}        // A callback function which triggers when the setting is changed
		})
	} else {
		game.settings.register('Pokemon5e-styles', 'primaryBackgroundColor', {
			name: 'Sheet Background Color',
			hint: 'Default: #FFFBCEFF',
			scope: 'user',
			config: true,
			default: '#FFFBCEFF',
			choices: {
				"#FFFBCEFF": "Default Tan",
	        	"#58D0D0FF": "Trainer Blue",
	        	"#B088D0FF": "Trainer Purple",
	        	"#F0B850FF": "Pikachu Yellow",
	        	"#68C098FF": "Misty's Green Eyes",
	        	"#E08868FF": "Salmon isn't a Color"
			},
			type: String,
			onChange: data => {
				console.log('Pokemon5e-styles | primaryBackgroundColor: ', data);
				document.documentElement.style.setProperty('--p5e-primary-background-color', data);
			}
		});
	}
	const primaryBackgroundColor = game.settings.get('Pokemon5e-styles', 'primaryBackgroundColor');
	primaryBackgroundColor ? document.documentElement.style.setProperty('--p5e-primary-background-color', primaryBackgroundColor) : null;

	game.settings.register('Pokemon5e-styles', 'chatBorderPublic', {
		name: 'Chat Border - Public Messages',
		hint: '<img src="/modules/Pokemon5e-styles/images/chatborders.png">',
		scope: 'user',
		config: true,
		default: "01",
		choices: borderChoices,
		type: String,
		onChange: data => {
			console.log('Pokemon5e-styles | chatBorderPublic: ', data);
			console.log('Pokemon5e-styles | p5eGetBGData(): ', p5eGetBGData(data));
			document.documentElement.style.setProperty('--p5e-chatborder-public', p5eGetBGData(data));
		}
	});
	const chatBorderPublic = game.settings.get('Pokemon5e-styles', 'chatBorderPublic');
	chatBorderPublic ? document.documentElement.style.setProperty('--p5e-chatborder-public', p5eGetBGData(chatBorderPublic)) : null;

	game.settings.register('Pokemon5e-styles', 'chatBorderWhisper', {
		name: 'Chat Border - Whisper Messages',
		hint: '<img src="/modules/Pokemon5e-styles/images/chatborders.png">',
		scope: 'user',
		config: true,
		default: "01",
		choices: borderChoices,
		type: String,
		onChange: data => {
			console.log('Pokemon5e-styles | chatBorderWhisper: ', data);
			console.log('Pokemon5e-styles | p5eGetBGData(): ', p5eGetBGData(data));
			document.documentElement.style.setProperty('--p5e-chatborder-whisper', p5eGetBGData(data));
		}
	});
	const chatBorderWhisper = game.settings.get('Pokemon5e-styles', 'chatBorderWhisper');
	chatBorderWhisper ? document.documentElement.style.setProperty('--p5e-chatborder-whisper', p5eGetBGData(chatBorderWhisper)) : null;

	game.settings.register('Pokemon5e-styles', 'chatBorderBlind', {
		name: 'Chat Border - Blind Messages',
		hint: '<img src="/modules/Pokemon5e-styles/images/chatborders.png">',
		scope: 'user',
		config: true,
		default: "01",
		choices: borderChoices,
		type: String,
		onChange: data => {
			console.log('Pokemon5e-styles | chatBorderBlind: ', data);
			console.log('Pokemon5e-styles | p5eGetBGData(): ', p5eGetBGData(data));
			document.documentElement.style.setProperty('--p5e-chatborder-blind', p5eGetBGData(data));
		}
	});
	const chatBorderBlind = game.settings.get('Pokemon5e-styles', 'chatBorderBlind');
	chatBorderBlind ? document.documentElement.style.setProperty('--p5e-chatborder-blind', p5eGetBGData(chatBorderBlind)) : null;

});