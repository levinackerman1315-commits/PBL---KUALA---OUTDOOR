# Create ZIP package for InfinityFree upload
# Run this in PowerShell

$source = "c:\xampp\htdocs\PBL-KELANA-OUTDOOR\api"
$destination = "c:\xampp\htdocs\PBL-KELANA-OUTDOOR\infinityfree-upload.zip"

# Remove old zip if exists
if (Test-Path $destination) {
    Remove-Item $destination
}

# Create new zip
Compress-Archive -Path $source -DestinationPath $destination

Write-Host "✅ ZIP created: $destination"
Write-Host ""
Write-Host "📁 Next steps:"
Write-Host "1. Login to InfinityFree: https://app.infinityfree.com"
Write-Host "2. Open File Manager"
Write-Host "3. Navigate to /htdocs/"
Write-Host "4. Upload infinityfree-upload.zip"
Write-Host "5. Extract the ZIP"
Write-Host "6. Verify folder structure: /htdocs/api/config/ and /htdocs/api/public/"
