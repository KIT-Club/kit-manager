cd packages/member
npm run build
npm run export
rm -rf ../../output/member
mv out ../../output/member
cp ../../spa.htaccess ../../output/member/.htaccess