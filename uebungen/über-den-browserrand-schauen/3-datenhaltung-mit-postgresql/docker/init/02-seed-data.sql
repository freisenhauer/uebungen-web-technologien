-- Users anlegen
INSERT INTO users (name, email) VALUES
  ('Alice Mueller', 'alice@example.com'),
  ('Bob Schmidt', 'bob@example.com'),
  ('Charlie Weber', 'charlie@example.com');

-- Projects anlegen
INSERT INTO projects (name, owner_id) VALUES
  ('Webshop entwickeln', 1),
  ('Mobile App', 1),
  ('Kundendatenbank migrieren', 2),
  ('DevOps Pipeline', 3);

-- Tasks anlegen
INSERT INTO tasks (title, description, status, project_id, created_at) VALUES
  -- Tasks für "Webshop entwickeln"
  ('Produktkatalog implementieren', 'Datenbankschema für Produkte erstellen und API-Endpunkte bereitstellen', 'in_progress', 1, '2025-01-15 10:00:00'),
  ('Warenkorb entwickeln', 'Session-basierter Warenkorb mit Add/Remove/Update Funktionalität', 'pending', 1, '2025-01-15 11:00:00'),
  ('Zahlungsintegration', 'Stripe API integrieren für sichere Zahlungsabwicklung', 'pending', 1, '2025-01-16 09:00:00'),

  -- Tasks für "Mobile App"
  ('UI Mockups erstellen', 'Figma-Designs für alle Hauptscreens', 'done', 2, '2025-01-10 14:00:00'),
  ('Login-Screen implementieren', 'React Native Screen mit Formularvalidierung', 'in_progress', 2, '2025-01-17 10:00:00'),

  -- Tasks für "Kundendatenbank migrieren"
  ('Altes Schema analysieren', 'Dokumentation der bestehenden Datenbankstruktur', 'done', 3, '2025-01-12 08:00:00'),
  ('Migrationsskript schreiben', 'SQL-Script für Datentransfer von MySQL zu PostgreSQL', 'in_progress', 3, '2025-01-18 13:00:00'),
  ('Testdaten migrieren', 'Trockenlauf mit Testumgebung', 'pending', 3, '2025-01-18 14:00:00'),

  -- Tasks für "DevOps Pipeline"
  ('CI/CD Pipeline aufsetzen', 'GitHub Actions für automatische Tests und Deployment', 'in_progress', 4, '2025-01-14 11:00:00'),
  ('Docker Images optimieren', 'Multi-stage Builds für kleinere Image-Größen', 'pending', 4, '2025-01-19 09:00:00');
