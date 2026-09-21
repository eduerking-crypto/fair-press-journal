// E2E test: register -> submit -> logout -> login -> submit
// Usage: node scripts/test-auth-submit.mjs [baseUrl]
const BASE = process.argv[2] ?? "http://localhost:3000";

let failures = 0;
function check(name, cond, extra = "") {
  const status = cond ? "PASS" : "FAIL";
  if (!cond) failures++;
  console.log(`${status}  ${name}${extra ? " — " + extra : ""}`);
}

function cookieFrom(res) {
  const raw = res.headers.get("set-cookie") ?? "";
  const pair = raw.split(";")[0];
  return pair || "";
}

const ts = Date.now();
const user = {
  name: "Test Author",
  email: `test.${ts}@example.org`,
  password: "S3curePass!",
};

// 1. Register
let res = await fetch(`${BASE}/api/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(user),
});
let data = await res.json();
check("register new user", res.status === 200 && data.ok === true, JSON.stringify(data));

// duplicate registration must fail
res = await fetch(`${BASE}/api/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(user),
});
data = await res.json();
check("duplicate register rejected", res.status === 400 && data.ok === false);

// 2. Login
res = await fetch(`${BASE}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: user.email, password: user.password }),
});
data = await res.json();
check("login with valid credentials", res.status === 200 && data.ok === true);
const cookie = cookieFrom(res);
check("session cookie issued", cookie.startsWith("fp_session="));

// wrong password
res = await fetch(`${BASE}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: user.email, password: "wrong-password" }),
});
data = await res.json();
check("login with wrong password rejected", res.status === 401 && data.ok === false);

// 3. /me with cookie
res = await fetch(`${BASE}/api/auth/me`, { headers: { Cookie: cookie } });
data = await res.json();
check("/me returns logged-in user", data.user?.email === user.email);

// 4. Submit manuscript with session
const form = new FormData();
form.set("title", "Telemedicine outcomes in rural hypertension management");
form.set("type", "Research Article");
form.set("keywords", "telemedicine; hypertension; rural health");
form.set("abstract", "Background: uncontrolled hypertension is common in rural areas. ".repeat(3));
res = await fetch(`${BASE}/api/submit`, { method: "POST", headers: { Cookie: cookie }, body: form });
data = await res.json();
check("manuscript submission accepted", res.status === 200 && data.ok === true && !!data.id, data.id ?? "");

// 5. Submit without session must be rejected
res = await fetch(`${BASE}/api/submit`, { method: "POST", body: form });
data = await res.json();
check("anonymous submission rejected", res.status === 401);

// 6. Logout
res = await fetch(`${BASE}/api/auth/logout`, { method: "POST", headers: { Cookie: cookie } });
data = await res.json();
check("logout", res.status === 200 && data.ok === true);

console.log(failures === 0 ? "\nALL TESTS PASSED" : `\n${failures} TEST(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
