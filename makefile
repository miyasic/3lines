.PHONY: emulator

emulator:
	export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES && \
	cd firebase && \
	firebase emulators:start

terraform:
	cd firebase && \
	terraform init && \
	terraform apply

front-dev:
	cd front && \
	npm run dev

front-run:
	cd front && \
	npm run build && \
	npm run start