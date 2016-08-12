function Channel()
{
    this._index = 0;
    this._number = 1;
    this._internal = true;
    this._name = '';
    this._unit = '';
    this._decimalPlaces = 0;
    this._probeName = '';
    this._probeSerialNumber = '';
    this._values = [];
}

Channel.prototype.getIndex = function ()
{
    return this._index;
};

Channel.prototype.getNumber = function ()
{
    return this._number;
};

Channel.prototype.isInternal = function ()
{
    return this._internal;
};

Channel.prototype.getName = function ()
{
    return this._name;
};

Channel.prototype.getFullName = function ()
{
    return 'v' + this._number + ' ' + this._name + ' [' + this._unit + ']';
};

Channel.prototype.getUnit = function ()
{
    return this._unit;
};

Channel.prototype.getProbeName = function ()
{
    return this._probeName;
};

Channel.prototype.getProbeSerialNumber = function ()
{
    return this._probeSerialNumber;
};

Channel.prototype.getValues = function()
{
    return this._values;
}

Channel.prototype.formateValue = function(value)
{
    var result = '';

    result = value.toFixed(this._decimalPlaces) .toLocaleString();

    return result;
}

Channel.prototype.loadJsonString = function (jsonString)
{
    var jsonData = JSON.parse(jsonString);

    this._index = jsonData.index;
    this._number = jsonData.number;
    this._internal = jsonData.internal;
    this._name = jsonData.name;
    this._unit = jsonData.unit;
    this._probeName = jsonData.probeName;
    this._probeSerialNumber = jsonData.probeSerialNumber;
    this._decimalPlaces = jsonData.decimalPlaces;
    this._values = [];

    // Nombre de valeur entre 10 et 110;
    var nbValeur = Math.round(Math.random() * 100 + 10);
    var value = 0;
    var oldValue = 20;
    var dateTick = Date.now();

    for (var i = 0 ; i < nbValeur ; i++)
    {
        value = (((Math.random() - 0.5) * 10 + 20) * 0.1 + oldValue * 0.9);
        dateTick = dateTick + 1000;

        this._values.push({'value': value, 'date': dateTick});

        oldValue = value;
    }    
};

Channel.prototype.createJsonString = function ()
{
    var json = '';

    return json;
};