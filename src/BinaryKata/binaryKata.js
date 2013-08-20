BinaryConverter = {}

$(document).ready(function () {
    BinaryConverter.Initialize(8);
});

BinaryConverter = {
    Initialize: function (unicodePad) {
        BinaryConverter.unicodePad = unicodePad;

        $('#cbxBinay').click(function () {
            $('#btnDoIt').unbind();

            if ($(this)[0].checked) {
                $('#btnDoIt').click(function () {
                    //validation
                    $('#txtStringConverted').val(BinaryConverter.ConvertStringToBits($('#txtStringToConvert').val()));
                });
            } else {
                $('#btnDoIt').click(function () {
                    $('#txtStringConverted').val(BinaryConverter.ConvertBitToString($('#txtStringToConvert').val()));
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
    }
}