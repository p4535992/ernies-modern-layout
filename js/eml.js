// Hex to RGB function
function convertHex(color){
	let hex = color.replace('#','');
	let r = parseInt(hex.substring(0,2), 16);
	let g = parseInt(hex.substring(2,4), 16);
	let b = parseInt(hex.substring(4,6), 16);

	return r+','+g+','+b;
}

// Used to create an ultra specific selector
Hooks.once('init', () => {
	let myHtml = document.getElementsByTagName('html');
	let myBody = document.getElementsByTagName('body');

	// lets makes make this specificity stupid
	myBody[0].classList.add('eml');
	myBody[0].classList.add('e-body');
	myBody[0].setAttribute('id', 'eml');

	game.settings.register('ernies-modern-layout', 'primaryColor', {
		name: 'Primary Theme Color',
		hint: 'Use a full length hex value. Will make it better later. Default Value: #E57509',
		scope: 'user',
		config: true,
		default: '#E57509',
		type: String,
		onChange: data => {
			if(data.length === 7) {
				let rgbValue = convertHex(data);
				if(rgbValue) {
					document.documentElement.style.setProperty('--color-primary', rgbValue);
				}
			}
		}
	});

	game.settings.register('ernies-modern-layout', 'compactMode', {
		name: 'Compact Mode',
		scope: 'user',
		config: true,
		default: false,
		type: Boolean,
		onChange: data => {
			data === true ? myHtml[0].classList.add('-compact') : myHtml[0].classList.remove('-compact');
		}
	});

	game.settings.register('ernies-modern-layout', 'toggleMark', {
		name: 'Toggle Mark',
		scope: 'user',
		config: true,
		default: false,
		type: Boolean,
		onChange: data => {
			data === true ? myHtml[0].classList.remove('-eml-tm') : myHtml[0].classList.add('-eml-tm');
		}
	});

	// game.settings.register('ernies-modern-layout', 'toggleExperimental', {
	// 	name: 'Toggle Experimental Features',
	// 	hint: 'This is experimental. Highly possible to conflict with other Modules.',
	// 	scope: 'user',
	// 	config: true,
	// 	default: false,
	// 	type: Boolean,
	// 	onChange: data => {
	// 		data === true ? myHtml[0].classList.add('-eml-ef') : myHtml[0].classList.remove('-eml-ef');
	// 	}
	// });

	const primaryColor = game.settings.get('ernies-modern-layout', 'primaryColor');
	if(primaryColor && primaryColor.length === 7) {
		let rgbValue = convertHex(primaryColor);
		if(rgbValue) {
			document.documentElement.style.setProperty('--color-primary', rgbValue);
		}
	}

	const toggleMark = game.settings.get('ernies-modern-layout', 'toggleMark');
	if(toggleMark === true) {
		myHtml[0].classList.remove('-eml-tm');
	} else {
		myHtml[0].classList.add('-eml-tm');
	}

	const compactMode = game.settings.get('ernies-modern-layout', 'compactMode');
	if(compactMode === true) {
		myHtml[0].classList.add('-compact');
	}

	// const toggleExperimental = game.settings.get('ernies-modern-layout', 'toggleExperimental');
	// if(toggleExperimental === true) {
	// 	myHtml[0].classList.add('-eml-ef');
	// }
});
