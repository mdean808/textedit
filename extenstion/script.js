//Listeners
$('#enable-switch').click(function () {
	checkStatus('enable-switch')
});


// Functions
function checkStatus(element) {
	if (document.getElementById(element).checked) {
		enableButton();
		console.log('enabled')
	}
	else if (!document.getElementById(element).checked) {
		console.log("not enabled")
	}
}

function enableButton() {
	$('body').append('  <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">edit</i></a>\n')
}

function loadLibs() {
	var materialize = chrome.extension.getURL("./css/materialize.min.css");
	$('<link rel="stylesheet" type="text/css" href="' + materialize + '" >').appendTo("head");
	var js = chrome.extension.getURL("./js/materialize.min.js");
	$('<script type="text/javascript" src="' + js + '" ></script>').appendTo("body");
}