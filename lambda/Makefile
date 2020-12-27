LAMBDANAME = gmail_metrics_lambda

zip:
	zip -r $(LAMBDANAME).zip * -x '*aws-sdk*'

aws-push:
	aws lambda update-function-code --function-name $(LAMBDANAME) --zip-file fileb://$(LAMBDANAME).zip
	