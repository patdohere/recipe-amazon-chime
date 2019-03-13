src=*
dst=~/Library/Application\ Support/Franz/recipes/dev/amazon-chime/
mkdir "$dst"
rsync -avz --exclude=".*" --exclude="*.sh" * "$dst"
# ls -l "$dst"
find "$dst"