$FILE_PATH = $args[0]

git add .
git commit -m "Update post: $FILE_PATH"
git push origin main