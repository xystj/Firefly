param([switch]$Repair)

$root = "C:\Users\xystj\Desktop\wz1\Firefly\node_modules"
$patterns = @(
    "$root\*",
    "$root\.pnpm\*\node_modules\*",
    "$root\.pnpm\*\node_modules\@*\*",
    "$root\@*\*"
)

$links = @()
foreach ($p in $patterns) {
    $links += Get-ChildItem -Path $p -Force -ErrorAction SilentlyContinue |
        Where-Object { $_.Attributes -match 'ReparsePoint' }
}

$broken = 0
$fixed = 0
$unresolved = 0

foreach ($item in ($links | Sort-Object FullName -Unique)) {
    $target = $item.Target
    if ($target -is [array]) { $target = $target[0] }
    if ([string]::IsNullOrWhiteSpace($target)) { continue }
    if (Test-Path -LiteralPath $target) { continue }

    $broken++
    $m = [regex]::Match($target, '(?i)\\drive\\([A-Z])\\(.+)$')
    if (-not $m.Success) {
        $unresolved++
        continue
    }
    $real = $m.Groups[1].Value + ":\" + $m.Groups[2].Value.Replace('/', '\')
    if (-not (Test-Path -LiteralPath $real)) {
        $unresolved++
        continue
    }

    if ($Repair) {
        try {
            [System.IO.Directory]::Delete($item.FullName, $false)
            New-Item -ItemType Junction -Path $item.FullName -Target $real -ErrorAction Stop | Out-Null
            $fixed++
        } catch {
            Write-Output ("FAILED: " + $item.FullName + " -> " + $real + " :: " + $_.Exception.Message)
            $unresolved++
        }
    }
}

Write-Output ("totalLinks=" + ($links | Sort-Object FullName -Unique).Count)
Write-Output ("broken=" + $broken)
Write-Output ("fixed=" + $fixed)
Write-Output ("unresolved=" + $unresolved)
