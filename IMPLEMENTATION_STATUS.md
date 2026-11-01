# Remal Experience — improvement status

## Implemented
- Guest offer search, category selection and price sorting (numeric values extracted from display price; mixed price units should not be compared).
- Location, hours, price basis and conditions in each offer translation.
- WhatsApp booking date and guest count fields (contact request, not confirmed booking).
- Dashboard offer/announcement summary and translation completeness.
- Announcement targeting by section.
- Stable tagged QR destination in Settings; tracking is not active.

## Blocked on access to the correct Supabase project
Project reference: rrypsirjsckdtydqxzhc. The connected Supabase account only exposes Room service and MenuFlow. SQL introspection was denied for this project. Do not use either other database for this app.

Pending: analytics event ingestion with abuse controls, staff-only aggregated reporting, browser-estimated unique visitors, QR-source attribution, per-offer impressions and detail views, WhatsApp/call events; database authorization per staff section; audit history; recoverable deletions and restore; live RLS/Storage/security review. No historical scan counts can be reconstructed.

## Remaining interface work
- Drag-and-drop home image ordering and per-image mobile crop.
- Per-language preview selector and more complete staff workflow verification.
- QR image generation/export and device scan verification.
- End-to-end checks using authorized staff accounts after backend access is available.

Do not report these pending features as completed or substitute browser-only counters for centralized analytics.
