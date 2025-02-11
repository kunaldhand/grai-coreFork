---
title: SQL Server GitHub Action
description: Documentation for Grai's SQL Server GitHub Action GitHub action.
---

# Microsoft SQL Server

The SQL Server action depends on the python pyodbc library. 
You can find complete documentation about the library [here](https://github.com/mkleehammer/pyodbc/wiki).

There are a variety of ways to configure a pyodbc connection depending on your security implementation.
A standard connection would consist of a host, port, database name, user, and password.

### Fields



| Field | Required | Default | Description |
|-----|-----|-----|-----|
| db-host | no |  | The MSSQL database host |
| db-port | no | 1433 | The MSSQL database port. |
| db-database-name | no |  | The database name |
| db-user | no | sa | The database user |
| db-password | no |  | The database password |
| encrypt | no |  | True/False Indicates whether to use an encrypted connection to mssql |
| trusted_connection | no |  | True/False whether the SQL Server connection is trusted. Sets `Trusted_Connection=yes` in pyodbc. |
| protocol | no | tcp | Connection protocol for the database. One of 'tcp', 'Icp', or 'NP' |
| server_connection_string | no |  | An optional ODBC server connection string to use when connecting to the server. These are usually constructed as `{protocol}:{host},{port}`. This |
| trust_server_certificate | no | true | Sets the ODBC connection string `TrustServerCertificate` |




### Example



```yaml copy
on:
  - pull_request
name: SQL Server
jobs:
  test_mssql:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Grai Action
        uses: grai-io/grai-actions/mssql@master
        with:
          namespace: my_apps_grai_namespace
          api-key: my_grai_api_key
          action: tests
          source-name: prod-db
          grai-api-url: https://api.grai.io
          db-user: sa
          db-password: sa_password
          server_connection_string: tcp:myserver,1433
          trust_server_certificate: 'true'

```



