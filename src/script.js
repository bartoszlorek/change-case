console.log('executed');

chrome.runtime.onMessage.addListener(function (request) {
	var method = request && request.method || false;
	console.log(method);
});