# Automating Filtered Data Extension Refreshes in MCE using APIs

An enterprise-ready programmatic architecture to automate the execution, refresh, and array looping of **Filtered Data Extensions (Custom Objects)** inside **Salesforce Marketing Cloud Engagement (MCE)**. 

## 🚀 The Challenge
Standard Filtered Data Extensions inside SFMC typically require manual interaction via the user interface or a configured Filter Activity within Automation Studio. This framework eliminates those overhead constraints by executing standard **REST Engine endpoints** natively via **SSJS (Server-Side JavaScript)**—allowing you to dynamically chain or schedule refreshes programmatically.

---

## 🛠️ API Sequence Flow

The integration executes sequentially across three primary operations:
1. **OAuth v2 Token Exchange:** Formulates a secure handshake with the authentication server (`/v2/token`) using client credentials to fetch an operational `access_token` and target `rest_instance_url`.
2. **Data Extension Discovery:** Verifies and targets rows by referencing the Filtered Data Extension's External Key identifier.
3. **Asynchronous Execution:** Submits a POST request with an empty body payload targeting the underlying Custom Object ID at `/email/v1/filteredCustomObjects/{id}/refresh` to trigger the backend data re-evaluation.

---

## 📂 Repository Layout

```text
Automating-FDE-Refreshes-in-MCE-using-APIs/
├── .gitignore                   # Excludes runtime logging and local editor overhead
├── LICENSE                      # MIT Open Source usage guidelines
├── README.md                    # Main operational playbook and architecture guide
├── api/
│   └── curl_examples.sh         # Sanitized command-line cURL templates for sandboxed testing
└── src/
    └── MC_TokenRefreshFilteredDE.ssjs # Production script for Automation Studio Script Activities
```

## 🤖 Implementation: Native SSJS Scripting

Deploy the optimized distribution script located in `src/MC_TokenRefreshFilteredDE.ssjs` within an **Automation Studio Script Activity** or an internal administrative utility **CloudPage**.

### Built-in Framework Features:
* **Multi-Object Looping:** Iterates through a variable configuration array of separate Data Extension external keys (`objectKeys`), processing multiple asynchronous refreshes safely in a single execution thread.
* **Inline DOM Logging:** Outputs highly readable, HTML-stylized diagnostic updates directly to the viewport when run manually in an administrative setup.
* **Error Containment:** Structured conditional checkblocks insulate the looping routine, ensuring a single misconfigured key doesn't crash the entire transaction flow.

## ⚙️ Provisioning & Security Requirements

To deploy this automation pattern, you must configure an **Installed Package** within your target Marketing Cloud instance under `Setup > Platform Tools > Apps > Installed Packages`:

1. Click **New**, name the package, and add an **API Integration** Component.
2. Select the **Server-to-Server** authentication properties flow.
3. Apply these exact minimum-scoped permissions to satisfy the framework:
   * **Automation:** `Execute`
   * **Data Extensions:** `Read`, `Write`

> ⚠️ **Security Warning:** Never commit live, un-sanitized client secrets or tenant-specific subdomains to public remote version control systems. Always use configuration strings or environment variables when deploying live scripts.

---
## 📄 License
This repository is open-source software licensed under the [MIT License](LICENSE).
