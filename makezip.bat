@echo off
cd ..
"D:/Program Files/7-Zip/7z.exe" a Majors-Minor-Mods.zip "I:\DnD\FoundryVtt\Data\modules\mmm" -xr!*.git* -xr!makezip.bat -xr!Thumbs.db -xr!*.zip -xr!*.pdn -xr!exclude
pause

