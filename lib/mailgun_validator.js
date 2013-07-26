//
// Mailgun Address Validation Plugin
//
// Attaching to a form:
//
//    $('jquery_selector').mailgun_validator({
//        api_key: 'api-key',
//        in_progress: in_progress_callback, // called when request is made to validator
//        success: success_callback,         // called when validator has returned 
//        error: validation_error,           // called when an error reaching the validator has occured
//    });
//
//
// Sample JSON in success callback:
//
//  {
//      "is_valid": true, 
//      "parts": {
//          "local_part": "john.smith@example.com", 
//          "domain": "example.com", 
//          "display_name": ""
//      }, 
//      "address": "john.smith@example.com", 
//      "did_you_mean": null
//  }
//
// More API details: https://api.mailgun.net/v2/address
//


$.fn.mailgun_validator = function(options) {
    return this.each(function() {
        $(this).focusout(function() {
            run_validator($(this).val(), options);
        });
    });
};


function run_validator(address_text, options) {
    // don't run validator without input
    if (!address_text) {
        return;
    }

    // length check
    if (address_text.length > 512) {
        error_message = 'Stream exceeds allowable length of 512.';
        if (options && options.error) {
            options.error(error_message);
        }
        else {
            console.log(error_message);
        }
        return;
    }

    // validator is in progress
    if (options && options.in_progress) {
        options.in_progress();
    }

    if (options && options.api_key == undefined) {
        console.log('Please pass in api_key to mailgun_validator.')
    }

    var success = false;

    // make ajax call to get validation results
    $.getJSON('https://api:' + options.api_key + '@api.mailgun.net/v2/address/validate?callback=?', {
        address: address_text,
    }).done(function(data, text_status, jq_xhr) {
        success = true;
        if (options && options.success) {
            options.success(data);
        }
    }).error(function(jq_xhr, text_status, error_thrown) {
        success = true;
        if (options && options.error) {
            options.error(jq_xhr);
        }
        else {
            console.log(jq_xhr);
        }
    });

    setTimeout(function() {
        error_message = 'Interal Server Error.';
        if (!success) {
            if (options && options.error) {
                options.error(error_message);
            }
            else {
                console.log(error_message);
            }
        }
    }, 30000);
}