const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  //   console.log(url, req.headers, method);
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Server Requests</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="textField"/><button>send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log("chunk", chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      fs.writeFileSync("newTextApp.txt", message);
      console.log(message);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>New Page</title></head>");
  res.write("<body><h1>Hi Ia m body</h1></body>");
  res.write("</html>");
  res.end();

  //   process.exit();
});

server.listen(3000);
