# 🌸 Linglooma IELTS - AI搭載IELTS学習プラットフォーム

<div align="center">

[English](./README.md) | **日本語**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.16-339933?logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Powered-3ECF8E?logo=supabase)](https://supabase.com/)

*スピーキング、ライティング、リーディング、リスニングのAI評価機能を備えた総合的なIELTS準備プラットフォーム*

</div>

---

## 📖 目次

- [概要](#-概要)
- [主な機能](#-主な機能)
- [技術スタック](#-技術スタック)
- [始め方](#-始め方)
- [AI機能](#-ai機能)
- [デプロイメント](#-デプロイメント)

---

## 🎯 概要

**Linglooma IELTS**は、AI搭載の練習とリアルタイムフィードバックを通じて、学生がIELTS試験の準備をするのを支援する高度なWebベースの学習プラットフォームです。このプラットフォームは、IELTSの4つのスキル（スピーキング、ライティング、リーディング、リスニング）すべてをカバーし、学生のパフォーマンスに基づいたパーソナライズされた学習パスを提供します。

### 🌟 Lingloomaの特徴

- **AI搭載評価**: Azure Speech ServicesとGemini AIによる即時フィードバック
- **包括的な練習**: 1つのプラットフォームで4つのIELTSスキルすべてを練習
- **スマート分析**: 進捗状況と弱点を追跡するビジュアルダッシュボード
- **多言語インターフェース**: 英語、ベトナム語、日本語をサポート
- **モダンなUX**: スムーズなアニメーションを備えた美しいレスポンシブデザイン
- **柔軟なデプロイメント**: ローカルPostgreSQLまたはSupabaseで動作

---

## 🚀 主な機能

### 🗣️ スピーキングモジュール
- リアルタイム音声録音とAzure Speech-to-Text評価
- IELTSバンドスコア（1-9）と発音、流暢さ、完全性の分析
- 誤って発音された音を特定する音素レベルのフィードバック
- トピックカテゴリー：テクノロジー、環境、教育、健康、旅行
- 詳細な分析を含む完全なスピーキング履歴

### ✍️ ライティングモジュール
- Task 1とTask 2のサポートとAIエッセイ評価
- Gemini AIによる分析：Task Achievement、Coherence、Lexical Resource、Grammar
- 訂正と説明付きの文法エラー検出
- 語彙強化の提案
- リアルタイムの単語カウンターとタイマー

### 📖 リーディングモジュール
- 複数の質問タイプ：多肢選択、True/False/Not Given、マッチング、空欄補充
- 正解/不正解フィードバック付きの即座の採点
- 多様なパッセージライブラリ（気候変動、AI、教育など）
- 難易度レベル：Easy、Medium、Hard、Academic
- 進捗追跡とパフォーマンストレンド

### 🎧 リスニングモジュール
- コントロール付きオーディオ再生（再生、一時停止、速度調整）
- IELTSの構造に合わせたセクションベースのテスト（Part 1-4）
- 複数のアクセント：イギリス英語、アメリカ英語、オーストラリア英語
- 提出後のトランスクリプトレビュー

### 💬ボイスチャット
- Gemini搭載の会話型AI
- リアルタイムのSpeech-to-TextとText-to-Speech
- 構造化された会話を含むIELTS練習トピック
- チャット履歴とAIフィードバック

### 📊 学生ダッシュボード
- ビジュアルチャート付きのパフォーマンス概要
- バンドスコアのトレンドと改善追跡
- 弱点分析
- 学習ストリークと目標設定
- 最近のアクティビティへのクイックアクセス
---

## ⚙️ 技術スタック

### フロントエンド
- **React 19** - UIフレームワーク
- **Vite 6** - ビルドツール
- **Tailwind CSS 3** - スタイリング
- **React Router 7** - ルーティング
- **Axios** - HTTPクライアント
- **Lucide React** - アイコン

### バックエンド
- **Node.js 22.16** - ランタイム
- **Express.js 5.1** - Webフレームワーク
- **PostgreSQL 16+** - データベース
- **Supabase** - データベースホスティング
- **JWT** - 認証
- **Bcrypt** - パスワードハッシング

### AIサービス
- **Azure Speech Services** - Speech-to-Text、発音評価
- **Google Gemini AI** - エッセイ評価、チャットAI、フィードバック生成

---

## 🛠 始め方

### 前提条件
- Node.js 22.16以上
- PostgreSQL 16以上またはSupabaseアカウント
- Azure Speech APIキー
- Google Gemini APIキー

### クイックスタート

#### 1️⃣ リポジトリのクローン
```bash
git clone https://github.com/ThePhapp/Linglooma-IELTS.git
cd Linglooma-IELTS
```

#### 2️⃣ バックエンドのセットアップ
```bash
cd 01-backend-nodejs
npm install

# .envをコピーして設定
copy .env.example .env
# 追加: DATABASE_URL、GEMINI_API_KEY、AZURE_SPEECH_KEY、JWT_SECRET

npm start
# サーバーは http://localhost:3000 で起動
```

#### 3️⃣ フロントエンドのセットアップ
```bash
cd 00-frontend-react
npm install

# .envをコピーして設定
copy .env.example .env
# 追加: VITE_BACKEND_URL=http://localhost:3000

npm run dev
# フロントエンドは http://localhost:5173 で起動
```

#### 4️⃣ データベースセットアップ（Supabase）
1. [supabase.com](https://supabase.com)でアカウント作成
2. 新しいプロジェクトを作成
3. SQLマイグレーションを実行: `02-database-postgresql/linglooma_update.sql`
4. 接続文字列をコピーして`.env`に追加

📖 **完全ガイド**: [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)

---

## 🤖 AI機能

### スピーキング評価（Azure）
```javascript
✅ 正確性スコア（0-100）：全体的な発音
✅ 流暢さスコア（0-100）：スピーチのスムーズさ
✅ 完全性スコア（0-100）：参照テキストのカバレッジ
✅ プロソディスコア（0-100）：イントネーションパターン
✅ 音素分析：特定の誤発音音
✅ IELTSバンド変換（1-9）
```

### ライティング評価（Gemini AI）
```javascript
✅ Task Achievement（1-9）
✅ Coherence & Cohesion（1-9）
✅ Lexical Resource（1-9）
✅ Grammatical Range & Accuracy（1-9）
✅ 総合バンドスコア
✅ 訂正付き文法エラー
✅ 語彙提案
```

---

## 🚀 デプロイメント

### バックエンド（Render.com）
1. GitHubリポジトリを接続
2. 環境変数を設定
3. ビルド: `npm install`
4. 開始: `node server.js`

### フロントエンド（Vercel/Netlify）
1. プロジェクトをインポート
2. `VITE_BACKEND_URL`を設定
3. ビルド: `npm run build`
4. 出力: `dist`

---


## 📄 ライセンス

MITライセンス - [LICENSE](LICENSE)ファイルを参照

---

<div align="center">

**UET - VNU Hanoiの学生によって❤️を込めて作成**

⭐ **このリポジトリが役に立ったらスターをお願いします！**

</div>
