#!/usr/bin/env node

// --- Argument parsing ---
const args = process.argv.slice(2);
let prompt = null;
let size = "portrait";
let token = null;
let refUuid = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--size" && args[i + 1]) {
    size = args[++i];
  } else if (args[i] === "--token" && args[i + 1]) {
    token = args[++i];
  } else if (args[i] === "--ref" && args[i + 1]) {
    refUuid = args[++i];
  } else if (!args[i].startsWith("--") && prompt === null) {
    prompt = args[i];
  }
}

if (!prompt) {
  prompt =
    "professional studio headshot of a person, clean neutral background, soft studio lighting, sharp focus on face, business casual attire, confident natural expression, high resolution, photorealistic";
}

// --- Token resolution ---
if (!token) token = null || null;
if (!token) token = readEnvFile("~/.openclaw/workspace/.env");
if (!token) token = readEnvFile("~/developer/clawhouse/.env");

if (!token) {
  console.error('\n✗ Token required. Pass via: --token YOUR_TOKEN');
console.error('  Get yours at: https://www.neta.art/open/'); {
  body.inherit_params = {
    collection_uuid: refUuid,
    picture_uuid: refUuid,
  };
}

// --- POST to generate image ---
async function generateImage() {
  const res = await fetch(`${API_BASE}/v3/make_image`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Error creating task (${res.status}): ${text}`);
    process.exit(1);
  }

  const data = await res.json();
  const taskUuid =
    typeof data === "string" ? data : data.task_uuid;

  if (!taskUuid) {
    console.error("Error: no task_uuid in response:", JSON.stringify(data));
    process.exit(1);
  }

  return taskUuid;
}

// --- Poll for result ---
async function pollTask(taskUuid) {
  const maxAttempts = 90;
  const delayMs = 2000;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise((r) => setTimeout(r, delayMs));

    const res = await fetch(
      `${API_BASE}/v1/artifact/task/${taskUuid}`,
      { headers: HEADERS }
    );

    if (!res.ok) {
      console.error(`Poll error (${res.status}): ${await res.text()}`);
      process.exit(1);
    }

    const data = await res.json();
    const status = data.task_status;

    if (['PENDING', 'MODERATION'].includes(status)) { continue; }
  if (['FAILURE', 'TIMEOUT', 'DELETED', 'ILLEGAL_IMAGE'].includes(status)) {
    console.error('Error: generation failed with status ' + status + (pollData.err_msg ? ' — ' + pollData.err_msg : ''));
    process.exit(1);
  }

    // Done — extract URL
    const url =
      data.artifacts?.[0]?.url ||
      data.result_image_url;

    if (!url) {
      console.error("Error: task done but no image URL found:", JSON.stringify(data));
      process.exit(1);
    }

    console.log(url);
    process.exit(0);
  }

  console.error("Error: timed out waiting for image generation");
  process.exit(1);
}

// --- Main ---
(async () => {
  const taskUuid = await generateImage();
  await pollTask(taskUuid);
})();
