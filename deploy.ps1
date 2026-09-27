# Publish only the reviewed public directory.
# Update publish/ before running this script.

$ErrorActionPreference = 'Stop'
$siteRoot = Join-Path $PSScriptRoot 'publish'

if (-not (Test-Path -LiteralPath (Join-Path $siteRoot 'index.html'))) {
    throw "Missing public site: $siteRoot"
}

wrangler pages deploy $siteRoot --project-name dassa-solutions --branch main
if ($LASTEXITCODE -ne 0) {
    throw "Wrangler deployment failed with exit code $LASTEXITCODE"
}

Write-Host "Dassa Solutions is live at https://dassasolutions.com/" -ForegroundColor Green
