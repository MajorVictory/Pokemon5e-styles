
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
        icon: "fas fa-dice-d20",
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
	        	"#58d0d0": "Trainer Blue",
	        	"#b088d0": "Trainer Purple",
	        	"#f0b850": "Pikachu Yellow",
	        	"#68c098": "Misty's Green Eyes",
	        	"#e08868": "Salmon isn't a Color"
			},
    		chatBorders: {
				"01": "#01",
		        "02": "#02",
		        "03": "#03",
		        "04": "#04",
		        "05": "#05",
		        "06": "#06",
		        "07": "#07",
				"08": "#08",
		        "09": "#09",
		        "10": "#10",
		        "11": "#11",
		        "12": "#12",
		        "13": "#13",
		        "14": "#14",
				"15": "#15",
		        "16": "#16",
		        "17": "#17",
		        "18": "#18",
		        "19": "#19",
		        "20": "#20",
		        "21": "#21",
		        "22": "#22",
		        "23": "#23",
		        "24": "#24",
		        "25": "#25",
		        "26": "#26",
		        "27": "#27",
		        "28": "#28",
		        "29": "#29"
			},
    		chatBorderPublic: '01',
    		chatBorderWhisper: '02',
    		chatBorderBlind: '03',
    		pokedexColor: '#ff0000',
	    	pokedexColorPreset: '#ff0000',
    		sheetBackgroundColor: '#fffbce'
    	};
	}

	static get getOptions() {
		return mergeObject(PokemonStylesConfig.getDefaults, game.settings.get("Pokemon5e-styles", "settings"));
	}

	static apply(options) {

		document.documentElement.style.setProperty('--p5e-pokedex-color', options.pokedexColor);
		document.documentElement.style.setProperty('--p5e-primary-background-color', options.sheetBackgroundColor);

		document.documentElement.style.setProperty('--p5e-chatborder-public', p5eGetBGData(options.chatBorderPublic));
		document.documentElement.style.setProperty('--p5e-chatborder-whisper', p5eGetBGData(options.chatBorderWhisper));
		document.documentElement.style.setProperty('--p5e-chatborder-blind', p5eGetBGData(options.chatBorderBlind));
	}
}

class PokemonStylesConfigDialog extends FormApplication {

	static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: game.i18n.localize("P5ESTYLES.Config"),
            id: "Pokemon5e-styles-config",
            template: "modules/Pokemon5e-styles/templates/settings.html",
            width: 510,
            height: 641,
            closeOnSubmit: true
        })
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
        html.find('input,select').change(this.onApply.bind(this));
        html.find('button[name="reset"]').click(this.onReset.bind(this));
        this.reset = false;
    }

    // updates 'borther' controls to all reflect the same values
    updateColor(event) {
    	let control = $(event.target);

    	// validate manual color
    	if (['pokedexColor','sheetBackgroundColor'].includes(control.prop('name'))) {

    		let colortest = /^#[0-9A-F]{6}$/i.test(control.val());

    		if(!colortest) {
    			ui.notifications.warn(game.i18n.localize("P5ESTYLES.InvalidColorFormat"));
    			control.val('#000000');
    		}
    	}

    	let colorgroups = [
    		['pokedexColorPreset', 'pokedexColor', 'pokedexColorSelector'],
    		['sheetBackgroundColorPreset', 'sheetBackgroundColor', 'sheetBackgroundColorSelector']
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