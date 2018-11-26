#!/bin/bash
echo "This script will set up the project assuming all required software/tools is installed."
echo "If this is *NOT* your first time running this, please remove all tables/the entire database project-c-webshop from Postgres."
echo "MAKE SURE THE PREVIOUS STATEMENT IS COMPLETED."
read -p "Press any key to continue..."

echo "Building data model:"
cd ./backend-datamodel
dotnet build

echo "Updating database with latest structure"
dotnet ef database update

echo "Run filling tool v2"
cd ../database-filling-tool-v2
dotnet run

echo "If nothing failed, assume everything worked"
