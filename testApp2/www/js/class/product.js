class Product
{
    constructor()
    {
        this._code = 0;
        this._name = '';
        this._serialNumber = '';
        this._version = 0.0;
        this._build = 0;
    }

    getCode()
    {
        return this._code;
    }

    getName()
    {
        return this._name;
    }

    setName(value)
    {
        this._name = value;
    }

    getSerialNumber()
    {
        return this._serialNumber;
    }

    setSerialNumber(value)
    {
        this._serialNumber = value;
    }

    getNameWithSerialNumber()
    {
        return this._name + ' - ' + this._serialNumber;
    }

    getVersion()
    {
        return this._version;
    }

    getBuild()
    {
        return this._build;
    }

    getFullVersionString()
    {
        return this._version + ' (b' + this._build + ')';
    };
}