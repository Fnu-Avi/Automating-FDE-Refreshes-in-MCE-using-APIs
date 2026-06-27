# Automating-FDE-s-in-MCE-using-APIs

# Automated Filtered Data Extension Refresh via Salesforce Marketing Cloud REST APIs

An enterprise-ready programmatic architecture to automate the execution, refresh, and array looping of **Filtered Data Extensions (Custom Objects)** inside **Salesforce Marketing Cloud (SFMC) Engagement**. 

## 🚀 The Challenge
Standard Filtered Data Extensions inside SFMC must normally be refreshed manually via the UI or by configuring standard filter interaction blocks inside Automation Studio. This repository eliminates those constraints by showing how to invoke standard **REST Engine endpoints** natively via **SSJS (Server-Side JavaScript)** and sequential automation tasks.

---

## 🛠️ API Sequence Flow

The integration executes across three primary steps:
1. **OAuth v2 Token Exchange:** Hands over client secrets to the authentication endpoint to fetch a short-lived `access_token` and appropriate `rest_instance_url`.
2. **Data Extension Discovery:** Uses Data rest services to target custom object keys.
3. **Asynchronous Execution:** Posts an empty payload targeting the custom object's underlying unique identifier at `/email/v1/filteredCustomObjects/{id}/refresh`.

---

## 🤖 Implementation: Native SSJS

Deploy the code located in `src/MC_TokenRefreshFilteredDE.ssjs` within an **Automation Studio Script Activity** or an administrative utility **CloudPage**.

### Features built-in:
* **Multi-Object Looping:** Passes an array of separate Data Extension external keys (`objectKeys`), refreshing them in sequence during a single runtime.
* **Inline DOM Logging:** Outputs highly visible, stylized diagnostic responses directly to tracking tables/pages when executed manually.
* **Error Containment:** Protects loops from breaking if an single invalid token frame drops.

## ⚙️ Provisioning and Access Requirements

To use this solution, configure an **Installed Package** in Salesforce Marketing Cloud under `Administration > Platform Tools > Apps`:
1. Add an API Integration Component.
2. Select **Server-to-Server** authentication integration.
3. Apply the following permissions to the scoped package:
   * **Automation:** `Execute`
   * **Data Extensions:** `Read`, `Write`

---
## 📄 License
This repository is licensed under the MIT License.
