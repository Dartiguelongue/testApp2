class Channel
{
    constructor()
    {
        this._index = 0;
        this._number = 1;
        this._internal = true;
        this._name = '';
        this._unit = '';
        this._decimalPlaces = 0;
        this._probe = undefined;
        this._theme = 'blue';
        this._color = '#0000FF';
        this._values = [];
    }

    getIndex()
    {
        return this._index;
    }

    getNumber()
    {
        return this._number;
    }

    isInternal()
    {
        return this._internal;
    }

    getName()
    {
        return this._name;
    }

    getFullName()
    {
        return 'v' + this._number + ' ' + this._name + ' [' + this._unit + ']';
    }

    getUnit()
    {
        return this._unit;
    }

    getProbe()
    {
        return this._probe;
    }

    getTheme()
    {
        return this._theme;
    }

    getColor()
    {
        return this._color;
    }

    getValues()
    {
        return this._values;
    }

    formateValue(value)
    {
        var result = '';

        result = value.toFixed(this._decimalPlaces).toLocaleString();

        return result;
    }

    loadJsonString(jsonString)
    {
        var jsonData = JSON.parse(jsonString);

        this._index = jsonData.index;
        this._number = jsonData.number;
        this._internal = jsonData.internal;
        this._name = jsonData.name;
        this._unit = jsonData.unit;
        this._probe = new Product();
        this._probe.setName(jsonData.probeName);
        this._probe.setSerialNumber(jsonData.probeSerialNumber);

        this._decimalPlaces = jsonData.decimalPlaces;
        this._theme = jsonData.theme;
        this._color = jsonData.color;
        this._values = [];
        
        var nbValeur = Math.round(Math.random() * 100 + 10);
        var value = 0;
        var oldValue = 20;
        var dateTick = Date.now();

        for (var i = 0 ; i < nbValeur ; i++)
        {
            value = (((Math.random() - 0.5) * 10 + 20) * 0.1 + oldValue * 0.9);
            dateTick = dateTick + 1000;

            this._values.push({ 'value': value, 'date': dateTick });

            oldValue = value;
        }
    }

    createJsonString()
    {
        var json = '';

        return json;
    }
}