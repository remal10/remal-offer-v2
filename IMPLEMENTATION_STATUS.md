# Remal Experience — implementation status

Implemented: guest discovery and price sorting; multilingual offer facts; booking request inputs; dashboard summary; targeted announcements; photo ordering and crop; per-language previews; SVG QR export; centralized statistics; section-scoped authorization; admin-managed team access; change history and restoration.

Statistics use first-party browser/session UUIDs and record no guest names, phone numbers, reservation dates, guest counts or precise locations. Do Not Track and staff traffic are excluded. Each kind/offer is deduplicated per session; daily caps limit repeated ingestion per browser UUID. UUIDs and source tags can be spoofed, so these are operational estimates, not audited attendance. QR openings measure visits to the tagged destination, not the physical scan action. Old untagged QR codes contribute visits but cannot reliably be attributed to QR. Data starts on activation; no historical backfill.

Raw events and history are in a private schema with direct browser access revoked. Aggregated reports require staff; section users see only their offers. Existing allow-listed accounts remain admins; new access is explicitly assigned. Team changes do not send email invitations. Staff accounts can be registered using the existing Create my account flow after allow-listing.

Restore returns offers/announcements to draft. Files are retained because deleting old media would break restoration. History starts at activation. Deleted offers do not lose accumulated counts; deleted title may be shown as its ID. Existing snapshots before activation are not available.

Validated: transactional database tests for section authorization, staff-only analytics/history/team access, ingestion and deduplication, restoration of changed/deleted offers, admin reports. All database test data was rolled back. JavaScript syntax and simulated full startup passed.

Remaining manual checks: real administrator/section browser workflows with signed-in accounts; physical QR scans on iOS/Android. Supabase still reports leaked-password protection disabled; this was pre-existing and is a separate Auth setting. No claim of zero future bugs or exact unique people counts.
