call npm install forever -g
call npm install typescript@latest -g

call tsc -p tsconfig.json
forever -f build\src\app.js