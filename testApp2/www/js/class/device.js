
class Device extends Product
{
    constructor()
    {
        super();

        this._channels = [];
    }

    getChannels()
    {
        return this._channels;
    }

    loadJsonString(jsonString)
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
    }

    createJsonString()
    {
        var json = '';

        return json;
    }
}