# PowerShell FTP Upload Script untuk InfinityFree
# Run: .\ftp-upload.ps1

$ftpServer = "ftpupload.net"
$ftpUsername = "if0_40557727"  # Ganti dengan username kamu
$ftpPassword = "YOUR_FTP_PASSWORD"  # Ganti dengan password FTP
$localPath = "c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api"
$remotePath = "/htdocs/api"

Write-Host "🚀 Starting FTP upload to InfinityFree..."
Write-Host "Server: $ftpServer"
Write-Host "Local: $localPath"
Write-Host "Remote: $remotePath"
Write-Host ""

# Create FTP request
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($ftpUsername, $ftpPassword)

# Function to upload file
function Upload-File {
    param (
        [string]$localFile,
        [string]$remoteFile
    )
    
    try {
        $uri = New-Object System.Uri("ftp://$ftpServer$remoteFile")
        $webclient.UploadFile($uri, $localFile)
        Write-Host "✅ Uploaded: $remoteFile"
    } catch {
        Write-Host "❌ Failed: $remoteFile - $_"
    }
}

# Upload config/database.php
Write-Host "📁 Uploading config files..."
Upload-File "$localPath\config\database.php" "$remotePath/config/database.php"

# Upload public/*.php files
Write-Host "📁 Uploading public API files..."
$publicFiles = Get-ChildItem "$localPath\public\*.php"
foreach ($file in $publicFiles) {
    Upload-File $file.FullName "$remotePath/public/$($file.Name)"
}

Write-Host ""
Write-Host "✅ Upload complete!"
Write-Host ""
Write-Host "🧪 Test these URLs:"
Write-Host "https://kualaoutdoor.free.nf/api/public/equipment.php"
Write-Host "https://kualaoutdoor.free.nf/api/public/login.php"

# Cleanup
$webclient.Dispose()
