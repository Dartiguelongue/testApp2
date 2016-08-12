function getBase64ImageFromUrl(url, callback)
{
    ///<summary> Retourne une image au format base64 </summary>
    ///<param name="url" type="String"> URL de l'image </param>
    ///<param name="callback" type="function(data)"> Fonction appelé lorsque l'image est convertie </param>

    var img = new Image;
    var data = '';

    img.onError = function ()
    {
        throw new Error('Cannot load image: "' + url + '"');
    }
    img.onload = function ()
    {
        var canvas = document.createElement('canvas');
        var ctx = undefined;

        document.body.appendChild(canvas);
        canvas.width = img.width;
        canvas.height = img.height;

        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        data = canvas.toDataURL('image/jpeg');
        document.body.removeChild(canvas);

        if (typeof callback === 'function')
        {
            callback(data);
        }
    }
    img.src = url;
}