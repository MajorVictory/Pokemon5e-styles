
function p5eGetBGData(num) {
	let slice = '';
	switch(num) {
		case "01": slice = '16 round'; break;
		default: slice = '16 round';
	}
	return 'url(\'/modules/Pokemon5e-styles/images/chatborders/'+num+'.png\') '+slice;
}

Hooks.once('init', () => {

    game.settings.registerMenu("Pokemon5e-styles", "Pokemon5e-styles", {
        name: game.i18n.localize("P5ESTYLES.Config"),
        label: game.i18n.localize("P5ESTYLES.ConfigTitle"),
        hint: game.i18n.localize("P5ESTYLES.ConfigHint"),
        icon: "fas fa-paint-brush",
        type: PokemonStylesConfigDialog,
        restricted: false
    });

    game.settings.register("Pokemon5e-styles", "settings", {
        name: game.i18n.localize("P5ESTYLES.Config"),
        scope: "client",
        default: PokemonStylesConfig.getDefaults,
        type: Object,
        config: false,
        onChange: settings => {
			PokemonStylesConfig.apply(settings);
        }
    });
});

Hooks.once('ready', () => {
	PokemonStylesConfig.apply(PokemonStylesConfig.getOptions);
});

// main class to hold default configs and current settings
export class PokemonStylesConfig {

	static get getDefaults() {
		return {
    		pokedexPresets: {
				'#f20c32': 'Red (Default)',
				'#0a2dc9': 'Blue',
				'#0ac92a': 'Green',
				'#f2eb0c': 'Yellow',
				'#f2a20c': 'Gold',
				'#bebebe': 'Silver',
				'#02e2ff': 'Crystal',
				'#91071e': 'Ruby',
				'#072091': 'Sapphire',
				'#ff7700': 'Fire Red',
				'#00fd27': 'Leaf Green',
				'#07911f': 'Emerald',
				'#979ac8': 'Diamond',
				'#ecb2c2': 'Pearl',
				'#959595': 'Platinum',
				'#d8c156': 'HeartGold',
				'#8c95b5': 'SoulSilver',
				'#373737': 'Black',
				'#ffffff': 'White',
				'#202020': 'Black 2',
				'#fbeaee': 'White 2',
				'#3280cf': 'X',
				'#ff465b': 'Y',
				'#d43400': 'Omega Ruby',
				'#3e6aa9': 'Alpha Sapphire',
				'#fe9539': 'Sun',
				'#53a1d9': 'Moon',
				'#e56638': 'Ultra Sun',
				'#1e7bd4': 'Ultra Moon',
				'#e6c300': 'Let\'s Go, Pikachu!',
				'#a88633': 'Let\'s Go, Eevee!',
				'#4dcdff': 'Sword',
				'#ff4ea1': 'Shield'
			},
    		sheetColorPresets: {
				"#fffbce": "Tan (Default)",
	        	"#ff6868": "Trainer Red",
	        	"#dc8161": "Magikarp Red",
	        	"#f0b850": "Pikachu Yellow",
	        	"#68c098": "Misty's Green Eyes",
				"#9fd271": "Caterpie Green",
	        	"#58d0d0": "Trainer Blue",
	        	"#b088d0": "Trainer Purple",
				"#eee6dd": "Chancey Shell White"
			},
    		chatBorders: {
				"01": "Chat Border #01",
		        "02": "Chat Border #02",
		        "03": "Chat Border #03",
		        "04": "Chat Border #04",
		        "05": "Chat Border #05",
		        "06": "Chat Border #06",
		        "07": "Chat Border #07",
				"08": "Chat Border #08",
		        "09": "Chat Border #09",
		        "10": "Chat Border #10",
		        "11": "Chat Border #11",
		        "12": "Chat Border #12",
		        "13": "Chat Border #13",
		        "14": "Chat Border #14",
				"15": "Chat Border #15",
		        "16": "Chat Border #16",
		        "17": "Chat Border #17",
		        "18": "Chat Border #18",
		        "19": "Chat Border #19",
		        "20": "Chat Border #20",
		        "21": "Chat Border #21",
		        "22": "Chat Border #22",
		        "23": "Chat Border #23",
		        "24": "Chat Border #24",
		        "25": "Chat Border #25",
		        "26": "Chat Border #26",
		        "27": "Chat Border #27",
		        "28": "Chat Border #28",
		        "29": "Chat Border #29"
			},
    		pokedexColor: '#f20c32',
	    	sheetBackgroundColor: '#fffbce',
    		ChatBoxPublicBackgroundColor: '#58d0d0',
    		ChatBoxPublicBorder: '21',
    		ChatBoxWhisperBackgroundColor: '#b088d0',
    		ChatBoxWhisperBorder: '03',
    		ChatBoxBlindBackgroundColor: '#e08868',
    		ChatBoxBlindBorder: '11'
    	};
	}

	static get getOptions() {
		return mergeObject(PokemonStylesConfig.getDefaults, game.settings.get("Pokemon5e-styles", "settings"));
	}

