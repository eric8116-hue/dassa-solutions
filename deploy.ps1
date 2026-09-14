# Dassa Solutions — one-line deploy
# 1. Stamps a fresh build number into every page (cache-buster)
# 2. Publishes to the "main" production branch regardless of local git branch name
# Usage: from this folder, run  .\deploy.ps1

$stamp = Get-Date -Format "yyyyMMddHHmm"
Write-Host "Stamping build $stamp ..." -ForegroundColor Cyan

Get-ChildItem -Path . -Filter *.html | ForEach-Object {
    $t = Get-Content $_.FullName -Raw
    $t = $t -replace 'BUILD \d+', "BUILD $stamp"
    $t = $t -replace '\?v=\d+', "?v=$stamp"
    Set-Content -Path $_.FullName -Value $t -NoNewline
}

Write-Host "Deploying ..." -ForegroundColor Cyan
wrangler pages deploy . --project-name dassa-solutions --branch main --commit-dirty=true

$Host.UI.RawUI.WindowTitle = "BUILD $stamp -- LIVE"

Write-Host ""
Write-Host "=======================================================" -ForegroundColor Green
Write-Host " BUILD $stamp  ->  https://dassa-solutions.pages.dev/?v=$stamp" -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Green
