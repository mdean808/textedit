var username = '';
var noteTitle = 'Custom Title';
var noteText = '';
chrome.storage.sync.get(['username', 'enabled'], function(settings) {
	if (settings.enabled === true) {
		username = settings.username;
		requestNoteData();
		enableButton();
		$('#modal-text').on('input', function () {
			console.log('Change Detected');
			saveChanges();
		});
	}
});

//Functions

function requestNoteData() {
	console.log('requested');
	$.ajax({
		async: false,
		method: 'post',
		url: 'https://textedit-chrome.herokuapp.com/api/get-doc',
		data: {
			username: username,
			url: window.location.href
		},
		success: function (res, err) {
			console.log('Success!', res);
			noteText = res.text;
			noteTitle = res.title;
		},
		error: function (res, err) {
			console.log('Error:', err, res);

		}
	})
}


function enableButton() {
	$('body').append('<div id="textEditorWrapper" class="hoverable""></div>');
	$('body').append('<div id="openModal" class="modalDialog" style="background-color: darkgray">\n' +
		'    <div>' +
		'		<a href="#close" title="Close" class="close">X</a>\n' +
		'       <h2 id="modal-title" style="color: #000; display: inline-block;" contenteditable="true">' + noteTitle + '</h2> <h6 style="display: inline-block; color: #888888;" id="change-status">All Changes Saved</h6>\n' +
		'       <br>\n' +
		'       <textarea id="modal-text" placeholder="Some crazy note that morgan would be proud of!" cols="12" rows="10" style="width: -webkit-fill-available; background-color: white">' + noteText +'</textarea>\n' +
		'    </div>\n' +
		'</div>');
	$('#textEditorWrapper').jqueryFab([{
		"url": "#openModal",
		"bgcolor": "#e72ca2",
		"color": "#fffff",
		"icon": "+"
	}]);
	$('#modal-title').html();
	console.log('added button for user', username)
}

function disableButton() {
	$('.jfab_main_btn').remove();
	$('#openModal').remove();
}

function saveChanges() {
	$('#change-status').html('Attempting to save changes...');
	var text = $('#modal-text').val();
	var title = $('#modal-title').html();
	if (title === "") {
		alert('Please Specify a title');
		$('#modal-title').html('REEEE I NEED A TITLE!!!!11!!1! REEEEEEE');
	}
	$.ajax({
		method: 'post',
		url: 'https://textedit-chrome.herokuapp.com/api/save-document',
		data: {
			username: username,
			url: window.location.href,
			title: title,
			text: text
		},
		success: function (res, err) {
			console.log('Success!', res);
			setTimeout(function () {
				$('#change-status').html('All changes saved');
			}, 700)
		},
		error: function (res, err) {
			console.log('Error:', err);
			setTimeout(function () {
				$('#change-status').html('<p style="color: red">There was an error saving changes.</p>');
			}, 700);
		}
	});

}