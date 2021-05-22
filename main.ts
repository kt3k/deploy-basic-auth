
const userPasswordTable = {
  user: "password",
}
addEventListener("fetch", (e: FetchEvent) => {
  const authorization = e.request.headers.get("authorization");

  if (!authorization) {
    e.respondWith(new Response("", {
      status: 401,
      statusText: "Unauthorized",
      headers: {
	"www-authenticate": `Basic realm="Access to the metrics"`,
      },
    }));
    return;
  }

  const m = authorization.match(/^Basic\s+(.*)$/);
  if (!m) {
    e.respondWith(new Response("Forbidden", {
      status: 403,
      statusText: "Forbidden",
    }));
    return;
  }

  const cred = atob(m[1]);
  const [user, pw] = cred.split(":");

  for (const [u, p] of Object.entries(userPasswordTable)) {
    if (user === u && pw == p) {
      e.respondWith(new Response(`hello ${id}!`));
      return;
    }
  }

  e.respondWith(new Response("Forbidden", {
    status: 403,
    statusText: "Forbidden",
  }));
});
