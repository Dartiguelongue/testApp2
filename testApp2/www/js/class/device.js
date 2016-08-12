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

Device.prototype.getChannels = function ()
{
    return this._channels;
};

Device.prototype.loadJsonString = function (jsonString)
{
    var jsonData = JSON.parse(jsonString);

    this._code = jsonData.code;
    this._name = jsonData.name;
    this._serialNumber = jsonData.serialNumber;
    this._version = jsonData.version;
    this._build = jsonData.build;
    
    this._channels = [];

    for (var i = 0 ; i < jsonData.channels.length ; i++)
    {
        var channel = new Channel();

        channel.loadJsonString(JSON.stringify(jsonData.channels[i]));

        this._channels.push(channel);
    }
};

Device.prototype.createJsonString = function ()
{
    var json = '';

    return json;
};