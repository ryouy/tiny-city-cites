/** 予約プレビュー(非送信デモ)の設定 */
export const reservationDemo = {
  timezone: 'Asia/Tokyo',
  /** 定休日(曜日 0=日) */
  closedWeekday: 0,
  closedLabel: '日曜',
  times: ['17:30', '18:00', '19:00', '20:00'],
  partyMin: 1,
  partyMax: 6,
  courseMinParty: 2,
  courseLeadDays: 2,
  options: [
    { id: 'seat', label: '席のみ', course: false },
    { id: 'season', label: '灯の季節コース', course: true },
    { id: 'omakase', label: '炭火おまかせコース', course: true },
  ],
  banner: 'こちらはポートフォリオ用の操作デモです。予約は送信・確定されません。',
} as const;
