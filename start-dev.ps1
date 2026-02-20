# Run backend and frontend in parallel (Windows PowerShell)
# Usage: .\start-dev.ps1

Write-Host "Instalando dependências (backend + frontend)..."
npm --prefix .\backend install
npm --prefix .\frontend install

Write-Host "Iniciando backend e frontend (dev)..."
Start-Process -NoNewWindow -WorkingDirectory "$PWD\backend" -FilePath npm -ArgumentList 'run','dev'
Start-Process -NoNewWindow -WorkingDirectory "$PWD\frontend" -FilePath npm -ArgumentList 'run','dev'

Write-Host "Comandos lançados. Verifique o output nas janelas de terminal abertas ou acesse:"
Write-Host "- Backend: http://localhost:4000"
Write-Host "- Frontend: http://localhost:5173"