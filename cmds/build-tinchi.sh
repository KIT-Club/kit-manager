cd packages/tinchi
npm run build-only
rm -rf ../../output/tinchi
mv dist ../../output/tinchi
cp ../../spa.htaccess ../../output/tinchi/.htaccess