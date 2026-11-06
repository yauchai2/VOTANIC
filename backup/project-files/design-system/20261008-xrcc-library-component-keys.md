# XRCC (PC) Library — component set keys (read 2026-10-08)

For `figma.importComponentSetByKeyAsync(key)` in a file that has the library enabled. Re-verify with `search_design_system` before use; keys can change if a component is republished/recreated.
Format: page | component set | key

| Page | Component set | Key |
|---|---|---|
| Button | Button / Dark / Primary | 9f8e561a6613b124c2b8876220fbefd3f7738d25 |
| Button | Button / Dark / Secondary | c9d333a7a9b0fc7d25dc056c50b50f6984196702 |
| Button | Button / Dark / Tertiary | 565b5c00f79ed724f25f903733d8cd2afa1c2280 |
| Button | Button / Dark / Icon | 78b9669684782084b676f1982a433c0464ea499b |
| Button | Button / Dark / Header Button | 9b9c420a3fffc5feca5cdb36b48786ce605bc41e |
| Button | Button / Dark / Header Listing | c265ed75a8bf85b7f25023a191e21475f4fc34c6 |
| Button | Button / Dark / Behaviour tool | 5ca58d158e1861a8d4ae692d06e410019c0a9a5c |
| Button | Button / Dark / 40px | a109670c5c2a6e0d59b915b8aba53ef325dee711 |
| Button | Button / Dark / 48px | dc245ac12e0b505042111746f131c27486b390b9 |
| Button | Button / Dark / Pattern 01 | 5f4367090d5a0fb34f652c98a12988fabae8c80e |
| Button | Button / Dark / Pattern 02 | 71d7a445a258e4178aea08b804342c5a3fe74708 |
| Text field | Form / Dark / Text Input | fa5b83fb91d7855fff37d0f75366361bcb2c172e |
| Text area | Form / Dark / text-area | 528f4473f6e4a8e061a8722d92ba05107b9ab2f2 |
| Dropdown menu | Form / Dark / Select | d76c2d80708cbe2d4bd341de27887c662135ae0a |
| Dropdown menu | dropdown-menu | eba21e1a80827b951c15ac66e01a2db4f3ed0088 |
| Checkbox | Form / Dark / checkbox | 928b269a97dd38b8ef9ce6d203d5c02fa728af70 |
| Radio | Form (radio) | dd036fd4a4543da09b8584c8d3bd2cef08b888ac |
| Switch | switch | d29199073854258390c7a8e37fe6a9a9953a617b |
| Switch | Form (switch, Property 1–5) | cb05a257ef9481d2fdedc4886ffe4fb85a288490 |
| Slider | Form / Dark / Slider Bar | 8360d8ca8a4a9c7098a6ea1bbe17de52bee8dbcc |
| Pin field | Form / Dark / OTP/Passcode Input | ccd4d2aa6afa33f6b7e7afedde22d06bb7b1e5e9 |
| Pin field | pin-field | 2ca6618f2f00386dcfd701662b85ba229642bfdb |
| Pin field | .pin-field-item | dc05da98d8f04d77ed4bfa998e45837aaea7cf59 |
| Menu item | menu-item | 6864b1919e2d17949b8554d36e0dc3157dbf57dd |
| Alert | alert | 50554be1e90b463db41e09832d85b963b7b31a75 |
| Alert (Notification) | Notification / Dark (was Networking Panel / Dark / Pattern 02) | 2f86e8dcdb9bb4fa6ef426dfd76a78da91aaceeb |
| Tooltip | New Tooltips | a8db5fea3edff0f3f680185cc658f7ee59a17b8d |
| Popover | popover | fe55cf96e5d72a2656816892a732ebbdaeef5c4f |
| Tabs | Connections / Dark / Components / Tab | 02062e977df9715d45734fce86180490634ea425 |
| Tabs | Connections / Dark / Components / Device bar | 2ef7395531427dd26ffa9076475e2a2fb3a02fd8 |
| File upload | file-upload | f30146a71af1f0a3a618763a4ad3054b87c4966b |
| File upload | Home / Dark / Pattern 05 (card/list) | ec1e084761e829ab8f556772f512bddf6e9d0719 |
| Badge | Tag | 88b32023885d5211bf080c0d240ee75cdc3f93ef |
| Avatar | avatar | 1130d4c4bc8eaee5d71fc5c1a51dc13700e304d2 |
| Divider | divider | 231a5b776063b5afdda6a3a40b4dfb12fe8aa297 |
| Link | link | edc5ae265335124857454dc8321aaf06f4ac8dc0 |
| Loader | loader | 52e14a113c17baa419f3b045a4ab761f27a658d1 |
| Pagination | pagination | 2529b57fd63c8bf04ba2f7a14a6963b43a704e00 |
| Progress bar | progress-bar | bd45e4f6ec93bc5734a7220242aca8ac196c52df |
| Progress indicator | progress-indicator | b37c98909ee3ed7d811d43a90fc8f6f65a858b63 |
| Skeleton | skeleton | 9b7a6731639b41f980311acce7a325df68a522cd |
| Table | table-column | a59c22947d044b4a45d3c0df0c0c62e125b04cbb |
| Table | .table-cell | 07a1cc66b30ba3d64ca8d29bfb0e079deaf70afd |

