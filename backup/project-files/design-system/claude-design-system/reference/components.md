# XRCC (PC) components: essentials

Live preview of each in `../preview/comp-*.html`. Full variant list with Figma keys: `components-full.md`.

| Need | Use | Key facts |
|---|---|---|
| Main action | Button / Dark / Primary | Large 48, Medium 36, Small 28. Leading or trailing icon. States Default, Hover, Disabled, Loading, Focus. Deep purple block + light purple text. |
| Secondary action | Button / Dark / Secondary | Outline. Cancel and alternatives. |
| Quiet action | Button / Dark / Tertiary | Text only, accent colour. |
| Icon-only | Button / Dark / Icon, Icon Square | Needs a tooltip. Sizes 28, 36, 48. |
| Text entry | Form / Dark / Text Input, text-area, Select | Sizes 28, 36, 48. States Default, Hover, Focused, Disabled, Error. Field sits on surface/input, hover is surface/row-hover, focus border is border/interactive. Padding steps up with size (8 / 12 / 16). Optional helper text and start/end slots. Select is a Text Input variant. |
| Choices | checkbox, Form (radio), Switch | Switch has 20 variants (on/off, label, state Default, Hover, Pressed, Focused, Disabled). Checkbox 16. Checkbox, Radio, Link, Slider all have a Hover state. |
| Panel tabs | Connections / Dark / Components / Tab, Button / Dark / Tabs | On, Off, Hover. Selected is purple tint. |
| Labels | Tag (Accent, Dashed, Outline, Filled, Danger, Subtle; Small, Medium; Rounded, Pill), Badge (color, solid or faded, small to large) | Tag has a Label text property and states Default, Hover, Pressed, Focus, Disabled. Badge is status or count. |
| Messages | alert (neutral, primary, critical, positive, warning), Notification / Dark (Default, Countdown, Compact), Dialog (Info, Success, Destructive, Warning; Small, Medium, Large) | Dialog: title bar, icon plus sentence, Cancel plus action. |
| Hints | New Tooltips (12 placements), popover | Default top, gap 8, max 320. |
| Menus | dropdown-menu, menu-item | Selection default, highlighted, selected. |
| Loading | loader, progress-bar, progress-indicator, skeleton | Warning colour exists on progress-bar. |
| Data | table-column, .table-cell, pagination, breadcrumbs-item, avatar, divider, link, file-upload, pin-field | Check bindings before use. |

Rules: don't detach instances. Use only the variants that exist. Check the description of "Candidate" components. When a component is missing, compose from the nearest ones and say so.

Interaction: Library prototypes use Hover on mouse over, Pressed on press, and a 100ms ease-out transition. Focus (keyboard) and Disabled have no transition. Link hover uses a brighter colour and a 2px underline.
