var c = new node.http.Client(8000, "127.0.0.1");

c.onError = function () {
  puts("http client connection error.");
};

var req = c.get("/bytes/123", [["Accept", "*/*"]]);
req.finish(function (res) {
  puts("response 1: " + res.statusCode.toString());

  res.onBody = function (chunk) {
    chunk = chunk.encodeUtf8();
    puts("response 1 body <" + JSON.stringify(chunk) + ">");
    return true;
  };

  res.onBodyComplete = function () {
    puts("response 1 complete!");
    return true;
  };
});

setTimeout(function () {
  var req2 = c.get("/something/else");
  //node.debug("start req2");
  req2.finish(function (res) {
    puts("response 2: " + res.statusCode.toString());

    res.onBody = function (chunk) {
      chunk = chunk.encodeUtf8();
      puts("response 2 body <" + JSON.stringify(chunk) + ">");
      return true;
    };

    res.onBodyComplete = function () {
      puts("response 2 complete!");
      return true;
    };
  });
}, 2000);
