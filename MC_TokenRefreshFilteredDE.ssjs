<script runat="server">
    Platform.Load("core", "1");
    
    // --- Define the list of Filtered Custom Object (DE) external keys to refresh ---
    var objectKeys = [
        "YOUR_DE_EXTERNAL_KEY_1", // e.g., Regional Filtered Audience 01
        "YOUR_DE_EXTERNAL_KEY_2"  // e.g., Regional Filtered Audience 02
    ];

    // --- Configuration for Call-1: Get Token ---
    var authUrl = 'https://YOUR_SUBDOMAIN.auth.marketingcloudapis.com/v2/token';
    var payload = {
        "grant_type": "client_credentials",
        "client_id": "YOUR_CLIENT_ID", 
        "client_secret": "YOUR_CLIENT_SECRET", 
        "account_id": "YOUR_ACCOUNT_MID" 
    };

    var accessToken = null;
    var restInstanceUrl = null;
    var statusMessage = "";

    Write('<div style="font-family: Arial, sans-serif; padding: 15px; border: 1px solid #ccc; border-radius: 8px;">');

    // --- Execute Call-1: Get Token ---
    // Stringify() requires Platform.Load("core", "1")
    var accessTokenResponse = HTTP.Post(authUrl, 'application/json', Stringify(payload));

    if (accessTokenResponse.StatusCode == 200) {
        
        // Parse the token response
        var responseJson = Platform.Function.ParseJSON(accessTokenResponse.Response[0]);

        // Extract required values for Call-2
        accessToken = responseJson.access_token;
        restInstanceUrl = responseJson.rest_instance_url;
        
        Write('<h1>✅ Call-1: Token Retrieval Successful</h1>');
        Write('<p><b>Access Token:</b> ' + accessToken.substring(0, 30) + '... (truncated)</p>');
        Write('<p><b>REST Base URL:</b> ' + restInstanceUrl + '</p>');
        Write('<hr>');

        // --- Execute Call-2: Loop through and Refresh Objects ---
        var authHeader = 'Bearer ' + accessToken;
        var dataPayload = '{}'; 
        
        for (var i = 0; i < objectKeys.length; i++) {
            var currentKey = objectKeys[i];
            
            // Construct the URL dynamically for the current object key
            var refreshUrl = restInstanceUrl + '/email/v1/filteredCustomObjects/' + currentKey + '/refresh';
            
            Write('<h2>➡️ Refreshing Object ID: ' + currentKey + ' (' + (i + 1) + '/' + objectKeys.length + ')</h2>');
            
            // Execute the API call
            var refreshResponse = HTTP.Post(
                refreshUrl, // URL
                'application/json', // Content-Type for data
                dataPayload, // Data payload (empty body)
                ["Authorization"], // Header Names Array
                [authHeader] // Header Values Array
            );

            // --- Process Call-2 Response ---
            if (refreshResponse.StatusCode == 202 || refreshResponse.StatusCode == 200) {
                statusMessage = '✅ <b>SUCCESS</b>: Request Accepted for Processing.';
            } else {
                statusMessage = '❌ <b>FAILURE</b>: Check Response for Details.';
            }

            Write('<p><b>Status Code:</b> ' + refreshResponse.StatusCode + '</p>');
            Write('<p>' + statusMessage + '</p>');
            Write('<pre style="background:#f0f0f0; padding:10px; border-radius: 4px;">Response: ' + refreshResponse.Response + '</pre>');
            Write('<hr>');
        }

    } else {
        // Handle the Call-1 failure case
        Write('<h1>❌ Call-1: Token Retrieval Failed</h1>');
        Write('<p><b>Status Code:</b> ' + accessTokenResponse.StatusCode + '</p>');
        Write('<pre style="background:#fee; padding:10px; border: 1px solid #fdd; border-radius: 4px;">Response: ' + accessTokenResponse.Response + '</pre>');
    }
    
    Write('</div>');
</script>
