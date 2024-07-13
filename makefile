.PHONY: emulator

## Firebase
emulator:
	export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES && \
	cd firebase && \
	firebase emulators:start

deploy-functions-dev:
	cd firebase && \
	firebase use lines-31c04-dev && \
	firebase deploy --only functions

deploy-functions-prod:
	cd firebase && \
	firebase use lines-31c04 && \
	firebase deploy --only functions

## infrastructure
terraform:
	cd firebase && \
	terraform init && \
	terraform apply

## Frontend
front-dev:
	cd front && \
	npm run dev

front-run:
	cd front && \
	npm run build && \
	npm run start