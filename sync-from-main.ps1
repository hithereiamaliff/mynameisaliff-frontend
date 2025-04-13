# Sync script to copy files from main website to frontend repo
# While sanitizing sensitive information

$sourceDir = "D:\Codeium\mynameisaliff"
$targetDir = "D:\Codeium\mynameisaliff-frontend"

# Files to exclude (sensitive or not needed in public repo)
$excludeFiles = @(
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    "*.key",
    "*.pem",
    "*secret*",
    "*password*",
    "*credential*",
    "clean-and-sync.ps1",
    "sync-public.ps1"
)

# Directories to exclude
$excludeDirs = @(
    ".git",
    "node_modules",
    ".github",
    "server",
    "backend"
)

# Create function to sanitize content
function SanitizeContent {
    param (
        [string]$content,
        [string]$filePath
    )

    # Sanitize API keys and sensitive information
    $content = $content -replace '(OPENAI_API_KEY|STRIPE_SECRET_KEY|STRIPE_PUBLISHABLE_KEY|SANITY_TOKEN|SUPABASE_KEY)="[^"]*"', '$1="YOUR_KEY_HERE"'
    $content = $content -replace '(OPENAI_API_KEY|STRIPE_SECRET_KEY|STRIPE_PUBLISHABLE_KEY|SANITY_TOKEN|SUPABASE_KEY)=''[^'']*''', '$1=''YOUR_KEY_HERE'''
    $content = $content -replace '(apiKey|secretKey|publishableKey|token|password|key):\s*["'']([^"'']+)["'']', '$1: "YOUR_KEY_HERE"'
    $content = $content -replace 'const\s+(apiKey|secretKey|publishableKey|token|password|key)\s*=\s*["'']([^"'']+)["'']', 'const $1 = "YOUR_KEY_HERE"'
    $content = $content -replace 'process\.env\.(OPENAI_API_KEY|STRIPE_SECRET_KEY|STRIPE_PUBLISHABLE_KEY|SANITY_TOKEN|SUPABASE_KEY)', 'process.env.YOUR_KEY_HERE'
    
    # Special handling for OpenAI configuration
    $content = $content -replace '(new OpenAI\(\{\s*apiKey:\s*)[^,}]+', '$1"YOUR_OPENAI_KEY_HERE"'
    
    # Handle Stripe configuration
    $content = $content -replace '(const\s+stripe\s*=\s*new\s+Stripe\(\s*)[^,)]+', '$1"YOUR_STRIPE_KEY_HERE"'
    
    # Sanitize personal website URLs - only target specific URLs with 'mynameisaliff'
    $content = $content -replace 'mynameisaliff-backend-production\.up\.railway\.app', 'your-backend-url.example.com'
    $content = $content -replace 'mynameisaliff\.com', 'your-website.example.com'
    $content = $content -replace 'mynameisaliff\.netlify\.app', 'your-website.example.com'
    $content = $content -replace 'mynameisaliff\.vercel\.app', 'your-website.example.com'
    
    # Sanitize specific personal information - DO NOT sanitize bank names or generic information
    # Only sanitize actual account numbers, not placeholders or examples
    if ($filePath -match 'Donation' -or $filePath -match 'Payment') {
        # Look for patterns that are likely real account numbers (not placeholders)
        # This regex matches account numbers that aren't already placeholders like XXXX
        $content = $content -replace '(?<!X)\b\d{10,14}\b(?!X)', 'XXXXXXXXXXXX'
        
        # Credit card number format (16 digits, possibly with spaces or dashes)
        $content = $content -replace '\b(?:\d{4}[- ]?){3}\d{4}\b', 'XXXX-XXXX-XXXX-XXXX'
        $content = $content -replace '(?<!X)\b\d{16}\b(?!X)', 'XXXXXXXXXXXXXXXX'
    }
    
    # Phone numbers (Malaysian format) - only in specific contexts
    $content = $content -replace '\b(?:\+?6?01\d{1}[-\s]?\d{3,4}[-\s]?\d{4})\b', '+60XX-XXX-XXXX'
    
    # Only sanitize email addresses that appear to be personal (not example.com)
    $content = $content -replace '\b[A-Za-z0-9._%+-]+@(?!example\.com)[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b', 'email@example.com'
    
    # Return sanitized content
    return $content
}

