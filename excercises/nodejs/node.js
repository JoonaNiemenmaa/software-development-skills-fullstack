import http from "http";
import path from "path";
import url from "url";
import fs from "fs";

const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const public_path = path.join(__dirname, "public/");

const logger = (request, response, next) => {
    console.log(`${request.method} ${request.url}`);
    next();
};

const server = http.createServer((request, response) => {
    logger(request, response, () => {
        if (request.method === "GET") {
            let resource = path.join(public_path, request.url);

            fs.readFile(resource)
                .then((data) => {
                    response.writeHead(200, { "content-type": "text/html" });
                    response.write(data);
                    response.end();
                })
                .catch((error) => {
                    console.error(error);
                    response.statusCode = 404;
                    response.end("resource not found");
                });
        } else if (request.method === "POST") {
            let body = "";

            request.on("data", (chunk) => {
                body += chunk;
            });

            request.on("end", () => {
                console.log(body);

                fs.writeFile(
                    path.join(public_path, request.url),
                    body,
                    (error) => {
                        if (error) {
                            response.statusCode = 500;
                            response.end("failure");
                        } else {
                            response.end("success");
                        }
                    },
                );
            });
        } else {
            response.end("invalid method");
        }
    });
});

server.listen(PORT, () => {
    console.log(`Nodejs server listening on port ${PORT}`);
});
