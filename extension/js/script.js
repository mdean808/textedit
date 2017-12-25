// On Load run...

readSettings();

// listeners

$('#save-btn').click(function () {
	if($('#username').val() === '') {
		return 	M.toast({html: 'You need a username!'})
	} else {
		saveSettings($('#username').val(), document.getElementById('enable-switch').checked);
	}
	});

// Functions

function saveSettings(username, enabled) {
	chrome.storage.sync.set({'username': username, enabled: enabled}, function () {
		console.log('Settings saved:', {'username': username, enabled: enabled});
		M.toast({html: 'Updated your preferences! (Please reload any pages)'})
	});
}

function readSettings() {
	chrome.storage.sync.get(['username', 'enabled'], function(settings) {
		if (settings.username !== '') {
			$('#username').val(settings.username)
		}
		if (settings.enabled === true) {
			document.getElementById('enable-switch').checked = true;
		}
	});
}