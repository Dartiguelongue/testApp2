function Device()
{
    this._code = 0;
    this._name  = '';
    this._serialNumber = '';
    this._version = 0.0;
    this._build = 0;
    this._channels = [];
}

Device.prototype.getCode = function()
{
    return this._code;
};

Device.prototype.getName = function ()
{
    return this._name;
};

Device.prototype.getSerialNumber = function ()
{
    return this._serialNumber;
};

Device.prototype.getNameWithSerialNumber = function()
{
    return this._name + ' - ' + this._serialNumber;
}

Device.prototype.getVersion = function ()
{
    return this._version;
};

Device.prototype.getBuild = function ()
{
    return this._build;
};

Device.prototype.getFullVersionString = function ()
{
    return this._version + ' (b' + this._build + ')';
};

Device.prototype.getChannelNumber = function ()
{
    return this._channels.length;
};

Device.prototype.getChannel = function (index)
{
    return this._channels[index];
};

Device.prototype.loadJSON = function (json)
{

};

Device.prototype.createJSON = function ()
{
    var json = '';

    return json;
};