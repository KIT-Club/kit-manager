cd packages/tinchi
npm run build
rm -rf ../../output/tinchi
mv dist ../../output/tinchi
cp ../../spa.htaccess ../../output/tinchi/.htaccess