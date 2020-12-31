s3-sync:
	aws --region us-east-2 s3 sync ./dist s3://gmail-metrics --delete