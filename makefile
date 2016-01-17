all:
	cat vec2.js renderer.js ship.js top.js > testout.js

clean:
	rm testout.js
