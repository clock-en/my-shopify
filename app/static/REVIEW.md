# 使えそうなアプリ

- Product Reviews  
  ⇒shopify 製の純正アプリで無料
- Yotpo  
  ⇒Yotpo はもともとレビュー用の外部サービスとなっていて、Shpify との連携を行ってくれるアプリ

## 「Product Reviews」を使用してオウンドサイトにレビューを表示する。

- Storefront API だけでは情報にアクセスできない。
- Admin API を使用する必要があるが、CORS が許可されていないためフロントエンドではアクセスすることができない
- 今のところ対応方法不明

## 「Yotpo」を使用してオウンドサイトにレビューを表示する。

- 「Yotpo」アプリをインストール
- 「Yotpo」アカウントを作成する
- 「Collect Reviews」画面にてレビューについてのリクエストメール設定を行う
- 「Customize Reviews Widget」画面にてレビュー Widget のカラー/フォントを設定する
- 「Integrate」画面から「Manual Installation」を選択して必要なソースコードを以下手順でオウンドサイトに埋め込む

### レビューを表示したい箇所に Widget 出力用の html タグを挿入する

「Install Reviews Widget」を選択して取得できるソースコードをオウンドサイト向けに書き換える。

##### テーマページ向けの記述（取得ソースコード）

```
<div
  class="yotpo yotpo-main-widget"
  data-product-id="{{ product.id }}"
  data-name="{{ product.title | escape }}"
  data-url="{{ shop.url }}{{ product.url }}"
  data-image-url="{{ product.featured_image | product_img_url: "large" |replace: '?', '%3F' | replace: '&','%26'}}"
  data-description="{{ product.description | escape }}"
></div>
```

##### Nuxt.js + Storefront の場合（例）

```
<div
  v-if="product.media"
  class="yotpo yotpo-main-widget"
  :data-product-id="productSfId"
  :data-name="product.title"
  :data-url="
    `https://xn-cck2ba4clb3006j264b.myshopify.com/products/${product.handle}`
  "
  :data-image-url="product.media.edges[0].node.previewImage.originalSrc"
  :data-description="product.description"
></div>
```

※商品 ID は theme(liquid)上で取得する場合と Storefront API から取得する場合で形式が異なる

- atob 関数でのデコードと parseGid 関数での変換が必要（参考：https://community.shopify.com/c/Shopify-APIs-SDKs/Storefront-API-variantId-different-than-Rest-API-variantId/td-p/607635）

### Yotpo の JavaScript を読み込ませる

「Add Yotpo's Java-Script」を選択して取得できるソースコードを外部化する。

- \<script\>タグ内の記述のみを js ファイルとして作成する。
- 作成したファイルを static ディレクトリに格納する。
- Widget 出力用の html タグの子要素として作成した JS を読み込む script タグを挿入する。
  ※head 内に設定すべきだが、Widget 出力用の html 自体が動的に出力されるため、処理順が一致せず表示されない場合があるため、子要素として記載する。

##### 記載場所（例）

```
<div
  v-if="product.media"
  class="yotpo yotpo-main-widget"
  :data-product-id="productSfId"
  :data-name="product.title"
  :data-url="product.onlineStoreUrl"
  :data-image-url="product.media.edges[0].node.previewImage.originalSrc"
  :data-description="product.description"
>
  <script async src="/review.js"></script>
</div>
```

### 見た目のカスタマイズについて

Yotpo 管理画面から表示要素の設定が行えるようだが、管理画面の不具合で保存ができない？

CSS で style の上書きは可能

### Yotpo メモ

下記は Yotpo の仕様？（操作してみて感じたこと）

- 同一のメールアドレスでは一定時間（1、2 時間程度？）をおかないと再投稿ができない？（テストでいくつかレビューを投稿しようとしたがダメだった）
- 投稿後、実際にページへ反映されるまでは少し時間がかかる場合がある。（投稿直後はレビュー内容がリストに表示されるが、リロードすると初期化されるためか表示されなくなる）

下記は Yotpo の不具合？（操作してみて感じたこと）

- 表示される Widget を読み取り専用にもできるみたいだが Widget の設定ページが JS エラーで機能していない？（本当は日付表記なども変えられる様ですが…）

### Yotpo 懸念点

- 追加で外部サービスを契約する必要があり、さらに詳細の調査が必要となる。
- 日本語ドキュメントが少ない。（ギャプライズという会社が日本での販促を行っているがサポートを受けられるかは不明）
- 無料プランでもレビューは表示できるが、機能に制限がある。
- 有料プランは注文数によって金額が変わるよう
- メモに記載されているように一部機能していない？（管理画面の不具合か…？）
