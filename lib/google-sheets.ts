import { google } from "googleapis";

/**
 * Appends one row per lead to a shared Google Sheet using a service
 * account (no OAuth consent screen, no per-user login).
 *
 * Setup required (see README for the full walkthrough):
 *   1. Create a Google Cloud project → enable the Google Sheets API.
 *   2. Create a Service Account → generate a JSON key.
 *   3. Share the target Google Sheet with the service account's email
 *      (found in the JSON key as `client_email`), with Editor access.
 *   4. Set these env vars:
 *        GOOGLE_SHEETS_CLIENT_EMAIL   ← the service account's client_email
 *        GOOGLE_SHEETS_PRIVATE_KEY    ← the service account's private_key
 *        GOOGLE_SHEET_ID              ← the sheet's ID from its URL
 *        GOOGLE_SHEET_TAB_NAME        ← e.g. "Leads" (optional, defaults below)
 */

export type LeadRow = {
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  photoCount: number;
  /** Appended as an extra trailing column — existing sheet layouts are unaffected. */
  source?: string;
};

function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  // Env vars can't contain literal newlines, so the key is stored with
  // escaped "\n" sequences and unescaped here.
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google Sheets service account credentials");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function appendLeadToSheet(lead: LeadRow): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const tabName = process.env.GOOGLE_SHEET_TAB_NAME || "Leads";

  if (!sheetId) {
    throw new Error("Missing GOOGLE_SHEET_ID");
  }

  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    // The sheet's "status" column A belongs to a native Sheets Table object
    // (not just a plain data range). The append API detects that Table's
    // real boundaries server-side and always anchors new rows to its start
    // column (A), ignoring the column span of whatever `range` we pass —
    // so bounding the range to B:I doesn't stop it from writing into A.
    // Instead we write the full A:I width ourselves, leaving A blank so the
    // status dropdown for the new row is just unset, same as any other
    // fresh row.
    range: `${tabName}!A2:I`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          "",
          formatTimestamp(lead.timestamp),
          lead.name,
          lead.phone,
          lead.email,
          lead.service,
          lead.message,
          lead.photoCount,
          lead.source ?? "",
        ],
      ],
    },
  });
}

const SHEET_TIMEZONE = "America/Chicago";

const timestampFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: SHEET_TIMEZONE,
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

/** Converts an ISO timestamp (e.g. "2026-08-24T01:19:56.295Z") into a
 *  readable, business-timezone string (e.g. "Aug 23, 2026, 8:19 PM CDT"). */
function formatTimestamp(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  if (Number.isNaN(date.getTime())) {
    return isoTimestamp;
  }
  return timestampFormatter.format(date);
}