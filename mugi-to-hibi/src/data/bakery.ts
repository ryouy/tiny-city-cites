// 焼き上がり(デモ専用)と営業カレンダーの設定。仕様書 §4。
// 現在時刻との照合による「焼けました」「売切れ」等の自動表示は行わない(実際の在庫がないため)。

export const todayNotice = '掲載時間は架空のサンプルです。リアルタイムの在庫・焼成情報ではありません';

export const bakeSchedule = [
  { time: '08:00', items: 'カンパーニュ・クロワッサン', status: '焼き上がり予定' },
  { time: '09:30', items: 'あんバター・スコーン', status: '焼き上がり予定' },
  { time: '11:00', items: '焼きカレーパン・フォカッチャ', status: '焼き上がり予定' },
  { time: '13:00', items: '季節のデニッシュ', status: '焼き上がり予定' },
] as const;

export const calendarConfig = {
  /** 定休曜日(0=日曜 … 6=土曜)。月・火 */
  closedWeekdays: [1, 2],
  /** 週の開始曜日。0=日曜始まり(全画面で統一) */
  weekStart: 0,
};

/**
 * 臨時休業(サンプル)。YYYY-MM-DD。祝日などは自動推測しない。
 * 空配列にすると通常スケジュールのみを表示する。
 */
export const specialClosures: { date: string; label: string }[] = [
  { date: '2026-10-28', label: '臨時休業（サンプル）' },
  { date: '2026-11-11', label: '臨時休業（サンプル）' },
];
