# Quick Deploy Script

Write-Host "🚀 Zaplink Deployment Helper" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "📝 Adding files to Git..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💾 Creating commit..." -ForegroundColor Yellow
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Initial commit - Zaplink URL shortener with Firebase"
}
git commit -m $commitMessage
Write-Host "✅ Commit created" -ForegroundColor Green

Write-Host ""
Write-Host "🌐 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create a new repository on GitHub:" -ForegroundColor White
Write-Host "   https://github.com/new" -ForegroundColor Blue
Write-Host ""
Write-Host "2. Copy your repository URL (e.g., https://github.com/username/zaplink.git)"
Write-Host ""
$repoUrl = Read-Host "Paste your GitHub repository URL"

if (-not [string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host ""
    Write-Host "🔗 Adding remote origin..." -ForegroundColor Yellow
    git remote add origin $repoUrl
    
    Write-Host ""
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
    git branch -M main
    git push -u origin main
    
    Write-Host ""
    Write-Host "✅ Code pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Now deploy to Vercel:" -ForegroundColor Cyan
    Write-Host "   1. Go to https://vercel.com/new" -ForegroundColor White
    Write-Host "   2. Import your GitHub repository" -ForegroundColor White
    Write-Host "   3. Add environment variables (see DEPLOYMENT.md)" -ForegroundColor White
    Write-Host "   4. Click Deploy!" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "⚠️  No repository URL provided." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Run these commands manually:" -ForegroundColor White
    Write-Host "   git remote add origin YOUR_REPO_URL" -ForegroundColor Gray
    Write-Host "   git branch -M main" -ForegroundColor Gray
    Write-Host "   git push -u origin main" -ForegroundColor Gray
}

Write-Host ""
Write-Host "📖 For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""
