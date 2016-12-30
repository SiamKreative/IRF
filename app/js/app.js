$(function () {
	var $selectCountry = $('#country'),
		$selectPhone = $('#phone'),
		listitems = '';

	/**
	 * Country Selection
	 * http://selectize.github.io/selectize.js/
	 * http://country.io/data/
	 */
	$.getJSON('data/countries/names.json', function (json, textStatus) {
		$.each(json, function (key, value) {
			listitems += '<option value=' + key + '>' + value + '</option>';
		});
		// Append to DOM only once | http://stackoverflow.com/a/26514334/1414881
		$selectCountry.append(listitems).selectize({
			onChange: function (value) {
				$selectPhone.intlTelInput('setCountry', value);
			}
		});
	});

	/**
	 * Lookup user's country
	 * http://intl-tel-input.com/node_modules/intl-tel-input/examples/gen/default-country-ip.html
	 */
	$selectPhone.intlTelInput({
		initialCountry: 'auto',
		geoIpLookup: function (callback) {
			$.get('https://ipinfo.io', function () {}, 'jsonp').always(function (resp) {
				console.log(resp);
				var countryCode = (resp && resp.country) ? resp.country : '';

				// Set country and format for telephone input
				callback(countryCode);

				// Set country
				$selectCountry[0].selectize.setValue(countryCode, false);
			});
		}
	});
});