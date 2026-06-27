#!/bin/bash

# ==============================================================================
# SFMC FILTERED DATA EXTENSION API REFRESH SEQUENTIAL FLOW (SANITIZED)
# ==============================================================================

echo "🤖 Step 1: Requesting OAuth2 Access Token..."
curl --location 'https://YOUR_SUBDOMAIN.auth.marketingcloudapis.com/v2/token' \
--header 'Content-Type: application/json' \
--data '{
    "grant_type": "client_credentials",
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "account_id": "YOUR_ACCOUNT_MID"
}'

echo -e "\n🔍 Step 2: Querying Target DE Rows (Metadata Validation Check)..."
curl --location 'https://YOUR_SUBDOMAIN.rest.marketingcloudapis.com/data/v1/customobjectdata/key/YOUR_DE_EXTERNAL_KEY/rowset?%24pageSize=1' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'

echo -e "\n🚀 Step 3: Trigger Asynchronous Filtered DE Refresh Request..."
curl --location --request POST 'https://YOUR_SUBDOMAIN.rest.marketingcloudapis.com/email/v1/filteredCustomObjects/YOUR_DE_OBJECT_ID/refresh' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
