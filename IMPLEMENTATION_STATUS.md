# Remal Experience — implementation status

Implemented: offer search/category filters/price sorting; multilingual location/hours/price-basis/conditions; WhatsApp date/guest count; dashboard overview; translation completeness; targeted announcements; image drag-and-drop and arrow ordering; top/center/bottom mobile crop; per-language offer preview; tagged QR destination in Settings.

Blocked: Supabase project rrypsirjsckdtydqxzhc is not accessible through the connected account (which exposes only Room service and MenuFlow). SQL introspection was denied. Never use those other databases for this application.

Pending backend work: centralized analytics (QR openings, browser-estimated unique visitors, per-offer impressions/detail views, contact clicks), staff-only aggregated reporting, write abuse controls, per-section staff authorization, audit history, recoverable deletion, restoration and live RLS/Storage review. Analytics is NOT active; historical scans cannot be reconstructed.

Pending verification: staff workflow end-to-end, QR image export and scans on physical devices. Numeric price sorting cannot meaningfully compare different price bases.
