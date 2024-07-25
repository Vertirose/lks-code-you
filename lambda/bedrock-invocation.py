import json
import boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    # Create a Bedrock Runtime client in the AWS Region you want to use.
    client = boto3.client("bedrock-runtime", region_name="us-west-2")
    
    # Set the model ID, e.g., Titan Text Premier.
    model_id = "amazon.titan-text-express-v1"
    # Start a conversation with the user message.
    
    headers = event["headers"]
    if "x-api-key" not in headers:
        return {
            "statusCode": 401,
            "body": json.dumps("Unauthorized")
        }
    body = event["body"]
    conversation = json.loads(body)["conversation"]
    print(conversation)
    
    try:
        # Send the message to the model, using a basic inference configuration.
        response = client.converse(
            modelId=model_id,
            messages=conversation,
            inferenceConfig={"maxTokens":4096,"temperature":1},
            additionalModelRequestFields={}
        )
    
        # Extract and print the response text.
        print(response)
        response_text = response["output"]["message"]["content"][0]["text"]
        print(response_text)
        return {
            'statusCode': 200,
            'body': json.dumps(response_text)
        }
    
    except (ClientError, Exception) as e:
        print(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
        return {
            "statusCode": 500,
            "body":json.dumps(e)
        }

