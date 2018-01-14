
install:
	npm install -g solc && \
	cd web-client && \
	yarn install

build:
	solcjs --bin ./eth/src/job.sol && \
	solcjs --abi ./eth/src/job.sol
