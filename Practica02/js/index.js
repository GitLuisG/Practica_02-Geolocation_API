const URL_MAPS = 'https://www.google.com/maps/';
const $chkEnableHighAccuracy = $('#chkEnableHighAccuracy');
const $txtTimeout = $('#txtTimeout');
const $txtMaximumAge = $('#txtMaximumAge');
const $btnObtenerGeolocalizacion = $('#btnObtenerGeolocalizacion');
const $sEstatus = $('#sEstatus');
const $aMap = $('#aMap');
const $sLat = $('#sLat');
const $sLon = $('#sLon');
const $sAcc = $('#sAcc');

$btnObtenerGeolocalizacion.on('click', btnObtenerGeolocalizacion_click);

function btnObtenerGeolocalizacion_click(e) {

    $aMap.prop('href', URL_MAPS);
    $btnObtenerGeolocalizacion.prop('disabled', true);
    $sEstatus.text('Obteniendo geolocalización...');

    var positionOptions = {
        enableHighAccuracy: $chkEnableHighAccuracy.prop('checked'),
        timeout: parseInt($txtTimeout.val()),
        maximumAge: parseInt($txtMaximumAge.val())
    };

    console.log(positionOptions);
    console.log('Obteniendo geolocation...');
    navigator.geolocation.getCurrentPosition(
            getCurrentPosition_success, getCurrentPosition_error, positionOptions);

}

function getCurrentPosition_success(position) {

    console.log('Position success!');
    console.log(position);

    $btnObtenerGeolocalizacion.prop('disabled', false);
    $sEstatus.text('Datos de geolocalización obtenidos con exito!');

    var p = position.coords;
    $sLat.text(p.latitude);
    $sLon.text(p.longitude);
    $sAcc.text(p.accuracy);
    let urlMap = URL_MAPS + `?q=${p.latitude},${p.longitude}`;
    $aMap.prop('href', urlMap);
}

function getCurrentPosition_error(err) {

    console.error(err);

    $btnObtenerGeolocalizacion.prop('disabled', false);
    $sEstatus.text(err.message);

    $sLat.text('[ERROR]');
    $sLon.text('[ERROR]');
    $sAcc.text('[ERROR]');

}
