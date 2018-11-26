@ECHO OFF
cls

ECHO This script will set up the project assuming all required software/tools is installed.
ECHO If this is *NOT* your first time running this, please remove all tables/the entire database project-c-webshop from Postgres.
ECHO MAKE SURE THE PREVIOUS STATEMENT IS COMPLETED.
PAUSE

ECHO Building data model:
cd ./backend-datamodel
dotnet build

ECHO Updating database with latest structure
dotnet ef database update

ECHO Run filling tool v2
cd ../database-filling-tool-v2
dotnet run

ECHO If nothing failed, assume everything worked : )
PAUSE
