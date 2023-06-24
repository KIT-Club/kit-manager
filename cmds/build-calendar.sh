cd packages/calendar
npm run build
rm -rf ../../output/calendar
mv build ../../output/calendar
cp ../../spa.htaccess ../../output/calendar/.htaccess