browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.greeting === "hello")
        sendResponse({ farewell: "goodbye" });
});


const defaultConfiguration = {
	'hide-shorts': false,
	'low-case-vid-title': false,
	'hide-for-you': false,
	'hide-others': false,
	'hide-history': false,
	'thumbnail-overrided-channels': [],
	'blocked-channels': []
}

const configuration =
	extension.settings.getItem('configuration') || defaultConfiguration

const watchedConfiguration = onChange(configuration, callback)

function callback(change) => {
	const { key, value } = change
	setConfiguration(key, value)
}

function onChange(obj, callback) {
	function createOnChangeHandler(callback) {
		return {
			set(target, property, value) {
				target[property] = value;
				callback(property, value);
				return true;
			},
			deleteProperty(target, property) {
				delete target[property];
				callback(property, undefined);
				return true;
			}
		};
	}
	const handler = createOnChangeHandler(callback);
	const proxy = new Proxy(obj, handler);
	return proxy;
}

function setConfiguration(key, value) {
	const newConfiguration = Object.assign(configuration, { key, value })
	extension.settings.setItem(newConfiguration)
}
