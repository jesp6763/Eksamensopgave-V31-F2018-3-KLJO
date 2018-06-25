/**
 * Contains some basic HTTPRequest utilities.
 */
class HTTPRequestUtil
{
    /**
     * The general XMLHTTPRequest method. 
     * @param {string} methodType GET or POST
     * @param {string} url The url to the file
     * @param {boolean} async Whether or not the call should be asynchronous.
     * @param {function} requestDoneCallback The function that will be called when the async action is done.
     * @param {string} mimeType The mime type 
     */
    static _Request(methodType, url, async = true, requestDoneCallback = null, mimeType = "application/json")
    {
        let xhttpRequest = new XMLHttpRequest();
        xhttpRequest.overrideMimeType(mimeType);
        xhttpRequest.open(methodType, url, async)

        xhttpRequest.onreadystatechange = function(){
            if(xhttpRequest.readyState == 4){
                if(xhttpRequest.status == "200"){
                    if(requestDoneCallback)
                    {
                        // TODO: To make it more general, move this line to after the if statements, and then return the status and ready state. Then it will be more general.
                        requestDoneCallback(xhttpRequest.responseText);
                    }
                    else{
                        return xhttpRequest.responseText;
                    }
                }
            }
        }

        xhttpRequest.send(null);
    }

    /**
     * Creates a new asynchronous XMLHttpRequest.
     * Returns the response text.
     * @param {string} methodType The method type of the request. GET or POST.
     * @param {string} mimeType The mime type. 
     */
    static RequestAsync(methodType, url, requestDoneCallback, mimeType = "application/json")
    {
        this._Request(methodType, url, true, requestDoneCallback, mimeType);
    }

    /**
     * Creates a new synchronous XMLHttpRequest.
     * Returns the response text.
     * @param {string} methodType The method type of the request. GET or POST.
     * @param {string} mimeType The mime type. 
     */
    static RequestSync(methodType, url, mimeType = "application/json"){
        this._Request(methodType, url, false, null, mimeType);
    }
}