@echo off
REM Build validation script for Windows

echo Checking TypeScript types...
call npm run type-check
if errorlevel 1 (
    echo TypeScript check failed
    exit /b 1
)
echo TypeScript check passed

echo Running ESLint...
call npm run lint

echo Building project...
call npm run build
if errorlevel 1 (
    echo Build failed
    exit /b 1
)

echo Build completed successfully
echo Ready for deployment!
