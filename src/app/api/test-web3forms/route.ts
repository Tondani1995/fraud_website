import { NextRequest, NextResponse } from "next/server";

const TEST_TOKEN = "mkf-web3forms-test-2026-07-06-1e3d1a";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (token !== TEST_TOKEN) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { ok: false, error: "Missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY" },
      { status: 500 }
    );
  }

  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append("name", "ChatGPT Production Test");
  formData.append("email", "hello@mkfraud.co.za");
  formData.append(
    "message",
    "TEST SUBMISSION: MK Fraud Insights Web3Forms production check. Please ignore. This was submitted from the live production site to confirm the Fraud Readiness Checklist form still delivers."
  );
  formData.append("subject", "TEST: MK Fraud Web3Forms checklist submission");
  formData.append("from_name", "ChatGPT Production Test");

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  const result = await response.json().catch(() => null);

  return NextResponse.json({
    ok: response.ok,
    status: response.status,
    web3formsSuccess: result?.success ?? null,
    web3formsMessage: result?.message ?? null,
  });
}
