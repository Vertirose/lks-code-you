import { invokeLambda } from "../../lib/lambdaClient";

const functionUrl = "hello-world";


export async function GET() {
    try {
        const result = await invokeLambda(
            functionUrl,
            JSON.stringify({ key: "hello" })
        );
        return Response.json({ status: 200, data: result });
    } catch (err: any) {
        return Response.json({ status: 500, error: err.message });
    }
}
