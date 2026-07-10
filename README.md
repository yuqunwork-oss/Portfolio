# 吳育群 作品網站

以純 HTML / CSS / JavaScript 打造的個人作品網站，透過 GitHub Pages 部署。

## 網站架構

```
/
├── index.html            首頁
├── projects.html         作品集
├── certificates.html     證照與比賽
├── contact.html          聯絡我
├── paint-demo.html       小畫家 DEMO 頁
└── assets/
    ├── css/               樣式表（style.css 為全站共用，paint.css 為小畫家頁專用）
    ├── js/                JavaScript（paint.js 為小畫家頁邏輯）
    ├── images/            網站用圖片
    ├── videos/            作品展示影片
    └── docs/               作品 / 證照 PDF
```

- 所有頁面 HTML 檔案放在**根目錄**：GitHub Pages 需要 `index.html` 位於根目錄，且各頁導覽列彼此以相對路徑（如 `projects.html`）互相連結，放在根目錄可維持連結簡單。
- 靜態資源（CSS / JS /圖片 / 影片 / PDF）依類型集中在 `assets/` 底下，並以根目錄為基準用相對路徑引用，例如 `assets/css/style.css`。

## 新增內容時的慣例

- 新增一般頁面：在根目錄建立 `*.html`，`<head>` 內用 `<link rel="stylesheet" href="assets/css/style.css">`，並記得在每頁的 `<nav>` 導覽列同步加上連結。
- 新增圖片／影片／PDF：放進對應的 `assets/images`、`assets/videos`、`assets/docs` 資料夾，再用相對路徑（如 `assets/images/xxx.jpg`）引用。檔名一律用英文／數字命名（例如 `computex-arm-showcase.mp4`），避免中文、空格、括號造成連結或維護上的問題。
- 修改樣式：全站共用樣式改 `assets/css/style.css`；小畫家頁的獨立樣式改 `assets/css/paint.css`。
- 影片來源如果是手機／相機拍攝的 `.mov`（尤其 iPhone 錄影），瀏覽器相容性不穩定，上架前先用 `ffmpeg -i input.mov -c copy -movflags +faststart output.mp4` 轉成 `.mp4`（若原始編碼已是 H.264/AAC，這個指令只是換容器、不會重新壓縮，速度快也不損畫質）。
- 新增「多個子專案共用一個大主題」的作品（例如 `projects.html` 的「視覺辨識」區塊）：
  - 外層用 `<section class="project-card">` + `<h2>` 當主題標題。
  - 每個子專案包在 `<div class="subproject">` 裡，用 `<h3 class="subproject-title">` 當子標題，內部小標題（使用技術／相關資源等）用 `<h4>`。
  - 同一子專案有多支影片時，外面包一層 `<div class="video-grid">` 讓影片並排顯示；多張圖片對比則用 `<div class="image-gallery">`。
  - 附加下載資源（簡報、報告 PDF、新聞影片連結等）用 `<div class="resource-list">` 包住多個連結。

## 待確認 / 備註

- `assets/images/crade-be.jpg`、`assets/docs/micro-travel-ecommerce.pdf` 目前沒有任何頁面引用，若確定不需要可刪除，否則之後補上對應的連結。
- 專案根目錄下的 `0625專案分享/` 是原始素材資料夾（影片/簡報/PDF 原檔），已整理進 `assets/` 並在 `.gitignore` 中排除，不會被版本控制追蹤。確認網站顯示沒問題後，可以把這個資料夾另外搬到專案目錄以外保存，不需要留在網站專案裡。
