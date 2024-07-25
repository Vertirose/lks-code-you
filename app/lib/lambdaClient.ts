import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { fromEnv } from "@aws-sdk/credential-providers";

const lambda = new LambdaClient({
    credentials: fromEnv(),
    region: "us-west-2",
});

export const invokeLambda = async (functionName: string, payload: any) => {
    const command = new InvokeCommand({
        FunctionName: functionName,
        InvocationType: "RequestResponse",
        Payload: Buffer.from(JSON.stringify(payload)),
    });

    const response = await lambda.send(command);

    if (response.FunctionError) {
        throw new Error(response.Payload?.toString());
    }

    return JSON.parse(new TextDecoder().decode(response.Payload));
};
