$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$indexPath = Join-Path $root 'index.html'
$cssPath = Join-Path $root 'styles.css'
$jsPath = Join-Path $root 'app.js'
$outPath = Join-Path $root 'index-standalone.html'

$index = Get-Content -Raw -Encoding UTF8 $indexPath
$css = Get-Content -Raw -Encoding UTF8 $cssPath
$js = Get-Content -Raw -Encoding UTF8 $jsPath

$styleBlock = "<style>`n$css`n</style>"
$appScriptBlock = "<script>`n$js`n</script>"

$headPattern = '<link rel="stylesheet" href="styles\.css" id="main-stylesheet" />\s*<script>.*?</script>'
$footerPattern = '<script>\s*\(function \(\) \{.*?document\.body\.appendChild\(script\);\s*\}\)\(\);\s*</script>'

$index = [regex]::Replace(
  $index,
  $headPattern,
  [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $styleBlock },
  [System.Text.RegularExpressions.RegexOptions]::Singleline
)

$index = [regex]::Replace(
  $index,
  $footerPattern,
  [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $appScriptBlock },
  [System.Text.RegularExpressions.RegexOptions]::Singleline
)

[System.IO.File]::WriteAllText($outPath, $index, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Generado: $outPath"
