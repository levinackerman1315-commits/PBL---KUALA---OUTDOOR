# FileZilla FTP Configuration for InfinityFree

## Connection Details:
Host: ftpupload.net
Port: 21
Protocol: FTP
Encryption: Use explicit FTP over TLS if available

Username: if0_40557727
Password: [Get from InfinityFree Control Panel → FTP Details]

## Local Folder:
c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api

## Remote Folder:
/htdocs/api

## Transfer Settings:
- Transfer Type: Binary
- File exists action: Overwrite
- Preserve timestamps: Yes

## Quick Upload Steps:
1. Download FileZilla: https://filezilla-project.org/download.php?type=client
2. Open FileZilla
3. File → Site Manager → New Site
4. Enter connection details above
5. Connect
6. Navigate left panel: c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api
7. Navigate right panel: /htdocs/
8. Drag & drop 'api' folder from left to right
9. Wait for upload to complete

## After Upload:
Test: https://kualaoutdoor.free.nf/api/public/equipment.php
Should return JSON data
