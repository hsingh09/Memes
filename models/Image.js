var azure = require('azure-storage');
var blobSvc = null;

// Constants
var CONTAINER_NAME = "memes"

exports.EnsureBlobStorage = function(callback)
{
    console.log("Connecting to blob storage account");
    blobSvc = azure.createBlobService();
    callback(null);
}

exports.EnsureMemeContainer = function(callback)
{
    console.log("EnsureMemeContainer Called");
    blobSvc.createContainerIfNotExists('memes', {publicAccessLevel : 'blob'}, function(error, result, response)
    {
      if(!error)
      {
        if (result)
        {
            console.log("Created memes container");
        }
      }

      callback(null);
    });
}

exports.UploadBlob = function(filename, callback)
{
    console.log("UploadBlog called for file " + filename);

    blobSvc.createBlockBlobFromLocalFile(CONTAINER_NAME, filename, filename, function(error, result, response){
        if (error)
        {
            console.log("FAIL");
            console.log(error);
        }
        else
        {
            callback(null);
        }
    });
}

// TODO: Check for naming conflicts and auto rename files
exports.UploadBlobFromBuffer = function(buffer, mimetype, filename, length, callback)
{
    console.log("UploadBlob from buffer called");
    var options = { contentType: mimetype };

    blobSvc.createBlockBlobFromText(CONTAINER_NAME, filename, buffer, options,
        function(err, result, response)
        {
            console.log("Callback invoked");
            if (err)
            {
                console.log("ERROR");
                console.log(err);
            }

            console.log(result);
            var container = result.container;
            var blobName = result.blob;

            callback(err, container, blobName);
        });

}