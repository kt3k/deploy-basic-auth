const userPasswordTable = {
  user: "password",
}

addEventListener("fetch", (e: FetchEvent) => {
  const authorization = e.request.headers.get("authorization");
  if (authorization) {
    const match = authorization.match(/^Basic\s+(.*)$/);
    if (match) {
      const [user, pw] = atob(match[1]).split(":");
      for (const [u, p] of Object.entries(userPasswordTable)) {
        if (user === u && pw == p) {
          e.respondWith(new Response(`hello ${user}!`));
          return;
        }
      }
    }
  }

  e.respondWith(new Response("", {
    status: 401,
    statusText: "Unauthorized",
    headers: {
      "www-authenticate": `Basic realm="Access to the metrics"`,
    },
  }));
});