# Function to copy files with sanitization
function CopyWithSanitization {
    param (
        [string]$source,
        [string]$destination,
        [array]$excludeFiles,
        [array]$excludeDirs
    )

    # Create destination directory if it doesn't exist
    if (-not (Test-Path $destination)) {
        New-Item -ItemType Directory -Path $destination | Out-Null
    }

    # Get all items in source directory
    $items = Get-ChildItem -Path $source

    foreach ($item in $items) {
        $destinationPath = Join-Path $destination $item.Name
        
        # Skip excluded directories
        if ($item.PSIsContainer -and $excludeDirs -contains $item.Name) {
            Write-Host "Skipping excluded directory: $($item.FullName)"
            continue
        }
        
        # Skip excluded files
        if (-not $item.PSIsContainer) {
            $skipFile = $false
            foreach ($pattern in $excludeFiles) {
                if ($item.Name -like $pattern) {
                    $skipFile = $true
                    break
                }
            }
            
            if ($skipFile) {
                Write-Host "Skipping excluded file: $($item.FullName)"
                continue
            }
        }
        
        # Handle directories recursively
        if ($item.PSIsContainer) {
            CopyWithSanitization -source $item.FullName -destination $destinationPath -excludeFiles $excludeFiles -excludeDirs $excludeDirs
        }
        # Handle files
        else {
            # Check file extension for text files that need sanitization
            $textExtensions = @(".js", ".jsx", ".ts", ".tsx", ".json", ".md", ".html", ".css", ".yml", ".yaml", ".toml", ".env", ".example", ".txt")
            $needsSanitization = $textExtensions -contains $item.Extension
            
            if ($needsSanitization) {
                # Read, sanitize, and write content
                $content = Get-Content -Path $item.FullName -Raw
                $sanitizedContent = SanitizeContent -content $content -filePath $item.FullName
                Set-Content -Path $destinationPath -Value $sanitizedContent
                Write-Host "Copied and sanitized: $($item.FullName) -> $destinationPath"
            }
            else {
                # Binary or non-text file, just copy
                Copy-Item -Path $item.FullName -Destination $destinationPath -Force
                Write-Host "Copied: $($item.FullName) -> $destinationPath"
            }
        }
    }
}

# Special handling for package.json to update dependencies
function UpdatePackageJson {
    $sourcePackageJson = Join-Path $sourceDir "package.json"
    $targetPackageJson = Join-Path $targetDir "package.json"
    
    if ((Test-Path $sourcePackageJson) -and (Test-Path $targetPackageJson)) {
        $sourceContent = Get-Content -Path $sourcePackageJson -Raw | ConvertFrom-Json
        $targetContent = Get-Content -Path $targetPackageJson -Raw | ConvertFrom-Json
        
        # Update dependencies
        $targetContent.dependencies = $sourceContent.dependencies
        $targetContent.devDependencies = $sourceContent.devDependencies
        
        # Write updated package.json
        $targetContent | ConvertTo-Json -Depth 10 | Set-Content -Path $targetPackageJson
        Write-Host "Updated package.json with dependencies from main repo"
    }
}

# Main execution
Write-Host "Starting sync from $sourceDir to $targetDir..."

# First backup .git directory
$gitBackupDir = Join-Path $env:TEMP "git-backup-$(Get-Date -Format 'yyyyMMddHHmmss')"
Copy-Item -Path (Join-Path $targetDir ".git") -Destination $gitBackupDir -Recurse -Force
Write-Host "Backed up .git directory to $gitBackupDir"

# Sync files
CopyWithSanitization -source $sourceDir -destination $targetDir -excludeFiles $excludeFiles -excludeDirs $excludeDirs

# Restore .git directory
Remove-Item -Path (Join-Path $targetDir ".git") -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path $gitBackupDir -Destination (Join-Path $targetDir ".git") -Recurse -Force
Write-Host "Restored .git directory"

# Update package.json
UpdatePackageJson

Write-Host "Sync completed!"
Write-Host "Remember to review the changes and commit them to your repository."
