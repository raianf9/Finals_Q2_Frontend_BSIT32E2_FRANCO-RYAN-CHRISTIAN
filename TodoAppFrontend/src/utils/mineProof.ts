export async function mineProof(title: string) {
  let nonce = 0;

  console.log("⛏️ Mining started for:", title);

  while (true) {
    const raw = `${title}|${nonce}`;
    const encoded = new TextEncoder().encode(raw);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();


    if (nonce % 1000 === 0) {
      console.log("Trying nonce:", nonce);
    }

    if (hashHex.startsWith("00")) {
      console.log("✅ Proof found!", {
        nonce,
        proof: hashHex,
      });

      return { nonce, proof: hashHex };
    }

    nonce++;
  }
}