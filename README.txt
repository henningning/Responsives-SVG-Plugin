RESPONSIVES SVG – GUTENBERG-BLOCK (v1.0.0)
Autor: Henning Rolapp / ChatGPT

Installation
1. WordPress → Plugins → Plugin hinzufügen → Plugin hochladen.
2. ZIP-Datei auswählen, installieren und aktivieren.
3. Website-Editor öffnen und Block „Responsives SVG“ hinzufügen.
4. „SVG auswählen“ anklicken und eine SVG aus der Mediathek wählen.
5. In der Block-Werkzeugleiste „Weite Breite“ (voreingestellt) oder
   „Volle Breite“ auswählen. Der Block skaliert automatisch mit.

Hinweise
- WordPress lässt SVG-Uploads aus Sicherheitsgründen nicht standardmäßig zu.
  Verwende für den Upload beispielsweise das bereits installierte Safe SVG.
- Das Plugin erlaubt selbst KEINE zusätzlichen Upload-Dateitypen.
- Das SVG wird als normales <img>-Element eingebunden. Dadurch bleibt es
  responsiv, ohne dass feste SVG-Abmessungen aus anderen Plugins stören.
- Eine korrekte viewBox oder ein korrektes Seitenverhältnis in der SVG-Datei
  ist wichtig. Die Skalierung richtet sich nach der verfügbaren Blockbreite.
- Keine JavaScript-Datei auf der öffentlichen Seite, keine externen Ressourcen.
