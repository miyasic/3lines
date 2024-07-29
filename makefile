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

deploy-rule-dev:
	cd firebase && \
	firebase use lines-31c04-dev && \
	firebase deploy --only firestore:rules

deploy-rule-prod:
	cd firebase && \
	firebase use lines-31c04 && \
	firebase deploy --only firestore:rules

## infrastructure
terraform-dev:
	cd terraform/dev && \
	terraform init && \
	terraform apply -var-file=terraform.tfvars

terraform-prod:
	cd terraform/prod && \
	terraform init && \
	terraform apply -var-file=terraform.tfvars

## Frontend
front-dev:
	cd front && \
	npm run dev

front-run:
	cd front && \
	npm run build && \
	npm run start