Variable collections (library): XRCC Primitive · XRCC Theme (Dark/Light) · XRCC System. Variable keys: get via `search_design_system` (entity: variable) — e.g. `action/primary/background/default` key `…` is returned there; do not hardcode.
Icons: 312 components named `icon/outline/<name>` and `icon/solid/<name>`; find by `search_design_system` (entity: component, query: icon name).

## 2026-10-09 下晝重讀(Alan 大幅更新 Library 後)— 同上表對比
讀法:Library 草稿(Plugin API)+ 已發佈版本(`search_design_system` / `importComponentSetByKeyAsync`)。**草稿同已發佈有分別**,Workbench 只睇到已發佈版本。

**新增 component set(已發佈)**
| Page | Component set | Key |
|---|---|---|
| Badge | Badge(90 variants:color / variant / size / rounded / empty) | 3706bf2583d7ce1c710381f48659f20b19507850 |
| Badge | Badge indicator | 84da462df126a0b9c442712ea020583b6b218c01 |
| Breadcrumbs | breadcrumbs-item | fa4e8b089092b09fbc0d93d85215fdc9ea3a5e38 |
| Button | Button / Dark / Icon Square(Large 48 / Medium 36 / Small 28) | b2d58fe9265280bc4933e76a55f14253ee8175cf |
| Popup | Delete Creation Result / Prompt too long / Invalid Attachment Count / Partial Attachment Import(獨立 component,非 set) | 255fa2f6…(Delete Creation Result)、b3dfcecf…、5876b665…、1af0d4ea…、4c611705… |

**Key 變咗**
| Component | 舊 key | 新 key |
|---|---|---|
| alert | 50554be1e90b463db41e09832d85b963b7b31a75 | 576ad7b36ad3a0e45acf128195a69db3a813b416(Workbench 已用新 key) |

**改名(key 不變)**
- Tabs `Device bar` → `Full Tabs`(2ef73955…);Button `Pattern 01` → `Tabs`(5f436709…)、`Pattern 02` → `Header Tabs`(71d7a445…);Connections `Tab` 同 `Full Tabs` 屬 Tab 頁。

**草稿有、但**尚未**發佈(Workbench 暫時無法用,Alan 要 Publish)**
- `Select` 頁:舊 `Form / Dark / Select`(d76c2d80…)喺草稿變成 `Form / Dark / Select [Legacy]`(新 key 42803d84…);新增一個以 Text Input 結構建嘅 set 叫 `Form / Dark / Text Input`(393f5f64…,24 variants,描述仲係 Text Input 嘅,疑似未完成嘅新 Select)。Publish 後 Workbench 29 個 Select instance 要遷移。
- `Switch`:草稿冇咗細階 `switch`(d2919907…,Workbench UI 頁 3 個 instance 仲用緊),只剩 legacy `Form`(cb05a257…,4 variants:on/off × label),`Form` 描述仍然叫人「用細階 switch」→ 自相矛盾,需 Alan 確認。
- `icon/outline/check`(c1e49836…)已唔存在(只有 `icon/solid/check`、`icon/outline/check-circle`);Workbench 內只係 Library 自己 component(checkbox、Tag Selected)內嵌用到。

**Variables(草稿)**:Primitive 112(+1)、Theme 117(+16,新增 `avatar/{blue,red,green,yellow}/*` 11 個、`border/faded`、`surface/faded`、`status/success/{text,icon,background}` 等)、System 69(**由 159 減少**:`typography/en/*`、`typography/layout/*` 舊鏈已移除,只留 `typography/{heading,body,caption}/*`、`typography/font-weight/*`、`typography/font-family`、`size/*`、`spacing/*`、`radius/*`);新增 `spacing/28/36/40/48/56/64`。Primitive 仍未對外發佈。
**Text styles**:10 個(heading xl/lg/md/sm、body lg / lg-bold / md / md-bold / sm、caption);Effect styles 10 個(shadow/dark|light/1–5)。
**Icons**:Icons 頁 454 個 component(`icon/outline/*` 約 280、`icon/solid/*` 約 50,其餘係 kit 雜項 / 社交 logo)。

## 2026-10-09 更新(Alan 確認 + 已 Publish)
- **Select** = `Form / Dark / Select`,key `393f5f64343aa1cea6ce99098b0019a2eca3a88f`(Text Input 變種,Size 28/36/48 × State Default/Focused/Disabled/Error × Placeholder)。舊 `d76c2d80…` 已淘汰,舊結構留喺 `Form / Dark / Select [Legacy]`(42803d84…),新工作唔好用。
- **Switch** = 頁面只保留 4 個 variant 嘅 set(`cb05a257ef9481d2fdedc4886ffe4fb85a288490`,屬性 on/off、label);label 係掣內 On/Off 字,側邊文字要自己放。細階 `switch`(d2919907…)已永久移除,Workbench 已換走。
