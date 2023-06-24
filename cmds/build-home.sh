npx tailwindcss -i ./style.css -o ./assets/css/output.css
rm -rf output/assets
cp -r assets output/assets
cp index.html output/index.html