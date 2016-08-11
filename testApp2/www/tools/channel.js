function Channel()
{
    this._index = 0;
    this._number = 1;
    this._internal = true;
    this._name = '';
    this._unit = '';
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
    return this.isInternal;
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

Channel.prototype.loadJSON = function (json)
{

};

Channel.prototype.createJSON = function ()
{
    var json = '';

    return json;
};