import logo from "./logo.png";
import feature1 from "./easy-to-fill.png";
import feature2 from "./dashboard.png";
import feature3 from "./preview.png";
import feature4 from "./send-email.png";
import template1 from "./template1.png";
import template2 from "./template2.png";
import template3 from "./template3.png";
import template4 from "./template4.png";
import template5 from "./template5.png";
import type { TemplateKey } from "@/components/InvoicePreview";

export const assets = { logo, feature1, feature2, feature3, feature4, template1, template2, template3, template4, template5 };

export const templates: { id: TemplateKey; label: string; image: string }[] = [
  { id: "template1", label: "Template 1", image: assets.template1 },
  { id: "template2", label: "Template 2", image: assets.template2 },
  { id: "template3", label: "Template 3", image: assets.template3 },
  { id: "template4", label: "Template 4", image: assets.template4 },
  { id: "template5", label: "Template 5", image: assets.template5 },
];
