# コピー元とコピー先のパスを指定
$sourcePath = Get-Location
$destinationPath = "\\SVREDM01\Users\NCXuser\python\ncx-app\packages\shared-ui"

# 除外するファイル・フォルダを指定
$excludeFile = "prisma\dev.db"
$excludeDirs = @(".git", ".github", ".next", ".storybook", "app", "node_modules", "public", "stories")

# コピー先のディレクトリが存在しない場合は作成
if (-Not (Test-Path $destinationPath)) {
    New-Item -ItemType Directory -Path $destinationPath
}

# Robocopyコマンドを実行してコピー
Robocopy $sourcePath $destinationPath /E /XD $excludeDirs /XF $excludeFile