	static apply(options) {

		document.documentElement.style.setProperty('--p5e-pokedex-color', options.pokedexColor);
		document.documentElement.style.setProperty('--p5e-primary-background-color', options.sheetBackgroundColor);

		document.documentElement.style.setProperty('--p5e-chatborder-public', p5eGetBGData(options.ChatBoxPublicBorder));
		document.documentElement.style.setProperty('--p5e-chatborder-whisper', p5eGetBGData(options.ChatBoxWhisperBorder));
		document.documentElement.style.setProperty('--p5e-chatborder-blind', p5eGetBGData(options.ChatBoxBlindBorder));

		document.documentElement.style.setProperty('--p5e-background-color-public', options.ChatBoxPublicBackgroundColor);
		document.documentElement.style.setProperty('--p5e-background-color-whisper', options.ChatBoxWhisperBackgroundColor);
		document.documentElement.style.setProperty('--p5e-background-color-blind', options.ChatBoxBlindBackgroundColor);
	}
}

class PokemonStylesConfigDialog extends FormApplication {

	static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: game.i18n.localize("P5ESTYLES.Config"),
            id: "Pokemon5e-styles-config",
            template: "modules/Pokemon5e-styles/templates/settings.html",
            width: 510,
            height: 795,
            closeOnSubmit: true
        });
    }

    getData(options) {
    	let defaultOptions = PokemonStylesConfig.getDefaults;
    	let currentdata = game.settings.get('Pokemon5e-styles', 'settings');
    	let returndata = this.reset ? defaultOptions : mergeObject(defaultOptions, currentdata);
    	return returndata;
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find('select[name="pokedexColorPreset"],input[name="pokedexColor"],input[name="pokedexColorSelector"]').change(this.updateColor.bind(this));
        html.find('select[name="sheetBackgroundColorPreset"],input[name="sheetBackgroundColor"],input[name="sheetBackgroundColorSelector"]').change(this.updateColor.bind(this));
        html.find('select[name="ChatBoxPublicBackgroundColorPreset"],input[name="ChatBoxPublicBackgroundColor"],input[name="ChatBoxPublicBackgroundColorSelector"]').change(this.updateColor.bind(this));
        html.find('select[name="ChatBoxWhisperBackgroundColorPreset"],input[name="ChatBoxWhisperBackgroundColor"],input[name="ChatBoxWhisperBackgroundColorSelector"]').change(this.updateColor.bind(this));
        html.find('select[name="ChatBoxBlindBackgroundColorPreset"],input[name="ChatBoxBlindBackgroundColor"],input[name="ChatBoxBlindBackgroundColorSelector"]').change(this.updateColor.bind(this));
        html.find('input,select').change(this.onApply.bind(this));
        html.find('button[name="reset"]').click(this.onReset.bind(this));

        $('input[name="pokedexColor"], input[name="sheetBackgroundColor"], input[name="ChatBoxPublicBackgroundColor"], input[name="ChatBoxWhisperBackgroundColor"], input[name="ChatBoxBlindBackgroundColor"]').change();

        this.reset = false;
    }

    // updates 'borther' controls to all reflect the same values
    updateColor(event) {
    	let control = $(event.target);

    	// validate manual color
    	if (['pokedexColor','sheetBackgroundColor','ChatBoxPublicBackgroundColor',
    		'ChatBoxWhisperBackgroundColor', 'ChatBoxBlindBackgroundColor'].includes(control.prop('name'))) {

    		let colortest = /^#[0-9A-F]{6}$/i.test(control.val());

    		if(!colortest) {
    			ui.notifications.warn(game.i18n.localize("P5ESTYLES.InvalidColorFormat"));
    			control.val('#000000');
    		}
    	}

    	let colorgroups = [
    		['pokedexColorPreset', 'pokedexColor', 'pokedexColorSelector'],
    		['sheetBackgroundColorPreset', 'sheetBackgroundColor', 'sheetBackgroundColorSelector'],
    		['ChatBoxPublicBackgroundColorPreset', 'ChatBoxPublicBackgroundColor', 'ChatBoxPublicBackgroundColorSelector'],
    		['ChatBoxWhisperBackgroundColorPreset', 'ChatBoxWhisperBackgroundColor', 'ChatBoxWhisperBackgroundColorSelector'],
    		['ChatBoxBlindBackgroundColorPreset', 'ChatBoxBlindBackgroundColor', 'ChatBoxBlindBackgroundColorSelector']
    	];

    	for (var group = colorgroups.length - 1; group >= 0; group--) {
    		let colorgroup = colorgroups[group];

    		if (colorgroup.includes(control.prop('name'))) {

    			for (var el = colorgroup.length - 1; el >= 0; el--) {
    				let brother = $('[name="'+colorgroup[el]+'"]');

    				//skip if setting myself
    				if (brother.name == control.prop('name')) continue;

					// no color matches a preset, set to custom
    				if (brother.prop('tagName') == 'SELECT') {
    					brother.val(control.val());
    					if (brother.val() == null) {
	    					brother.val('custom');
	    				}
    				} else if (brother.prop('tagName') == 'INPUT' && brother.prop('type') == 'text') {
						// if custom, set to black at first
    					if (control.val() == 'custom') {
	    					brother.val('#000000');
	    				} else {
	    					brother.val(control.val());
	    				}
    				} else {
						brother.val(control.val());
					}
    			}
    		}
    	}
    }

    onApply(event) {
    	event.preventDefault();
    }

    onReset() {
        this.reset = true;
        this.render();
    }

    async _updateObject(event, formData) {
        await game.settings.set('Pokemon5e-styles', 'settings', formData);
        ui.notifications.info(game.i18n.localize("P5ESTYLES.SaveMessage"));
    }
}