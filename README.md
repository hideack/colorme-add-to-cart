# colorme-add-to-cart
## About
- 環境変数ACCOUNTで指定されたカラーミーショップ店舗の商品を直接カートに投入するリンクを構成するリダイレクタです

## Usage
環境変数としてACCOUNTにカラーミーショップのIDまたは独自ドメインを指定しリダイレクタを起動します。

### ドメイン設定
- **デフォルトドメイン**: `ACCOUNT=hideack3` → `hideack3.shop-pro.jp`
- **独自ドメイン**: `ACCOUNT=www.example.com` → `www.example.com`

### アクセス方法
- https://(デプロイ先)/(カラーミーショップ商品ID)

上記リンクを経由することで該当リンクから直接ショッピングカートへ商品を投入することができます。

### Examples
```bash
# デフォルトドメインの場合
ACCOUNT=hideack3 npm start

# 独自ドメインの場合
ACCOUNT=www.example.com npm start
```

## heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hideack/colorme-add-to-cart)
