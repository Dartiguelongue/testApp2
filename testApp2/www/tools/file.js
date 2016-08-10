
function readTextFile(folderPath, fileName, encoding, callback)
{
    ///<summary> Lecture d'un fichier texte </summary>
    ///<param name="folderPath" type="cordova.file"> Chemin du dossier </param>
    ///<param name="fileName" type="String"> Nom du fichier </param>
    ///<param name="encoding" type="String"> Encodage de lecture </param>
    ///<param name="callback" type="function(data)"> Fonction appelée lorsque la lecture est terminée </param>

    window.resolveLocalFileSystemURL(folderPath + fileName, fileFound, readError);

    function fileFound(fileEntry)
    {
        fileEntry.file(fileOpen);
    }

    function fileOpen(file)
    {
        var reader = new FileReader();

        reader.onloadend = callback;

        reader.onerror = readError;

        reader.readAsText(file, encoding);
    }

    function readError(error)
    {
        throw new Error('Cannot read file : "' + error + '"');
    }
}

function readBinaryFile(folderPath, fileName, callback)
{
    ///<summary> Lecture d'un fichier binaire </summary>
    ///<param name="folderPath" type="cordova.file"> Chemin du dossier </param>
    ///<param name="fileName" type="String"> Nom du fichier </param>
    ///<param name="callback" type="function(data)"> Fonction appelée lorsque la lecture est terminée </param>

    window.resolveLocalFileSystemURL(folderPath + fileName, fileFound, readError);

    function fileFound(fileEntry)
    {
        fileEntry.file(fileOpen);
    }

    function fileOpen(file)
    {
        var reader = new FileReader();

        reader.onloadend = callback;

        reader.onerror = readError;

        reader.readAsArrayBuffer(file);
    }

    function readError(error)
    {
        throw new Error('Cannot read file : "' + error + '"');
    }
}

function writeTextFile(folderPath, fileName, text, callback)
{
    ///<summary> Ecriture d'un fichier texte </summary>
    ///<param name="folderPath" type="cordova.file"> Chemin du dossier </param>
    ///<param name="fileName" type="String"> Nom du fichier </param>
    ///<param name="text" type"String"> Texte à écrire </param>
    ///<param name="callback" type="function()"> Fonction appelée lorsque l'écriture est terminée </param>

    window.resolveLocalFileSystemURL(folderPath, directoryFound, writeError);

    function directoryFound(fileSystem)
    {
        fileSystem.getFile(fileName, { create: true }, fileFoundOrCreate);
    }

    function fileFoundOrCreate(entry)
    {
        entry.createWriter(writerCreate, writeError);
    }

    function writerCreate(writer)
    {
        writer.onwriteend = callback;

        writer.onerror = writeError;

        writer.write(text);
    }

    function writeError(error)
    {
        throw new Error('Cannot write file : "' + error + '"');
    }
}

function writeBinaryFile(folderPath, fileName, binaryArray, callback)
{
    ///<summary> Ecriture d'un fichier binaire </summary>
    ///<param name="folderPath" type="cordova.file"> Chemin du dossier </param>
    ///<param name="fileName" type="String"> Nom du fichier </param>
    ///<param name="binaryArray" type"ArrayBuffer"> Buffer à écrire </param>
    ///<param name="callback" type="function()"> Fonction appelée lorsque l'écriture est terminée </param>
    
    window.resolveLocalFileSystemURL(folderPath, directoryFound, writeError);

    function directoryFound (fileSystem)
    {
        fileSystem.getFile(fileName, { create: true }, fileFoundOrCreate);
    }

    function fileFoundOrCreate(entry)
    {
        entry.createWriter(writerCreate, writeError);
    }

    function writerCreate(writer)
    { 
        writer.onwriteend = callback;

        writer.onerror = writeError;

        writer.write(binaryArray);
    }

    function writeError(error)
    {
        throw new Error('Cannot write file : "' + error + '"');
    }    
}

function openFile(folderPath, fileName)
{
    ///<summary> Ouverture d'un fichier avac l'application par défaut</summary>
    ///<param name="folderPath" type="cordova.file"> Chemin du dossier </param>
    ///<param name="fileName" type="String"> Nom du fichier </param>

    cordova.plugins.disusered.open(folderPath + fileName, openSuccess, openError);

    function openSuccess()
    {

    }

    function openError(error)
    {
        throw new Error('Cannot open file : "' + error + '"');
    }
}