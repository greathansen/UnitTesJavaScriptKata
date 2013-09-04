$(document).ready(function () {
   /* var url = "http://unittestjavascriptkata.azurewebsites.net/src/BinaryKata/binaryKata.html";

    $.ajax({
        url: url,

        crossDomain: true,
        datatype: 'html',
        success: function (data) {

            $("#qunit-fixture").append(data);
        }
    });
    alert('cargando')*/
    BinaryConverter.Initialize(8);
});

test("convert a char to Binary using ConvertCharToBits function", function () {
    ok(BinaryConverter.ConvertCharToBits('z'.charCodeAt(0)) == "01111010", "Passed! - convert 'z' to Binary.");
    ok(BinaryConverter.ConvertCharToBits('a'.charCodeAt(0)) == "01100001", "Passed! - convert 'a' to Binary.");
});

test("convert strings to Binary using ConvertStringToBits function", function () {
    ok(BinaryConverter.ConvertStringToBits('z') == "01111010", "Passed! - convert 'z' to Binary.");
    ok(BinaryConverter.ConvertStringToBits('a') == "01100001", "Passed! - convert 'a' to Binary.");
    ok(BinaryConverter.ConvertStringToBits('gustavo') == "01100111011101010111001101110100011000010111011001101111", "Passed! - convert my Name to Binary.");
    ok(BinaryConverter.ConvertStringToBits('hansen') == "011010000110000101101110011100110110010101101110", "Passed! - convert my Last Name to Binary.");
    ok(BinaryConverter.ConvertStringToBits('gustavo.a.hansen') == "01100111011101010111001101110100011000010111011001101111001011100110000100101110011010000110000101101110011100110110010101101110", "Passed! - convert my EnterpriseId to Binary.");

});

test("convert Binary to String using ConvertBitToString function", function () {
    equal(BinaryConverter.ConvertBitToString('01100001'), "a", "Passed! - convert 01100001 to string 'a'.");
    equal(BinaryConverter.ConvertBitToString('01111010'), "z", "Passed! - convert 01111010 to string. 'z'");
    equal(BinaryConverter.ConvertBitToString('01100111011101010111001101110100011000010111011001101111'), "gustavo", "Passed! - convert Binary to string 'gustavo'.");
    equal(BinaryConverter.ConvertBitToString('011010000110000101101110011100110110010101101110'), "hansen", "Passed! - convert Binary to string 'hansen'.");
    equal(BinaryConverter.ConvertBitToString('01100111011101010111001101110100011000010111011001101111001011100110000100101110011010000110000101101110011100110110010101101110'), "gustavo.a.hansen", "Passed! - convert Binary to string 'gustavo.a.hansen'.");
});

/*
test("convert a string to Binary using Do Magic click (set checkbox to true)", function () {
    

    $('#txtStringToConvert').val("a")
    $('#cbxBinay').click();

    alert($('#txtStringConverted').val());
    ok($('#txtStringConverted').val() == "01100001", "Passed! - convert 'a' to Binary.");
});   */
