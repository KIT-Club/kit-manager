npm run build -w packages/member
npm run export -w packages/member

cd packages/member

rm -rf ../../output/member
mv out ../../output/member
cp ../../spa.htaccess ../../output/member/.htaccess