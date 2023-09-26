console.log("Hello World!", browser);

const { watchedConfiguration } = safari.extension.globalPage

document.addEventListener("DOMContentLoaded", function() {
	const checkboxes = document.querySelectorAll('input[type="checkbox"]')

	checkboxes.forEach(checkbox => {
		const id = checkbox.id
		// update UI and add change event listener
		checkbox.checked = watchedConfiguration[id]
		checkbox.addEventListener('change', function() {
			watchedConfiguration[id] = this.checked
		})
	})
})
