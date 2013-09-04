BinaryConverter = {}

$(document).ready(function () {
    BinaryConverter.Initialize(8, "http://unittestjavascriptkata.azurewebsites.net/BinaryKataService.svc");
});

BinaryConverter = {

    Initialize: function (unicodePad, url) {
        BinaryConverter.unicodePad = unicodePad;
        BinaryConverter.WebServiceUrl = url;

        $('#btnDoIt').click(function () {
            var data = $('#txtStringToConvert').val();

            if ($('#cbxUseWebService')[0].checked) {
                BinaryConverter.ConvertUsingWebService('/ConvertBitToString', data)
            }
            else {
                $('#txtStringConverted').val(BinaryConverter.ConvertBitToString(data));
            }
        });

        $('#cbxBinay').click(function () {
            $('#btnDoIt').unbind();

            if ($(this)[0].checked) {
                $('#btnDoIt').click(function () {
                    var data = $('#txtStringToConvert').val();

                    if ($('#cbxUseWebService')[0].checked) {
                        BinaryConverter.ConvertUsingWebService('/ConvertStringToBits', data)
                    }
                    else {
                        $('#txtStringConverted').val(BinaryConverter.ConvertStringToBits(data));
                    }
                });
            } else {
                $('#btnDoIt').click(function () {
                    var data = $('#txtStringToConvert').val();

                    if ($('#cbxUseWebService')[0].checked) {
                        BinaryConverter.ConvertUsingWebService('/ConvertBitToString', data)
                    }
                    else {
                        $('#txtStringConverted').val(BinaryConverter.ConvertBitToString(data));
                    }
                });
            }
        });
    },

    ConvertCharToBits: function (unicodeInteger) {

        var result = '';

        while (unicodeInteger > 0) {

            if (unicodeInteger % 2 == 0) {
                result = '0' + result;
            }
            else {
                result = '1' + result;
            }

            unicodeInteger = (unicodeInteger - (unicodeInteger % 2)) / 2;
        }

        while (result.length < BinaryConverter.unicodePad) { result = '0' + result; }

        return result;
    },

    ConvertStringToBits: function (value) {

        var result = '';

        for (var i = 0, len = value.length; i < len; i++) {
            result = result + BinaryConverter.ConvertCharToBits(value[i].charCodeAt(0));
        }

        return result;
    },

    ConvertBitToString: function (value) {

        var result = 0;
        var stringToReturn = '';
        var weight = (Math.pow(BinaryConverter.unicodePad, 2)) * 2;

        for (var i = 0, len = value.length; i < len; i++) {
            result = result + BinaryConverter.ConvertBitToChar(value[i], weight);

            if (weight == 1) {
                stringToReturn = stringToReturn + String.fromCharCode(result);
                result = 0;
                weight = (Math.pow(BinaryConverter.unicodePad, 2)) * 2;
            } else {
                weight = weight / 2;
            }
        }

        return stringToReturn;
    },

    ConvertBitToChar: function (bit, weight) {
        return bit == 0 ? 0 : weight;
    },

    ConvertUsingWebService: function (methodName, data) {

        var Url = BinaryConverter.WebServiceUrl + methodName + '/' + data

        /* $.ajax({
        success: function (convertedValue) { return convertedValue },
        type: "POST",
        dataType: "json",
        url: Url + methodName + '/' + data,
        error: function (exception) { alert('it was and error. ' + exception); }

        });*/

        $.getJSON(Url, {
            tagmode: "any",
            format: "json"
        }).done(function (convertedValue) {
            $('#txtStringConverted').val(convertedValue);

        }).fail(function (exception) { alert('it was and error. ' + exception); });

    }
}