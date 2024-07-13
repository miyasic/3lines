.PHONY: emulator

emulator:
	export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES && \
	cd firebase && \
	firebase emulators:start

terraform:
	cd firebase && \
	terraform init && \
	terraform apply