
install:
	npm install -g solc && \
	cd web-client && \
	yarn install

build:
	solcjs --bin ./eth/src/job.sol --output-dir ./web-client/src/solidity && \
	solcjs --abi ./eth/src/job.sol --output-dir ./web-client/src/solidity